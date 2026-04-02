"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { logoutAdmin } from "@/app/admin/actions";

type AdminMenuChild = {
  href: string;
  label: string;
  meta: string;
  icon: "home" | "apps" | "box" | "docs" | "mail" | "settings";
};

type AdminMenuGroup = {
  id: string;
  label: string;
  children: AdminMenuChild[];
};

const adminMenu: AdminMenuGroup[] = [
  {
    id: "site",
    label: "사이트 관리",
    children: [
      { href: "/asdasddfg/admin/home", label: "메인 설정", meta: "Hero / Story / SEO", icon: "home" },
      { href: "/asdasddfg/admin/applications", label: "Applications", meta: "소개 / 정렬 / 노출", icon: "apps" },
      { href: "/asdasddfg/admin/products", label: "Products", meta: "목록 / 상세 / SEO", icon: "box" },
      { href: "/asdasddfg/admin/resources", label: "자료실", meta: "CRUD / 순번 / 파일 링크", icon: "docs" },
    ],
  },
  {
    id: "support",
    label: "고객 대응",
    children: [
      { href: "/asdasddfg/admin/inquiries", label: "문의 관리", meta: "수신함 / 상태 / 답변 메일", icon: "mail" },
    ],
  },
  {
    id: "settings",
    label: "설정",
    children: [
      { href: "/asdasddfg/admin/settings", label: "설정", meta: "비밀번호 / 접속 기록", icon: "settings" },
    ],
  },
];

function AdminNavIcon({ type }: { type: AdminMenuChild["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "apps":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "box":
      return (
        <svg {...common}>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M12 12 20 7.5" />
          <path d="M12 12 4 7.5" />
          <path d="M12 12v9" />
        </svg>
      );
    case "docs":
      return (
        <svg {...common}>
          <path d="M7 3.5h7l4 4V20H7z" />
          <path d="M14 3.5V8h4" />
          <path d="M9.5 12h5" />
          <path d="M9.5 16h5" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="m5 7 7 5 7-5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19 12a7 7 0 0 0-.08-1l2.02-1.57-2-3.46-2.45.82a7 7 0 0 0-1.73-1l-.37-2.55h-4l-.37 2.55a7 7 0 0 0-1.73 1l-2.45-.82-2 3.46L5.08 11A7 7 0 0 0 5 12c0 .34.03.67.08 1l-2.02 1.57 2 3.46 2.45-.82c.53.42 1.11.76 1.73 1l.37 2.55h4l.37-2.55c.62-.24 1.2-.58 1.73-1l2.45.82 2-3.46L18.92 13c.05-.33.08-.66.08-1Z" />
        </svg>
      );
  }
}

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
  const currentGroup =
    adminMenu.find((group) => group.children.some((item) => item.href === pathname)) ?? adminMenu[0];
  const currentPage =
    currentGroup.children.find((item) => item.href === pathname) ?? currentGroup.children[0];
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
                          <AdminNavIcon type={item.icon} />
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
            <h1>{currentPage.label}</h1>
            <p>{currentPage.meta}</p>
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
        <main className="lumosAdminContent">
          <section className="lumosAdminPageIntro">
            <div className="lumosAdminBreadcrumb">
              <span>Lumos Admin</span>
              <span>/</span>
              <span>{currentGroup.label}</span>
              <span>/</span>
              <strong>{currentPage.label}</strong>
            </div>
            <div className="lumosAdminPageSummary">
              <div className="lumosAdminPageIcon" aria-hidden="true">
                <AdminNavIcon type={currentPage.icon} />
              </div>
              <div className="lumosAdminPageCopy">
                <span className="lumosAdminPageEyebrow">{currentGroup.label}</span>
                <h2>{currentPage.label}</h2>
                <p>{description || title}</p>
              </div>
              <div className="lumosAdminPageTags">
                {currentPage.meta.split("/").map((item) => (
                  <span key={item.trim()}>{item.trim()}</span>
                ))}
              </div>
            </div>
          </section>
          {children}
        </main>
      </div>
    </div>
  );
}
