import { useEffect, useState } from 'react';
import '../styles/Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getSchedule } from '../Managers/ScheduleManager';
import { getMedicines } from '../Managers/MedicineManager';
import { getDosages } from '../Managers/DosageManager';
import { getMedicineDosages } from '../Managers/MedicineDosageManager';

export const Home = () => {
  const [medicine, setMedicines] = useState([]);
  const location = useLocation();
  const { completedMedicines } = location.state || {};
  // const [points, setPoints] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);
  const[weeks, setWeeks] = useState(1);
  const [editedMedicine, setEditedMedicine] = useState({ medicineName: '', dosage: '', time: '', id: null });
  const [schedule, setSchedule] = useState([]);
  const [dosage, setDosage] = useState([]);
  const [medicineDosages, setMedicineDosage] = useState([]);


  const navigate = useNavigate();

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


  const handleComplete = () => {
    // setWeeks((prevweeks) => prevweeks + 1);

    // updateWeeks(weeks);
    // updatePoints(totalPoints)

    navigate("/profilepage")
  };
  
  

  useEffect(() => {
  
    
    });
  
return (
<>

        <h1 className='header'>
            MediMinder
            </h1>
         
    {medicineDosages.length < 1 && (
    <div className="HomescheduleArea"> 
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
                   

                  </div>
                ))}
            </div>
          ))}
        </div>
      )}


 

<div className='allCheck'>
<div className='check'>
<input
  className='cB'
  type='checkbox'
  // onChange={(e) => {
  //   setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  // }}
/><input
  className='cB'
  type='checkbox'
  // onChange={(e) => {
  //   setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  // }}
/><input
  className='cB'
  type='checkbox'
  // onChange={(e) => {
  //   setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  // }}
/><input
  className='cB'
  type='checkbox'
  // onChange={(e) => {
  //   setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  // }}
/><input
  className='cB'
  type='checkbox'
  // onChange={(e) => {
  //   setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  // }}
/><input
  className='cB'
  type='checkbox'
  // onChange={(e) => {
  //   setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  // }}
/><input
  className='cB'
  type='checkbox'
  // onChange={(e) => {
  //   setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  // }}
/>

</div>
</div>

   <>
      
        <div className='scheduleIcon'>
        
           <Link to={"/newschedule"}> <img className='sIcon' src={"pngwing.com.png"} alt='icon'></img> </Link>
        </div>

        <div className='profileIcon'>
            <Link to={"/profilepage"}> <img className='pIcon' src={"PngItem_1468281.png"} alt='icon'></img> </Link>
        </div>

    <div className='Hbuttons'>
        <button onClick={handleComplete} className='complete'>
            Complete
        </button>
    </div>

        <div className='hPoints'>
            <h1 className='hP'>
                Points: {totalPoints}
            </h1>
        </div>


</>

</>

);

    }