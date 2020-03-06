const { Router } = require('express');
const router = Router();

const {
    getBars,
    sendDateRange,
    // createBar,
    // getBarById,
    // deleteBar,
    // updateBar,
} = require('../controllers/bars.controller')

router.get('/bars/bars', getBars);
router.get('/bars/bars/:initialDate/:finalDate', sendDateRange);
// router.get('/bars/:id_bar', getBarById);
// router.post('/bars', createBar);
// router.put('/bars/:id_bar', updateBar);
// router.delete('/bars/:id_bar', deleteBar);

module.exports = router;