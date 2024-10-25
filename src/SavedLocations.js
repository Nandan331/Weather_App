import React,{useState}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './SavedLoctaion.css'
import { Link } from 'react-router-dom';
import pic from './cloud.png'
// import Navbar from './Navbar';
 function SavedLocations(){
    const [search,setSearch] = useState()
    const [items,setItems] = useState([])
    const [error,seterror] = useState()
    const [get,setGet] = useState(true)

    const handler = (tar)=>{
        setSearch(tar.target.value)
    }
    const onSubmitAdd = (pre)=>{
        setGet(false)
      pre.preventDefault()
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4bfe4fd8e26b27e7ed10a8752de2d683`)
      .then(response=>response.json())
      .then((data)=>{
        if(data.cod == 200){
            const kel = data.main.temp
            const cel = Math.round(kel-273.15)
            const citywithTemp = {
                name : data.name,
                temp : cel,
                description : data.weather[0].description
            }
            setItems([...items,citywithTemp])
            seterror(null)
        }else{
            seterror("Unable to get the City / Invalid City name")
        }
      })
      .catch((err)=>{
          seterror("There is problem fetching the Weather Data, Try after sometime")
      })
      setSearch('')
    }

    const removeItem = (indexToRemove) => {
        setItems(items.filter((_, index) => index !== indexToRemove));
    };

    return(
        <>
        
      <div className='mainPage'>
        <div className='row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xm-12 col-custom'> 
          <div className='navbar navbar-expand-lg navbar-light navbar-custom'>
            <div className='container-fluid'>
              <Link 
              className='navbar-brand ' to='/home'>
              <img src={pic} alt='weather_logo' className='brand-logo'/>
              </Link>
                 <button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#navbarContentSupported' aria-controls='navbarContentSupported'>
                  <span className='navbar-toggler-icon'></span>
                 </button>
              <div className='collapse navbar-collapse' id='navbarContentSupported'>
                <ul className='navbar nav ms-auto'>
                  <li className='nav-item me-5'>
                    <Link className='nav-link' to='/home'
                   style={{color:'white',fontSize:'20px'}}>Home</Link>
                  </li>
                  <li className='nav-item me-5'>
                    <Link className='nav-link' to='/about'
                    style={{color:'white',fontSize:'20px'}}>About</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div> 
          
        <div className='container-fluid'>
            <div className='DisplayItems'>
                <form onSubmit={onSubmitAdd} className='form-control'>
                    <label>
                        <input 
                        style={{background:'transparent',fontFamily:'Courier New, Courier, Monospace',color:'white'}}
                        className='input-text' type='text' placeholder='search....' value={search} onChange={handler}/>
                    </label>
                    <button  className=' btn btn-primary add-button' type='submit'><i className='bi bi-plus'></i></button>
                </form>
                {error && (
                    <p style={{color:'red'}}>{error}</p>
                )}
                {get && (
                    <p style={{fontFamily:'Courier New, Courier, Monospace',color:'white',fontSize:'20px'}}>No Locations are Saved....</p>
                )}
                
                {items.map((tracker,index)=>(
                    <div key={index} className='fetching-items'>
                        {tracker.name} {tracker.temp}°C {tracker.description} 
                        <button onClick={()=>
                              removeItem(index)
                        } className='remove-button btn btn-danger'
                        style={{background:'transparent'}}>
                        <i className='bi bi-trash'></i></button>
                    </div>
                ))}
              </div>
              </div>
            </div>
        </div>
      </div> 
        </>
    )
 }
 export default SavedLocations