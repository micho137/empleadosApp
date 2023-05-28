import { useState, useEffect } from "react";
import axiosController from "../helpers/AxiosController";
import { Link } from "react-router-dom";

export const CrearNovedad = () => {
  const [empleadoId, setEmpleadoId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState("");
  const [fecha, setFecha] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [tiposNovedad, setTiposNovedad] = useState([]);
  const [tipoNovedad, setTipoNovedad] = useState("");

  useEffect(() => {
    cargarEmpleados();
    cargarTiposNovedad();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const response = await axiosController.get("/empleados");
      setEmpleados(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarTiposNovedad = async () => {
    try {
      const response = await axiosController.get("/novedades");
      setTiposNovedad(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCrearNovedad = async (e) => {
    e.preventDefault();

    const nuevaNovedad = {
      empleado_id: empleadoId,
      novedad_id: tipoNovedad,
      valor: valor,
      fecha: fecha,
    };

    try {
      const response = await axiosController.post("/crear-novedad", nuevaNovedad);
      console.log(response.data);
      setEmpleadoId("");
      setDescripcion("");
      setValor("");
      setFecha("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Crear nueva novedad</h2>
      <form onSubmit={handleCrearNovedad} className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-primary block mb-2">ID del empleado:</label>
          <select
            className="border-2 border-primary px-4 py-2 rounded w-full"
            value={empleadoId}
            onChange={(e) => setEmpleadoId(e.target.value)}
          >
            <option value="">Seleccione un empleado</option>
            {empleados.map((empleado) => (
              <option key={empleado.id} value={empleado.id}>
                {empleado.id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-primary block mb-2">Tipo de novedad:</label>
          <select
            className="border-2 border-primary px-4 py-2 rounded w-full"
            value={tipoNovedad}
            onChange={(e) => setTipoNovedad(e.target.value)}
          >
            <option value="">Seleccione un tipo de novedad</option>
            {tiposNovedad.map((tipo) => (
              <option key={tipo.idnovedad} value={tipo.idnovedad}>
                {tipo.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-primary block mb-2">Descripción:</label>
          <textarea
            className="border-2 border-primary px-4 py-2 rounded w-full"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="text-primary block mb-2">Valor:</label>
          <input
            className="border-2 border-primary px-4 py-2 rounded w-full"
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <div>
          <label className="text-primary block mb-2">Fecha:</label>
          <input
            className="border-2 border-primary px-4 py-2 rounded w-full"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <button className="bg-primary text-white py-2 px-4 rounded" type="submit">
            Crear Novedad
          </button>
        </div>
      </form>
      <Link to="/" className="bg-primary text-white px-4 py-2 rounded mt-4 inline-block">
        Volver a Inicio
      </Link>
    </div>
  );
};
