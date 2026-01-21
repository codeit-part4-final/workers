import { BASE_URL, TEAM_ID } from './config';

export function fetchApi(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}/${TEAM_ID}${path}`;

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}
