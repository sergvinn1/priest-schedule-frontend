// src/components/ScheduleDisplay.jsx
import React from 'react';

// Допоміжна функція для форматування дати
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('uk-UA', options);
};

function ScheduleDisplay({ schedule, getPriestNameById }) {
  if (!schedule || schedule.length === 0) {
    return (
      <div className="schedule-display">
        <p className="loading-message">Розклад на вибраний період відсутній.</p>
      </div>
    );
  }

  return (
    <div className="schedule-display">
      {schedule.map((week, index) => (
        <div key={index} className="schedule-entry">
          {/* Використовуємо функцію formatDate для відображення дат */}
          <h3>{formatDate(week.startDate)} - {formatDate(week.endDate)}</h3>
          <ul>
            <li><span className="role">Служащий:</span> {getPriestNameById(week.servingPriestId)}</li>
            <li><span className="role">Черговий по храму:</span> {getPriestNameById(week.churchDutyPriestId)}</li>
            <li><span className="role">Черговий по місту:</span> {getPriestNameById(week.cityDutyPriestId)}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ScheduleDisplay;