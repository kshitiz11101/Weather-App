import moment from "moment/moment";
import React, { useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style.css";
import styled from "styled-components";
import {
  faBolt,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faSearch,
  faSmog,
  faSnowflake,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
export const Weather = () => {
  const WeatherIcon = styled.div`
    color: black;
  `;
  const [city,setcity]=useState("");
  const [weatherData, setWeatherData] = useState(null);
  const refresh = () => {
    window.location.reload();
  };
  const handleSearchCity=()=>{
    const key="d3ea1c5de2f76caa6ebe2a2046f92355";
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    fetch(apiurl).then((response)=>response.json())
    .then((data)=>setWeatherData(data))
    .catch((err)=>console.error("Error in fetching data",err));
    };

  
  let weathericon = null;
  if(weatherData && weatherData.weather){
    if (weatherData.weather[0].main === "Thunderstorm") {
      weathericon = <FontAwesomeIcon icon={faBolt} />;
    } else if (weatherData.weather[0].main === "Drizzle") {
      weathericon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (weatherData.weather[0].main === "Rain") {
      weathericon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (weatherData.weather[0].main === "Snow") {
      weathericon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (weatherData.weather[0].main === "Clear") {
      weathericon = <FontAwesomeIcon icon={faSun} />;
    } else if (weatherData.weather[0].main === "Clouds") {
      weathericon = <FontAwesomeIcon icon={faCloud} />;
    } 
    else {
      weathericon = <FontAwesomeIcon icon={faSmog} />;
    }
    
  }
  const handleKeyPress=(e)=>{
if(e.key==='Enter'){
  handleSearchCity();
}

  }

  return (
    <>
      <center>
        <div className="back">
        <Menu secondary style={{backgroundColor:'rgb(8, 11, 37)'}}>
          <Menu.Item style={{color:'white',fontSize:'25px',fontWeigth:'bolder'}}>
            Weather App
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <a href="https://github.com/kshitiz11101">
              <FontAwesomeIcon icon={faGithub} size="lg" style={{marginRight:'30px',fontSize:'35px',color:'white'}}></FontAwesomeIcon>
              </a>
            </Menu.Item>
            </Menu.Menu>
        </Menu>
        <div className="main">
        
            <input className="search" type="text" placeholder="Search for the city"
            value={city}
            onChange={(e) => setcity(e.target.value)} 
            onKeyPress={handleKeyPress}
            ></input>
            <Button className="btn btn-success"
            onClick={handleSearchCity}>
  <FontAwesomeIcon icon={faSearch} />
</Button>

          <br/>
            <br/>
            <p style={{fontSize:'2rem'}}>Your City</p>
          <div className="top">
            
            <p className="header" style={{cursor:'pointer'}}>{weatherData?weatherData.name:""}</p>

            <Button
              className="button"
              inverted
              color="black"
              circular
              icon="refresh"
              onClick={refresh}
            />
          </div>
          {weatherData && weatherData.weather && (
          <>
          <div className="flex">
            <p className="day">
              {moment().format("dddd")}, <span>{moment().format("LL")}</span>
            </p>
            <div className="flex">
              <WeatherIcon style={{ fontSize: 30, marginTop: "10px" }}>
                {weathericon}
              </WeatherIcon>
              <p className="desc">{weatherData.weather[0].main}</p>
            </div>
          </div>
          <div className="flex">
            <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>
            <p className="temp">Humidity: {weatherData.main.humidity} %</p>
          </div>
          <div className="flex">
            <p className="sunrise-sunset">
              Sunrise:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                "en-IN"
              )}
            </p>
            <p className="sunrise-sunset">
              Sunset:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                "en-IN"
              )}{" "}
            </p>
          </div>
</>
          )}
       
        </div>
        </div>
       
      </center>
    </>
  );
};
