import './Home.css';
import React,{useEffect, useState} from 'react';
import { BrowserRouter,Link,Route,Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import pic from './cloud.png'
function Home() {
   const [search,setSearch] = useState()
   const [result,setResult] = useState(null)
   const [loading,setLoading] = useState(false)
   const [error,setError] = useState(null)
   const [weatherData,setWeatherData] = useState()
   const [currentDate,setCurrentDate] = useState(new Date())
   const [loading2,setLoading2] = useState(true)
   const [error2,setError2] = useState(null)

   const fetchWeatherData =(link)=>{
    setLoading(true)
    fetch(link)
    .then(response =>response.json())
    .then((data)=>{
      setResult(data)
    })
    .catch((err)=>{
      setResult(null)
      setError(err)
    })
    .finally(()=>{
      setLoading(false)
    })
   }
//===============================================

   const getGeoLocationWeather =()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=4bfe4fd8e26b27e7ed10a8752de2d683`)
        },
      (error)=>{
           setError("Geolocation is denied by the user, you can go for the Search")
      })
    }else{
      setError("Faild to get the geolocation on this Browser, or geolocation is not supported")
    }
   }
//===============================================

   const onSearchHandler =(e)=>{
    setLoading2(false)
    e.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4bfe4fd8e26b27e7ed10a8752de2d683`)
    .then(response=>response.json())
    .then((store)=>{
      if(store.cod == 200){
      setWeatherData(store)
      setError2(null)
      }else{
        setWeatherData(null)
        setError2("Unable to find the city/Give proper City name")
      }
    })
    .catch((err)=>{
      setWeatherData(null)
      setError2("There is Problem fetching the Weather Data, please try after some time")
    })
    setSearch('')
   }
//===============================================

   useEffect(()=>{
    console.log("Weather fetched")

    return()=>{
      console.log("Unmountrd the button")
    }
   },[getGeoLocationWeather])

//===============================================

   useEffect(()=>{
    const Timer = setInterval(()=>{
      setCurrentDate(new Date());
    },1000); 
    return ()=> clearInterval(Timer)
   },[]);



  return (
   <>   
    <div className='background-img'>
     <div className='row g-0'>
         <div className='col-lg-8 col-md-12 col-sm-12 col-xm-12 Home-Page'>
            <div className='navbar navbar-expand-lg navbar-light navbar-custom'>
            <div className='container'>
              <Link 
              className='navbar-brand ms-1' to='/'>
              <img src={pic} alt='weather_logo' className='brand-logo'/>
              </Link>
                 <button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#navbarContentSupported' aria-controls='navbarContentSupported'>
                  <span className='navbar-toggler-icon'></span>
                 </button>
              <div className='collapse navbar-collapse' id='navbarContentSupported'>
                <ul className='navbar nav ms-auto'>
                  <li className='nav-item me-5'>
                    <Link className='nav-link' to='/'
                   style={{color:'white',fontSize:'20px'}}>Home</Link>
                  </li>
                  <li className='nav-item me-5'>
                    <Link className='nav-link' to='/about'
                    style={{color:'white',fontSize:'20px'}}>About</Link>
                  </li>
                  <li className='nav-item '>
                    <Link className='nav-link' to='/saved-locations'
                    style={{color:'white',fontSize:'20px'}}>Saved Location</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='container main-display-page'>
            {!result &&(
           <button className='btn btn-primary click-get-location' onClick={getGeoLocationWeather}
           style={{fontFamily:'Courier New, Courier, Monospace',fontSize:'30px', color:'white',borderRadius:'30px'}}>getyourLocation</button>
            )}
            {loading &&(
              <p className='display-city'style={{fontFamily:'Courier New, Courier, Monospace',color:'white'}}>loading.....</p>
            )}
            {error &&(
              <p className='display-city'style={{fontFamily:'Courier New, Courier, Monospace'}}>Error fetching the Data</p>
            )}
            {result &&(
           <h2 className='display-city' 
           style={{fontFamily:'Courier New, Courier, Monospace',fontSize:'35px', color:'white'}}><b>{result.name},</b><h2 style={{fontSize:'35px'}}><b>IND</b></h2></h2>
            )}
            {result &&(
           <h1 className='display-temp'
           style={{fontFamily:'Courier New, Courier, Monospace',fontSize:'100px', color:'white'}}>{Math.round(result.main.temp-273.15)}°C
           </h1>
            )}
            <div className='display-TimeandDate'>
            <h1 style={{fontFamily:'Courier New, Courier, Monospace',fontSize:'50px'}}>{currentDate.toLocaleTimeString()}</h1>
            <h1 style={{fontFamily:'Courier New, Courier, Monospace'}}>{currentDate.toDateString()}</h1>
            </div>
          </div>
        </div>


        <div className='col-lg-4 col-md-12 col-sm-12 col-xm-12 Data-page'>
         <div className='side-display-page'>
            {loading2 &&(
              <>
              <div className='loaderBox'>
                 <div className='loader'></div>
              </div>
              <h2 style={{fontFamily:'Courier New, Courier, Monospace', color:'white',marginTop:'10px'}}>Search any City</h2>
              </>
            )}
            {weatherData ?(
              <>
              <div style={{height:'300px',display:'grid',justifyContent:'center',alignItems:'center'}}>
              <h2 style={{color:'white',fontFamily:'Courier New,Courier,Monospace', textAlign:'center'}}>{weatherData.name}</h2>
              <img 
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              style={{filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8)) brightness(3) darkness(2)',margin:'auto'}}
              className='weather-icon'/>
              <h2 style={{color:'white',fontFamily:'Courier New,Courier,Monospace',textAlign:'center'}}>{weatherData.weather[0].description}</h2>
              </div>
              </>
            ):(
              // <h4 style={{color:'red',textAlign:'center',width:'100%',height:'50px'}}>{error2}</h4>
             error2 && (
              <><h4 style={{color:'red',textAlign:'center',width:'100%',height:'50px'}}>{error2}</h4></>
             )
            )
            }
          <form onSubmit={onSearchHandler}>
            <div className='input-group'>
            <input 
            type='text' placeholder='search' value={search} 
            style={{border:'none',color:'white',fontFamily:'Courier New,Courier,Monospace',textAlign:'center'}}
            className='form-control bg-transparent'
            onChange={(tar)=>{
              setSearch(tar.target.value)
            }}/>
            <button style={{marginLeft:'5px',background:'transparent',border:'none',color:'white'}}>
            <i className="bi bi-search"></i>
            </button>
            </div>
          </form>
        {weatherData && (
          <div className='TempWithIcon'>
            <h4 
            style={{fontFamily:'Courier New,Courier,Monospace', color:'white',textAlign:'center'}}>
            Temperature: {Math.round(weatherData.main.temp-273.15)}°C ({weatherData.weather[0].description})
            </h4>
            <hr style={{color:'white'}}/>
            <p 
            style={{fontFamily:'Courier New, Courier, Monospace',textAlign:'center',color:'white'}}>
            Humidity: {weatherData.main.humidity}
            </p>
            <hr style={{color:'white'}}/>
            <p 
            style={{fontFamily:'Courier New, Courier, Monpspace', textAlign:'center',color:'white'}}>
            Visibility: {weatherData.visibility}    
            </p>
            <hr style={{color:'white'}}/>
            <p 
            style={{fontFamily:'Courier New, Courier, Monospace', textAlign:'center',color:'white'}}>
            Wind Speed: {weatherData.wind.speed}
            </p>
          </div>
          )
        }
         </div>
        </div>
      </div>
    </div>
   </>
  );
}

export default Home;
