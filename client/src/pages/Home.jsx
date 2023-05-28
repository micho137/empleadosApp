import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const onNavigate = (ruta)=>{
    navigate(ruta)
  }

  return (
    <div className="grid grid-cols-2 items-center justify-betweens w-full h-full border-2 p-5 gap-x-5 gap-y-5 rounded-xl border-primary">
      <button onClick={()=>onNavigate("/crearEmpleado")} className="btn btn-primary">Registrar Empelado</button>
      <button onClick={()=>onNavigate("/listarEmpleado")} className="btn btn-primary">Listar Empleados</button>
      <button onClick={()=>onNavigate("/crearNovedad")} className="btn btn-primary">Registrar un empleado con novedad</button>
      <button onClick={()=>onNavigate("/listarNovedad")} className="btn btn-primary">Listar Empleados con novedad</button>
      <button onClick={()=>onNavigate("/crearNuevaNovedad")} className="btn btn-primary">Crear novedad</button>
    </div>
  );
};
