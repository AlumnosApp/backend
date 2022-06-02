import {database} from "../database.js";
import {DataTypes} from "sequelize";

const model = database.define('Institucion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    esActivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'Instituciones',
    timestamps: true
});

const include = []



export default {
    model,
    include
};
