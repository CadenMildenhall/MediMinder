import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/NewSchedule.css";
import { getMedicines } from '../Managers/MedicineManager';
import { getDosages } from "../Managers/DosageManager";
import { getSchedule } from "../Managers/ScheduleManager";
import { deleteAllMedicineDosages, editMedicineDosage, getMedicineDosages } from "../Managers/MedicineDosageManager";
import { DatePicker } from "antd";
import moment from "moment";

export const NewSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [medicines, setMedicines] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const [medicineDosages, setMedicineDosage] = useState([]);

  const [editedMedicine, setEditedMedicine] = useState({ medicineName: '', dosage: '', time: '', id: null });
  const [schedule, setSchedule] = useState([]);
  const [dosage, setDosage] = useState([]);

  const selectedDay = schedule.find((day) => day.day);


  const handleEdit = () => {
    // Check if editedMedicine is null or its properties are undefined before attempting to edit
    if (!editedMedicine || !editedMedicine.medicineName || !editedMedicine.dosage || !editedMedicine.time) {
      console.error("Invalid or incomplete edited medicine dosage data.");
      return;
    }
  
    // Convert DatePicker object to string
    const formattedDate = moment(editedMedicine.time).format("YYYY-MM-DDTHH:mm:ss");
  
    // Create a new object with the formatted date
    const editedData = {
      medicine: editedMedicine.medicineName,
      dosage: editedMedicine.dosage,
      time: formattedDate,
    };
  
    console.log("Sending edited data to API:", editedData);
  
    // Rest of the function...
    editMedicineDosage(editedMedicine.id, editedData)
      .then((editedMedicineDosage) => {
        console.log("API response:", editedMedicineDosage);
        console.log("Edited medicine dosage:", editedMedicineDosage);
        // Additional logic after successful editing, if needed
      })
      .catch((error) => {
        console.error("Error editing medicine dosage:", error);
        // Handle error as needed
      });
  };
  
  

  const handleNewScheduleClick = () => {
    navigate('/schedule');
  };

  const handleDeleteAll = () => {
    setIsDeleting(true);

    deleteAllMedicineDosages()
      .then(() => {
        // Fetch updated schedule data after deletion
        return getSchedule();
      })
      .then((scheduleData) => {
        setMedicineDosage(scheduleData);
        console.log("All medicine dosages deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting all medicine dosages:", error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const getFormData = () => {
    return {
      medicine: editedMedicine.medicineName || '',
      time: editedMedicine.time || '',
      dosage: editedMedicine.dosage || '',
    };
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = getFormData();

    // Assuming handleEdit expects formData
    handleEdit(formData);
  };

  useEffect(() => {
    getSchedule().then((scheduleData) => {
      setSchedule(scheduleData);
    });

    getMedicines().then((medicines) => {
      setMedicines(medicines);
    });

    getDosages().then((dosageData) => {
      setDosage(dosageData);
    });

    getMedicineDosages().then((medicineDosages) => {
      setMedicineDosage(medicineDosages);
    });
  }, []);

  const cancelEdit = () => {
    setEditedMedicine(null); // or setEditedMedicine({});
  };
  
  return (
    <>
      {!medicineDosages.length && (
        <div className="button">
          <button onClick={handleNewScheduleClick} className="newSchedule">
            New
          </button>
          <h6 className="noS">* no schedule made *</h6>
        </div>
      )}

      {medicineDosages.length > 0 && (
        <div className="scheduleArea">
          {schedule.map((day) => (
            <div key={day.id} className={day.day}>
              {medicineDosages
                .filter((entry) => entry.scheduleId === day.id)
                .map((entry) => (
                  <div key={entry.id} className="medicineEntry">
                    <h6>
                      {entry.medicineName} - {entry.amount} mg - {entry.time}
                    </h6>
                    <button onClick={() => setEditedMedicine({ ...entry, id: entry.id })} className="edit">
                      Edit
                    </button>

                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      {editedMedicine && (
        <div className="edit-form">
          <form onSubmit={handleFormSubmit}>
            <label className="labelEdit">
              <h4 className="hEdit">Medicine Name: </h4>
              <select
                className="medicineInput"
                value={editedMedicine?.medicineName || ''}
                onChange={(e) => setEditedMedicine({ ...editedMedicine, medicineName: e.target.value })}
              >
                {medicines.map((m) => (
                  <option value={m.medicineName} key={m.id}>
                    {m.medicineName}
                  </option>
                ))}
              </select>
            </label>
            <label className="tLabel">
              <h4 className="tEdit">Time: </h4>
              <DatePicker
                className="iEdit"
                type="time"
                selected={editedMedicine?.time ? new Date(editedMedicine.time) : null}
                onChange={(date) => setEditedMedicine({ ...editedMedicine, time: date })}
              />
            </label>

            <label className="tLabel">
              <h4 className="tEdit">Dosage: </h4>
              <select
                className="dosageInput"
                value={editedMedicine?.dosage || ''}
                onChange={(e) => setEditedMedicine({ ...editedMedicine, dosage: e.target.value })}
              >
                {dosage.map((d) => (
                  <option value={d.amount} key={d.id}>
                    {d.amount}
                  </option>
                ))}
              </select>
            </label>

            <div className="btn">
              <button className="subButton" type="submit">
                Save
              </button>
            </div>
          </form>
          <div className="btnTwo">
            <button className="cancelButton" type="button" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {medicineDosages.length > 0 && (
        <div className="btns">
          {!isDeleting && (
            <button onClick={() => handleDeleteAll()} className="delete">
              delete
            </button>
          )}
        </div>
      )}
    </>
  );
};
