interface FetchOptions {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, any> | null;
}

export const fetchAPI = async ({ url, method = "GET", headers = {}, body = null }: FetchOptions) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.error || "Unknown error" };
    }
  } catch (error) {
    console.error("API request failed:", error);
    return { success: false, error: "Internal server error" };
  }
};
