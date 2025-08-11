// src/pages/HomePage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import DateRangeSelector from '../src/components/DateRangeSelector';
import ScheduleDisplay from '../src/components/ScheduleDisplay';

function HomePage() {
  // const [priestsData, setPriestsData] = useState([]); // <--- ВИДАЛИТИ ЦЕЙ РЯДОК - БІЛЬШЕ НЕ ПОТРІБЕН ДЛЯ HOME PAGE
  const [currentSchedule, setCurrentSchedule] = useState([]); // Стан для розкладу
  const [selectedStartDate, setSelectedStartDate] = useState(() => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - (today.getDay() + 6) % 7));
    return firstDayOfWeek.toISOString().split('T')[0];
  });
  const [selectedEndDate, setSelectedEndDate] = useState(() => {
    const today = new Date();
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - (today.getDay() + 6) % 7 + 6));
    return lastDayOfWeek.toISOString().split('T')[0];
  });
  const [isLoading, setIsLoading] = useState(true); // Стан для індикатора завантаження
  const [error, setError] = useState(null); // Стан для помилок

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Функція fetchPriests більше не потрібна в HomePage, якщо її дані не використовуються.
  // Можна її повністю видалити, або залишити, якщо вона буде потрібна для інших цілей у HomePage.
  // Для уникнення попередження ESLint, якщо вона не використовується, краще видалити:
  /*
  const fetchPriests = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/priests`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPriestsData(data);
    } catch (err) {
      console.error("Error fetching priests:", err);
      setError("Не вдалося завантажити список священників.");
    }
  }, [API_BASE_URL]);
  */


  const fetchSchedule = useCallback(async (startDate, endDate) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/schedule/range?start=${startDate}&end=${endDate}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCurrentSchedule(data);
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setError("Не вдалося завантажити розклад. Спробуйте пізніше.");
      setCurrentSchedule([]);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    // fetchPriests(); // <--- ВИДАЛИТИ ЦЕЙ ВИКЛИК
    fetchSchedule(selectedStartDate, selectedEndDate);
  }, [fetchSchedule, selectedStartDate, selectedEndDate]); // Залежності useEffect - прибрано fetchPriests

  const handleDateRangeChange = ({ startDate, endDate }) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    fetchSchedule(startDate, endDate);
  };

  return (
    <section id="schedule" className="schedule-section">
      <h2>Поточний розклад</h2>
      <DateRangeSelector
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        onDateRangeChange={handleDateRangeChange}
      />

      {error && <div className="error-message">Помилка: {error}</div>}
      {isLoading ? (
        <div className="schedule-display">
          <p className="loading-message">Завантаження розкладу...</p>
        </div>
      ) : (
        <ScheduleDisplay
          schedule={currentSchedule}
        />
      )}
    </section>
  );
}

export default HomePage;