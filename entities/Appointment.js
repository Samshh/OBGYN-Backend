const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Appointment",
  tableName: "tbl_appointment",
  columns: {
    AppointmentID: {
      primary: true,
      type: "int",
      generated: true,
    },
    PatientID: {
      type: "int",
      nullable: false,
    },
    StartDateTime: {
      type: "datetime",
      nullable: false,
    },
    EndDateTime: {
      type: "datetime",
      nullable: false,
    },
    StatusID: {
      type: "int",
      nullable: false,
    },
    Note: {
      type: "text",
      nullable: true,
    },
  },
});
