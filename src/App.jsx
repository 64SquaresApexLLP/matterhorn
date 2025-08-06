import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Matters from "./pages/Matters";
import Entries from "./pages/Entries";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import NewEntry from "./pages/NewEntry";
import Demo from "./components/Demo";
import RefDataMgt from "./pages/RefDataMgt";

const layoutRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/clients", element: <Clients /> },
  { path: "/matters", element: <Matters /> },
  { path: "/entries", element: <Entries /> },
  { path: "/invoices", element: <Invoices /> },
  { path: "/payments", element: <Payments /> },
  { path: "/reports", element: <Reports /> },
  { path: "/users", element: <Users /> },
  { path: "/edit-profile", element: <EditProfile /> },
  { path: "/settings", element: <Settings /> },
  { path: "/reference-data-mgt/", element: <RefDataMgt /> },
  { path: "/entries/new", element: <NewEntry /> },
  { path: "/invoices/demo", element: <Demo /> },
];

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes inside Layout */}
        {layoutRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={<Layout>{element}</Layout>} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
