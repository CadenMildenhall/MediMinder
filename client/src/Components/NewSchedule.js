import { useLocation, useNavigate } from "react-router-dom";
import "../styles/NewSchedule.css"
import { getMedicines } from '../Managers/MedicineManager';
import { useEffect, useState } from "react";
import { getDosages } from "../Managers/DosageManager";
import { getSchedule} from "../Managers/ScheduleManager";


export const NewSchedule = () =>{

  const navigate = useNavigate();
  const location = useLocation();
  const [medicine, setMedicines] = useState([]);
  const [editedMedicine, setEditedMedicine] = useState(null);
  const [editedMedicineId, setEditedMedicineId] = useState(null);
  const {onComplete} = location.state || {};

  // const handleEdit = (id) => {
  //   updateSchedule(id);
  // }

    const handleNewScheduleClick = () => {
      navigate('/schedule');
    };

    // const handleDelete = (id) => {    
    //     deleteSchedule(id);
    //  };
    
    
    const handleFormSubmit = (event) => {
      event.preventDefault();

      // handleEdit();

    };

    useEffect(() => {
        getSchedule();
    });
    


    const cancelEdit = () => {
      setEditedMedicine(null);
      setEditedMedicineId(null);
    };


    return(

    
        <>
        
        {!medicine.length && (
        <div className="button">
          <button onClick={handleNewScheduleClick} className="newSchedule">
            New
          </button>
          <h6 className="noS">* no schedule made *</h6>
        </div>
      )}


<div>

{onComplete &&(

        <div className="HomescheduleArea">


 
    <div className="days">
        
          <div className="Monday">
              {medicine
              .filter((m) => m.day === "Monday")
              .map((m, index) => (
              <><h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6><button onClick={() => (m.id)} className="edit">
                  edit
                </button></>
            ))}
            </div>
            <div className="Tuesday">
            {medicine
              .filter((m) => m.day === "Tuesday")
              .map((m, index) => (
                <><h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6><button onClick={() => (m.id)} className="edit">
                edit
              </button></>



            ))}
            </div>
            <div className="Wednesday">
            {medicine
              .filter((m) => m.day === "Wednesday")
              .map((m, index) => (
                <><h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6><button onClick={() => (m.id)} className="edit">
                edit
              </button></>


            ))}
            </div>
            <div className="Thursday">
            {medicine
              .filter((m) => m.day === "Thursday")
              .map((m, index) => (
                <><h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6><button onClick={() => (m.id)} className="edit">
                edit
              </button></>




            ))}
            </div>
            <div className="Friday">
            {medicine
              .filter((m) => m.day === "Friday")
              .map((m, index) => (
                <><h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6><button onClick={() => (m.id)} className="edit">
                edit
              </button></>

            ))}
            </div>
            <div className="Saturday">
            {medicine
              .filter((m) => m.day === "Saturday")
              .map((m, index) => (
                <><h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6><button onClick={() => (m.id)} className="edit">
                edit
              </button></>


            ))}
            </div>
            <div className="Sunday">
            {medicine
              .filter((m) => m.day === "Sunday")
              .map((m, index) => (
                <><h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6><button onClick={() => (m.id)} className="edit">
                edit
              </button></>


            ))}
            </div>
          </div>

      </div>
)}
              </div>


     
             
      
              {editedMedicine && (
          <div className="edit-form">
            <form onSubmit={handleFormSubmit}>
              <label className="labelEdit">
                <h4 className="hEdit">Medicine Name: </h4>
               <select
  className="medicineInput"
  onChange={(e) =>  setEditedMedicine({ ...editedMedicine, medicineName: e.target.value })}
>
  <option value="Advil">Advil</option>
  <option value="Benadryl">Benadryl</option>
  <option value="Ibuprofin">Ibuprofin</option>
  <option value="aleve">aleve</option>
  <option value="claratin">claritin</option>
  <option value="tylenol">Tylenol</option>
  <option value="zyrtec">zyrtec</option>
</select>
              </label>
              <label className="tLabel">
              <h4 className="tEdit">Time: </h4>
                <input
                className="iEdit"
                  type="time"
                  value={editedMedicine.time || ''}
                  onChange={(e) =>
                    setEditedMedicine({ ...editedMedicine, time: e.target.value })
                  }
                />
              </label>

              <label className="tLabel">
              <h4 className="tEdit">Dosage: </h4>
                <input
                className="iEdit"
                  type="number"
                  value={editedMedicine.dosage}
                  onChange={(e) =>  setEditedMedicine({  ...editedMedicine, dosage: parseInt(e.target.value, 10) })}
                />
              </label>
              {/* Add other input fields for editing other properties */}
              <div className="btn">
              <button className="subButton" type="submit">Save</button>
              </div>
            </form>
            <div className="btnTwo">
            <button className="cancelButton" type="button" onClick={cancelEdit}>
              Cancel
            </button>
                  </div>

          </div>
        )}


{medicine.length > 0 && !editedMedicine && (
<div className="btns">
              <button className="delete">
                 delete
               </button>
               </div>
)}
           </>

    );
  }
