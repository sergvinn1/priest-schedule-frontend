// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [scheduleEntries, setScheduleEntries] = useState([]);
  const [priests, setPriests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newEntry, setNewEntry] = useState({
    startDate: '',
    endDate: '',
    servingPriest: '',
    churchDutyPriest: '',
    cityDutyPriest: '' // Переконайтесь, що ця назва відповідає вашому бекенду
  });
  const [editingEntryId, setEditingEntryId] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [scheduleRes, priestsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/schedule`),
        axios.get(`${API_BASE_URL}/api/priests`)
      ]);
      setScheduleEntries(scheduleRes.data);
      setPriests(priestsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Не вдалося завантажити дані розкладу або священників.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingEntryId) {
        await axios.put(`${API_BASE_URL}/api/schedule/${editingEntryId}`, newEntry);
        alert('Запис успішно оновлено!');
      } else {
        await axios.post(`${API_BASE_URL}/api/schedule`, newEntry);
        alert('Запис успішно додано!');
      }
      setNewEntry({
        startDate: '',
        endDate: '',
        servingPriest: '',
        churchDutyPriest: '',
        cityDutyPriest: ''
      });
      setEditingEntryId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving schedule entry:", err);
      setError("Помилка збереження запису розкладу. Перевірте всі поля.");
    }
  };

  const handleEdit = (entry) => {
    setEditingEntryId(entry._id);
    setNewEntry({
      startDate: entry.startDate.split('T')[0],
      endDate: entry.endDate.split('T')[0],
      servingPriest: entry.servingPriest ? entry.servingPriest._id : '',
      churchDutyPriest: entry.churchDutyPriest ? entry.churchDutyPriest._id : '',
      cityDutyPriest: entry.cityDutyPriest ? entry.cityDutyPriest._id : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
      setError(null);
      try {
        await axios.delete(`${API_BASE_URL}/api/schedule/${id}`);
        alert('Запис успішно видалено!');
        fetchData();
      } catch (err) {
        console.error("Error deleting schedule entry:", err);
        setError("Помилка видалення запису розкладу.");
      }
    }
  };

  if (loading) return <p className="loading-message">Завантаження адмін-панелі...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <section className="admin-section container">
      <h2>Адмін-Панель</h2>
      <p>Ця сторінка дозволяє керувати записами розкладу.</p>

      <div className="admin-form-container">
        <h3>{editingEntryId ? 'Редагувати запис' : 'Додати новий запис'}</h3>
        <form onSubmit={handleSubmit} className="schedule-form">
          <div className="form-group">
            <label htmlFor="startDate">Дата початку:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={newEntry.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Дата закінчення:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={newEntry.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="servingPriest">Служащий:</label>
            <select
              id="servingPriest"
              name="servingPriest"
              value={newEntry.servingPriest} // Тут servingPriest
              onChange={handleChange}
              required
            >
              <option value="">Оберіть священника</option>
              {priests.map(priest => (
                <option key={priest._id} value={priest._id}>{priest.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="churchDutyPriest">Черговий по храму:</label>
            <select
              id="churchDutyPriest"
              name="churchDutyPriest"
              value={newEntry.churchDutyPriest}
              onChange={handleChange}
              required
            >
              <option value="">Оберіть священника</option>
              {priests.map(priest => (
                <option key={priest._id} value={priest._id}>{priest.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cityDutyPriest">Черговий по місту:</label>
            <select
              id="cityDutyPriest"
              name="cityDutyPriest"
              value={newEntry.cityDutyPriest} // Тут cityDutyPriest
              onChange={handleChange}
              required
            >
              <option value="">Оберіть священника</option>
              {priests.map(priest => (
                <option key={priest._id} value={priest._id}>{priest.name}</option>
              ))}
            </select>
          </div>
          <button type="submit">{editingEntryId ? 'Оновити запис' : 'Додати запис'}</button>
          {editingEntryId && <button type="button" onClick={() => { setNewEntry({ startDate: '', endDate: '', servingPriest: '', churchDutyPriest: '', cityDutyPriest: '' }); setEditingEntryId(null); }}>Скасувати</button>}
        </form>
      </div>

      <h3 style={{ marginTop: '40px', textAlign: 'center' }}>Існуючі записи розкладу</h3>
      <div className="schedule-list">
        {scheduleEntries.map(entry => (
          <div key={entry._id} className="schedule-item">
            <p><strong>Дати:</strong> {new Date(entry.startDate).toLocaleDateString('uk-UA')} - {new Date(entry.endDate).toLocaleDateString('uk-UA')}</p>
            <p><strong>Служащий:</strong> {entry.servingPriest ? entry.servingPriest.name : 'Невідомий Священник'}</p>
            <p><strong>Черговий по храму:</strong> {entry.churchDutyPriest ? entry.churchDutyPriest.name : 'Невідомий Священник'}</p>
            <p><strong>Черговий по місту:</strong> {entry.cityDutyPriest ? entry.cityDutyPriest.name : 'Невідомий Священник'}</p>
            <div className="item-actions">
              <button onClick={() => handleEdit(entry)} className="edit-button">Редагувати</button>
              <button onClick={() => handleDelete(entry._id)} className="delete-button">Видалити</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminPage; // !!! ПЕРЕКОНАЙТЕСЬ, ЩО ЦЕЙ РЯДОК Є !!!