// src/components/ScheduleDisplay.jsx
import React from 'react';

function ScheduleDisplay({ schedule, loading, error }) {
  // Визначаємо, чи є записи розкладу, щоб додати клас
  const hasEntries = schedule && schedule.length > 0;

  // Визначаємо динамічні класи для schedule-display
  const scheduleDisplayClasses = `schedule-display ${hasEntries ? 'has-entries' : ''}`;

  if (loading) {
    return (
      <div className={scheduleDisplayClasses}>
        <p className="loading-message">Завантаження розкладу...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={scheduleDisplayClasses}>
        <p className="error-message">Помилка: {error.message || 'Невідома помилка при завантаженні розкладу.'}</p>
      </div>
    );
  }

  if (!hasEntries) {
    return (
      <div className={scheduleDisplayClasses}>
        <p className="no-schedule">На обраний діапазон дат розкладу немає.</p>
      </div>
    );
  }

  return (
    <div className={scheduleDisplayClasses}>
      {schedule.map(entry => (
        <div key={entry._id} className="schedule-entry">
          <h3>
            {new Date(entry.startDate).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            {' - '}
            {new Date(entry.endDate).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </h3>

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