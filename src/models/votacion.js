import {database} from "../database.js";
import {DataTypes} from "sequelize";
import Usuario from "./usuario.js";
import Opcion from "./opcion.js";
import EstadoVotacion from "./estadoVotacion.js";
import Institucion from "./institucion.js";

const model = database.define('Votacion', {
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
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    tableName: 'Votaciones',
    timestamps: true
});

const include = [
    model.belongsTo(Usuario.model, {
        as: 'gestor',
        foreignKey: {
            name: 'gestorId',
            allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    }),

    model.hasMany(Opcion.model, {
        as: 'opciones',
        foreignKey: {
            name: 'votacionId',
            allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    }),

    model.belongsTo(EstadoVotacion.model, {
        as: 'estado',
        foreignKey:{
            name: 'estadoId',
            allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    }),

    model.belongsTo(Institucion.model, {
        as: 'institucion',
        foreignKey: {
            name: 'institucionId',
            allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
];

Opcion.model.belongsTo(model, {
    foreignKey: {
        name: 'votacionId',
        allowNull: false
    },
    as: 'votacion',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


export default {
    model,
    include,
};
