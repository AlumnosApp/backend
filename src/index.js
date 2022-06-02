import express from 'express';
import {init} from "./database.js";
import {generateSchema} from "./models/schema.js";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

generateSchema(app);

(async () => {
    await init();
    await app.listen(process.env.PORT);
    console.log('Server started on port ' + process.env.PORT);
})();
