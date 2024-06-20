import React, { useState, useEffect, useRef } from "react";
import humidityImg from "../assets/humidity.png";
import windImg from "../assets/wind.png";
import { FiSearch } from "react-icons/fi";

//Import Weather Icons
import clearImg from "../assets/clear.png";
import fewCloudsImg from "../assets/fewCloud.png";
import rainImg from "../assets/rain.png";
import snowImg from "../assets/snow.png";
import thunderStormImg from "../assets/thunderStorm.png";
import brokenCloudsImg from "../assets/brokenClouds.png";
import scatteredCloudsImg from "../assets/scatteredClouds.png";
import showerRainImg from "../assets/showerRain.png";

// Import your background images
import clearBg from "../assets/bgImage/clearSky.svg";
import RainBg from "../assets/bgImage/rain.svg";
import brokenCloudBg from "../assets/bgImage/brokenCloud.svg";
import fewCloudBg from "../assets/bgImage/fewCloud.svg";
import thunderStormBg from "../assets/bgImage/thunderStorm.svg";
import scatteredCloudBg from "../assets/bgImage/scatteredCloud.svg";
import showerRainBg from "../assets/bgImage/showerRain.svg";
import snowBg from "../assets/bgImage/snow.svg";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const [backgroundImage, setBackgroundImage] = useState(thunderStormBg); // Set default background image
  const weatherIcons = {
    "01d": clearImg,
    "01n": clearImg,
    "02d": fewCloudsImg,
    "02n": fewCloudsImg,
    "03d": scatteredCloudsImg,
    "03n": scatteredCloudsImg,
    "04d": brokenCloudsImg,
    "04n": brokenCloudsImg,
    "09d": showerRainImg,
    "09n": showerRainImg,
    "10d": rainImg,
    "10n": rainImg,
    "11d": thunderStormImg,
    "11n": thunderStormImg,
    "13d": snowImg,
    "13n": snowImg,
  };

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

      if (!res.ok) {
        alert("City not found");
        setWeatherData(false);
        return;
      }

      console.log(data);
      console.log(weatherData);
      const icons = weatherIcons[data.weather[0].icon] || clearImg;
      setWeatherData({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        wind: data.wind.speed,
        city: data.name,
        icon: icons,
      });

      // Update background image based on weather icon
      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setBackgroundImage(clearBg);
          break;
        case "02d":
        case "02n":
          setBackgroundImage(fewCloudBg);
          break;
        case "03d":
        case "03n":
          setBackgroundImage(scatteredCloudBg);
          break;
        case "04d":
        case "04n":
          setBackgroundImage(brokenCloudBg);
          break;
        case "09d":
        case "09n":
          setBackgroundImage(showerRainBg);
          break;
        case "10d":
        case "10n":
          setBackgroundImage(RainBg);
          break;
        case "11d":
        case "11n":
          setBackgroundImage(thunderStormBg);
          break;
        case "13d":
        case "13n":
          setBackgroundImage(snowBg);
          break;
        default:
          setBackgroundImage(clearBg);
      }
    } catch (error) {
      setWeatherData(false);
      console.log("error in fetching data");
    }
    inputRef.current.value = "";
  };

  useEffect(() => {
    searchData("");
  }, []);

  return (
    <div className="h-[30rem] w-[27rem] bg-gray-400 gap-3 p-5 relative rounded-2xl flex items-center justify-center flex-col overflow-hidden">
      <img
        className="absolute w-full h-full object-cover"
        src={backgroundImage}
        alt=""
      />
      <div className="absolute inset-0 opacity-50 bg-black"></div>
      <div className="absolute flex flex-col items-center justify-center gap-3  ">
        <div className=" flex items-center justify-center gap-7">
          <input
            ref={inputRef}
            className="outline-none p-3 rounded-full placeholder:text-center text-center"
            type="text"
            placeholder="Search"
          />
          <FiSearch
            className="text-5xl bg-white rounded-full  p-3 cursor-pointer"
            onClick={() => searchData(inputRef.current.value)}
          />
        </div>
        {weatherData ? (
          <>
            <img
              className="h-36 w-36 "
              src={weatherData.icon}
              alt="weather image"
            />
            <div className="flex flex-col items-center justify-center text-white gap-3 w-full">
              <h2 className="text-6xl flex text-center text-white">
                {weatherData.temp}
                <span className=" p-0">&deg;</span>c
              </h2>
              <h1 className="font-bold text-xl">{weatherData.city}</h1>
            </div>
            <div className="flex w-full p-3 justify-between text-white gap-16">
              <div className="flex gap-3">
                <img src={humidityImg} alt="humidity image" />
                <div>
                  <h1>{weatherData.humidity}%</h1>
                  <h2>Humidity</h2>
                </div>
              </div>
              <div className="flex gap-3 text-white">
                <img src={windImg} alt="wind image" />
                <div>
                  <h1>{weatherData.wind} Km/h</h1>
                  <h2>Wind Speed</h2>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <img
              className="h-36 w-36 "
              src={thunderStormImg}
              alt="weather image"
            />
            <div className="flex flex-col items-center justify-center text-white gap-3 w-full">
              <h2 className="text-6xl flex text-center text-white">
                32
                <span className=" p-0">&deg;</span>c
              </h2>
              <h1 className="font-bold text-xl">Karachi</h1>
            </div>
            <div className="flex w-full p-3 justify-between text-white gap-16">
              <div className="flex gap-3">
                <img src={humidityImg} alt="humidity image" />
                <div>
                  <h1>45%</h1>
                  <h2>Humidity</h2>
                </div>
              </div>
              <div className="flex gap-3 text-white">
                <img src={windImg} alt="wind image" />
                <div>
                  <h1>32 Km/h</h1>
                  <h2>Wind Speed</h2>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
