const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Type', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
          },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    
        
    })
}