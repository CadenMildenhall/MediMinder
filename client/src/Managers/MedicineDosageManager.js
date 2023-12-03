// Function to create MedicineDosage
export const createMedicineDosage = (medicineId, dosageId, time, scheduleId) => {
    const data = {
      MedicineId: medicineId,
      DosageId: dosageId,
      Time: time.format("HH:mm"),
      ScheduleId: scheduleId,
    };
  
    console.log(data);
  
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
  