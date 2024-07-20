import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import TelaInicial from "../Pages/TelaInicial";
import Login from "../Pages/Login";




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home   />} />
        <Route path="/telainicial" element={<TelaInicial />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
