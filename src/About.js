import React  from "react";
import {Link} from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './About.css'
import pic from './cloud.png'

function About(){
    return(
        <>
        <div className="DisplayPage">
            <div className="navbar navbar-expand-lg navbar-custom">
                <div className="container">
                    <Link className="navbar-brand" to='/home'>
                     <img src={pic} alt="weather-log" className="brand-logo" />
                    </Link>
                    <button className="navbar-toggler" data-bs-target='#navbarContentSupported' data-bs-toggle='collapse' aria-controls="navbarContentSupported">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collpase navbar-collapse" id='navbarContentSupported'>
                        <ul className="navbar nav ms-auto">
                            <li className="nav-item me-5">
                                <Link className="nav-link" to='/home'
                                style={{color:'white',fontSize:'20px'}}>Home</Link>
                            </li>
                            <li className="nav-item me-5">
                                <Link className="nav-link" to='/saved-locations'
                                style={{color:'white',fontSize:'20px'}}>SavedLocations</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="about-content">
                    <h4 style={{color:'white', fontFamily:'Courier New,Courier,Monosace'}}>
                    Welcome to our Weather Application, your one-stop solution for real-time weather updates and forecasts. 
                    Our application is designed to provide you with the most accurate and up-to-date weather information, 
                    helping you plan your day with confidence.
                    </h4>
                     <ul>Key features
                        <li>Real-time Weather Updates: Instantly get the current weather for any location, anywhere in the world.</li>
                        <li>Detailed Forecasts: Access detailed weather data, including temperature, humidity, wind speed, and more, for your selected location.</li>
                        <li>Saved Locations: Save your favorite cities or locations for quick and easy access to their weather data without the need to search every time.</li>
                        <li>Dynamic User Interface: Enjoy a visually appealing interface that dynamically changes to reflect current weather conditions, with appropriate icons and backgrounds</li>
                     </ul>
                     <hr style={{color:'white',}}/>
                     <h3>Technology Stack</h3>
                     <h4>Our Weather Application is built using the latest web technologies to ensure a smooth and responsive experience:</h4>
                     <ul>
                        <li>React: We use React for building an interactive and efficient user interface, allowing for fast data updates and smooth navigation.</li>
                        <li>Bootstrap & Custom CSS: Our app leverages Bootstrap for a responsive design and custom CSS to add unique styles that make the app stand out.</li>
                        <li>OpenWeather API: The weather data is sourced from the reliable OpenWeather API, ensuring that you receive accurate and comprehensive information.</li>
                     </ul>
                     <hr style={{color:'white',}}/>
                     <h3>About the Developer</h3>
                     <h4>Hello! I’m Nandan, the developer behind this Weather Application. My passion lies in creating web applications that are not only functional but also visually appealing. 
                        This project is a testament to my skills in React, Bootstrap, and API integration.</h4>
                     <hr style={{color:'white',}}/>
                     <h3>Future Enhancement</h3>   
                     <ul>
                        <li>Hourly Weather Updates: Get more granular data with hourly forecasts.</li>
                        <li>Severe Weather Alerts: Stay informed about extreme weather conditions with timely notifications.</li>
                        <li>Multiple Themes: Choose from various themes to customize the look and feel of your weather dashboard.</li>
                     </ul>
                </div>
            </div>
        </div>
        </>
    )
}
export default About