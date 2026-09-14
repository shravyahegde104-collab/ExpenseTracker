import axios, { AxiosError } from "axios";

/**
 * All expense endpoints live under /api/expenses, so the client is scoped
 * there — every function in api/expenses.ts uses a path relative to this.
 *
 * In dev, Vite proxies "/api/*" to the backend (see vite.config.ts), so no
 * absolute URL or backend CORS configuration is needed.
 */
export const apiClient = axios.create({
  baseURL: "/api/expenses",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Normalizes backend errors into a single readable message, since the
 * backend's error shapes are inconsistent by endpoint:
 *  - Spring's default error controller returns JSON like
 *    { timestamp, status, error, message, path } for uncaught exceptions
 *    (e.g. PUT with an unknown id throws a RuntimeException -> 500).
 *  - Network failures / no response (backend not running) have no
 *    `response` at all.
 */
export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    if (!error.response) {
      return Promise.reject(
        new ApiError(
          "Can't reach the server. Check that the backend is running."
        )
      );
    }

    const { status, data } = error.response;
    const message =
      (typeof data === "object" && (data?.message || data?.error)) ||
      (typeof data === "string" && data) ||
      error.message ||
      "Something went wrong.";

    return Promise.reject(new ApiError(message, status));
  }
);
