const { Router } = require('express');
const router = Router();

const {
    loginUser,
    create,
    createUser,
    allUsers,
    authUser
} = require('../controllers/users.controller');

router.get('/users/login', loginUser);
router.get('/users/create', create);
router.post('/users/createUser', createUser);
router.get('/users/allUsers', allUsers);
router.post('/users/auth', authUser);

module.exports = router;