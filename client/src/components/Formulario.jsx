import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosController from "../helpers/AxiosController";

export const Formulario = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    dependencia: "",
  });

  const onNavigate = () => {
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      alert("Todos los campos son obligatorios");
      return
    } else {
      axiosController
        .post("/crearEmpleado", {
          nombre: formData.nombre,
          apellidos: formData.apellido,
          direccion: formData.direccion,
          telefono: formData.telefono,
          dependencia: formData.dependencia,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Empleado registrado con exito");
            setFormData({
              ...formData,
              nombre: "",
              apellido: "",
              direccion: "",
              telefono: "",
              dependencia: "",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <form
        className="flex flex-col justify-center items-center gap-y-5 w-full"
      >
        <div className="flex flex-col justify-center items-center gap-y-5 p-4 rounded-b-lg border border-primary w-96">
          <label className="border border-primary font-bold bg-secondary text-white w-full text-center py-3">
            Registro de Empleado
          </label>
          <input
            className="input input-bordered input-primary w-full max-w-sm"
            type="text"
            placeholder="Nombres"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
          />
          <input
            className="input input-bordered input-primary w-full max-w-sm"
            type="text"
            placeholder="Apellidos"
            value={formData.apellido}
            onChange={(e) =>
              setFormData({ ...formData, apellido: e.target.value })
            }
          />
          <input
            className="input input-bordered input-primary w-full max-w-sm"
            type="text"
            placeholder="Direccion"
            value={formData.direccion}
            onChange={(e) =>
              setFormData({ ...formData, direccion: e.target.value })
            }
          />
          <input
            className="input input-bordered input-primary w-full max-w-sm"
            type="text"
            placeholder="Telefono"
            value={formData.telefono}
            onChange={(e) =>
              setFormData({ ...formData, telefono: e.target.value })
            }
          />
          <input
            className="input input-bordered input-primary w-full max-w-sm"
            type="text"
            placeholder="Dependencia"
            value={formData.dependencia}
            onChange={(e) =>
              setFormData({ ...formData, dependencia: e.target.value })
            }
          />
          <div className="w-full flex justify-between items-center">
            <button
              onClick={onNavigate}
              className="btn btn-secondary rounded-lg font-bold"
            >
              Cancelar
            </button>
            <button onClick={handleSubmit} className="btn btn-primary rounded-lg font-bold">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
