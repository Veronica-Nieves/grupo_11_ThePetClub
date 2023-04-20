
/* ----------DEFINIMOS EL MODELO DE SPECIE----------- */
module.exports = (sequelize, dataTypes) => {

    let alias = 'species';

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
            images: {
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
        tableName: "species",
        timestamps: false,
        //createdAt: 'created_at',
        //updatedAt: 'updated_at',
        //deletedAt: false
    }

    const Specie = sequelize.define(alias, cols, config);

    /* --- RELACIONES DE ESTE MODELO CON OTROS MODELOS --- */

    // Cada especie tiene asociada muchos products (N:1)
    Specie.associate = function(models){
        Specie.hasMany(models.products, {
            as: "products", // alias de la relación
            foreignKey: "specie_id",
        });
    }

    return Specie
};