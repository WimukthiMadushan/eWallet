import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import CreateUser from "./Components/CreateUser/CreateUser";
import AddTransaction from "./Components/AddTransaction/AddTransaction";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="addtransaction" element={<AddTransaction />} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
