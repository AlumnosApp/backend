import {database} from "../database.js";
import {DataTypes} from "sequelize";
import Genero from "./genero.js";
import Rol from "./rol.js";
import InformacionEstudiante from "./informacionEstudiante.js";
import Institucion from "./institucion.js";
import {auth} from "../firebase/firebase-config.js";

const model = database.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: true
    },
    correoElectronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    identificacion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    identificacionInstitucion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            min: 6
        }

    },
    esSuperUsuario: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    tableName: 'Usuarios',
    timestamps: true
});

const include = [
    model.belongsTo(Genero.model, {
        as: 'genero',
        foreignKey: {
            name: 'generoId',
            allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        foreignKeyConstraint: {
            allowNull: false
        }
    }),

    model.belongsTo(Rol.model, {
        as: 'rol',
        foreignKey: {
            name: 'rolId',
            allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),

    model.hasOne(InformacionEstudiante.model, {
        as: 'informacionEstudiante',
        foreignKey: 'usuarioId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',

    }),

    model.belongsTo(Institucion.model, {
        as: 'institucion',
        foreignKey: 'institucionId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    })
];

const custom = (app) => {
    app.get('/api/whoami', async (req, res) => {
        const token = req.get('Authorization');
        if (!token) return {user: null};
        try {
            const tokenData = await auth.verifyIdToken(token);
/*
            let {uid} = await auth.getUser(tokenData.uid);
*/
            const userData = await model.findOne({where: {uid: tokenData.uid}});
            const userValues = userData.dataValues;
            return res.json({
                data: {
                    ...userValues,
                    nombreCompleto: `${userValues.nombre} ${userValues.apellido}`,
                    institucion: (await userData.getInstitucion())?.dataValues,
                    rol: (await userData.getRol())?.dataValues,
                    genero: (await userData.getGenero())?.dataValues,
                    informacionEstudiante: (await userData.getInformacionEstudiante())?.dataValues
                }
            });
        } catch (e) {
            console.log(e)
            return res.json({
                data: null
            });
        }
    });
}

export default {
    model,
    include,
    custom
};
