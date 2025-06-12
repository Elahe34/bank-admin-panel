// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import Setting from "./Components/Pages/Setting";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ClientsTable from "./Components/ClientsTable";
import RolesTable from "./Components/RoulesTable";
import UsersTable from "./Components/UsersTable";
import ClientDetails from "./Components/Clientssection/clientDetails";
import Massages from "./Components/Pages/Massages";
import SecurityPolicies from "./Components/Pages/SecurityPolicies ";
import ReportSummary from "./Components/Pages/ReportSummary ";

function App() {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<UsersTable />} />
          <Route path="ClietsList" element={<UsersTable />} />
          <Route path="RolesList" element={<RolesTable />} />
          <Route path="/Clientsinformation" element={<ClientsTable />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/massages" element={<Massages />} />
          <Route path="/security" element={<SecurityPolicies />} />
          <Route path="/reports" element={<ReportSummary />} />

          <Route path="clients/:clientId/" element={<ClientDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
