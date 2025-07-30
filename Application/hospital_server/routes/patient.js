const router = require('express').Router();
const patientController = require('../controllers/patientController');

router.post('/create', patientController.createPatient);
router.get('/', patientController.getPatients);

module.exports = router;