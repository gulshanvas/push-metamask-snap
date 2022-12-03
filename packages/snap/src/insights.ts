/* eslint-disable jsdoc/match-description */
/* eslint-disable jsdoc/require-param-description */
export const fetchUrl = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Unable to fetch url": ${response.status} ${response.statusText}.`,
    );
  }

  const res = (await response.json()) as T;

  return res;
};
