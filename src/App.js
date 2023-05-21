import { useState } from 'react';
import './scss/input.css';
function App() {
 
  const [date, setDate] = useState({
    DD: "DD",
    MM: "MM",
    YYYY: "YYYY"
  });
 
  const [age, setAge] = useState({
    years: "--",
    months: "--",
    days: "--"
  });

  function handleChange(e) {

    setDate((prevState) => ({
      ...prevState,
      [e.target.placeholder]: e.target.value
      }))

    }
  function handleSubmit(e) {
    e.preventDefault();
    
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let yearDiff = 0;
    let monthDiff = 0;
    let dayDiff = 0;
    
    const datesclass = document.querySelectorAll('.date');

    function checkDate(condition,bolean){
      datesclass.forEach((dateitem) => {
        if(dateitem.firstChild.textContent === condition){
          if(bolean){
            dateitem.classList.add('invalid');
          }else{
            dateitem.classList.add("correct");
          }
          
          setTimeout(() => {
            if(bolean){
              dateitem.classList.remove("invalid");
            }else{
              dateitem.classList.remove('correct');
            }
            
          }
          , 1500);
        }
      })
    }


     const daysInMonth = [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

     if( date.YYYY === "YYYY" && date.MM ==="MM"  &&  date.DD ==="DD") {
      
      checkDate("DAY",true);
      checkDate("MONTH",true);
      checkDate("YEAR",true);
      return false;

     }
      if(isNaN(date.YYYY) || date.YYYY < 1900 || date.YYYY > year) {
        //checkDate('YEAR');
        checkDate("YEAR",false);

      setDate((prevState) => ({
        ...prevState,
        YYYY: "YYYY"
        }))
      return false;
        }else{

          if(date.YYYY === year) {
             yearDiff = 0;
       }else{
        yearDiff = year - date.YYYY;
        }

      }
       if( isNaN(date.MM) || date.MM > 12 || date.MM < 1) {
        //checkDate('MONTH');
        checkDate("MONTH",false);

        setDate((prevState) => ({
          ...prevState,
          MM: "MM"
          }))
        return false;
        }else{
          if(yearDiff === 0 && date.MM > month){
            //checkDate('MONTH');
            checkDate("MONTH",false);

            setDate((prevState) => ({
              ...prevState,
              MM: "MM"
              }))
            return false;
          }else{
            if(date.MM > month){
              yearDiff = yearDiff - 1;
              month = month + 12;
              monthDiff = month - date.MM;
            }else{
              monthDiff = month - date.MM;
            }
            
          }
        }
        
        if( isNaN(date.DD) || date.DD < 1 || date.DD > daysInMonth[date.MM - 1]) {
          //checkDate('DAY');
          checkDate("DAY",false);
    
          setDate((prevState) => ({
            ...prevState,
            DD: "DD"
            }))
          return false;
          }else{
            if(date.DD > day){
            monthDiff = monthDiff - 1 ;
            day = day + daysInMonth[monthDiff - 1];
            dayDiff = day - date.DD;
              }else{
                  dayDiff = day - date.DD;
               }
          }
              setAge((prevState) => ({
                ...prevState,
                years: yearDiff,
                months: monthDiff,
                days: dayDiff
                }))
      }
  
return (
    <>
      <header className="App-header">
      <form onSubmit={handleSubmit}>

        <div className='flex'>

        
        <div className='date'>
        <h1>DAY</h1>
        <input id='day' value={date.DD} onChange={handleChange}  type="number" placeholder="DD"  />

        </div>

        <div className='date'>
        <h2>MONTH</h2>
        <input id='month' value={date.MM} onChange={handleChange}  type="number" placeholder="MM"  />
        </div>

        <div className='date'>
        <h3>YEAR</h3>
        <input id='year' value={date.YYYY} onChange={handleChange}  type="number" placeholder="YYYY"  />
        </div>
       
        </div>

        <div className='btn-div'>
        <button type='submit' className='img-holder'>
        <img alt='submit' src='./images/icon-arrow.svg'/>
        </button>
        </div>

        </form>
      </header>


      <main>
            
              <div className='data'>
              <p><span>{`${age.years }`} </span>years</p>
              <p><span>{`${age.months}`} </span>months</p>
              <p><span>{`${age.days}`} </span>days</p>
              </div>
              
      </main>
    </>
  );
}
export default App;
