const mDapiUrl = "/api/medicinedosage";

export const getMedicineDosages = () =>
{
    return fetch(mDapiUrl).then((res) => res.json());
}

// MedicineDosageManager.js

export const createMedicineDosage = (medicineId, dosageId, time) => {
    const data = {
      MedicineId: medicineId,
      DosageId: dosageId,
      time: time.format("HH:mm"),
    };
    
    console.log("medDoseData:", data)
  
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
        console.log("After res.json() - createMedicineDosage");
        // You can return the createdMedicineDosage if needed
        return createdMedicineDosage;
      })
      .catch((error) => {
        console.error("Error creating medicine dosage:", error);
        throw error;
      });
  };
  