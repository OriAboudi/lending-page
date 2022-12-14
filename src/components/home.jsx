import axios from 'axios'
import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './css/main.css'

import TopWeather from './topWeather';
import MiddelForecast from './middelForecast';
import ButtonInfo from './buttonInfo';
const Home = () => {

  const [data, setData] = useState({});
  const [query] = useSearchParams()
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState([]);
  const input_ref = useRef()
  const nav = useNavigate()

  useEffect(() => {

    doApiWeather();
    doApiForecast()

  }, [query])

  const doApiWeather = async () => {
    try {
      setLoading(true);
      let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${query.get('city') || "tel%20aviv"}&appid=6692341014244b16b26d894eca7afd60&units=metric`

      const { data } = await axios.get(urlWeather)

      console.log(data);

      const obj = {
        location: {
          city: data.name,
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset
        },
        temp: data.main.temp,
        weather: {
          temp: data.main.temp,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          desc: data.weather[0].description,
        },
        coord: {
          lon: data.coord.lon,
          lat: data.coord.lat
        },
        icon: data.weather[0].icon

      }

      console.log(obj);
      setData(obj)
      setLoading(false);

    } catch (error) {
      console.log(error);
    }


  }
  const doApiForecast = async () => {
    try {
      let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${query.get('city') || "tel%20aviv"}&appid=6692341014244b16b26d894eca7afd60&units=metric`
      const { data } = await axios.get(urlForecast);
      console.log(data);
      const arrForceast = [
        {
          day:data.list[0].dt,
          icons: data.list[0].weather[0].icon,
          temp: data.list[0].main.temp_max,
          desc: data.list[0].weather[0].description

        },
        {
          day: data.list[7].dt,
          icons: data.list[7].weather[0].icon,
          temp: data.list[7].main.temp_max,
          desc: data.list[7].weather[0].description

        }, {
          day:data.list[14].dt,
          icons: data.list[14].weather[0].icon,
          temp: data.list[14].main.temp_max,
          desc: data.list[14].weather[0].description
        }


      ]
console.log(arrForceast[0].day);
      setForecast(arrForceast)
      console.log(arrForceast);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div className='container app'>
      <div className='col-8 col-md-6 col-lg-6 d-flex m-auto pt-4 '>
        <input placeholder='Enter Location' ref={input_ref} className=' form-control ' type="text" />
        <button className='btn btn-dark ms-4' onClick={() => {
          console.log(input_ref.current.value);
          nav('?city=' + input_ref.current.value)


        }}>Search</button>
      </div>

      {loading ? <div className='mt-4'><h2>Loading...</h2></div> :
        <div className='main'>

          <TopWeather data={data} />
          <MiddelForecast data={forecast} />
           <ButtonInfo data={data} />

        </div>
      }
    </div>
  )
}

export default Home