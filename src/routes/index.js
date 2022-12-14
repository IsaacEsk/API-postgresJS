const { Router } = require('express');
const router = Router();

const {getCasas, getUsers, getUserById, createUser, updateUser, deleteUser,getInvitaciones, updateInvitacion, updateContrasena} = require('../controllers/index.controller');

///Estas si las uso 
router.get('/api/casas/:idedificio', getCasas);
router.get('/api/invitaciones/:idcasa/:idedificio/:limit', getInvitaciones);
router.put('/api/setinvitacion/:id/:estatus', updateInvitacion);
router.put('/api/setcontrasena/:id/:contrasena', updateContrasena);

///Estas fueron de prueba
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

module.exports = router;