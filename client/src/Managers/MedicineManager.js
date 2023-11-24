

const apiUrl = "/api/medicine";

export const getMedicines = () =>
{
    return fetch(apiUrl).then((res) => res.json());
}

  
  