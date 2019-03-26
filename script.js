/**
 * Conexión de base de datos
 */
const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password: "salamance333",
    host: "localhost",
    port: 5432,
    database: "postgres"
})

client.connect()
.then(() => console.log("Connected succesfully"))
.then(() => client.query("select * from empleados where personid = $1", [123]))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())
