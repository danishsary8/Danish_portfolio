import { useEffect, useCallback, useRef } from "react";

export interface UrlInspectionState {
  project?: string;
  tab?: string;
  adr?: string;
  topology?: string;
  query?: string;
  infra?: string;
  perf?: string;
}

export function useUrlState(
  handlers: {
    onOpenProjectInspector?: (projectId: string, tab?: string) => void;
    onOpenAdr?: (adrId: string) => void;
    onOpenTopology?: (blueprint: string) => void;
    onOpenQueryPlan?: (benchmarkId: string) => void;
    onOpenInfra?: (profileId: string) => void;
    onOpenPerf?: (tab?: string) => void;
  } = {},
) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  // 1. Parse initial URL params on mount & trigger handlers
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const projectParam = searchParams.get("project");
      const tabParam = searchParams.get("tab") || undefined;
      const adrParam = searchParams.get("adr");
      const topologyParam = searchParams.get("topology");
      const queryParam = searchParams.get("query");
      const infraParam = searchParams.get("infra");
      const perfParam = searchParams.get("perf");

      if (perfParam && handlersRef.current.onOpenPerf) {
        handlersRef.current.onOpenPerf(perfParam);
      } else if (infraParam && handlersRef.current.onOpenInfra) {
        handlersRef.current.onOpenInfra(infraParam);
      } else if (queryParam && handlersRef.current.onOpenQueryPlan) {
        handlersRef.current.onOpenQueryPlan(queryParam);
      } else if (adrParam && handlersRef.current.onOpenAdr) {
        // Normalise e.g. "ADR-001" or "adr-001"
        const cleanAdr = adrParam.toLowerCase().startsWith("adr-")
          ? adrParam.toLowerCase()
          : `adr-${adrParam.toLowerCase().replace("adr", "").replace("-", "")}`;
        handlersRef.current.onOpenAdr(cleanAdr);
      } else if (topologyParam && handlersRef.current.onOpenTopology) {
        handlersRef.current.onOpenTopology(topologyParam);
      } else if (projectParam && handlersRef.current.onOpenProjectInspector) {
        handlersRef.current.onOpenProjectInspector(projectParam, tabParam);
      }
    } catch {
      // Safe fallback for restricted environments
    }
  }, []);

  // 2. Set or clear modal URL parameter without full-page reloads
  const setUrlParam = useCallback((param: string, value: string | null) => {
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      if (value) {
        url.searchParams.set(param, value);
      } else {
        url.searchParams.delete(param);
      }
      window.history.replaceState({}, "", url.toString());
    } catch {
      // Safe fallback
    }
  }, []);

  // 3. One-click deep link generator
  const getDeepLink = useCallback(
    (param: string, value: string, extraParam?: string, extraValue?: string) => {
      if (typeof window === "undefined") return "";
      try {
        const url = new URL(window.location.href);
        // Clean other modal params to maintain deterministic deep link
        ["project", "tab", "adr", "topology", "query", "infra", "perf"].forEach((k) =>
          url.searchParams.delete(k),
        );
        url.searchParams.set(param, value);
        if (extraParam && extraValue) {
          url.searchParams.set(extraParam, extraValue);
        }
        return url.toString();
      } catch {
        return "";
      }
    },
    [],
  );

  return { setUrlParam, getDeepLink };
}
