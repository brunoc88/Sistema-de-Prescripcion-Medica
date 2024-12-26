-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-12-2024 a las 03:15:54
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombre`, `estado`) VALUES
(1, 'Aparato digestivo', 1),
(2, 'Cardiovascular', 1),
(3, 'Antiinfeccioso', 1),
(4, 'Neurológica', 1),
(5, 'Respiratorio', 1),
(6, 'Endocrinológica', 1),
(7, 'Nefrológica', 1),
(8, 'Oncológica', 1),
(9, 'Psicofarmacológica', 1),
(10, 'Dermatológica', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `idContrato` int(11) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaCaducidad` date NOT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `id_profesional` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contrato`
--

INSERT INTO `contrato` (`idContrato`, `fechaCreacion`, `fechaCaducidad`, `estado`, `id_profesional`, `id_usuario`) VALUES
(4, '2024-12-18', '2024-12-26', 1, 1, 1),
(5, '2024-12-20', '2024-12-28', 1, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `idEspecialidad` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`idEspecialidad`, `nombre`, `estado`) VALUES
(1, 'Cardiología', 1),
(2, 'Neurología', 1),
(3, 'Pediatría', 1),
(4, 'Oncología', 1),
(5, 'Psiquiatría', 1),
(6, 'Ginecología y obstetricia', 1),
(7, 'Dermatología', 1),
(8, 'Nefrología', 1),
(9, 'Terapia intensiva', 1),
(10, 'Reumatología', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familia`
--

