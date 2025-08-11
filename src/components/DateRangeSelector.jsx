// src/components/DateRangeSelector.jsx
import React, { useState } from 'react';

function DateRangeSelector({ startDate: initialStartDate, endDate: initialEndDate, onDateRangeChange }) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleShowScheduleClick = () => {
    // Передаємо вибрані дати в батьківський компонент
    if (onDateRangeChange) {
      onDateRangeChange({ startDate, endDate });
    }
  };

  return (
    <div className="date-range-selector">
      <label htmlFor="startDate">З:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <label htmlFor="endDate">По:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={handleEndDateChange}
      />
      <button onClick={handleShowScheduleClick}>Показати розклад</button>
    </div>
  );
}

export default DateRangeSelector;