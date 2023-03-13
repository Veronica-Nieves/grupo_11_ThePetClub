module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        fisrt_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password_confirmed: {
            type: dataTypes.STRING,
            allowNull: false
        },
        rol_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING,
        }
    };

    let config = {
        tableName: "products",
        timestamps: false,
    };
    const User = sequelize.define(alias, cols, config);
    return User;
}