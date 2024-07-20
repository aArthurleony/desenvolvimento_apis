import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import TelaInicial from "../Pages/TelaInicial";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<TelaInicial />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
