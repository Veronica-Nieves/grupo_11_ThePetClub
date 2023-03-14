module.exports = (sequelize, dataTypes) => {
    let alias = 'Role';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
        }
    };
    let config = {
        tableName: "roles",
        timestamps: false,
    };
    const Role = sequelize.define(alias, cols, config);

    /* Relación de esta tabla con otra */
    /* Variable que representa al modelo de usuarios */
    Role.associate = function(models){
        Role.hasMany(models.User, {
            /* Se asigna un alias con el que luego se llamara luego la relación */
                     as: "users", 
            /* Se aclara la foreignKey donde se relacionan ambas tablas */
                     foreignKey: "rol_id",
        });
        };
    return Role;
}