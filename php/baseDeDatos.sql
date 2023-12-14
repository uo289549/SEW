-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS F1Database;
USE F1Database;

-- Crear tabla Pilotos
CREATE TABLE Pilotos (
    PilotoID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    Numero INT NOT NULL,
    Nacionalidad VARCHAR(50) NOT NULL,
    Edad INT NOT NULL,
    EquipoID INT,
    FOREIGN KEY (EquipoID) REFERENCES Equipos(EquipoID)
);

-- Crear tabla GrandesPremios
CREATE TABLE GrandesPremios (
    GranPremioID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    NumeroDeRonda INT NOT NULL,
    Ubicacion VARCHAR(100) NOT NULL
);

-- Crear tabla Clasificacion
CREATE TABLE Clasificacion (
    ClasificacionID INT AUTO_INCREMENT PRIMARY KEY,
    Posicion INT NOT NULL,
    PilotoID INT,
    Tiempo TIME,
    FOREIGN KEY (PilotoID) REFERENCES Pilotos(PilotoID)
);

-- Crear tabla Carrera
CREATE TABLE Carrera (
    CarreraID INT AUTO_INCREMENT PRIMARY KEY,
    Posicion INT NOT NULL,
    PilotoID INT,
    Tiempo TIME,
    Puntos INT,
    FOREIGN KEY (PilotoID) REFERENCES Pilotos(PilotoID)
);

-- Crear tabla Equipos
CREATE TABLE Equipos (
    EquipoID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Nacionalidad VARCHAR(50) NOT NULL
);