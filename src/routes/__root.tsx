import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import TargetCursor from "@/components/ui/TargetCursor";

const primaryBtn =
  "press inline-flex h-10 items-center justify-center rounded-control bg-fg px-4 text-[14px] font-medium text-bg transition-[transform,opacity] duration-150 hover:opacity-90";
const secondaryBtn =
  "press inline-flex h-10 items-center justify-center rounded-control border border-line-strong px-4 text-[14px] font-medium text-fg transition-[transform,background-color] duration-150 hover:bg-raised";

function StatusShell({ code, children }: { code: string; children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 py-12 text-fg">
      <div className="w-full max-w-md">
        <p className="font-mono text-[13px] text-fg-subtle">{code}</p>
        {children}
      </div>
    </main>
  );
}

function NotFoundComponent() {
  return (
    <StatusShell code="404">
      <h1 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.03em]">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-3 text-fg-muted">The link may be broken or the page may have moved.</p>
      <div className="mt-8">
        <Link to="/" className={primaryBtn}>
          Back to home
        </Link>
      </div>
    </StatusShell>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const errorMessage = error instanceof Error ? error.message : "Unexpected error";

  return (
    <StatusShell code="500">
      <h1 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.03em]">
        Something went wrong.
      </h1>
      <p className="mt-3 text-fg-muted">The page hit an error while loading. Try again.</p>
      <pre className="panel mt-6 overflow-x-auto p-3 font-mono text-[12px] text-fg-muted">
        {errorMessage}
      </pre>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className={primaryBtn}
        >
          Try again
        </button>
        <a href="/" className={secondaryBtn}>
          Back to home
        </a>
      </div>
    </StatusShell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "author", content: "Sary Danish" },
      { title: "Sary Danish — Junior Web Developer | Phnom Penh, Cambodia" },
      {
        name: "description",
        content:
          "Portfolio of Sary Danish, fourth-year Software Development student at Norton University in Phnom Penh, Cambodia. Building real web applications with React, Laravel, and PostgreSQL.",
      },
      {
        property: "og:title",
        content: "Sary Danish — Junior Web Developer | Phnom Penh, Cambodia",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Sary Danish, fourth-year Software Development student at Norton University in Phnom Penh, Cambodia. Building real web applications with React, Laravel, and PostgreSQL.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Sary Danish — Junior Web Developer | Phnom Penh, Cambodia",
      },
      {
        name: "twitter:description",
        content:
          "Portfolio of Sary Danish, fourth-year Software Development student at Norton University in Phnom Penh, Cambodia. Building real web applications with React, Laravel, and PostgreSQL.",
      },
      { name: "theme-color", content: "#FBFBFA", media: "(prefers-color-scheme: light)" },
      { name: "theme-color", content: "#0A0A0B", media: "(prefers-color-scheme: dark)" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Kantumruy+Pro:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('theme')!=='light'){d.classList.add('dark');}}catch(e){d.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet />
      <ChatbotWidget /> breaks all child routes. */}
      <Outlet />
      <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn targetSelector=".cursor-target, a, button, [role='button'], input, select, textarea" />
    </QueryClientProvider>
  );
}
