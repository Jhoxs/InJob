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

DROP TABLE IF EXISTS formA;
CREATE TABLE formA(
  id_formA int (10) NOT NULL AUTO_INCREMENT,
  nombre_formA varchar(29) NOT NULL,
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