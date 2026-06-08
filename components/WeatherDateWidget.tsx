'use client';

import { useEffect, useState } from 'react';

export default function WeatherDateWidget() {
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [weather, setWeather] = useState<{ temp: number | null, city: string }>({ temp: null, city: 'New Delhi' });

  const fetchWeather = () => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          setWeather({ temp: Math.round(data.current_weather.temperature), city: 'New Delhi' });
        }
      })
      .catch(err => console.error("Weather fetch error", err));
  };

  useEffect(() => {
    // Initial fetches
    fetchWeather();

    const updateTime = () => {
      const date = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
      const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
      
      setDateStr(date.toLocaleDateString('en-US', dateOptions));
      setTimeStr(date.toLocaleTimeString('en-US', timeOptions));
    };

    updateTime();
    
    // Update clock every second
    const clockInterval = setInterval(updateTime, 1000);
    
    // Update weather every 15 minutes (900000 ms)
    const weatherInterval = setInterval(fetchWeather, 900000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  // Prevent hydration mismatch by rendering nothing on server
  if (!dateStr) return <div className="hidden lg:block w-40"></div>;

  return (
    <div className="hidden lg:block text-[10px] xl:text-xs font-semibold text-gray-500 uppercase tracking-widest border-l-2 border-primary pl-3 py-1 whitespace-nowrap">
      {dateStr}, {timeStr}<br/>
      <span className="text-foreground">
        {weather.city}{weather.temp !== null ? ` ${weather.temp}°C` : ''}
      </span>
    </div>
  );
}
