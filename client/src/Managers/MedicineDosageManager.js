// MedicineDosageManager.js
import moment from "moment";

const mDapiUrl = "/api/medicinedosage";

export const getMedicineDosages = () => {
  return fetch(mDapiUrl).then((res) => res.json());
}

// MedicineDosageManager.js

export const createMedicineDosage = (time, scheduleId, medicineName, dosageAmount) => {
  const data = {
    Time: moment(time).format("YYYY-MM-DDTHH:mm:ss"),
    ScheduleId: scheduleId,
    Medicine: { MedicineName: medicineName },
    Dosage: { Amount: dosageAmount },
  };

  console.log("Request data:", data);

  return fetch(mDapiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log("Response status:", res.status);
      if (!res.ok) {
        throw new Error(`Failed to create medicine dosage. HTTP status: ${res.status} (${res.statusText})`);
      }
      return res.json();
    })
    .then((createdMedicineDosage) => {
      console.log("Created medicine dosage:", createdMedicineDosage);
      return createdMedicineDosage;
    })
    .catch((error) => {
      console.error("Error creating medicine dosage:", error);
      throw error;
    });
};

  export const deleteAllMedicineDosages = () => {
    return fetch(`${mDapiUrl}/deleteAll`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log("Delete all response status:", res.status);
        if (!res.ok) {
          throw new Error(
            `Failed to delete all medicine dosages. HTTP status: ${res.status} (${res.statusText})`
          );
        }
        // Returning a resolved promise to indicate success
        return Promise.resolve();
      })
      .catch((error) => {
        console.error("Error deleting all medicine dosages:", error);
        throw error;
      });
  };
  
  export const editMedicineDosage = (id, editedData) => {
    if (!editedData) {
      console.error("Edited data is undefined.");
      return Promise.reject(new Error("Edited data is undefined."));
    }
  
    const data = {
      Time: moment(editedData.time).format("YYYY-MM-DDTHH:mm:ss"),
      Medicine: { MedicineName: editedData.medicine },
      Dosage: { Amount: editedData.dosage },
    };
  
    return fetch(`${mDapiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("Edit response status:", res.status);
        if (!res.ok) {
          throw new Error(
            `Failed to edit medicine dosage. HTTP status: ${res.status} (${res.statusText})`
          );
        }
        return res.json();
      })
      .then((editedMedicineDosage) => {
        console.log("Edited medicine dosage:", editedMedicineDosage);
        return editedMedicineDosage;
      })
      .catch((error) => {
        console.error("Error editing medicine dosage:", error);
        throw error;
      });
  };
  