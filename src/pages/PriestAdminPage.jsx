// src/pages/PriestAdminPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PriestAdminPage() {
    const [priests, setPriests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPriestName, setNewPriestName] = useState('');
    const [editingPriestId, setEditingPriestId] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchPriests();
    }, []);

    const fetchPriests = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/priests`);
            setPriests(res.data);
        } catch (err) {
            console.error("Error fetching priests:", err);
            setError("Не вдалося завантажити список священників.");
        } finally {
            setLoading(false);
        }
    };

    const handleNameChange = (e) => {
        setNewPriestName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!newPriestName.trim()) {
            setError("Ім'я священника не може бути пустим.");
            return;
        }

        try {
            if (editingPriestId) {
                await axios.put(`${API_BASE_URL}/api/priests/${editingPriestId}`, { name: newPriestName });
                alert('Священника успішно оновлено!');
            } else {
                await axios.post(`${API_BASE_URL}/api/priests`, { name: newPriestName });
                alert('Священника успішно додано!');
            }
            setNewPriestName('');
            setEditingPriestId(null);
            fetchPriests();
        } catch (err) {
            console.error("Error saving priest:", err);
            setError("Помилка збереження священника. Можливо, таке ім'я вже існує або проблема з сервером.");
        }
    };

    const handleEdit = (priest) => {
        setEditingPriestId(priest._id);
        setNewPriestName(priest.name);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Ви впевнені, що хочете видалити цього священника? Це може вплинути на існуючі записи розкладу.')) {
            setError(null);
            try {
                await axios.delete(`${API_BASE_URL}/api/priests/${id}`);
                alert('Священника успішно видалено!');
                fetchPriests();
            } catch (err) {
                console.error("Error deleting priest:", err);
                setError("Помилка видалення священника. Перевірте, чи немає записів розкладу, пов'язаних з цим священником.");
            }
        }
    };

    if (loading) return <p className="loading-message">Завантаження священників...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <section className="admin-section container">
            <h2>Керування Священниками</h2>
            <p>Додавайте, редагуйте та видаляйте священників.</p>

            <div className="admin-form-container">
                <h3>{editingPriestId ? 'Редагувати священника' : 'Додати нового священника'}</h3>
                <form onSubmit={handleSubmit} className="schedule-form">
                    <div className="form-group">
                        <label htmlFor="priestName">Ім'я священника:</label>
                        <input
                            type="text"
                            id="priestName"
                            value={newPriestName}
                            onChange={handleNameChange}
                            placeholder="Введіть ім'я священника"
                            required
                        />
                    </div>
                    <button type="submit">{editingPriestId ? 'Оновити священника' : 'Додати священника'}</button>
                    {editingPriestId && <button type="button" onClick={() => { setNewPriestName(''); setEditingPriestId(null); }}>Скасувати</button>}
                </form>
            </div>

            <h3 style={{ marginTop: '40px', textAlign: 'center' }}>Існуючі священники</h3>
            <div className="schedule-list">
                {priests.map(priest => (
                    <div key={priest._id} className="schedule-item">
                        <p><strong>Ім'я:</strong> {priest.name}</p>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(priest)} className="edit-button">Редагувати</button>
                            <button onClick={() => handleDelete(priest._id)} className="delete-button">Видалити</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PriestAdminPage; // !!! ПЕРЕКОНАЙТЕСЬ, ЩО ЦЕЙ РЯДОК Є !!!