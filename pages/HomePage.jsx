// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import DateRangeSelector from '../src/components/DateRangeSelector'; // Скоро створимо
import ScheduleDisplay from '../src/components/ScheduleDisplay'; // Скоро створимо

// Імітація даних про священників (пізніше буде з БД)
const priestsData = [
    { id: 1, name: "протоієрей Віталій Голоскевич" },
    { id: 2, name: "протоієрей Вячеслав Буданевич" },
    { id: 3, name: "протоієрей Іоан Дрозд" },
    { id: 4, name: "протоієрей Василій Коровай" },
    { id: 5, name: "протоієрей Димитрій Пилинь" },
    { id: 6, name: "архімандрит Софроній (Чуприна)" }
];

// Імітація даних про чергування
const mockScheduleData = [
    {
        startDate: '2025-08-11',
        endDate: '2025-08-17',
        servingPriestId: 3, // Іоан Дрозд
        churchDutyPriestId: 1, // Віталій Голоскевич
        cityDutyPriestId: 6    // Софроній (Чуприна)
    },
    {
        startDate: '2025-08-18',
        endDate: '2025-08-24',
        servingPriestId: 4, // Василій Коровай
        churchDutyPriestId: 2, // Вячеслав Буданевич
        cityDutyPriestId: 1    // Віталій Голоскевич
    },
    {
        startDate: '2025-08-25', // Дата коректна за вашим зразком, хоча була 15.07
        endDate: '2025-08-31',
        servingPriestId: 5, // Димитрій Пилинь
        churchDutyPriestId: 3, // Іоан Дрозд
        cityDutyPriestId: 2    // Вячеслав Буданевич
    },
    {
        startDate: '2025-09-01',
        endDate: '2025-09-07',
        servingPriestId: 6, // Софроній (Чуприна)
        churchDutyPriestId: 4, // Василій Коровай
        cityDutyPriestId: 3    // Іоан Дрозд
    },
    {
        startDate: '2025-09-08',
        endDate: '2025-09-14',
        servingPriestId: 1, // Віталій Голоскевич
        churchDutyPriestId: 5, // Димитрій Пилинь
        cityDutyPriestId: 4    // Василій Коровай
    },
    {
        startDate: '2025-09-15',
        endDate: '2025-09-21',
        servingPriestId: 2, // Вячеслав Буданевич
        churchDutyPriestId: 6, // Софроній (Чуприна)
        cityDutyPriestId: 5    // Димитрій Пилинь
    }
];

function HomePage() {
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState('2025-06-30');
  const [selectedEndDate, setSelectedEndDate] = useState('2025-08-10');

  // Функція для фільтрації розкладу за діапазоном дат
  const filterSchedule = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return mockScheduleData.filter(entry => {
      const entryStart = new Date(entry.startDate);
      const entryEnd = new Date(entry.endDate);

      // Перевіряємо, чи є перетин між вибраним діапазоном і діапазоном чергування
      return (entryStart <= end && entryEnd >= start);
    });
  };

  // Викликається при першому рендерингу компонента та при зміні дат
  useEffect(() => {
    setCurrentSchedule(filterSchedule(selectedStartDate, selectedEndDate));
  }, [selectedStartDate, selectedEndDate]); // Залежності: функція запускається при зміні цих state

  // Обробник зміни дат з компонента DateRangeSelector
  const handleDateRangeChange = (dates) => {
    setSelectedStartDate(dates.startDate);
    setSelectedEndDate(dates.endDate);
  };

  // Допоміжна функція для отримання імені священника за ID
  const getPriestNameById = (id) => {
    const priest = priestsData.find(p => p.id === id);
    return priest ? priest.name : "Невідомий священник";
  };

  return (
    <section id="schedule" className="schedule-section">
      <h2>Розклад чергувань</h2>
      <DateRangeSelector
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        onDateRangeChange={handleDateRangeChange}
      />
      <ScheduleDisplay
        schedule={currentSchedule}
        getPriestNameById={getPriestNameById}
      />
    </section>
  );
}

export default HomePage;