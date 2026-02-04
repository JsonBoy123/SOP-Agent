import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Remove these lines if the CSS files don’t exist yet
// import './styles/LoginPage.css';
// import './styles/SignupPage.css';
// import './styles/DashboardPage.css';

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
);
