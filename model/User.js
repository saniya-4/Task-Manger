const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect.js");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role:{
    type:DataTypes.ENUM("admin","manager","member"),
    allowNull:true
  },
  status:{
    type:DataTypes.ENUM("pending","approved"),
    defaultValue:"pending"
  }
  

});

module.exports = User;