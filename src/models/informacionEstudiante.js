import {database} from "../database.js";
import {DataTypes} from "sequelize";

const model = database.define('InformacionEstudiante', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    grado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seccional: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'InformacionEstudiantes',
    timestamps: true
});

const include = []

export default {
    model,
    include
};
