import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Hooks/AuthContext";
import HomePage from "./Pages/HomePage/HomePage";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import CreateUser from "./Components/CreateUser/CreateUser";
import AddTransaction from "./Components/AddTransaction/AddTransaction";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  const { authState } = useAuth();
  const { username } = authState;

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />   
          <Route path="login" element={<Login />} />  
          <Route
            path="dashboard/:id"
            element={username ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="createuser"
            element={username ? <CreateUser /> : <Navigate to="/login" />}
          />
          <Route
            path="addtransaction/:id"
            element={username ? <AddTransaction /> : <Navigate to="/login" />}
          />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
