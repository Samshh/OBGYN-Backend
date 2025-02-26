const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Diagnosis",
  tableName: "tbl_diagnosis",
  columns: {
    DiagnosisID: {
      primary: true,
      type: "int",
      generated: true,
    },
    AppointmentID: {
      type: "int",
      nullable: false,
    },
    DiagnosisName: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    PrescriptionName: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
  },
});
