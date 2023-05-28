const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const { response, request } = require("express");

app.use(cors());
app.use(express());
app.use(express.json());

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "databaseemploy",
});

app.post("/crearEmpleado", (req=request, res=response) => {
  try {
    const { nombre, apellidos, direccion, dependencia, telefono } = req.body;
    db.query(
      `INSERT INTO empleado (nombre, apellidos, direccion, telefono, dependencia) VALUES ("${nombre}", "${apellidos}", "${direccion}", ${telefono}, "${dependencia}")`,
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ msg: "Error al crear el empleado" });
        }
        return res.status(200).json({ msg: "Empleado creado con éxito" });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al crear el empleado" });
  }
});

app.get("/empleados", (req=request, res=response) => {
  db.query("SELECT * FROM empleado", (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error al obtener los empleados" });
    }
    return res.status(200).json(results);
  });
});
/* app.get("/empleados-con-novedades", (req, res) => {
  db.query(
    "SELECT DISTINCT e.* FROM empleado e INNER JOIN novedadesempleados ne ON e.id = ne.empleado_id",
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al obtener los empleados con novedades" });
      }
      return res.status(200).json(results);
    }
  );
}); */

app.get("/empleados-con-novedades", (req, res) => {
  db.query(
    "SELECT e.*, ne.novedad_id, n.descripcion FROM empleado e INNER JOIN novedadesempleados ne ON e.id = ne.empleado_id INNER JOIN novedades n ON ne.novedad_id = n.idnovedad",
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al obtener los empleados con novedades" });
      }

      // Agrupar los resultados por empleado y sus novedades
      const empleadosConNovedades = results.reduce((empleados, row) => {
        const { id, nombre, apellidos, direccion, telefono, dependencia, novedad_id, descripcion } = row;

        // Verificar si el empleado ya está en la lista
        const empleadoExistente = empleados.find((empleado) => empleado.id === id);

        if (empleadoExistente) {
          // Agregar la novedad al empleado existente
          empleadoExistente.novedades.push({ idnovedad: novedad_id, descripcion });
        } else {
          // Crear un nuevo empleado con la novedad
          const nuevoEmpleado = {
            id,
            nombre,
            apellidos,
            direccion,
            telefono,
            dependencia,
            novedades: [{ idnovedad: novedad_id, descripcion }]
          };
          empleados.push(nuevoEmpleado);
        }

        return empleados;
      }, []);

      return res.status(200).json(empleadosConNovedades);
    }
  );
});

app.post("/crear-novedad", (req, res) => {
  const { empleado_id, novedad_id, valor, fecha } = req.body;

  db.query(
    "INSERT INTO novedadesempleados (empleado_id, novedad_id, valor, fecha) VALUES (?, ?, ?, ?)",
    [empleado_id, novedad_id, valor, fecha],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al crear la novedad" });
      }
      return res.status(200).json({ msg: "Novedad creada con éxito" });
    }
  );
});

app.get("/novedades", (req, res) => {
  db.query("SELECT idnovedad, descripcion FROM novedades", (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error al obtener los tipos de novedad" });
    }
    return res.status(200).json(result);
  });
});


app.post("/crearNuevaNovedad", (req, res) => {
  const { descripcion, tipo } = req.body;

  db.query(
    "INSERT INTO novedades (descripcion, tipo) VALUES (?, ?)",
    [descripcion, tipo],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al crear la novedad" });
      }
      return res.status(200).json({ msg: "Novedad creada con éxito" });
    }
  );
});

app.listen(8080, () => {
  console.log("Server corriendo en puerto 8080");
});
