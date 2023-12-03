import React, { useEffect, useState } from "react";
import "../styles/Schedule.css";
import { getMedicines } from "../Managers/MedicineManager";
import { DatePicker, TimePicker } from "antd";
import "antd/lib/date-picker/style";
import { getDosages } from "../Managers/DosageManager";
import { getSchedule } from "../Managers/ScheduleManager";
import { useNavigate } from "react-router-dom";
import { createMedicineDosageAndSchedule } from "../Managers/ScheduleManager";
import { createMedicineDosage, getMedicineDosages } from "../Managers/MedicineDosageManager";

export const Schedule = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState("");
  const [dosageValue, setDosageValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [dosage, setDosage] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [time, setTime] = useState(null);
  const [days, setDays] = useState([]);
  const [medicineDosages, setMedicineDosage] = useState([]);

  const [scheduleEntries, setScheduleEntries] = useState([])

  const navigate = useNavigate();

  useEffect(() => {

    getSchedule().then((scheduleData) => {
      setDays(scheduleData); // fetches the schedule data and assigns it to the variable "days"
    });

    getMedicines().then((medicines) => {
      setMedicines(medicines); // fetches the medicine data and assigns it to the variable "medicine"
    });

    getDosages().then((dosageData) => {
      setDosage(dosageData); // fetches the dosage data and assigns it to the variable "dosage"
    });

    getMedicineDosages().then((medicineDosages) => {
      setMedicineDosage(medicineDosages);
    })

  }
    , []);

    const handleSubmit = async () => {
      // Find selected objects based on user input
      const selectedDay = days.find((day) => day.day === selectValue);
      const selectedMedicine = medicines.find((medicine) => medicine.medicineName === inputValue);
      const selectedDosage = dosage.find((d) => d.amount === parseInt(dosageValue));
    
      console.log(selectedDay);
      console.log(selectedMedicine);
      console.log(selectedDosage);
    
      if (selectedDay && selectedMedicine && selectedDosage && time) {
        try {
          // Create a new MedicineDosage with the associated ScheduleId
          const createdMedicineDosage = await createMedicineDosage(
            selectedMedicine.id,
            selectedDosage.id,
            time,
            selectedDay.scheduleId  // Assuming scheduleId is available in the selectedDay object
          );
    
          console.log("createdMedDose:", createdMedicineDosage);
    
          // Create a new Schedule entry with the MedicineDosage association
          const data = await createMedicineDosageAndSchedule(
            selectedMedicine.id,
            selectedDosage.id,
            selectValue,
            time,
            createdMedicineDosage.scheduleId  // Use the scheduleId from the createdMedicineDosage
          ).catch((error) => console.error("Error in createMedicineDosageAndSchedule:", error));
    
          console.log("Response from createMedicineDosageAndSchedule:", data);
    
          // Update local state with the new schedule entry
          setScheduleEntries([...scheduleEntries, data]);
          console.log("schedule entry:", scheduleEntries);
    
          // Clear form fields and update state
          setSelectValue("");
          setInputValue("");
          setDosageValue("");
          setTime(null);
    
          // Update the schedule divs
          const updatedSchedule = days.map((day) => ({
            day: day.day,
            entries: scheduleEntries
              .filter((entry) => entry.day === day.day)
              .map((entry) => (
                <h6 key={entry.id}>
                  {entry.medicine} - {entry.dosage} mg - {entry.time}
                </h6>
              )),
          }));
    
          setUpdatedSchedule(updatedSchedule);
        } catch (error) {
          console.error("Error handling submit:", error);
          console.error("Error details:", error);
        }
      }
    };
    

  const handleComplete = (e) => {
    onComplete = true;
    navigate("/newschedule");
  }

  return (
    <><div className="buttons">
      <>
        <div className="scheduleArea">
          {updatedSchedule.map((day) => (
            <div key={day.day} className={day.day}>
              {day.entries}
            </div>
          ))}
        </div>

      </>
    </div>

      <div className="inputs">

        <select
          className="dayInput"
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          {days
            .map((d) => (
              <option value={d.day}>{d.day}</option>
            ))}
        </select>

        <select
          className="medicineInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        >
          {medicines
            .map((m) => (
              <option value={m.medicineName}>{m.medicineName}</option>
            ))}
        </select>

        <DatePicker
          type="datetime-local"
          onChange={newTime => setTime(newTime)}
          value={time}
          className="timeInput" />

        <select
          className="medicineInput"
          value={dosageValue}
          onChange={(e) => setDosageValue(e.target.value)}
        >
          {dosage
            .map((d) => (
              <option value={d.amount}>{d.amount}</option>
            ))}
        </select>

        <button onClick={(e) => { handleSubmit(e.preventDefault()); }} className="submitS">
          Add
        </button>
        <button onClick={(e) => { handleComplete(e.preventDefault()); }} className="cSchedule">
          Complete
        </button>
      </div>
    </>
  );
};

