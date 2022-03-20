CREATE TABLE personas(
    id NUMBER(5) PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    correo VARCHAR(50)
);

insert into personas(id,nombre,apellido,correo)values(1,'fulanito1','fulanito1 apellido','fulanito1@correo.com');
insert into personas(id,nombre,apellido,correo)values(2,'fulanito2','fulanito2 apellido','fulanito2@correo.com');
insert into personas(id,nombre,apellido,correo)values(3,'fulanito3','fulanito3 apellido','fulanito3@correo.com');
insert into personas(id,nombre,apellido,correo)values(4,'fulanito4','fulanito4 apellido','fulanito4@correo.com');
insert into personas(id,nombre,apellido,correo)values(5,'fulanito5','fulanito5 apellido','fulanito5@correo.com');

SELECT * FROM personas;