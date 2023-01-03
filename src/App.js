import Navbar from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import Login from "./components/Login";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import Billings from "./components/Billings";
import Protected from "./components/Protected"
import authService from "./auth/AuthServices";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        {/* <Route path = "admin" element = {<Admin />} ></Route> */}
        <Route
          path="/admin"
          element={
            <Protected isAdmin={authService.getCurrentUser()}>
              <Admin />
            </Protected>
          }
        />
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="billings" element={<Billings />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
