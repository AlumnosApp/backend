import {database} from "../database.js";
import {DataTypes} from "sequelize";

const model = database.define('TipoCalendario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    esTipoA: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    esTipoB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    tableName: 'TiposCalendarios',
    timestamps: true
});

const include = []

export default {
    model,
    include
};

