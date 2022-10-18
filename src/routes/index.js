const { Router } = require('express');
const router = Router();

const {getCasas, getUsers, getUserById, createUser, updateUser, deleteUser,getInvitaciones } = require('../controllers/index.controller');

///Estas si las uso 
router.get('/api/casas', getCasas);
router.get('/api/invitaciones/:id', getInvitaciones);

///Estas fueron de prueba
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

module.exports = router;