import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import Setting from "./Pages/Setting";

function App() {
  return (
    <Router>
      <AdminLayout />
      <Routes>
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
