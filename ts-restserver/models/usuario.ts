import { DataTypes } from "sequelize";
import db from "../db/connection";

const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
});

export default Usuario;