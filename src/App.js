import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "./pages/Form";
import UserSite from "./pages/UserSite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/form" />} />
        <Route path="/form" element={<Form/>} />
        <Route path="/:slug" element={<UserSite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
