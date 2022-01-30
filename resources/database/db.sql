CREATE DATABASE injob;
DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario(
    /*La sintaxis para crear una tabla es
      "NombreTupla"-"Tipo de dato"-"Longitud"*/
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NOT NULL,
    cedula int (10) NOT NULL,
    correo varchar(30) NOT NULL UNIQUE, /*el correo debe de ser unico*/
    telefono int (10) NOT NULL,
    clave varchar(60) NOT NULL, /*el tamaño crece debido a que esta se codifica*/
    /*fecha nacimiento*/
    nacimiento date NOT NULL,
    sexo varchar(15) NOT NULL,
    /*Llave primaria*/
    PRIMARY KEY (cedula)
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles(
  id_rol int(10) NOT NULL AUTO_INCREMENT,
  rol varchar(15) NOT NULL,
  /*Llave primaria*/
    PRIMARY KEY (id_rol)
);

DROP TABLE IF EXISTS rol_Usuario;
CREATE TABLE  rol_Usuario(
  id_rolUsuario int (4) NOT NULL AUTO_INCREMENT,
  id_usuario int (10) NOT NULL,
  id_rol int(4) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_rolUsuario),
  /*Llaves foraneas*/
  CONSTRAINT rolUsuario_Fk1 FOREIGN KEY (id_usuario) REFERENCES usuario (cedula),
  CONSTRAINT rolUsuario_Fk2 FOREIGN KEY (id_rol) REFERENCES roles (id_rol)
);
/*Cambios el las llaves foraneas*/
ALTER TABLE `rol_usuario` DROP FOREIGN KEY `rolUsuario_Fk1`; 
ALTER TABLE `rol_usuario` ADD CONSTRAINT `rolUsuario_Fk1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`cedula`) ON DELETE CASCADE ON UPDATE CASCADE;



DROP TABLE IF EXISTS skill;
CREATE TABLE skill(
  id_skill int (10) NOT NULL AUTO_INCREMENT,
  nombre_skill varchar(29) NOT NULL,
  id_empleado int (10) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_skill),
  /*LLave foranea*/
  CONSTRAINT skills_Fk1 FOREIGN KEY (id_empleado) REFERENCES usuario (cedula)
);
DROP TABLE IF EXISTS experiencia;
CREATE TABLE experiencia(
  id_exp int (10) NOT NULL AUTO_INCREMENT,
  nombre_experiencia varchar(29) NOT NULL,
  id_empleado int (10) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_exp),
  /*LLave foranea*/
  CONSTRAINT experiencia_Fk1 FOREIGN KEY (id_empleado) REFERENCES usuario (cedula)
);

DROP TABLE IF EXISTS forma;
CREATE TABLE forma(
  id_formA int (10) NOT NULL AUTO_INCREMENT,
  nombre_formA varchar(29) NOT NULL,
  nivel int(2) NOT NULL,
  id_empleado int (10) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_formA),
  /*LLave foranea*/
  CONSTRAINT formA_Fk1 FOREIGN KEY (id_empleado) REFERENCES usuario (cedula)
);

DROP TABLE IF EXISTS certificados;
CREATE TABLE certificados(
  id_certificados int (10) NOT NULL AUTO_INCREMENT,
  nombre_certificados varchar(29) NOT NULL,
  id_empleado int (10) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_certificados),
  /*LLave foranea*/
  CONSTRAINT certificados_Fk1 FOREIGN KEY (id_empleado) REFERENCES usuario (cedula)
);

DROP TABLE IF EXISTS idiomas;
CREATE TABLE idiomas(
  id_idiomas int (10) NOT NULL AUTO_INCREMENT,
  nombre_idiomas varchar(29) NOT NULL,
  id_empleado int (10) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_idiomas),
  /*LLave foranea*/
  CONSTRAINT idiomas_Fk1 FOREIGN KEY (id_empleado) REFERENCES usuario (cedula)
);

DROP TABLE IF EXISTS area_trabajo;
CREATE TABLE area_trabajo(
  id_area int(10) NOT NULL AUTO_INCREMENT,
  nombre_area varchar (20) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_area)
);


DROP TABLE IF EXISTS provincias;
CREATE TABLE provincias(
  id_provincia int (10) NOT NULL AUTO_INCREMENT,
  nombre_provincia varchar(20) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_provincia)

);

DROP TABLE IF EXISTS empleos;
CREATE TABLE empleos(
  id_empleos int (10) NOT NULL AUTO_INCREMENT,
  id_empresa int(10) NOT NULL,
  id_area int(10) NOT NULL,
  nombre_empleo varchar(30) NOT NULL,
  sueldo decimal(10,2) NOT NULL,
  id_provincia int(10) NOT NULL,
  direccion varchar(40) NOT NULL,
  fecha_vencimiento date NOT NULL,
  fecha_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  descripcion text NOT NULL,
  requisitos text NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_empleos),
  /*Llaves foraneas*/
  CONSTRAINT empleos_Fk1 FOREIGN KEY (id_empresa) REFERENCES usuario (cedula),
  CONSTRAINT empleos_Fk2 FOREIGN KEY (id_area) REFERENCES area_trabajo (id_area),
  CONSTRAINT empleos_Fk3 FOREIGN KEY (id_provincia) REFERENCES provincias (id_provincia)
);

DROP TABLE IF EXISTS empleado_empresa;
CREATE TABLE empleado_empresa(
  id_empEmp int (10) NOT NULL AUTO_INCREMENT,
  id_empleos int(10) NOT NULL,
  id_empleado int(10) NOT NULL,
  id_empresa int(10) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_empEmp),
  CONSTRAINT empEmp_Fk1 FOREIGN KEY (id_empleos) REFERENCES empleos (id_empleos) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT empEmp_Fk2 FOREIGN KEY (id_empleado) REFERENCES usuario (cedula),
  CONSTRAINT empEmp_Fk3 FOREIGN KEY (id_empresa) REFERENCES usuario (cedula)
);

/*Cambios el las llaves foraneas empleado-empresas*/
ALTER TABLE empleado_empresa DROP FOREIGN KEY empEmp_Fk1; 
ALTER TABLE empleado_empresa ADD CONSTRAINT empEmp_Fk1 FOREIGN KEY (id_empleos) REFERENCES empleos (id_empleos) ON DELETE CASCADE ON UPDATE CASCADE;


DROP TABLE IF EXISTS info_empresa;
CREATE TABLE info_empresa(
  id_infoEmp int (10) NOT NULL AUTO_INCREMENT,
  id_empresa int(10) NOT NULL,
  ruc int(10) NOT NULL,
  mision text NOT NULL,
  vision text NOT NULL,
  certificados text NOT NULL,
  /*llave primaria*/
  PRIMARY KEY (id_infoEmp),
  /*Llaves foraneas*/
  CONSTRAINT infEmp_Fk1 FOREIGN KEY (id_empresa) REFERENCES usuario (cedula) ON DELETE CASCADE ON UPDATE CASCADE
);
/*Cambios el las llaves foraneas info-empresas*/
ALTER TABLE info_empresa DROP FOREIGN KEY infEmp_Fk1; 
ALTER TABLE info_empresa ADD CONSTRAINT infEmp_Fk1 FOREIGN KEY (id_empresa) REFERENCES usuario (cedula) ON DELETE CASCADE ON UPDATE CASCADE;


DROP TABLE IF EXISTS cal_empresa;
CREATE TABLE cal_empresa(
  id_calEmp int(10) NOT NULL AUTO_INCREMENT,
  id_empresa int(10) NOT NULL,
  id_empleado int(10) NOT NULL,
  calificacion tinyint(20) NOT NULL,
  /*llave primaria*/
  PRIMARY KEY (id_calEmp),
  /*Llaves foraneas*/
  CONSTRAINT calEmp_Fk1 FOREIGN KEY (id_empresa) REFERENCES usuario (cedula) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT calEmp_Fk2 FOREIGN KEY (id_empleado) REFERENCES usuario (cedula) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS rep_empresa;
CREATE TABLE rep_empresa(
  id_repEmp int(10) NOT NULL AUTO_INCREMENT,
  id_empresa int(10) NOT NULL,
  id_empleado int(10) NOT NULL,
  comentario text(10) NOT NULL,
  /*llave primaria*/
  PRIMARY KEY (id_repEmp),
  /*Llaves foraneas*/
  CONSTRAINT repEmp_Fk1 FOREIGN KEY (id_empresa) REFERENCES usuario (cedula) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT repEmp_Fk2 FOREIGN KEY (id_empleado) REFERENCES usuario (cedula) ON DELETE CASCADE ON UPDATE CASCADE
);

/*nomina empleados*/
DROP TABLE IF EXISTS nomina;
CREATE TABLE nomina(
  id_nomina int(10) NOT NULL AUTO_INCREMENT,
  id_empleado int(10) NOT NULL,
  id_empresa int(10) NOT NULL,
  nombre_empleo varchar(30) NOT NULL,
  /*llave primaria*/
  PRIMARY KEY (id_nomina),
  /*Llaves foraneas*/
  CONSTRAINT nom_Fk1 FOREIGN KEY (id_empresa) REFERENCES usuario (cedula) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT nom_Fk2 FOREIGN KEY (id_empleado) REFERENCES usuario (cedula) ON DELETE CASCADE ON UPDATE CASCADE
);