export const baseUrl = 'http://127.0.0.1:3000';

const garage = `${baseUrl}/garage`;
const motor = `${baseUrl}/engine`;

        //CAR

export let countAllCars = 0;

export const getCarsAPI = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`, { method: 'GET' });
  countAllCars = Number(response.headers.get('X-Total-count'));

  return response.json();
};

export const getCarAPI = async (id: number) => (await fetch(`${garage}/${id}`, { method: 'GET' })).json();

export const createCarAPI = async (body: object) => {
  await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export const deleteCarAPI = async (id: number) => {
  await fetch(`${garage}/${id}`, {
    method: 'DELETE'
  });
};

export const updateCarAPI = async (body: object, id: number) => {
  await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};


        //MOTOR

export const startMotorAPI = async (id: number) => (await fetch(`${motor}?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopMotorAPI = async (id: number) => (await fetch(`${motor}?id=${id}&status=stopped`, { method: 'PATCH' })).json();

export const driveMotorAPI = async (id: number) => {
  const res = await fetch(`${motor}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};
