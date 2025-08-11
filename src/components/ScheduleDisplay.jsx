// src/components/ScheduleDisplay.jsx

import React from 'react';

function ScheduleDisplay({ schedule }) {
  if (!schedule || schedule.length === 0) {
    return <p className="no-schedule">На обраний діапазон дат розкладу немає.</p>;
  }

  return (
    // Змінено className на "schedule-display"
    <div className="schedule-display">
      {schedule.map(entry => (
        <div key={entry._id} className="schedule-entry">
          <h3>
            {new Date(entry.startDate).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            {' - '}
            {new Date(entry.endDate).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </h3>

          {/* Використовуємо ul/li для списку ролей та імен */}
          <ul>
            <li>
              <span className="role">Служащий:</span>
              <span>{entry.servingPriest ? entry.servingPriest.name : 'Невідомий Священник'}</span>
            </li>
            <li>
              <span className="role">Черговий по храму:</span>
              <span>{entry.churchDutyPriest ? entry.churchDutyPriest.name : 'Невідомий Священник'}</span>
            </li>
            <li>
              <span className="role">Черговий по місту:</span>
              <span>{entry.cityDutyPriest ? entry.cityDutyPriest.name : 'Невідомий Священник'}</span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ScheduleDisplay;