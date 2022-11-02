const { Pool } = require('pg');

const pool = new Pool({
    user: 'eskayserserver',
    host: 'eskayserinstance.c6db7loydwmu.us-east-2.rds.amazonaws.com',
    password: 'eska1ser',
    database: 'imeublepk',
    port: '5432'
});

const getCasas = async (req, res) => {
    const idedificio = parseInt(req.params.idedificio);
    const response = await pool.query('select * from departamentos where activo = 1 and idedificio = $1',[idedificio]);
    res.status(200).json(response.rows);
};

const getInvitaciones = async (req, res) => {
    const idcasa = parseInt(req.params.idcasa);
    const idedificio = parseInt(req.params.idedificio);
    const limit = parseInt(req.params.limit);
    //console.log(id);
    const response = await pool.query('select * from visitantes where iddepa = $1 and idedificio = $2 order by estatus, fecha LIMIT $3', [idcasa,idedificio,limit]);
    res.json(response.rows);
};

const updateInvitacion = async (req, res) => {
    const idresidente = parseInt(req.params.id);
    const  estatus   = parseInt(req.params.estatus);
    // console.log(idresidente);
    // console.log(estatus);
    const response =await pool.query('update visitantes set estatus = $1 where id = $2', [
        estatus,
        idresidente,
    ]);
    res.json('1');
};

const updateContrasena = async (req, res) => {
    const idcasa = parseInt(req.params.id);
    const  contrasena   = req.params.contrasena;
    console.log(idcasa);
    console.log(contrasena);
    
    const response =await pool.query('update departamentos set password = $1 where id = $2', [
        contrasena,
        idcasa,
    ]);
    res.json('1');
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