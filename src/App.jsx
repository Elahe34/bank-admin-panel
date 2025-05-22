import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from './Layout/AdminLayout';
import Setting from './Pages/Setting';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
