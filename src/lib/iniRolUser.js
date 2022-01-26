const iniciadorRoles = {};
const pool = require("../controllers/database.controller");
const encript = require("../helpers/Encript");

iniciadorRoles.iniciar = async () => {
  try {
    const row = await pool.query("SELECT * FROM roles");
    if (row.length>0) return console.log("La BD ya tiene roles asignados");
    //Creamos usuarios para poder ingresar por primera vez
    const newAdmin = {
      nombre : 'Admin',
      apellido : 'Admin',
      cedula : '1111111111',
      correo : 'admin@admin.com',
      telefono : '1111111111',
      clave : await encript.encriptarPassword('admin1'),
      nacimiento : '1111-11-11',
      sexo : 'Hombre'

    }
    const newEmp = {
      nombre : 'Empresa',
      apellido : 'Empresa',
      cedula : '5555555555',
      correo : 'empresa@empresa.com',
      telefono : '2222222222',
      clave : await encript.encriptarPassword('empresa1'),
      nacimiento : '1111-11-11',
      sexo : 'Hombre'

    }
    //Si no existen crea los tres roles
    await Promise.all([
      pool.query("INSERT INTO roles (id_rol,rol) VALUES (?,?)", [
        "1",
        "empleado",
      ]),
      pool.query("INSERT INTO roles (id_rol,rol) VALUES (?,?)", [
        "2",
        "empresa",
      ]),
      pool.query("INSERT INTO roles (id_rol,rol) VALUES (?,?)", [
        "3",
        "administrador",
      ]),
      //Insertamos los usuarios creados y les asignamos roles
      pool.query('INSERT INTO usuario SET ?',newAdmin),
      pool.query('INSERT INTO usuario SET ?',newEmp),
      
    ]);
    //asigna los roles a los usuarios
    await pool.query('INSERT INTO rol_usuario (id_rolUsuario,id_usuario,id_rol) VALUES (null,?,?)',[newAdmin.cedula,'3']);
    await pool.query('INSERT INTO rol_usuario (id_rolUsuario,id_usuario,id_rol) VALUES (null,?,?)',[newEmp.cedula,'2']);
    console.log('Los roles se crearon con exito');
    
  } catch (error) {
    console.log(error);
  }
  //verifica si existen roles
};

module.exports = iniciadorRoles;