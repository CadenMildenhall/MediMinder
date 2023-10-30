import { useLocation, useNavigate } from "react-router-dom";
import "../styles/NewSchedule.css"
import moment from "moment";
import { useEffect, useState } from "react";
import { getMedicines } from '../Managers/MedicineManager';

export const NewSchedule = () =>{

    const navigate = useNavigate();

    const location = useLocation();
    const { completedMedicines } = location.state || {};
    const [medicine, setMedicines] = useState([]);

    const handleNewScheduleClick = () => {
      navigate('/schedule');
    };

    useEffect(() => {
      // Fetch medicine data from the server when the component mounts
      getMedicines()
        .then(data => {
          setMedicines(data);
        })
        .catch(error => {
          console.error('Error fetching medicine data: ', error);
        });
    }, []); 

    return(

        <>
              <div className="button">
            <button onClick={handleNewScheduleClick} className="newSchedule">
              New
            </button>
            <h6 className="noS">* no schedule made *</h6>
        </div>

        <div className="HomescheduleArea">
        <div className="daysH">
          {completedMedicines &&
            medicine.map((m) => (
              <div key={m.id} className={m.day}>
                <h6>{m.medicineName}: {m.time ? moment(m.time, 'HH:mm').format('hh:mm A') : 'No time selected'}</h6>
                <input className='check' type='checkbox'></input>
              </div>
            ))}
        </div>
      </div>

      <div className="btns">
        <button className="edit">edit</button>
        <button className="delete">delete</button>
      </div>
    
           </>

    );

}