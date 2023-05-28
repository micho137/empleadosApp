import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Formulario } from "../components/Formulario";
import { EmpleadosList } from "../pages/EmpladosList";
import { CrearNovedad } from "../pages/CrearNovedad";
import { EmpleadosListNovedad } from "../pages/EmpleadosListNovedad";
import { CrearNovedadN } from "../pages/CrearNuevaNovedad";

export const AppRouter = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crearEmpleado" element={<Formulario />} />
          <Route path="/listarEmpleado" element={<EmpleadosList />} />
          <Route path="/crearNovedad" element={<CrearNovedad/>}/>
          <Route path="/listarNovedad" element={<EmpleadosListNovedad/>}/>
          <Route path="/crearNuevaNovedad" element={<CrearNovedadN/>}/>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
