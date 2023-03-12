
/* --------DEFINIMOS EL MODELO DE SPECIE--------- */

module.exports = (sequelize, dataTypes) => {
   
    let alias = 'Especies';

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
        tableNAme: "species",
        timestamps: false,
        //createdAt: 'created_at',
        //updatedAt: 'updated_at',
        //deletedAt: false
    }

    const Specie = sequelize.define(alias, cols, config);
    //Aquí especificamos las relciones de esta tabla con otras tablas
    return Specie
};