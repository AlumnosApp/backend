import {database} from "../database.js";
import {DataTypes} from "sequelize";
import Opcion from "./opcion.js";
import Usuario from "./usuario.js";
import Votacion from "./votacion.js";

const model = database.define('Voto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    tableName: 'Votos',
    timestamps: true
});

const include = [
    model.belongsTo(Opcion.model, {
        as: 'opcion',
        foreignKey: 'opcionId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    }),

    model.belongsTo(Usuario.model , {
        as: 'votante',
        foreignKey: 'votanteId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    }),

    model.belongsTo(Votacion.model, {
        as: 'votacion',
        foreignKey: 'votacionId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    }),

];
export default {
    model,
    include
};
