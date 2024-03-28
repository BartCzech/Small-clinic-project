const express = require("express");
const router = express.Router();

const patient_controller = require("../controllers/patientController");

router.get("/patients", patient_controller.patient_list);
router.post("/patient/create", patient_controller.patient_create_post);
router.post("/patient/delete", patient_controller.patient_delete_post);
router.get("/patient/:id", patient_controller.patient_detail);
router.post("/patient/:id/update", patient_controller.patient_update_post);

module.exports = router;