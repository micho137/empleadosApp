import { useState } from "react";
import axiosController from "../helpers/AxiosController";
import { Link } from "react-router-dom";

export const CrearNovedadN = () => {
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleCrearNovedad = async (e) => {
    e.preventDefault();

    const nuevaNovedad = {
      descripcion: descripcion,
      tipo: tipo,
    };

    try {
      const response = await axiosController.post(
        "/crearNuevaNovedad",
        nuevaNovedad
      );
      setMensaje(response.data.msg);
      setDescripcion("");
      setTipo("");
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear la novedad");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Crear Nueva Novedad</h2>
      <form onSubmit={handleCrearNovedad} className="max-w-md mx-auto mb-5">
        <div className="mb-4">
          <label htmlFor="descripcion" className="text-primary">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            className="border-2 border-primary px-4 py-2 rounded w-full"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="tipo" className="text-primary">
            Tipo:
          </label>
          <input
            id="tipo"
            className="border-2 border-primary px-4 py-2 rounded w-full"
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </div>
        <button className="bg-primary text-white py-2 px-4 rounded" type="submit">
          Crear Novedad
        </button>
      </form>
      {mensaje && <p className="my-2">{mensaje}</p>}
      <Link to="/" className="bg-primary text-white px-4 py-2 rounded mt-4">
        Volver a Inicio
      </Link>
    </div>
  );
};
