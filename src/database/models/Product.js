
/* ----------DEFINIMOS EL MODELO DE PRODUCTOS----------- */
module.exports = (sequelize, dataTypes) => {
   
    let alias = 'Product';

    let cols = {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            sku: {
                type: dataTypes.STRING(255),
                allowNull: false
            },
            name: {
                type: dataTypes.STRING(255),
                allowNull: false
            },
            description: {
                type: dataTypes.STRING,
                allowNull: false
            },
            image: {
                type: dataTypes.STRING(255),
                allowNull: false
            },
            price: {
                type: dataTypes.FLOAT,
                allowNull: false
            },
            price_offer: {
                type: dataTypes.FLOAT,
                allowNull: false
            },
            specie_id: {
                type: dataTypes.INTEGER,
                allowNull: false
            },
            category_id: {
                type: dataTypes.INTEGER,
                allowNull: false
            },
            offer: {
                type: dataTypes.STRING(255),
                allowNull: false
            },
            featured: {
                type: dataTypes.STRING(255),
                allowNull: false
            },
            pieces: {
                type: dataTypes.INTEGER,
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
        tableName: "products",
        timestamps: false,
        //createdAt: 'created_at',
        //updatedAt: 'updated_at',
        //deletedAt: false
    }

    const product = sequelize.define(alias, cols, config);
    //Aquí especificamos las relaciones de esta tabla con otras tablas
    return product
};