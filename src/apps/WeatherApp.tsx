import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Thermometer, Droplets, Wind, Eye } from 'lucide-react';

const WeatherApp = () => {
  const [city, setCity] = useState('New York');
  const [searchInput, setSearchInput] = useState('');

  // Mock weather data
  const weatherData = {
    city: city,
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
    forecast: [
      { day: 'Today', high: 24, low: 18, condition: '🌤️' },
      { day: 'Tomorrow', high: 26, low: 20, condition: '☀️' },
      { day: 'Wed', high: 23, low: 17, condition: '🌧️' },
      { day: 'Thu', high: 25, low: 19, condition: '⛅' },
    ]
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-sky-50 p-4 pt-16 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Weather</h2>

        {/* Search */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search city..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Search size={16} />
          </motion.button>
        </div>

        {/* Current Weather */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-4 mb-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} />
            <span className="text-sm opacity-90">{weatherData.city}</span>
          </div>
          
          <div className="text-center mb-3">
            <div className="text-4xl mb-2">🌤️</div>
            <div className="text-3xl font-bold mb-1">{weatherData.temperature}°C</div>
            <div className="text-sm opacity-90">{weatherData.condition}</div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <Droplets size={16} className="mx-auto mb-1 opacity-80" />
              <div className="text-xs opacity-80">Humidity</div>
              <div className="font-semibold text-sm">{weatherData.humidity}%</div>
            </div>
            <div>
              <Wind size={16} className="mx-auto mb-1 opacity-80" />
              <div className="text-xs opacity-80">Wind</div>
              <div className="font-semibold text-sm">{weatherData.windSpeed} km/h</div>
            </div>
            <div>
              <Eye size={16} className="mx-auto mb-1 opacity-80" />
              <div className="text-xs opacity-80">Visibility</div>
              <div className="font-semibold text-sm">{weatherData.visibility} km</div>
            </div>
          </div>
        </motion.div>

        {/* Forecast */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">4-Day Forecast</h3>
          <div className="space-y-3">
            {weatherData.forecast.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{day.condition}</span>
                  <span className="font-medium text-gray-800 text-sm">{day.day}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-800 text-sm">{day.high}°</span>
                  <span className="text-gray-500 ml-1 text-sm">{day.low}°</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;