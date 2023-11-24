const mDapiUrl = "/api/medicinedosage";

export const getMedicineDosages = () =>
{
    return fetch(mDapiUrl).then((res) => res.json());
}

export const createMedicineDosage = (medicineId, dosageId) => {
    const data = {
        MedicineId: medicineId,
        DosageId: dosageId,
    };

    return fetch(mDapiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((createdMedicineDosage) => {
        // You can return the createdMedicineDosage if needed
        return createdMedicineDosage;
    })
    .catch((error) => {
        console.error("Error creating medicine dosage:", error);
        throw error;
    });
};




    