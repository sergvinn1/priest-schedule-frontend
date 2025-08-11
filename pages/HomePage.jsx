// src/pages/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import DateRangeSelector from '../src/components/DateRangeSelector';
import ScheduleDisplay from '../src/components/ScheduleDisplay';

function HomePage() {
  const [priestsData, setPriestsData] = useState([]); // Стан для священників
  const [currentSchedule, setCurrentSchedule] = useState([]); // Стан для розкладу
  const [selectedStartDate, setSelectedStartDate] = useState(() => {
    const today = new Date();
    // Початкова дата: початок поточного тижня (понеділок)
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - (today.getDay() + 6) % 7));
    return firstDayOfWeek.toISOString().split('T')[0];
  });
  const [selectedEndDate, setSelectedEndDate] = useState(() => {
    const today = new Date();
    // Кінцева дата: кінець поточного тижня (неділя)
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - (today.getDay() + 6) % 7 + 6));
    return lastDayOfWeek.toISOString().split('T')[0];
  });
  const [isLoading, setIsLoading] = useState(true); // Стан для індикатора завантаження
  const [error, setError] = useState(null); // Стан для помилок

  // Базовий URL для API (змінна середовища Vite)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Функція для завантаження священників
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

  // Функція для завантаження розкладу
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
      setCurrentSchedule([]); // Очищаємо розклад у випадку помилки
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  // Завантажуємо дані при першому рендерингу компонента
  useEffect(() => {
    fetchPriests();
    // Викликаємо fetchSchedule з поточними вибраними датами при першому завантаженні
    fetchSchedule(selectedStartDate, selectedEndDate);
  }, [fetchPriests, fetchSchedule, selectedStartDate, selectedEndDate]); // Залежності useEffect

  // Обробник зміни дат з компонента DateRangeSelector
  const handleDateRangeChange = ({ startDate, endDate }) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    fetchSchedule(startDate, endDate); // Завантажуємо новий розклад при зміні дат
  };

  // Допоміжна функція для отримання імені священника за ID
  const getPriestNameById = (id) => {
    const priest = priestsData.find(p => p._id === id); // _id з MongoDB
    return priest ? priest.name : "Невідомий Священник";
  };

  return (
    <section id="schedule" className="schedule-section">
      <h2>Поточний Розклад Чергувань</h2>
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
          getPriestNameById={getPriestNameById}
        />
      )}
    </section>
  );
}

export default HomePage;