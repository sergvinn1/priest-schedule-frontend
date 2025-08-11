// src/App.jsx
import { NavLink, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage'; // Скоро створимо
import AdminPage from '../pages/AdminPage'; // Скоро створимо

function App() {
  return (
    <>
      <header className="main-header">
        <div className="container">
          <h1>Розклад чергувань духовенства</h1>
          <nav className="main-nav">
            <ul>
              <li>
                {/* NavLink автоматично додає клас 'active' для активного посилання */}
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                  Перегляд
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
                  Адмін
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content container">
        {/* Routes визначає маршрути та їх компоненти */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Можна додати Route для 404 сторінки */}
          <Route path="*" element={<h2>Сторінку не знайдено!</h2>} />
        </Routes>
      </main>

      <footer className="main-footer">
        <div className="container">
          <p>&copy; 2025 Графік чергувань. Всі права захищено.</p>
        </div>
      </footer>
    </>
  );
}

export default App;