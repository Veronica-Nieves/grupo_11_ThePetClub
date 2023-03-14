module.exports = (sequelize, dataTypes) => {
   
    let alias = 'users';

    let cols = {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            email: {
                type: dataTypes.STRING(255),
                allowNull: false
            },
            user_name: {
                type: dataTypes.STRING(255),
                allowNull: false
            },
            first_name: {
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
                allowNull: false
            },
            avatar: {
                type: dataTypes.STRING,
                allowNull: false
            },

    };

    let config = {
        tableName: "users",
        timestamps: false,
        //createdAt: 'created_at',
        //updatedAt: 'updated_at',
        //deletedAt: false
    }

    const User = sequelize.define(alias, cols, config);

    /* --- RELACIONES DE ESTE MODELO CON OTROS MODELOS --- */
    
    // User.associate = function(models){
    // // Cada usuario "pertenece a" un rol (1:N)
    //     User.belongsTo(models.Rol, {
    //         as: "roles", // alias de la relación
    //         foreignKey: "rol_id",
    //     });
    // }

    return User
};



// const fs = require ('fs');

// const User = {

//     fileName: 'src/data/users.json',

//     getData: function () {  
//         return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
//     },

//     findAll: function () {
//         return this.getData();
//     },

//     generateId: function () {
//         let allUsers = this.findAll();
//         let lastUser = allUsers.pop();
        
//         if (lastUser) {
//         return lastUser.id + 1;
//         }

//         return 1;

//     },

//     findByPk: function (id) {
//         let allUsers = this.findAll();
//         let userFound = allUsers.find(oneUser => oneUser.id == id);
//         return userFound;
//     },

//     findByField: function (field, text) {
//         let allUsers = this.findAll();
//         let userFound = allUsers.find(oneUser => oneUser[field] === text);
//         return userFound;
//     },

//     create: function (userData) {
//         let allUsers = this.findAll();

//         let newUser = {
//             id: this.generateId(),
//             ...userData
//         }

//         allUsers.push(newUser);
//         fs.writeFileSync(this.fileName, JSON.stringify(allUsers,null,' '));
//         return newUser;
//     },

//     delete: function (id) {
//         let allUsers = this.findAll();
//         let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);

//         fs.writeFileSync(this.fileName, JSON.stringify(finalUsers,null,' '));
//         return true;
//     }
// }

// module.exports = User;