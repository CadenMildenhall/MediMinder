

const apiUrl = "/api/medicine";

export const getMedicines = () =>
{
    return fetch(apiUrl).then((res) => res.json());
}

export const addMedicine = (medicine) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicine),
    }).then((res) => res.json());
  };
  