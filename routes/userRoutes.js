const express = require("express");
const {
  getPatients,
  createPatient,
  getPatientById,
  loginPatient,
  getPatientRole,
  createAppointment,
  getPatientAppointments,
  updatePatient,
  updateAppointment
} = require("../app/Controllers/PatientController");
const {
  loginAdmin,
  getAdmin,
  getAdminRole,
  createAdmin,
  logout,
  updateAdmin,
  getAppointments
} = require("../app/Controllers/AdminController");
const { authenticateTokenWeb } = require("../app/Middleware/authjwt");

const router = express.Router();

//Patient Routes
//post
router.post("/createPatient", createPatient);
router.post("/loginPatient", loginPatient);
router.post("/createAppointment/:id", createAppointment);
router.post("/updatePatient/:id", updatePatient);
router.post("/updateAppointment/:id", updateAppointment);

//get
router.get("/getPatients", getPatients);
router.get("/getPatient/:id", getPatientById);
router.get("/getPatientRole/", getPatientRole);
router.get("/getPatientAppointments/:PatientID", getPatientAppointments);

//Admin Routes
//post
router.post("/loginAdmin", loginAdmin);
router.post("/createAdmin", createAdmin);
router.post("/updateAdmin", updateAdmin);

//get
router.get("/getAdmin", getAdmin);
router.get("/getAdminRole/", getAdminRole);
router.get("/getAppointments", getAppointments);

router.post("/logout", logout);

//Auth Routes
router.post("/auth", authenticateTokenWeb);

module.exports = router;
