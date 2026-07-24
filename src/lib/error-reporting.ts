type ErrorSeverity = "error" | "warning" | "info";

type ClientErrorPayload = {
  message: string;
  stack?: string;
  route: string;
  severity: ErrorSeverity;
  context: Record<string, unknown>;
};

declare global {
  interface Window {
    __appReportRuntimeError?: (payload: ClientErrorPayload) => void;
  }
}

export function reportClientError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const payload: ClientErrorPayload = {
    message:
      error instanceof Response
        ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
        : error instanceof Error
          ? error.message
          : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    route: window.location.pathname,
    severity: "error",
    context: {
      source: "react_error_boundary",
      ...context,
    },
  };

  // Optional hook for any external runtime collector.
  window.__appReportRuntimeError?.(payload);
}
