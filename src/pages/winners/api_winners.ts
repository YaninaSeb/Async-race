import { baseUrl } from '../garage/api_garage';

const winners = `${baseUrl}/winners`;
export let countAllWinners = 0;

export const getAllWinnersAPI = async () => {
  const response = await fetch(`${winners}`, { method: 'GET' });
  return response.json();
};

export const getWinnersAPI = async (page: number, limit = 10) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}`, { method: 'GET' });
  countAllWinners = Number(response.headers.get('X-Total-count'));
  return response.json();
};

export const getWinnerAPI = async (id: number) => (await fetch(`${winners}/${id}`, { method: 'GET' })).json();

export const createWinnerAPI = async (body: object) => {
  await fetch(winners, {
  method: 'POST',
    body: JSON.stringify(body),
    headers: {
    'Content-Type': 'application/json'
    },
  });
};

export const deleteWinnerAPI = async (id: number) => {
  await fetch(`${winners}/${id}`, {
    method: 'DELETE'
  });
};

export const updateWinnerAPI = async (body: object, id: number) => {
  await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};
