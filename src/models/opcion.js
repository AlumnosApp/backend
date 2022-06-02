import {database} from "../database.js";
import {DataTypes} from "sequelize";

const model = database.define('Opcion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detalle: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'Opciones',
    timestamps: true
});

const include = [


    model.belongsTo(model, {
        foreignKey: {
            name: 'opcionPadreId',
            allowNull: true
        },
        as: 'opcionPadre',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

]

export default {
    model,
    include
};
