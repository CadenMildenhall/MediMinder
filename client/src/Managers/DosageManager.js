

const apiUrl = "/api/dosage";

export const getDosages = () =>
{
    return fetch(apiUrl).then((res) => res.json());
}

