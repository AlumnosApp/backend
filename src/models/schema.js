import Genero from "./genero.js";
import Rol from "./rol.js";
import {database} from "../database.js";
import {QueryTypes} from "sequelize";
import Configuracion from "./configuracion.js";
import EstadoVotacion from "./estadoVotacion.js";
import InformacionEstudiante from "./informacionEstudiante.js";
import Institucion from "./institucion.js";
import Opcion from "./opcion.js";
import TipoCalendario from "./tipoCalendario.js";
import Usuario from "./usuario.js";
import Votacion from "./votacion.js";
import Voto from "./voto.js";

const models = [
    Genero,
    Rol,
    Configuracion,
    EstadoVotacion,
    InformacionEstudiante,
    Institucion,
    Opcion,
    TipoCalendario,
    Usuario,
    Votacion,
    Voto
]

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export const generateSchema = (app) => {
    models.forEach(({model, include, custom}) => {
        if (include && include.length > 0) {
            include.forEach(x => {
                const getName = `get${capitalize(x.as)}`
                const from = `From${capitalize(x?.source?.name)}`
                const fullName = getName+from;
                app.get("/api/" + fullName, async ({query}, res) => {
                    const targetTable = x?.target;
                    const sourceTable = x?.source;
                    try {
                        const object = await sourceTable.findByPk(query.key, {attributes: [x.foreignKey],});
                        const filter = query.filter ? JSON.parse(query.filter) : null;
                        const sort = query.sort ? JSON.parse(query.sort) : null;
                        const requireTotalCount = query.requireTotalCount ? JSON.parse(query.requireTotalCount) : false;
                        const limit = query.take ? `LIMIT ${JSON.parse(query.take)}` : '';
                        const offset = query.skip ? `OFFSET ${JSON.parse(query.skip)}` : '';
                        const orderBy = sort ? `ORDER BY ${(Array.isArray(sort) ? sort.map(({selector, desc}) => `"${selector}" ${(desc) ? "desc": "asc"}`).join(' ') : sort)}` : '';
                        const where = filter ? `and ${(Array.isArray(filter) ? filter.map(f => Array.isArray(f) ? `${f[0]} ${f[1]} ${f[2]}` : `${f}`).join(' ') : filter)}` : '';
                        res.json({
                            data: await database.query(`SELECT * FROM "${targetTable.tableName}" WHERE id = ${object[x.foreignKey]} ${where} ${orderBy} ${limit} ${offset};`, { type: QueryTypes.SELECT }),
                            ...(requireTotalCount && {totalCount: Number((await database.query(`SELECT COUNT(*) FROM "${targetTable.tableName}" WHERE id = ${object[x.foreignKey]} ${where};`, { type: QueryTypes.SELECT }))[0].count)}),
                        })
                    } catch (error) {
                        res.status(500).send(error.errors ? {name: error.errors.map(e => e.message).join(', '),} : error);
                    }
                });
            })
        }

        if (custom) {
            custom(app);
        }

        app.get("/api/" + model.name, async ({query}, res) => {
            try {
                const filter = query.filter ? JSON.parse(query.filter) : null;
                const sort = query.sort ? JSON.parse(query.sort) : null;
                const requireTotalCount = query.requireTotalCount ? JSON.parse(query.requireTotalCount) : false;
                const limit = query.take ? `LIMIT ${JSON.parse(query.take)}` : '';
                const offset = query.skip ? `OFFSET ${JSON.parse(query.skip)}` : '';
                const orderBy = sort ? `ORDER BY ${(Array.isArray(sort) ? sort.map(({selector, desc}) => `"${selector}" ${(desc) ? "desc": "asc"}`).join(', ') : sort)}` : '';
                const where = filter ? (`WHERE ${(Array.isArray(filter) ? (filter.length > 2  ? filter.map(f => Array.isArray(f) ? `"${f[0]}" ${f[1]} ${f[2]}` : `${(f === filter[0] ? `"${f}"` : `${f}`)}`).join(' ') : `${filter[0]} = ${filter[1]}`) : filter)}`) : '';
                res.json({
                    data: await database.query(`SELECT * FROM "${model.tableName}" ${where} ${orderBy} ${limit} ${offset};`, { type: QueryTypes.SELECT }),
                    ...(requireTotalCount && {totalCount: Number((await database.query(`SELECT COUNT(*) FROM "${model.tableName}" ${where};`, { type: QueryTypes.SELECT }))[0].count)}),
                })
            } catch (error) {
                res.status(500).send(error.errors ? {name: error.errors.map(e => e.message).join(', '),} : error);
            }
        });

        app.post("/api/" + model.name, async ({body}, res) => {
            try {
                const values = JSON.parse(body.values);
                const {id} = await model.create(values);
                res.json({data: id});
            } catch (error) {
                console.log(error)
                res.status(500).send(error.errors && error.errors.length > 0 ? {name: error.errors.map(e => e.message).join(', '),} : {name: error?.original?.detail});
            }
        });

        app.put("/api/" + model.name, async ({body}, res) => {
            try {
                const values = JSON.parse(body.values),  key = JSON.parse(body.key);
                await model.update(values, {where: {id: key}});
                res.json(true)
            } catch (error) {
                res.status(500).send(error.errors && error.errors.length > 0 ? {name: error.errors.map(e => e.message).join(', '),} : {name: error?.original?.detail});
            }
        });

        app.delete("/api/" + model.name, async ({body}, res) => {
            try {
                const key = JSON.parse(body.key);
                await model.destroy({where: {id: key}});
                res.json(true)
            } catch (error) {
                res.status(500).send(error);
            }

        });


    });
}
