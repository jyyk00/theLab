module.exports = function(sequelize, DataTypes) {
    const Idea = sequelize.define("Idea", {
      Idea: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ID: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Idea;
  };