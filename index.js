const http = require('http');
const readlineSync = require('readline-sync');

const API_KEY = '02f4f5427a094a5f92e172023243008'; // Replace with your WeatherAPI key
const BASE_URL = 'http://api.weatherapi.com/v1/current.json?key=b5e55a4d612344d086b172945243008&q=india&aqi=nonoi';

function getWeather(city) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}`;

  http.get(url, (response) => {
    let data = '';

    // Listen for data chunks
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Handle the complete response
    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);

        if (parsedData.error) {
          console.error('Error:', parsedData.error.message);
          return;
        }

        const { location, current } = parsedData;
        console.log(`Weather in ${location.name}, ${location.country}:`);
        console.log(`Temperature: ${current.temp_c}°C`);
        console.log(`Weather Description: ${current.condition.text}`);
        console.log(`Humidity: ${current.humidity}%`);
        console.log(`Wind Speed: ${current.wind_kph} km/h`);
      } catch (error) {
        console.error('Error parsing weather data:', error.message);
      }
    });

  }).on('error', (error) => {
    console.error('Error fetching weather data:', error.message);
  });
}

function main() {
  const city = readlineSync.question('Enter the city or location: ');
  getWeather(city);
}

main();
