import { Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Repositorio from "./pages/Repositorio";

const Rotas = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/repositorio/:repositorio" element={<Repositorio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Rotas;
