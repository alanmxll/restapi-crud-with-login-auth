const { Router } = require('express');
const router = Router();

const {
    getBars,
    sendDateRange,
    // createBar,
    // getBarById,
    // deleteBar,
    // updateBar,
    loginUser,
    create,
    createUser,
    allUsers,
    authUser
} = require('../controllers/index.controller')

router.get('/login', loginUser);
router.get('/create', create);
router.post('/createUser', createUser);
router.get('/allUsers', allUsers);
router.post('/auth', authUser);
router.get('/bars', getBars);
router.get('/bars/:initialDate/:finalDate', sendDateRange);
// router.get('/bars/:id_bar', getBarById);
// router.post('/bars', createBar);
// router.put('/bars/:id_bar', updateBar);
// router.delete('/bars/:id_bar', deleteBar);

module.exports = router;