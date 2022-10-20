const { Pool } = require('pg');

const pool = new Pool({
    user: 'eskayserserver',
    host: 'eskayserinstance.c6db7loydwmu.us-east-2.rds.amazonaws.com',
    password: 'eska1ser',
    database: 'datospk',
    port: '5432'
});

const getCasas = async (req, res) => {
    const response = await pool.query('SELECT idcasa,direccion FROM casas');
    res.status(200).json(response.rows);
};

const getInvitaciones = async (req, res) => {
    const id = parseInt(req.params.id);
    //console.log(id);
    const response = await pool.query('select idresidente,nombre, auto, activo from residentes where idcasa = $1', [id]);
    res.json(response.rows);
};

const updateInvitacion = async (req, res) => {
    const idresidente = parseInt(req.params.id);
    const  activo   = parseInt(req.params.activo);
    const response =await pool.query('update residentes set activo = $1 where idresidente = $2', [
        activo,
        idresidente,
    ]);
    res.json('Invitacion Updated Successfully');
};

const updateContrasena = async (req, res) => {
    const idcasa = parseInt(req.params.id);
    const  contrasena   = parseInt(req.params.contrasena);
    const response =await pool.query('update casas set tel = $1 where idcasa = $2', [
        contrasena,
        idcasa,
    ]);
    res.json('Contraseña Updated Successfully');
};

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM casas');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, email}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

module.exports = {

    getInvitaciones,
    getCasas,
    getUsers,
    updateInvitacion,
    updateContrasena,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};