// src/components/ScheduleDisplay.jsx

import React from 'react';

function ScheduleDisplay({ schedule }) {
  // Перевірка, чи є розклад і чи він не порожній
  if (!schedule || schedule.length === 0) {
    return <p className="no-schedule">На обраний діапазон дат розкладу немає.</p>;
  }

  return (
    <div className="schedule-container">
      {schedule.map(entry => (
        <div key={entry._id} className="schedule-entry">
          {/* Форматуємо дати для відображення */}
          <h3>
            {new Date(entry.startDate).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            {' - '}
            {new Date(entry.endDate).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </h3>
          
          {/* Використовуємо об'єкти священників, які вже прийшли з API */}
          <p>
            Служащий: 
            <span>
              {entry.servingPriest ? entry.servingPriest.name : 'Невідомий Священник'}
            </span>
          </p>
          <p>
            Черговий по храму: 
            <span>
              {entry.churchDutyPriest ? entry.churchDutyPriest.name : 'Невідомий Священник'}
            </span>
          </p>
          <p>
            Черговий по місту: 
            <span>
              {entry.cityDutyPriest ? entry.cityDutyPriest.name : 'Невідомий Священник'}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default ScheduleDisplay;