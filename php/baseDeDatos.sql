-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS F1Database;
USE F1Database;

drop table Pilotos;
drop table GranPremio;
drop table Clasificacion;
drop table Carrera;
drop table Equipos;

-- Crear tabla Pilotos
CREATE TABLE Pilotos (
    PilotoID INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    Numero VARCHAR(50) NOT NULL,
    Nacionalidad VARCHAR(50) NOT NULL,
    Edad VARCHAR(50) NOT NULL,
    EquipoID INT,
    FOREIGN KEY (EquipoID) REFERENCES Equipos(EquipoID)
);

-- Crear tabla GrandesPremio
CREATE TABLE GranPremio (
    GranPremioID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    NumeroDeRonda INT NOT NULL,
    Ubicacion VARCHAR(100) NOT NULL
);

-- Crear tabla Clasificacion
CREATE TABLE Clasificacion (
    ClasificacionID INT PRIMARY KEY,
    PilotoID INT,
    Tiempo VARCHAR(50),
    FOREIGN KEY (PilotoID) REFERENCES Pilotos(PilotoID)
);

-- Crear tabla Carrera
CREATE TABLE Carrera (
    CarreraID INT PRIMARY KEY,
    PilotoID INT,
    Tiempo VARCHAR(50),
    Puntos INT,
    FOREIGN KEY (PilotoID) REFERENCES Pilotos(PilotoID)
);

-- Crear tabla Equipos
CREATE TABLE Equipos (
    EquipoID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Nacionalidad VARCHAR(50) NOT NULL
);