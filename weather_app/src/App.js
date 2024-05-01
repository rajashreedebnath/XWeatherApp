import { useState } from "react";
import "./App.css";
import Card from "./Card.js";



export default function App() {


  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState();



  const API_KEY = "b16e11e8b15149179a4114245243101";
  const API_ENDPOINT = "https://api.weatherapi.com/v1/current.json";




  const fetchWeatherData = async () => {


    setIsLoading(true);

    if (city && city.trim()) {

      try {

        const response = await fetch(
          `${API_ENDPOINT}?key=${API_KEY}&q=${city}`
        );



        if (!response.ok) {
          alert("Failed to fetch weather data");
          console.log(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
          setTemperature({});
        }
        
        else {
          const data = await response.json();
          setTemperature(data);
        }

      }
      
      catch (error) {
        console.error("Error while fetching the data: ", error);
        alert("Failed to fetch weather data");
      }
      
      finally {
        setIsLoading(false);
      }
    }
  };








  return (
    <div className="App">


      <form className="form-inline my-2">


        <div className="input-group">


          <input
            type="text"
            placeholder="Enter city name"
            className="form-control m-1"
            aria-label="Search"
            aria-describedby="searchButton"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />


          <button
              className="btn btn-success"
              type="button"
              id="searchButton"
              onClick={fetchWeatherData}
          >

          Search

          </button>

        </div>
      </form>








      {isLoading && <p className="loading">Loading data...</p>}




      {!isLoading && temperature && temperature.current && (


        <div className="row weather-cards">


          <div className="col-lg-3 col-sm-6 col-12 weather-card">
            <Card
              title="Temperature"
              value={`${temperature.current.temp_c}°C`}
            ></Card>
          </div>


          <div className="col-lg-3 col-sm-6 col-12 weather-card">
            <Card
              title="Humidity"
              value={`${temperature.current.humidity}%`}
            ></Card>
          </div>


          <div className="col-lg-3 col-sm-6 col-12 weather-card">
            <Card
              title="Condition"
              value={`${temperature.current.condition.text}`}
            ></Card>
          </div>


          <div className="col-lg-3 col-sm-6 col-12 weather-card">
            <Card
              title="Wind Speed"
              value={`${temperature.current.wind_kph} kph`}
            ></Card>
          </div>


        </div>
      )}



    </div>
  );
}