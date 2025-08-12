// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react'; // Важливо: useState і useEffect
import axios from 'axios';
import ScheduleDisplay from '../components/ScheduleDisplay'; // Шлях: ../components/ScheduleDisplay

function HomePage() {
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(() => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)));
    return firstDayOfWeek.toISOString().split('T')[0];
  });
  const [selectedEndDate, setSelectedEndDate] = useState(() => {
    const today = new Date();
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1) + 6));
    return lastDayOfWeek.toISOString().split('T')[0];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priests, setPriests] = useState([]); // Стан для списку священників
  const [selectedPriest, setSelectedPriest] = useState(''); // Стан для обраного священника для фільтрації

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchPriests = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/priests`);
        setPriests(res.data);
      } catch (err) {
        console.error("Error fetching priests:", err);
      }
    };
    fetchPriests();
  }, [API_BASE_URL]);

  const fetchSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/schedule`, {
        params: {
          startDate: selectedStartDate,
          endDate: selectedEndDate,
          priestId: selectedPriest
        }
      });
      setCurrentSchedule(response.data);
    } catch (err) {
      console.error('Помилка завантаження розкладу:', err);
      setError('Не вдалося завантажити розклад. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [selectedStartDate, selectedEndDate, selectedPriest]);

  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setSelectedEndDate(e.target.value);
  };

  const handlePriestChange = (e) => {
    setSelectedPriest(e.target.value);
  };

  return (
    <section className="schedule-section container">
      <h2>Поточний Розклад Чергувань</h2>
      <div className="date-range-selector">
        <label htmlFor="startDate">З:</label>
        <input
          type="date"
          id="startDate"
          value={selectedStartDate}
          onChange={handleStartDateChange}
        />
        <label htmlFor="endDate">По:</label>
        <input
          type="date"
          id="endDate"
          value={selectedEndDate}
          onChange={handleEndDateChange}
        />
        <label htmlFor="priestFilter">Фільтр по священнику:</label>
        <select
          id="priestFilter"
          value={selectedPriest}
          onChange={handlePriestChange}
        >
          <option value="">Всі священники</option>
          {priests.map(priest => (
            <option key={priest._id} value={priest._id}>{priest.name}</option>
          ))}
        </select>
        <button onClick={fetchSchedule}>Показати розклад</button>
      </div>

      {loading && <p className="loading-message">Завантаження розкладу...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <ScheduleDisplay schedule={currentSchedule} />}
    </section>
  );
}

export default HomePage; // !!! ПЕРЕКОНАЙТЕСЬ, ЩО ЦЕЙ РЯДОК Є !!!