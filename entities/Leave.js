const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Leave",
  tableName: "tbl_schedule_leave",
  columns: {
    ScheduleID: {
      primary: true,
      type: "int",
      generated: true,
    },
    StartDateTime: {
      type: "datetime",
      nullable: false,
    },
    EndDateTime: {
      type: "datetime",
      nullable: false,
    },
  },
});
