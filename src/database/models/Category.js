
/* ----------DEFINIMOS EL MODELO DE CATEGORIAS----------- */
module.exports = (sequelize, dataTypes) => {
   
    let alias = 'Category';

    let cols = {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: dataTypes.STRING(250),
                allowNull: false
            },
            /*created_at: {
                type: dataTypes.DATE,
            },
            updated_at: {
                type: dataTypes.DATE,
            }*/
        };
    let config = {
        tableName: "categories",
        timestamps: false,
        //createdAt: 'created_at',
        //updatedAt: 'updated_at',
        //deletedAt: false
    }

    const Category = sequelize.define(alias, cols, config);
    //Aquí especificamos las relaciones de esta tabla con otras tablas
    return Category
};