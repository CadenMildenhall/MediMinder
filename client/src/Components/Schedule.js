import React, { useEffect, useState } from "react";
import "../styles/Schedule.css";
import { getMedicines, addMedicine } from "../Managers/MedicineManager";
import { TimePicker } from "antd";
import "antd/lib/date-picker/style";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


export const Schedule = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(""); // Default day value is "Monday"
  const [medicines, setMedicines] = useState([]);
  const [time, setTime] = useState(null);
  
  const navigate = useNavigate();

  const handleComplete = () => {
    // Filter medicines based on the selected day and pass it to the Home component
    const completedMedicines = medicines.filter((m) => m.day === selectValue);
    // Use navigate to navigate to the Home page with medicine data
    navigate('/home', { state: { completedMedicines: completedMedicines } });
  };

  // const [complete, setComplete] = useState(false);

    useEffect(() => {
      getMedicines().then(setMedicines);
    },[medicines]);

    const handleSubmit = () => {

      const formattedTime = time ? time.format("HH:mm") : null;

      const newMedicine = {
        medicineName: inputValue,
        day: selectValue,
        time: formattedTime
    };
    
    

  addMedicine(newMedicine).then(() => {
    setInputValue("")
  });
   
}



  return (
    <div className="buttons">
      <>
        <div className="scheduleArea">
          <div className="days">
          <div className="Monday">
              {medicines
              .filter((m) => m.day === "Monday")
              .map((m) => (
              <h6  key={m.id}>{m.medicineName}: {m.time ? moment(m.time, 'HH:mm').format('hh:mm A') : 'No time selected'}</h6>
            ))}
            </div>
            <div className="Tuesday">
            {medicines
              .filter((m) => m.day === "Tuesday")
              .map((m) => (
              <h6  key={m.id}>{m.medicineName}: {m.time ? moment(m.time, 'HH:mm').format('hh:mm A') : 'No time selected'}</h6>
            ))}
            </div>
            <div className="Wednesday">
            {medicines
              .filter((m) => m.day === "Wednesday")
              .map((m) => (
              <h6  key={m.id}>{m.medicineName}: {m.time}</h6>
            ))}
            </div>
            <div className="Thursday">
            {medicines
              .filter((m) => m.day === "Thursday")
              .map((m) => (
              <h6  key={m.id}>{m.medicineName}: {m.time}</h6>
            ))}
            </div>
            <div className="Friday">
            {medicines
              .filter((m) => m.day === "Friday")
              .map((m) => (
              <h6  key={m.id}>{m.medicineName}: {m.time}</h6>
            ))}
            </div>
            <div className="Saturday">
            {medicines
              .filter((m) => m.day === "Saturday")
              .map((m) => (
              <h6  key={m.id}>{m.medicineName}: {m.time}</h6>
            ))}
            </div>
            <div className="Sunday">
            {medicines
              .filter((m) => m.day === "Sunday")
              .map((m) => (
              <h6  key={m.id}>{m.medicineName}: {m.time}</h6>
            ))}
            </div>
          </div>
    </div>

        <div className="inputs">
        <select
  className="dayInput"
  value={selectValue}
  onChange={(e) => setSelectValue(e.target.value)}
>
  <option value="Monday">Monday</option>
  <option value="Tuesday">Tuesday</option>
  <option value="Wednesday">Wednesday</option>
  <option value="Thursday">Thursday</option>
  <option value="Friday">Friday</option>
  <option value="Saturday">Saturday</option>
  <option value="Sunday">Sunday</option>
</select>


          <input
            className="medicineInput"
            type="text"
            placeholder="medicine?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

      <TimePicker 
        onChange={newTime => setTime(newTime)} 
        value={time} 
        format="HH:mm" // Specify the format for the TimePicker
        className="timeInput" 
      />

          <button onClick={(e)=>{handleSubmit(e.preventDefault())}} className="submitS">
            Add
          </button>
          <button onClick={handleComplete} className="cSchedule">
            Complete
          </button>
        </div>
      </>
    </div>
  );
};
