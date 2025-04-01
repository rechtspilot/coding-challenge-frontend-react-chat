export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout: number = 3000
) => {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, { ...options, signal });

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};
