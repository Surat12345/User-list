import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}
