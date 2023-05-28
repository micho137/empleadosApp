import { useEffect, useState } from "react";
import axiosController from "../helpers/AxiosController";
import { Link } from "react-router-dom";

export const EmpleadosList = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const response = await axiosController.get("/empleados");
      setEmpleados(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Listado de Empleados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {empleados.length === 0 ? (
          <p>No hay empleados disponibles.</p>
        ) : (
          empleados.map((empleado) => (
            <div
              key={empleado.id}
              className="border-2 border-primary p-4"
            >
              <strong className="text-primary">Nombre:</strong>{" "}
              {empleado.nombre}
              <br />
              <strong className="text-primary">Apellidos:</strong>{" "}
              {empleado.apellidos}
              <br />
              <strong className="text-primary">Dirección:</strong>{" "}
              {empleado.direccion}
              <br />
              <strong className="text-primary">Teléfono:</strong>{" "}
              {empleado.telefono}
              <br />
              <strong className="text-primary">Dependencia:</strong>{" "}
              {empleado.dependencia}
              <br />
              <hr className="my-2" />
            </div>
          ))
        )}
      </div>
      <Link
        to="/"
        className="bg-primary text-white px-4 py-2 rounded mt-4 "
      >
        Volver a Inicio
      </Link>
    </div>
  );
};
