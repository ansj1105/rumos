import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

import { prisma } from "@/lib/prisma";

const ADMIN_SESSION_COOKIE = "lumos_admin_session";

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function createPasswordHash(password: string) {
  return hashPassword(password);
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(":");

  if (!salt || !key) {
    return false;
  }

  const derived = scryptSync(password, salt, 64);
  const buffer = Buffer.from(key, "hex");

  return buffer.length === derived.length && timingSafeEqual(buffer, derived);
}

export async function ensureAdminAccount() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "change-me";
  const existing = await prisma.adminAccount.findUnique({ where: { username } });

  if (existing) {
    return existing;
  }

  return prisma.adminAccount.create({
    data: {
      username,
      passwordHash: createPasswordHash(password),
    },
  });
}

export async function logAdminAccess({
  username,
  adminId,
  success,
}: {
  username: string;
  adminId?: number | null;
  success: boolean;
}) {
  const headerStore = await headers();

  await prisma.adminAccessLog.create({
    data: {
      adminId: adminId ?? null,
      username,
      success,
      ipAddress: headerStore.get("x-forwarded-for") || headerStore.get("x-real-ip"),
      userAgent: headerStore.get("user-agent"),
    },
  });
}

export async function createAdminSession(adminId: number) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);

  await prisma.adminSession.create({
    data: {
      token,
      adminId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (token) {
    await prisma.adminSession.deleteMany({ where: { token } });
  }

  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: { admin: true },
  });

  if (!session || session.expiresAt.getTime() < Date.now()) {
    if (session) {
      await prisma.adminSession.delete({ where: { token } });
    }
    cookieStore.delete(ADMIN_SESSION_COOKIE);
    return null;
  }

  return session;
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/asdasddfg");
  }

  return session;
}

export async function getAdminHeaderStats() {
  const session = await requireAdminSession();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [todayVisitors, pendingInquiries, lastLogin] = await Promise.all([
    prisma.visitLog.count({
      where: {
        visitDate: todayStart,
      },
    }),
    prisma.inquiry.count({
      where: {
        status: {
          in: ["RECEIVED", "REVIEWING"],
        },
      },
    }),
    prisma.adminAccessLog.findFirst({
      where: {
        adminId: session.adminId,
        success: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: 1,
    }),
  ]);

  return {
    session,
    todayVisitors,
    pendingInquiries,
    lastLoginAt: lastLogin?.createdAt ?? null,
  };
}
