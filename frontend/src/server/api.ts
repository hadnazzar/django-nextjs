import { env } from "src/env.mjs";

type FetchOptions = {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
};

class Fetch {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;

  constructor(options: FetchOptions) {
    this.baseURL = this.getBaseURL() ?? options.baseURL ?? "";
    this.timeout = options.timeout ?? 5000;
    this.headers = options.headers ?? {};

    if (this.baseURL === "") {
      throw new Error("No API URL found");
    }
  }

  getBaseURL(): string {
    // Check if it's a client-side or server-side request
    const isClientSide = typeof window !== "undefined" || process.browser;

    // Adjust the baseURL based on where the request originates
    if (isClientSide) {
      return env.NEXT_PUBLIC_API_URL;
    } else {
      return env.API_URL_INTERNAL ?? env.NEXT_PUBLIC_API_URL;
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await this._fetch(endpoint, "GET", options);
    return response.json();
  }

  async query<T>(
    endpoint: string,
    query: Record<string, string | undefined>,
    options?: RequestInit
  ): Promise<T> {
    const url = new URL(endpoint, this.baseURL);

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value);
      }
    });

    const response = await this._fetch(
      url.pathname + url.search,
      "GET",
      options
    );
    return response.json();
  }

  async post<T>(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options?: RequestInit
  ): Promise<T> {
    const response = await this._fetch(endpoint, "POST", {
      ...options,
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async put<T>(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options?: RequestInit
  ): Promise<T> {
    const response = await this._fetch(endpoint, "PUT", {
      ...options,
      body: JSON.stringify(body),
    });
    return response.json();
  }

  private async _fetch(
    endpoint: string,
    method: string,
    options?: RequestInit
  ): Promise<Response> {
    this.baseURL = this.getBaseURL();

    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      method,
      headers: this.headers,
      ...options,
    };

    const controller = new AbortController();
    const { signal } = controller;
    config.signal = signal;

    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network request failed");
      }
      return response;
    } catch (err) {
      const error = err as Error;
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    }
  }
}

const api = new Fetch({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

export default api;
