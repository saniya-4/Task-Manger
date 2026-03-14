const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");

const TaskComment = sequelize.define("TaskComment", {

  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  }

}, {
  timestamps: true   
});

module.exports = TaskComment;