import { createMedicineDosage } from "./MedicineDosageManager";
const sApiUrl = "/api/schedule";


export const getSchedule = () =>
{
    return fetch(sApiUrl).then((res) => res.json());
}

export const createMedicineDosageAndSchedule = async (medicineId, dosageId, selectValue, time) => {
    try {
        // Await the completion of createMedicineDosage
        await createMedicineDosage(medicineId, dosageId);

        const formattedTime = time.format("HH:mm");
        console.log("Formatted Time:", formattedTime);

        // Create the data object to be sent in the request
        const requestData = {
            MedicineId: medicineId,
            DosageId: dosageId,
        };

        // Await the completion of the fetch request
        const response = await fetch(sApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            const responseText = await response.text();
            console.error(responseText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse and return the JSON response
        return response.json();
    } catch (error) {
        console.error("Error creating medicine dosage and schedule:", error);
        throw error;
    }
};









