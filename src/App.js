import { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState('');

  const key = '1d7b32b79e8bec75618824ca13160518';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&lang={uk}&appid=${key}`;

  const searchWeather = e => {
    if (e.key === 'Enter') {
      axios.get(url).then(response => setData(response.data));
      setTown('');
    }
  };

  return (
    <div className="App">
      <div className="inp-field">
        <input
          type="text"
          value={town}
          onChange={e => setTown(e.target.value)}
          onKeyDown={searchWeather}
          placeholder="Enter location"
        />
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
        </div>
        <div className="temp">{data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}</div>
        <div className="desc">{data.weather ? <p>{data.weather[0].main}</p> : null}</div>
      </div>
      {data.name !== undefined && (
        <div className="footer">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{`${data.wind.speed} `}M/s</p> : null}
            <p>Wind</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
