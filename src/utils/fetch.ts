export async function fetchWrapper<T = unknown>(
  input: string,
  init?: RequestInit
) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${input}`, init);
  const result = await data.json();

  return result as Promise<T>;
}
