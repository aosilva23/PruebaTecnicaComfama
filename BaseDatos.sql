USE [BD_PRUEBA_TECNICA]
GO
/****** Object:  Table [dbo].[Personas]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [varchar](100) NULL,
	[Apellidos] [varchar](100) NULL,
	[NumIdentificacion] [varchar](100) NULL,
	[Email] [varchar](100) NULL,
	[TipoIdentificacion] [varchar](100) NULL,
	[FechaCreacion] [datetime] NULL,
	[IdentificacionConTipo] [varchar](100) NULL,
	[NombreCompleto] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Productos]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Productos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NULL,
	[Precio] [decimal](12, 2) NULL,
	[Cantidad] [int] NULL,
	[Descripcion] [varchar](100) NULL,
	[FechaCreacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Login] [varchar](100) NULL,
	[Pass] [varchar](100) NULL,
	[FechaCreacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Personas] ON 

INSERT [dbo].[Personas] ([Id], [Nombres], [Apellidos], [NumIdentificacion], [Email], [TipoIdentificacion], [FechaCreacion], [IdentificacionConTipo], [NombreCompleto]) VALUES (1, N'ALEXANDER', N'OCAMPO SILVA', N'94510353', N'AOSILVA@GMAIL.COM', N'CEDULA', CAST(N'2023-11-19T16:31:15.547' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Personas] OFF
GO
SET IDENTITY_INSERT [dbo].[Productos] ON 

INSERT [dbo].[Productos] ([Id], [Nombre], [Precio], [Cantidad], [Descripcion], [FechaCreacion]) VALUES (1, N'MONITOR CURVO', CAST(5000000.00 AS Decimal(12, 2)), 30, N'Monitor para desarrolladores profesionales', CAST(N'2023-11-19T20:47:10.857' AS DateTime))
INSERT [dbo].[Productos] ([Id], [Nombre], [Precio], [Cantidad], [Descripcion], [FechaCreacion]) VALUES (2, N'MONITOR PLANO', CAST(1000000.00 AS Decimal(12, 2)), 30, N'Monitor para desarrolladores juniors', CAST(N'2023-11-19T20:47:10.857' AS DateTime))
SET IDENTITY_INSERT [dbo].[Productos] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([Id], [Login], [Pass], [FechaCreacion]) VALUES (1, N'ADMIN', N'12345', CAST(N'2023-11-19T16:11:40.480' AS DateTime))
INSERT [dbo].[Usuarios] ([Id], [Login], [Pass], [FechaCreacion]) VALUES (2, N'NEO', N'2468', CAST(N'2023-11-21T17:24:00.787' AS DateTime))
INSERT [dbo].[Usuarios] ([Id], [Login], [Pass], [FechaCreacion]) VALUES (3, N'PRUEBA1', N'13579', CAST(N'2023-11-21T17:33:00.623' AS DateTime))
INSERT [dbo].[Usuarios] ([Id], [Login], [Pass], [FechaCreacion]) VALUES (4, N'PRUEBA_2', N'PRUEBA_2', CAST(N'2023-11-21T18:47:38.560' AS DateTime))
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
/****** Object:  StoredProcedure [dbo].[ActualizarProducto]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ActualizarProducto]
    @Id INT,
    @Nombre VARCHAR(100),
    @Precio DECIMAL(12,2),
    @Cantidad INT,
    @Descripcion VARCHAR(100),
    @FechaCreacion DATETIME
AS
BEGIN
    UPDATE Productos SET Nombre=@Nombre, Precio=@Precio, Cantidad=@Cantidad, Descripcion=@Descripcion, FechaCreacion=@FechaCreacion
WHERE Id=@Id
END
GO
/****** Object:  StoredProcedure [dbo].[EliminarProducto]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[EliminarProducto]
    @Id INT
AS
BEGIN
    DELETE FROM Productos WHERE Id=@Id
END
GO
/****** Object:  StoredProcedure [dbo].[InsertarPersona]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertarPersona]
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
	@NumIdentificacion VARCHAR(100),
	@Email VARCHAR(100),
	@TipoIdentificacion VARCHAR(100)
AS
BEGIN
    INSERT INTO Personas(
		Nombres, 
		Apellidos, 
		NumIdentificacion, 
		Email, 
		TipoIdentificacion,
		FechaCreacion,
		IdentificacionConTipo,
		NombreCompleto
	)
    VALUES(
		@Nombres, 
		@Apellidos, 
		@NumIdentificacion, 
		@Email, 
		@TipoIdentificacion,
		GETDATE(),
		CONCAT(@NumIdentificacion, '-', @TipoIdentificacion),
		CONCAT(@Nombres, ' ', @Apellidos))
END

GO
/****** Object:  StoredProcedure [dbo].[InsertarProducto]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertarProducto]
    @Nombre VARCHAR(100),
    @Precio DECIMAL(12,2),
    @Cantidad INT,
    @Descripcion VARCHAR(100),
    @FechaCreacion DATETIME
AS
BEGIN
    INSERT INTO Productos
    VALUES(@Nombre, @Precio, @Cantidad, @Descripcion, @FechaCreacion)
END
GO
/****** Object:  StoredProcedure [dbo].[InsertarUsuario]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[InsertarUsuario]
    @Login VARCHAR(100),
    @Pass VARCHAR(100)
AS
BEGIN
    INSERT INTO Usuarios(
		Login, 
		Pass, 
		FechaCreacion
	)
    VALUES(
		@Login, 
		@Pass, 
		GETDATE()
	)
END

GO
/****** Object:  StoredProcedure [dbo].[ObtenerPersonas]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ObtenerPersonas]
AS
BEGIN
    SELECT *
    FROM Personas
END

COMMIT;
GO
/****** Object:  StoredProcedure [dbo].[ObtenerProductos]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ObtenerProductos]
AS
BEGIN
    SELECT *
    FROM Productos
END
GO
/****** Object:  StoredProcedure [dbo].[ObtenerUsuario]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ObtenerUsuario]
    @Login VARCHAR(100),
	@Pass VARCHAR(100)
AS
BEGIN
    SELECT Login, Pass FROM Usuarios WHERE Login=@Login and Pass = @Pass;
END
GO
/****** Object:  StoredProcedure [dbo].[ObtenerUsuarios]    Script Date: 22/11/2023 8:48:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ObtenerUsuarios]
AS
BEGIN
    SELECT *
    FROM Usuarios
END
GO
