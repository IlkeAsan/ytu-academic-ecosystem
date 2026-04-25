import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
<Route path="/profile" element={<Profile />} />;
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ilan-ver" element={<CreateListing />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
