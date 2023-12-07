
const sApiUrl = "/api/schedule";

export const getSchedule = () => {
  return fetch(sApiUrl).then((res) => res.json());
};


  