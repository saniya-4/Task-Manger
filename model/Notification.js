const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");

const Notification = sequelize.define("Notification", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

},{
  timestamps:true
});

module.exports = Notification;