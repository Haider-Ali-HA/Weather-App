import React, { useState, useEffect, useRef } from "react";
import humidityImg from "../assets/humidity.png";
import windImg from "../assets/wind.png";
import { FiSearch } from "react-icons/fi";
import { FaRegCircle } from "react-icons/fa";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const searchData = async (city) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`;
      const res = await fetch(url);
      const data = await res.json();

if(!res.ok) 
  {
    alert("City not found")
    setWeatherData(false);
    return;
  }

      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        wind: data.wind.speed,
        city: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("error in fetching data")
    }
  };

  useEffect(() => {
    searchData("");
  }, []);

  return (
    <div className="h-[30rem] w-[27rem] bg-gray-400 gap-3 p-5 rounded-2xl flex items-center justify-center flex-col">
      <div className="flex gap-7  items-center">
        <input
          ref={inputRef}
          className="p-3 rounded-full placeholder:text-center"
          type="text"
          placeholder="Search"
        />
        <FiSearch
          className="text-3xl "
          onClick={() => searchData(inputRef.current.value)}
        />
      </div>
      {weatherData ?
       <>
       <div className="border text-center w-full">
        <h1 className="font-bold text-xl">{weatherData.city}</h1>
        <h2 className="text-5xl flex">
          {weatherData.temp}
          <span className=" p-0">
            <FaRegCircle className="w-2 h-2" />
          </span>
          c
        </h2>
      </div>
      <img src={weatherData.icon} alt="weather image" />
      <div className="flex w-full p-3 justify-between">
        <div className="flex gap-3">
          <img src={humidityImg} alt="humidity image" />
          <div>
            <h1>{weatherData.humidity}%</h1>
            <h2>Humidity</h2>
          </div>
        </div>
        <div className="flex gap-3">
          <img src={windImg} alt="wind image" />
          <div>
            <h1>{weatherData.wind} Km/h</h1>
            <h2>Wind Speed</h2>
          </div>
        </div>
      </div>
      
      </> : <></>}
     
    </div>
  );
};

export default Weather;
