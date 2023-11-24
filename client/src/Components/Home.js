import { useEffect, useState } from 'react';
import '../styles/Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Home = () => {
  const [medicine, setMedicines] = useState([]);
  const location = useLocation();
  const { completedMedicines } = location.state || {};
  // const [points, setPoints] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);
  const[weeks, setWeeks] = useState(1);

  const navigate = useNavigate();


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
         
    <div className="Homebuttons">
    <div className="HomescheduleArea">


{!completedMedicines &&
<div className="daysWO">
    <div className="Monday"></div>
    <div className="Tuesday"></div>
    <div className="Wednesday"></div>
    <div className="Thursday"></div>
    <div className="Friday"></div>
    <div className="Saturday"></div>
    <div className="Sunday"></div>
</div>    
}

    {completedMedicines &&
    <div className="days">
        
          <div className="Monday">
              {medicine
              .filter((m) => m.day === "Monday")
              .map((m, index) => (
                <h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6>
            ))}



            </div>
            <div className="Tuesday">
            {medicine
              .filter((m) => m.day === "Tuesday")
              .map((m, index) => (
                <h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6>
            ))}



            </div>
            <div className="Wednesday">
            {medicine
              .filter((m) => m.day === "Wednesday")
              .map((m, index) => (
                <h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6>
            ))}



            </div>
            <div className="Thursday">
            {medicine
              .filter((m) => m.day === "Thursday")
              .map((m, index) => (
                <h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6>
            ))}



            </div>
            <div className="Friday">
            {medicine
              .filter((m) => m.day === "Friday")
              .map((m, index) => (
                <h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6>
            ))}


            </div>
            <div className="Saturday">
            {medicine
              .filter((m) => m.day === "Saturday")
              .map((m, index) => (
                <h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6>
            ))}



            </div>
            <div className="Sunday">
            {medicine
              .filter((m) => m.day === "Sunday")
              .map((m, index) => (
                <h6  key={m.medicineName + index}>{m.medicineName}: {m.dosage}mg - {m.time.format('hh:mm A')}</h6>
            ))}



            </div>
          </div>
 }


<div className='allCheck'>
<div className='check'>
<input
  className='cB'
  type='checkbox'
  onChange={(e) => {
    setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  }}
/><input
  className='cB'
  type='checkbox'
  onChange={(e) => {
    setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  }}
/><input
  className='cB'
  type='checkbox'
  onChange={(e) => {
    setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  }}
/><input
  className='cB'
  type='checkbox'
  onChange={(e) => {
    setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  }}
/><input
  className='cB'
  type='checkbox'
  onChange={(e) => {
    setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  }}
/><input
  className='cB'
  type='checkbox'
  onChange={(e) => {
    setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  }}
/><input
  className='cB'
  type='checkbox'
  onChange={(e) => {
    setTotalPoints((prevTotalPoints) => e.target.checked ? prevTotalPoints + 1 : prevTotalPoints - 1);
  }}
/>

</div>
</div>

      </div>
    </div>
      
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

);

    }