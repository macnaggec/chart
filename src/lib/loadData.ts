import type { ApiResponseData } from '../types';

const BASE_URL = import.meta.env.BASE_URL;

export default async function loadData(): Promise<ApiResponseData> {
  const response = await fetch(`${BASE_URL}data.json`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
