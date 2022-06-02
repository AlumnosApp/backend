import {database} from "../database.js";
import {DataTypes} from "sequelize";


const model = database.define('Genero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    esHombre: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    esMujer: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    tableName: 'Generos',
    timestamps: true
});

const include = []

export default {
    model,
    include
};
