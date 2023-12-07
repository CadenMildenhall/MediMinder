import React, { useEffect, useState } from "react";
import "../styles/Schedule.css";
import { getMedicines } from "../Managers/MedicineManager";
import { DatePicker, TimePicker } from "antd";
import "antd/lib/date-picker/style";
import { getDosages } from "../Managers/DosageManager";
import { getSchedule } from "../Managers/ScheduleManager";
import { useNavigate } from "react-router-dom";
import { createMedicineDosage, getMedicineDosages } from "../Managers/MedicineDosageManager";

export const Schedule = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState("");
  const [dosageValue, setDosageValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [dosage, setDosage] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [time, setTime] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [medicineDosages, setMedicineDosage] = useState([]);
  const [scheduleEntries, setScheduleEntries] = useState([]);
  const [updatedSchedule, setUpdatedSchedule] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch schedule entries when the component mounts
    const fetchScheduleEntries = async () => {
      try {
        const data = await getMedicineDosages();
        setScheduleEntries(data);
      } catch (error) {
        console.error('Error fetching schedule entries:', error);
      }
    };

    fetchScheduleEntries();
  }, []); 

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

  const handleSubmit = async () => {
    const selectedDay = schedule.find((day) => day.day === selectValue);
    const selectedMedicine = medicines.find((medicine) => medicine.medicineName === inputValue);
    const selectedDosage = dosage.find((d) => d.amount === parseInt(dosageValue));


    console.log(selectedMedicine);
    console.log(selectedMedicine.medicineName)

    if (selectedDay && selectedMedicine && selectedDosage && time) {
      try {
        const createdMedicineDosage = await createMedicineDosage(
          time,
          selectedDay.id,
          selectedMedicine.medicineName,  // Pass the medicine name
          selectedDosage.amount,            // Pass the dosage amount
        );
        
        // console.log(createdMedicineDosage);
        // Update local state with the new medicine dosage entry
        setScheduleEntries([...scheduleEntries, createdMedicineDosage]);

        // Clear form fields and update state
        setSelectValue("");
        setInputValue("");
        setDosageValue("");
        setTime(null);
      } catch (error) {
        console.error("Error handling submit:", error);
        console.error("Error details:", error);
      }
    }
  };

  const handleComplete = (selectedMedicineEntry) => {
    navigate("/newschedule", { state: { selectedMedicineEntry } });
  };
  return (
    <>
      <div className="buttons">
        <div className="scheduleArea">
          {schedule.map((day) => (
            <div key={day.id} className={day.day}>
              {scheduleEntries
                .filter((entry) => entry.scheduleId === day.id)
                .map((entry) => (
                  <h6 key={entry.id}>
                    {entry.medicine?.medicineName} - {entry.dosage?.amount} mg - {entry.time}
                  </h6>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="inputs">
        <select
          className="dayInput"
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          {schedule.map((s) => (
            <option value={s.day} key={s.id}>
              {s.day}
            </option>
          ))}
        </select>

        <select
          className="medicineInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        >
          {medicines.map((m) => (
            <option value={m.medicineName} key={m.id}>
              {m.medicineName}
            </option>
          ))}
        </select>

        <DatePicker
          type="datetime-local"
          onChange={(newTime) => setTime(newTime)}
          value={time}
          className="timeInput"
        />

        <select
          className="medicineInput"
          value={dosageValue}
          onChange={(e) => setDosageValue(e.target.value)}
        >
          {dosage.map((d) => (
            <option value={d.amount} key={d.id}>
              {d.amount}
            </option>
          ))}
        </select>

        <button onClick={(e) => handleSubmit(e.preventDefault())} className="submitS">
          Add
        </button>
        <button onClick={(e) => handleComplete(e.preventDefault())} className="cSchedule">
          Complete
        </button>
      </div>
    </>
  );
};
