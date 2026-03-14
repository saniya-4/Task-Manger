const {DataTypes}=require("sequelize");
const {sequelize}=require("../config/dbConnect");
const Project=sequelize.define("Project",{
    title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT
  },

  createdBy: {
    type: DataTypes.INTEGER
  }

});
module.exports=Project;