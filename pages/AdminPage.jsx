// src/pages/AdminPage.jsx
import React, { useState, useEffect, useCallback } from 'react';

function AdminPage() {
  const [priests, setPriests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchPriests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/priests`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPriests(data);
    } catch (err) {
      console.error("Error fetching priests for admin:", err);
      setError("Не вдалося завантажити список священників для адмін-панелі.");
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchPriests();
  }, [fetchPriests]);

  return (
    <section id="admin" className="admin-section">
      <h2>Адмін-Панель</h2>
      <p>Ця сторінка буде служити для управління даними чергувань та священників.</p>
      <p>Функціонал буде додано на наступних етапах навчання.</p>

      {error && <div className="error-message">Помилка: {error}</div>}

      <h3>Список священників (для перевірки):</h3>
      {isLoading ? (
        <p>Завантаження священників...</p>
      ) : (
        <ul>
          {priests.map(priest => (
            <li key={priest._id}>{priest.name}</li>
          ))}
        </ul>
      )}
      {/* Тут будуть форми для додавання/редагування/видалення тощо */}
    </section>
  );
}

export default AdminPage;