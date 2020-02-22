module.exports = function(sequelize, DataTypes) {
    const Idea = sequelize.define("Idea", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      api_id: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Idea.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Idea.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Idea;
  };