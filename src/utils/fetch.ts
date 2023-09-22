export async function fetchWrapper<T = unknown>(
  input: string,
  init?: RequestInit
) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api${input}`,
    init
  );
  const result = await data.json();

  if ((data.status !== 200) && (data.status !== 201) && (data.status !== 204) ) {
    throw result;
  }
  return result as Promise<T>;
}
