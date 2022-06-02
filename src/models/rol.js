import {database} from "../database.js";
import {DataTypes} from "sequelize";

const model = database.define('Rol', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    esEstudiante: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    esProfesor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    esAdministrador: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    tableName: 'Roles',
    timestamps: true
});

const include = []

export default {
    model,
    include
};
