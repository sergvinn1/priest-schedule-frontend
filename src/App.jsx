import { Routes, Route, NavLink } from 'react-router-dom'; // Видаляємо BrowserRouter as Router
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import PriestAdminPage from './pages/PriestAdminPage';
import './index.css';

function App() {
  return (
    <> {/* Використовуємо React.Fragment або короткий синтаксис <> </> */}
      <header className="main-header">
        <div className="container">
          <h1>Розклад чергувань духовенства</h1>
          <nav className="main-nav">
            <ul>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Перегляд
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Розклад (Адмін)
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/priests" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Священники (Адмін)
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/priests" element={<PriestAdminPage />} />
          </Routes>
        </div>
      </main>
      <footer className="main-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Розклад чергувань. Всі права захищені.</p>
        </div>
      </footer>
    </>
  );
}

export default App;