// Import necessary functions and constants
import { createMedicineDosage as createMedicineDosageForSchedule } from "./MedicineDosageManager";

// API URLs
const sApiUrl = "/api/schedule";
const mDapiUrl = "/api/medicinedosage";

// Function to get schedule
export const getSchedule = () => {
  return fetch(sApiUrl).then((res) => res.json());
};

// Function to create MedicineDosage and Schedule
export const createMedicineDosageAndSchedule = async (medicineId, dosageId, selectValue) => {
  try {
    // Create MedicineDosage
    const createdMedicineDosage = await createMedicineDosageForSchedule(medicineId, dosageId);

    // Create Schedule data object
    const scheduleData = {
      medicineId: createdMedicineDosage.medicineId,
      dosageId: createdMedicineDosage.dosageId,
      day: selectValue,
    //   time: time.format("HH:mm"),
    } ;

    console.log(scheduleData);

    // Fetch request to create Schedule
    const scheduleResponse = await fetch(sApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduleData),
    });

    if (!scheduleResponse.ok) {
      throw new Error(`Schedule creation failed. HTTP error! Status: ${scheduleResponse.status}`);
    }

    // Parse and return the JSON response for Schedule
    return scheduleResponse.json();
  } catch (error) {
    console.error("Error creating medicine dosage and schedule:", error);
    throw error;
  }
};

// Function to get MedicineDosages
export const getMedicineDosages = () => {
  return fetch(mDapiUrl).then((res) => res.json());
};

// Function to create MedicineDosage
export const createMedicineDosage = (medicineId, dosageId) => {
  const data = {
    MedicineId: medicineId,
    DosageId: dosageId,
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









