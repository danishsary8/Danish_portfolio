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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base px-6 py-12 text-primaryText selection:bg-gold selection:text-primaryText">
      <div className="w-full max-w-xl rounded-brand border border-subtle bg-card p-8 md:p-12 shadow-none">
        <span className="mb-4 block font-mono text-xs font-semibold tracking-wider text-gold">
          [HTTP 404 // ROUTE_NOT_FOUND]
        </span>
        <h1 className="mb-4 font-display text-2xl font-extrabold uppercase leading-tight tracking-editorial text-primaryText sm:text-3xl md:text-4xl">
          Requested endpoint does not exist in this ledger.
        </h1>
        <p className="mb-8 font-body text-sm leading-relaxed text-muted md:text-base">
          The route target you requested cannot be resolved within Sary Danish's application
          architecture. Please verify the destination or return to the primary engineering ledger.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-brand bg-primaryText px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-base transition-colors duration-150 hover:bg-gold hover:text-primaryText focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus shadow-none"
          >
            Return to Ledger
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const errorMessage = error instanceof Error ? error.message : "Unexpected runtime fault";

  return (
    <div className="flex min-h-screen items-center justify-center bg-base px-6 py-12 text-primaryText selection:bg-gold selection:text-primaryText">
      <div className="w-full max-w-xl rounded-brand border border-subtle bg-card p-8 md:p-12 shadow-none">
        <span className="mb-4 block font-mono text-xs font-semibold tracking-wider text-gold">
          [HTTP 500 // RUNTIME_EXCEPTION]
        </span>
        <h1 className="mb-4 font-display text-2xl font-extrabold uppercase leading-tight tracking-editorial text-primaryText sm:text-3xl md:text-4xl">
          System execution exception captured.
        </h1>
        <p className="mb-4 font-body text-sm leading-relaxed text-muted md:text-base">
          An unhandled error occurred during component rendering. The failure details have been
          logged to the telemetry boundary.
        </p>
        <div className="mb-8 rounded-brand border border-subtle bg-surface p-3 font-mono text-xs text-muted">
          {errorMessage}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-brand bg-primaryText px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-base transition-colors duration-150 hover:bg-gold hover:text-primaryText focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus shadow-none cursor-pointer"
          >
            Retry Execution
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-brand border border-subtle bg-surface px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-primaryText transition-colors duration-150 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus shadow-none"
          >
            Return to Index
          </a>
        </div>
      </div>
    </div>
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
      { name: "theme-color", content: "#F0EEE9", media: "(prefers-color-scheme: light)" },
      { name: "theme-color", content: "#0A0A0C", media: "(prefers-color-scheme: dark)" },
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
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Kantumruy+Pro:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@700;800&display=swap",
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
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
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
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
