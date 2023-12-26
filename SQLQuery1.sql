-- CREA BASE DE DATOS Y TABLAS  **************************************************************
CREATE DATABASE DB_CONTROL_TAREAS
use DB_CONTROL_TAREAS
CREATE TABLE TB_TAREAS (ID INT IDENTITY (1,1) PRIMARY KEY, TAREA varchar(max) NOT NULL, ESTADO BIT, USUARIO_CREADOR int, ASIGNACION int, FECHA varchar(50));
ALTER TABLE TB_TAREAS ADD IMPORTANTE BIT, CATEGORIA INT
CREATE TABLE TB_TAREAS_CATEGORIAS (ID INT IDENTITY (1,1) PRIMARY KEY, NOMBRE TEXT NOT NULL);
CREATE TABLE TB_USUARIOS (ID INT IDENTITY (1,1) PRIMARY KEY NOT NULL, NOMBRE VARCHAR(100), ROL INT);
CREATE TABLE TB_ROLES (ID INT IDENTITY (1,1) PRIMARY KEY NOT NULL, DESCRIPCION VARCHAR(250))

ALTER TABLE TB_TAREAS ADD FOREIGN KEY (CATEGORIA) REFERENCES TB_TAREAS_CATEGORIAS(ID)
ALTER TABLE TB_TAREAS ADD CONSTRAINT FK_USUARIO_CREADOR_USUARIO FOREIGN KEY (USUARIO_CREADOR) REFERENCES TB_USUARIOS(ID)
ALTER TABLE TB_TAREAS ADD CONSTRAINT FK_ASIGNACION_USUARIO FOREIGN KEY (ASIGNACION) REFERENCES TB_USUARIOS(ID)
ALTER TABLE TB_USUARIOS ADD CONSTRAINT FK_USUARIO_ROL FOREIGN KEY (ROL) REFERENCES TB_ROLES(ID)


-- OBTENER TAREAS  **************************************************************
	CREATE OR ALTER PROCEDURE PRC_MOSTRAR_TAREAS
		AS
		BEGIN 
			SELECT 
			T.ID, T.TAREA, T.ESTADO, T.FECHA, T.IMPORTANTE, T.CATEGORIA, U.NOMBRE AS USUARIO_CREADOR, U2.NOMBRE AS ASIGNACION
			FROM TB_TAREAS T 
			LEFT JOIN TB_USUARIOS U ON T.USUARIO_CREADOR = U.ID 
			LEFT JOIN TB_USUARIOS U2 ON T.ASIGNACION = U2.ID
			ORDER BY T.ESTADO ASC,  T.IMPORTANTE DESC
		END

CREATE OR ALTER PROCEDURE PRC_MOSTRAR_TAREAS_COMPLETADAS
	AS
		SELECT T.ID, T.TAREA, T.ESTADO, T.FECHA, T.IMPORTANTE, T.CATEGORIA, U.NOMBRE AS USUARIO_CREADOR, U2.NOMBRE AS ASIGNACION
		FROM TB_TAREAS T
		LEFT JOIN TB_USUARIOS U ON T.USUARIO_CREADOR = U.ID
		LEFT JOIN TB_USUARIOS U2 ON T.ASIGNACION = U2.ID
		WHERE ESTADO = 1
		ORDER BY T.IMPORTANTE DESC

CREATE OR ALTER PROCEDURE PRC_MOSTRAR_TAREAS_PENDIENTES
	AS
		SELECT T.ID, T.TAREA, T.ESTADO, T.FECHA, T.IMPORTANTE, T.CATEGORIA, U.NOMBRE AS USUARIO_CREADOR, U2.NOMBRE AS ASIGNACION
		FROM TB_TAREAS T
		LEFT JOIN TB_USUARIOS U ON T.USUARIO_CREADOR = U.ID
		LEFT JOIN TB_USUARIOS U2 ON T.ASIGNACION = U2.ID
		WHERE T.ESTADO = 0
		ORDER BY T.IMPORTANTE DESC

EXEC PRC_MOSTRAR_TAREAS
EXEC PRC_MOSTRAR_TAREAS_COMPLETADAS
EXEC PRC_MOSTRAR_TAREAS_PENDIENTES

-- INSERTAR TAREAS  **************************************************************
CREATE OR ALTER PROCEDURE PRC_INSERTAR_TAREA (
	@TAREA varchar(max),
	@ESTADO BIT, 
	@FECHA VARCHAR(50),
	@IMPORTANTE BIT,
	@CATEGORIA INT,
	@USUARIO_CREADOR INT,
	@ASIGNACION INT
	)
	AS BEGIN
		DECLARE @EXIST_TAREA varchar(max) = ''
		SELECT @EXIST_TAREA = TAREA FROM TB_TAREAS WHERE TAREA = @TAREA
		IF (@EXIST_TAREA = '')
		BEGIN
			INSERT INTO TB_TAREAS 
			(TAREA, ESTADO, FECHA, IMPORTANTE, CATEGORIA, USUARIO_CREADOR, ASIGNACION) VALUES(@TAREA, @ESTADO, @FECHA, @IMPORTANTE, @CATEGORIA, @USUARIO_CREADOR, @ASIGNACION)
			print 'si se inserto'
		END
END;

exec PRC_INSERTAR_TAREA 'TAREA COMPLETA', 1, '15/12/2023', 1, 1, 2, 2

 
-- ACTUALIZA UNA TAREA  **************************************************************

CREATE OR ALTER PROCEDURE PRC_ACTUALIZAR_TAREA 
	( @ID INT, @TAREA TEXT, @ESTADO INT, @FECHA VARCHAR(50), @IMPORTANTE INT, @CATEGORIA INT, @USUARIO_CREADOR INT, @ASIGNACION INT)
	AS BEGIN
		UPDATE TB_TAREAS 
		SET 
			TAREA = 
				CASE 
					WHEN @TAREA is null THEN TAREA 
					ELSE @TAREA 
				END,
			ESTADO = 
				CASE 
					WHEN @ESTADO is null THEN ESTADO 
					ELSE @ESTADO 
				END,
			FECHA = 
				CASE 
					WHEN @FECHA is null THEN FECHA
					ELSE @FECHA 
				END,
			IMPORTANTE = 
				CASE 
					WHEN @IMPORTANTE is null THEN IMPORTANTE 
					ELSE @IMPORTANTE
				END,
			CATEGORIA = 
				CASE
					WHEN @CATEGORIA is null THEN CATEGORIA
					ELSE @CATEGORIA
				END,
			USUARIO_CREADOR = 
				CASE
					WHEN @USUARIO_CREADOR is null THEN USUARIO_CREADOR
					ELSE @USUARIO_CREADOR
				END,
			ASIGNACION = 
				CASE
					WHEN @ASIGNACION is null THEN ASIGNACION
					ELSE @ASIGNACION
				END
			WHERE ID = @ID
END;

EXEC PRC_ACTUALIZAR_TAREA 30, 'TAREA COMPLETADA Y ACTUALIZADA NAZI', 1, '15/12/2025', 1, 1, 1, 1
select * from TB_TAREAS

-- ELIMINA UNA TAREA  **************************************************************
CREATE OR ALTER PROCEDURE PRC_ELIMINAR_TAREA (@ID INT)
AS BEGIN
	DELETE FROM TB_TAREAS WHERE ID = @ID
END;

EXEC PRC_ELIMINAR_TAREA 31


