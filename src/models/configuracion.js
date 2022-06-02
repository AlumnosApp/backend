import {database} from "../database.js";
import {DataTypes} from "sequelize";

const model = database.define('Configuracion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ajusteGradoAutomatico: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'Configuraciones',
    timestamps: true
});

const include = []

export default {
    model,
    include
};
