const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");

const ActivityLog = sequelize.define("ActivityLog", {

  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  action: {
    type: DataTypes.STRING,
    allowNull: false
  },

  details: {
    type: DataTypes.TEXT,
    allowNull: false
  }

},{
  timestamps:true
});

module.exports = ActivityLog;