CREATE TABLE `familia` (
  `idFamilia` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `familia`
--

INSERT INTO `familia` (`idFamilia`, `nombre`, `estado`) VALUES
(1, 'Antibiótico', 1),
(2, 'Antiinflamatorios no esteroides (AINEs)', 1),
(3, 'Analgésico', 1),
(4, 'Antidepresivo', 1),
(6, 'Antidiabético', 1),
(7, 'Anticonvulsivo', 1),
(8, 'Antialérgico', 1),
(9, 'Antipsicótico', 1),
(10, 'Broncodilatador', 1),
(11, 'Antidiarreicos', 1),
(12, 'Antihipertensivos', 1),
(13, 'Antiviral', 1),
(14, 'Benzodiazepinas', 1),
(15, 'Corticoide', 1),
(16, 'Hormonas tiroideas', 1),
(17, 'Diurético', 1),
(18, 'Estimulantes de la eritropoyesis', 1),
(19, 'Antineoplásico', 1),
(20, 'Retinoides', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forma`
--

CREATE TABLE `forma` (
  `idForma` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `forma`
--

INSERT INTO `forma` (`idForma`, `nombre`, `estado`) VALUES
(1, 'Tableta', 1),
(2, 'Cápsula', 1),
(3, 'Jarabe', 1),
(4, 'Crema', 1),
(5, 'Pomada', 1),
(6, 'Inyeccion', 1),
(7, 'Supositorio', 1),
(8, 'Líquidos para nebulización', 1),
(9, 'Parches transdérmico', 1),
(10, 'Gotas', 1),
(11, 'Inhalador', 1),
(12, 'Solución inyectable', 1),
(13, 'Ungüento', 1),
(14, 'Spray nasal', 1),
(15, 'Parches transdérmicos', 1),
(16, 'Solución intravenosa', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento`
--

CREATE TABLE `medicamento` (
  `idMedicamento` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `concentracion` varchar(255) NOT NULL,
  `cantidad` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `id_forma` int(11) DEFAULT NULL,
  `id_familia` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `medicamento`
--

INSERT INTO `medicamento` (`idMedicamento`, `nombre`, `concentracion`, `cantidad`, `estado`, `id_forma`, `id_familia`, `id_categoria`) VALUES
(1, 'Omeprazol', '20 mg', 'x30', 1, 2, 2, 1),
(2, 'Loperamida', '2 mg', 'x20', 1, 1, 11, 1),
(3, 'Losartán', '50 mg', 'x30', 1, 1, 4, 2),
(4, 'Aspirina', '100 mg', 'x30', 1, 1, 2, 2),
(5, 'Amoxicilina', '500 mg', 'x20', 1, 2, 1, 3),
(6, 'Aciclovir', '300 mg', 'x30', 1, 1, 13, 3),
(7, 'Gabapentina', '300 mg', 'x30', 1, 2, 7, 4),
(8, 'Clonazepam', '0.5 mg', 'x30', 1, 1, 14, 4),
(9, 'Salbutamol', '100 mcg', '1 Inhalador', 1, 11, 10, 5),
(10, 'Fluticasona', '50 mcg', '1 Inhalador', 1, 11, 15, 5),
(11, 'Insulina', '100 UI/ml', '10 ml', 1, 12, 6, 6),
(12, 'Levotiroxina', '0.1 mg', 'x30', 1, 1, 16, 6),
(13, 'Furosemida', '40 mg', 'x20', 1, 1, 17, 7),
(14, 'Epoetina', '2000 UI', '1 frasco ampolla', 1, 6, 18, 7),
(15, 'Doxorrubicina', '50 mg', '1 frasco ampolla', 1, 6, 19, 8),
(16, 'Imatinib', '100 mg', 'x30', 1, 1, 19, 8),
(17, 'Fluoxetina', '20 mg', 'x30', 1, 2, 4, 9),
(18, 'Risperidona', '2 mg', 'x30', 1, 1, 9, 9),
(19, 'Hidrocortisona', '1% (crema)', '50 g', 1, 4, 15, 10),
(20, 'Isotretinoína', '10 mg', 'x30', 1, 2, 20, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obrasocial`
--

CREATE TABLE `obrasocial` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `obrasocial`
--

INSERT INTO `obrasocial` (`id`, `nombre`, `estado`) VALUES
(1, 'OSDE', 1),
(2, 'PAMI', 1),
(3, 'SWISS MEDICAL', 1),
(4, 'OSCAC', 1),
(5, 'OSFATUN', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obras_profesional`
--

CREATE TABLE `obras_profesional` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_profesional` int(11) NOT NULL,
  `id_obra_social` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `obras_profesional`
--

INSERT INTO `obras_profesional` (`createdAt`, `updatedAt`, `id_profesional`, `id_obra_social`) VALUES
('2024-12-25 22:56:50', '2024-12-25 22:56:50', 1, 1),
('2024-12-25 22:56:50', '2024-12-25 22:56:50', 1, 3),
('2024-12-20 02:13:49', '2024-12-20 02:13:49', 4, 4),
('2024-12-18 01:57:09', '2024-12-18 01:57:09', 22, 4),
('2024-12-20 02:07:40', '2024-12-20 02:07:40', 29, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `idPaciente` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `sexo` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `id_plan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`idPaciente`, `nombre`, `apellido`, `dni`, `fechaNacimiento`, `sexo`, `estado`, `id_plan`) VALUES
(1, 'Jorge', 'Cerutti', '111', '1966-04-28', 'Hombre', 1, 1),
(2, 'Bruno', 'Cerutti', '345', '1988-08-17', 'Hombre', 1, 2),
(3, 'Thiago', 'Gutierrez', '444', '2008-12-30', 'Hombre', 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `idPlan` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `idObra` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `plan`
--

INSERT INTO `plan` (`idPlan`, `nombre`, `estado`, `idObra`) VALUES
(1, '2025', 1, 1),
(2, '27/12', 1, 1),
(3, 'A-22', 1, 2),
(4, '23CE14', 1, 3),
(5, '24P80', 1, 3),
(6, '10/10', 1, 4),
(7, '1018', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesion`
--

CREATE TABLE `profesion` (
  `idProfesion` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesion`
--

INSERT INTO `profesion` (`idProfesion`, `nombre`, `estado`) VALUES
(1, 'Médico general', 1),
(2, 'Enfermero/a', 1),
(3, 'Paramédico/a', 1),
(4, 'Radiologo/a', 1),
(5, 'Bioquímico/a', 1),
(6, 'Farmacéutico/a', 1),
(7, 'Kinesiólogo/a', 1),
(8, 'Nutricionista', 1),
(9, 'Fonoaudiólogo/a', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesional`
--

CREATE TABLE `profesional` (
  `idProfesional` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `matricula` varchar(255) NOT NULL,
  `num_refeps` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `id_profesion` int(11) DEFAULT NULL,
  `id_especialidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesional`
--

INSERT INTO `profesional` (`idProfesional`, `nombre`, `apellido`, `domicilio`, `dni`, `email`, `matricula`, `num_refeps`, `estado`, `id_profesion`, `id_especialidad`) VALUES
(1, 'Juan Pablo', 'Fernández', 'Calle San Martín 456, Córdoba', '32.458.123', 'jp@gmail.com', '457832-MG', '125874', 1, 1, 3),
(4, 'Maria', 'Gómez', 'Av. Rivadavia 9876, Buenos Aires', '36.789.654', 'mgomez@gmail.com', '348722-MG', '145679', 1, 2, 2),
(22, 'Soledad', 'Martínez', 'Las Heras 123, Mendoza', '29.784.543', 'smartinez@gmail.com', '872349-EN', '239876', 0, 2, 7),
(29, 'Alejandro', 'López', 'Moreno 678, Salta', '34.567.321', 'alopez@gmail.com', '793452-EN', '267543', 0, 4, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refeps`
--

CREATE TABLE `refeps` (
  `idRefeps` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `profesion` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `num_registro` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `refeps`
--

INSERT INTO `refeps` (`idRefeps`, `nombre`, `apellido`, `profesion`, `estado`, `num_registro`) VALUES
(1, 'Juan Pablo', 'Fernández', 'Médico General', 1, '125874'),
(3, 'Maria', 'Gómez', 'Enfermero/a', 1, '145679'),
(4, 'Soledad', 'Martínez', 'Enfermero/a', 1, '239876'),
(5, 'Alejandro', 'López', 'Radiologo/a', 1, '267543'),
(6, 'Martín', 'Ruiz', 'Radiologo/a', 1, '457891');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoprestacion`
--

CREATE TABLE `tipoprestacion` (
  `idTipo` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipoprestacion`
--

INSERT INTO `tipoprestacion` (`idTipo`, `nombre`, `estado`) VALUES
(1, 'Resonancia Magnética de Cerebro', 1),
(2, 'Resonancia Magnética de Columna Vertebral', 1),
(3, 'Tomografía Computarizada de Tórax (TC)', 1),
(4, 'Ecografía Obstétrica', 1),
(5, 'Densitometría Ósea', 1),
(6, 'Mamografía', 1),
(7, 'Endoscopía Digestiva Alta', 1),
(8, 'Electrocardiograma (ECG)', 1),
(9, 'Ecocardiograma Doppler', 1),
(10, 'Colonoscopía', 1),
(11, 'Angiografía Coronaria', 1),
(12, 'Test de Esfuerzo Cardiológico', 1),
(13, 'Radiografía de Tórax', 1),
(14, 'Biopsia por Aguja Guiada por Ecografía', 1),
(15, 'Ecografía Doppler de Miembros Inferiores', 1),
(16, 'Examen de Campo Visual', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno`
--

CREATE TABLE `turno` (
  `idTurno` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `id_profesional` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `turno`
--

INSERT INTO `turno` (`idTurno`, `fecha`, `estado`, `id_profesional`, `id_paciente`) VALUES
(1, '2024-12-31', 0, 1, 1),
(3, '2024-12-26', 1, 1, 1),
(4, '2024-12-26', 1, 1, 2),
(5, '2024-12-27', 1, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `rol`, `email`, `password`, `estado`, `avatar`) VALUES
(1, 'Bruno', 'Cerutti', 'admin', 'bruno@gmail.com', '$2b$10$xxiGDHxs0/L3/ELwJBROUOuE6QebaBSpMnmxq42LlhChFBO2GrhlS', 1, '/avatars/1734135298630-hacker.png'),
(2, 'flor', 'fariaz', 'empleado', 'flor@gmail.com', '$2b$10$0zSqC08vHbQHOBSW4AqAPusZDDW90qa28FALi6By9awMgF.sWtXFu', 1, '/uploads/user.png'),
(3, 'Jorge', 'Cerutti', 'admin', 'jorge@gmail.com', '$2b$10$VZ4Ec.u0evdMntdLbYmPG.O9nMQMFk52jlmYNFH69XOEwJN4jXDrm', 1, '/avatars/1734732805538-profile1.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`idContrato`),
  ADD KEY `id_profesional` (`id_profesional`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`idEspecialidad`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `familia`
--
ALTER TABLE `familia`
  ADD PRIMARY KEY (`idFamilia`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `forma`
--
ALTER TABLE `forma`
  ADD PRIMARY KEY (`idForma`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD PRIMARY KEY (`idMedicamento`),
  ADD KEY `id_forma` (`id_forma`),
  ADD KEY `id_familia` (`id_familia`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `obrasocial`
--
ALTER TABLE `obrasocial`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `obras_profesional`
--
ALTER TABLE `obras_profesional`
  ADD PRIMARY KEY (`id_profesional`,`id_obra_social`),
  ADD KEY `id_obra_social` (`id_obra_social`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`idPaciente`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `id_plan` (`id_plan`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`idPlan`),
  ADD KEY `idObra` (`idObra`);

--
-- Indices de la tabla `profesion`
--
ALTER TABLE `profesion`
  ADD PRIMARY KEY (`idProfesion`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `profesional`
--
ALTER TABLE `profesional`
  ADD PRIMARY KEY (`idProfesional`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `matricula` (`matricula`),
  ADD UNIQUE KEY `num_refeps` (`num_refeps`),
  ADD KEY `id_profesion` (`id_profesion`),
  ADD KEY `id_especialidad` (`id_especialidad`);

--
-- Indices de la tabla `refeps`
--
ALTER TABLE `refeps`
  ADD PRIMARY KEY (`idRefeps`),
  ADD UNIQUE KEY `num_registro` (`num_registro`);

--
-- Indices de la tabla `tipoprestacion`
--
ALTER TABLE `tipoprestacion`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indices de la tabla `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`idTurno`),
  ADD KEY `id_profesional` (`id_profesional`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password` (`password`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `contrato`
--
ALTER TABLE `contrato`
  MODIFY `idContrato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `idEspecialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `familia`
--
ALTER TABLE `familia`
  MODIFY `idFamilia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `forma`
--
ALTER TABLE `forma`
  MODIFY `idForma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  MODIFY `idMedicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `obrasocial`
--
ALTER TABLE `obrasocial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `idPaciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `idPlan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `profesion`
--
ALTER TABLE `profesion`
  MODIFY `idProfesion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `profesional`
--
ALTER TABLE `profesional`
  MODIFY `idProfesional` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `refeps`
--
ALTER TABLE `refeps`
  MODIFY `idRefeps` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipoprestacion`
--
ALTER TABLE `tipoprestacion`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `idTurno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `contrato_ibfk_1` FOREIGN KEY (`id_profesional`) REFERENCES `profesional` (`idProfesional`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contrato_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD CONSTRAINT `medicamento_ibfk_1` FOREIGN KEY (`id_forma`) REFERENCES `forma` (`idForma`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `medicamento_ibfk_2` FOREIGN KEY (`id_familia`) REFERENCES `familia` (`idFamilia`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `medicamento_ibfk_3` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `obras_profesional`
--
ALTER TABLE `obras_profesional`
  ADD CONSTRAINT `obras_profesional_ibfk_1` FOREIGN KEY (`id_profesional`) REFERENCES `profesional` (`idProfesional`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obras_profesional_ibfk_2` FOREIGN KEY (`id_obra_social`) REFERENCES `obrasocial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`idPlan`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `plan`
--
ALTER TABLE `plan`
  ADD CONSTRAINT `plan_ibfk_1` FOREIGN KEY (`idObra`) REFERENCES `obrasocial` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesional`
--
ALTER TABLE `profesional`
  ADD CONSTRAINT `profesional_ibfk_1` FOREIGN KEY (`id_profesion`) REFERENCES `profesion` (`idProfesion`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `profesional_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`idEspecialidad`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `turno`
--
ALTER TABLE `turno`
  ADD CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`id_profesional`) REFERENCES `profesional` (`idProfesional`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `turno_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`idPaciente`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
