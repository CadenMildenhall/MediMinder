
import { useEffect, useState } from 'react';
import '../styles/Home.css'
import { getMedicines } from '../Managers/MedicineManager';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

export const Home = () =>
 {

    const [medicine, setMedicines] = useState([]);
    const location = useLocation();
    const { completedMedicines } = location.state || {};


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

return (

<>

        <h1 className='header'>
            MediMinder
            </h1>
         
    <div className="Homebuttons">
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
    </div>
      
        <div className='scheduleIcon'>
        
           <Link to={"/newschedule"}> <img className='sIcon' src={"pngwing.com.png"} alt='icon'></img> </Link>
        </div>

        <div className='profileIcon'>
            <Link to={"/profilepage"}> <img className='pIcon' src={"PngItem_1468281.png"} alt='icon'></img> </Link>
        </div>

    <div className='Hbuttons'>
        <button className='complete'>
            Complete
        </button>
    </div>
</>

);

    }