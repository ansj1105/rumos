"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { logoutAdmin } from "@/app/admin/actions";

const adminMenu = [
  {
    id: "site",
    label: "사이트 관리",
    children: [
      { href: "/asdasddfg/admin/home", label: "메인 설정", meta: "Hero / Story / SEO" },
      { href: "/asdasddfg/admin/applications", label: "Applications", meta: "소개 / 정렬 / 노출" },
      { href: "/asdasddfg/admin/products", label: "Products", meta: "목록 / 상세 / SEO" },
      { href: "/asdasddfg/admin/resources", label: "자료실", meta: "CRUD / 순번 / 파일 링크" },
    ],
  },
  {
    id: "support",
    label: "고객 대응",
    children: [
      { href: "/asdasddfg/admin/inquiries", label: "문의 관리", meta: "수신함 / 상태 / 답변 메일" },
    ],
  },
  {
    id: "settings",
    label: "설정",
    children: [
      { href: "/asdasddfg/admin/settings", label: "설정", meta: "비밀번호 / 접속 기록" },
    ],
  },
];

export function AdminShell({
  children,
  title,
  description,
  lastLoginAt,
  pendingInquiries,
  todayVisitors,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  lastLoginAt?: Date | null;
  pendingInquiries?: number;
  todayVisitors?: number;
}) {
  const pathname = usePathname();
  const currentRoute = pathname?.replace("/asdasddfg/admin/", "") || "home";
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("lumos-admin-theme");
    const savedCollapsed = window.localStorage.getItem("lumos-admin-collapsed");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    if (savedCollapsed === "true") {
      setCollapsed(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lumos-admin-theme", theme);
    window.localStorage.setItem("lumos-admin-collapsed", String(collapsed));
  }, [theme, collapsed]);

  return (
    <div className="lumosAdminLayout" data-theme={theme} data-collapsed={collapsed}>
      <aside className="lumosAdminSidebar">
        <div className="lumosAdminSidebarHead">
          <div>
            <strong>Lumos Admin</strong>
            {!collapsed ? <span>Content operations</span> : null}
          </div>
          <button
            type="button"
            className="lumosAdminIconButton"
            onClick={() => setCollapsed((value) => !value)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? ">" : "<"}
          </button>
        </div>

        <nav className="lumosAdminNav">
          {adminMenu.map((group) => {
            return (
              <div key={group.id} className="lumosAdminNavGroup">
                {!collapsed ? <div className="lumosAdminNavGroupLabel">{group.label}</div> : null}
                <div className="lumosAdminNavGroupItems">
                  {group.children.map((item) => {
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`lumosAdminNavItem ${active ? "isActive" : ""}`}
                        title={item.label}
                      >
                        <div className="lumosAdminNavIcon" aria-hidden="true">
                          ■
                        </div>
                        <div className="lumosAdminNavText">
                          <div className="lumosAdminNavLabel">{item.label}</div>
                          {!collapsed ? <div className="lumosAdminNavMeta">{item.meta}</div> : null}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      <div className="lumosAdminMain">
        <header className="lumosAdminHeader">
          <button
            type="button"
            className="lumosAdminMenuToggle"
            onClick={() => setCollapsed((value) => !value)}
            aria-label="Toggle sidebar"
          >
            ≡
          </button>
          <div className="lumosAdminHeaderTitle">
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
          </div>
          <div className="lumosAdminHeaderStats">
            <div className="lumosAdminStatItem">
              <span>Last Login</span>
              <strong>{lastLoginAt ? lastLoginAt.toLocaleString("ko-KR") : "-"}</strong>
            </div>
            <div className="lumosAdminStatItem">
              <span>Today Visitors</span>
              <strong>{todayVisitors ?? 0}</strong>
            </div>
            <div className="lumosAdminStatItem">
              <span>Alerts</span>
              <strong>{pendingInquiries ?? 0}</strong>
            </div>
            <div className="lumosAdminStatItem">
              <span>Theme</span>
              <strong>{theme === "dark" ? "Dark" : "Light"}</strong>
            </div>
            <div className="lumosAdminStatItem">
              <span>Route</span>
              <strong>{currentRoute}</strong>
            </div>
          </div>
          <div className="lumosAdminHeaderActions">
            <div className="lumosAdminInquiryBadge" aria-hidden="true">
              {pendingInquiries ?? 0}
            </div>
            <Link href="/ko" className="lumosAdminGhostButton" target="_blank">
              사이트 보기
            </Link>
            <button
              type="button"
              className="lumosAdminGhostButton"
              onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link href="/asdasddfg/admin/settings" className="lumosAdminGhostButton">
              설정
            </Link>
            <form action={logoutAdmin}>
              <button type="submit" className="lumosAdminGhostButton">
                로그아웃
              </button>
            </form>
          </div>
        </header>
        <main className="lumosAdminContent">{children}</main>
      </div>
    </div>
  );
}
