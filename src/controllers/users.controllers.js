import { pool } from "../conexion.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Obtenemos el token desde las cookies

    if (!token) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Añadimos la información del usuario al request
        next(); // Permitimos que el request continúe hacia la siguiente función
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

export const loginUser = async (req, res) => {
    const { correo, contrasena } = req.body;

    // Validación de entradas
    if (!correo || correo.trim() === '') {
        return res.status(400).json({ error: 'Correo es requerido' });
    }
    if (!contrasena || contrasena.trim() === '') {
        return res.status(400).json({ error: 'Contraseña es requerida' });
    }

    try {
        // 1. Consulta para obtener el usuario con el correo proporcionado
        const userResult = await pool.query('SELECT * FROM usuario WHERE correo = $1', [correo]);
        const user = userResult.rows[0];

        // 2. Verificación si el usuario existe
        if (!user) {
            return res.status(404).json({ correoInvalido: 'Correo no encontrado' });
        }

        // 3. Verificación de la contraseña
        const passwordIsValid = bcrypt.compareSync(contrasena, user.contrasena);
        if (!passwordIsValid) {
            return res.status(401).json({ contrasenaInvalida: 'Contraseña incorrecta' });
        }

        // 4. Obtención del id_usuario directamente desde el usuario ya obtenido
        const idUsuario = user.id_usuario;

        // 5. Consulta para obtener el id_rol desde la tabla asignacion_rol
        const rolResult = await pool.query('SELECT id_rol FROM asignacion_rol WHERE id_usuario = $1', [idUsuario]);
        const rol = rolResult.rows[0];

        // 6. Verificación si el rol existe
        if (!rol) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }

        // 7. Verificación si el rol es de administrador
        console.log('Rol obtenido:', rol); // Para depuración
        console.log('ID Rol:', rol.id_rol); // Para depuración
        const isAdmin = parseInt(rol.id_rol, 10) === 1;
        console.log('Is Admin:', isAdmin); // Para depuración

        // 8. Generación del token JWT
        const token = jwt.sign(
            { correo: user.correo, idUsuario, idRol: rol.id_rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 9. Configuración de la cookie del token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'strict'
        });

        // 10. Respuesta al frontend con el token, id_usuario, id_rol y estado de admin
        return res.status(200).json({ mensaje: 'Login exitoso', token, idUsuario, idRol: rol.id_rol, isAdmin });
    } catch (err) {
        console.error('Error en el proceso de login:', err);
        return res.status(500).json({ error: 'Error del servidor' });
    }
};





export const registerUser = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    // Validación de entradas
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'Nombre es requerido' });
    }
    if (!correo || correo.trim() === '') {
        return res.status(400).json({ error: 'Correo es requerido' });
    }
    if (!contrasena || contrasena.trim() === '') {
        return res.status(400).json({ error: 'Contraseña es requerida' });
    }

    try {
        // Verificar si el nombre ya está registrado
        const nameCheck = await pool.query(
            'SELECT * FROM usuario WHERE nombre = $1',
            [nombre]
        );

        if (nameCheck.rows.length > 0) {
            return res.status(400).json({ NombreR: 'Nombre repetido. Por favor, elige otro nombre.' });
        }

        // Verificar si el correo ya está registrado
        const emailCheck = await pool.query(
            'SELECT * FROM usuario WHERE correo = $1',
            [correo]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ EmailR: 'Correo repetido. Por favor, inicie sesión.' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Insertar el nuevo usuario y obtener el id_usuario
        const result = await pool.query(
            'INSERT INTO usuario (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING id_usuario',
            [nombre, correo, hashedPassword]
        );

        const idUsuario = result.rows[0].id_usuario;

        // Insertar el rol en la tabla asignacion_rol (asumiendo id_rol = 2 para usuarios normales)
        await pool.query(
            'INSERT INTO asignacion_rol (id_usuario, id_rol) VALUES ($1, $2)',
            [idUsuario, 2]
        );

        return res.status(201).json({ mensaje: 'Registro exitoso. Ahora puedes iniciar sesión.' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return res.status(500).json({ mensaje: 'Error del servidor' });
    }
};





export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM asignacion_rol'); 
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar la base de datos', err);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const { rows } = await pool.query(
    "UPDATE usuario SET nombre = $1, correo = $2 contraseña = WHERE id = $3",
    [nombre, correo, contraseña]
  );

  return res.json(rows[0]);
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { rowCount } = await pool.query("DELETE FROM usuario where id = $1", [
    id,
  ]);

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};