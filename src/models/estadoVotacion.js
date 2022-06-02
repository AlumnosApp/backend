import {database} from "../database.js";
import {DataTypes} from "sequelize";

const model = database.define('EstadoVotacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    esAbierta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    esCerrada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    tableName: 'EstadoVotaciones',
    timestamps: true
});

const include = []
export default {
    model,
    include
};
