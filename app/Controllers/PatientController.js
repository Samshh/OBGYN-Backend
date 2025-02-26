const AppDataSource = require("../../data-source");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const patientRepository = AppDataSource.getRepository("Patient");
const adminRepository = AppDataSource.getRepository("Admin");
const appointmentRepository = AppDataSource.getRepository("Appointment");

const updateAppointment = async (req, res) => {
  try {
    const { id: AppointmentID } = req.params;
    const { StatusID, Note } = req.body;
    console.log("Received request to update appointment:", AppointmentID);
    console.log("Update data:", { StatusID, Note });

    const appointment = await appointmentRepository.findOne({
      where: { AppointmentID },
      select: ["AppointmentID"], // Ensure only AppointmentID is selected
    });

    if (!appointment) {
      console.log("Appointment not found:", AppointmentID);
      return res.status(404).json({ error: "Appointment not found." });
    }

    await appointmentRepository.update(AppointmentID, { StatusID, Note });
    const updatedAppointment = await appointmentRepository.findOne({
      where: { AppointmentID },
      select: ["AppointmentID", "StatusID", "Note"], // Ensure only these fields are selected
    });
    console.log("Updated appointment:", updatedAppointment);
    res.json(updatedAppointment);

  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

const getPatientAppointments = async (req, res) => {
  try {
    const { PatientID } = req.params;

    if (!PatientID) {
      return res.status(400).json({ error: "PatientID is required." });
    }

    const patientIdExist = await patientRepository.findOne({
      where: { PatientID },
    });

    if (!patientIdExist) {
      return res.status(400).json({ error: "PatientID does not exist." });
    }

    const appointments = await appointmentRepository.find({
      where: { PatientID },
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Database query failed" });
  }
};

const createAppointment = async (req, res) => {
  const { id: PatientID } = req.params;

  try {
    const patientIdExist = await patientRepository.findOne({
      where: { PatientID: PatientID },
    });

    if (!patientIdExist) {
      return res.status(400).json({ error: "PatientID does not exist." });
    }

    const { StartDateTime, EndDateTime, StatusID, Note } = req.body;

    const newAppointment = appointmentRepository.create({
      PatientID,
      StartDateTime,
      EndDateTime,
      StatusID,
      Note,
    });

    const result = await appointmentRepository.save(newAppointment);
    res.status(201).json(result);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = {
  createAppointment,
};

const loginPatient = async (req, res) => {
  try {
    const { EmailAddress, UserPassword } = req.body;
    const user = await AppDataSource.getRepository("Patient").findOne({
      where: { EmailAddress, UserPassword },
    });

    if (!user) {
      res.status(404);
      return res.json({
        status: 0,
        message: "User not found.",
      });
    }

    if (user.UserPassword !== UserPassword) {
      return res.status(401).json({
        status: 0,
        message: "Invalid password.",
      });
    }

    const token = jwt.sign(
      { TypeIs: 2, PatientID: user.PatientID, EmailAddress: user.EmailAddress },
      "your_secret_key", // Ensure this matches the secret key in authjwt.js
      { expiresIn: "6h" }
    );

    // Debugging statement to check PatientID before setting the cookie
    console.log("Setting PatientID cookie with value: ", user.PatientID);

    // Set cookie
    res.setHeader("Set-Cookie", [
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 6,
        path: "/",
      }),
      cookie.serialize("PatientID", user.PatientID.toString(), {
        maxAge: 60 * 60 * 6,
        path: "/",
      }),
    ]);

    console.log("Set-Cookie header: ", res.getHeader("Set-Cookie"));

    return res.json({
      status: 1,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 0,
      message: "Internal server error.",
    });
  }
};

const getPatients = async (req, res) => {
  try {
    const patientRepository = AppDataSource.getRepository("Patient");
    const users = await patientRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Database query failed" });
  }
};

const createPatient = async (req, res) => {
  try {
    const { EmailAddress } = req.body;

    // Check if email is already used in Patient table
    const existingPatient = await patientRepository.findOne({
      where: { EmailAddress },
    });
    if (existingPatient) {
      return res
        .status(400)
        .json({ error: "Email is already used by another patient." });
    }

    // Check if email is already used in Admin table
    const existingAdmin = await adminRepository.findOne({
      where: { EmailAddress },
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Email is already used by an admin." });
    }

    const newUser = patientRepository.create(req.body);
    const result = await patientRepository.save(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Database query failed" });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patientRepository = AppDataSource.getRepository("Patient");
    const user = await patientRepository.findOneBy({
      PatientID: req.params.id,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Database query failed" });
  }
};
const getPatientRole = async (req, res) => {
  const { PatientID, EmailAddress } = req.body;
  try {
    const user = await patientRepository.findOneBy({
      PatientID: PatientID,
      EmailAddress: EmailAddress,
    });
    if (user) {
      res.json(user.Role);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database query failed" });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params; // Correctly extract PatientID from req.params
    const { EmailAddress, ...updateData } = req.body; // Destructure req.body to exclude PatientID

    const user = await patientRepository.findOneBy({ PatientID: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingAdmin = await adminRepository.findOne({ where: { EmailAddress } });
    if (existingAdmin && existingAdmin.AdminID !== user.AdminID) {
      return res.status(400).json({ error: "Email is already used by another admin." });
    }
    
    // Check if email is already used in Patient table
    const existingPatient = await patientRepository.findOne({ where: { EmailAddress } });
    if (existingPatient && existingPatient.PatientID !== user.PatientID) {
      return res.status(400).json({ error: "Email is already used by another patient." });
    }

    await patientRepository.update(user.PatientID, updateData); // Update without PatientID
    const updatedUser = await patientRepository.findOneBy({ PatientID: id });
    res.json(updatedUser);
    console.log("Updated user: ", updatedUser);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = {
  createAppointment,
  getPatients,
  getPatientRole,
  createPatient,
  getPatientById,
  loginPatient,
  getPatientAppointments,
  updatePatient,
  updateAppointment,
};
