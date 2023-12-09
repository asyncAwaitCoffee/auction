import pg from "pg"

const { Client } = pg;

export class DB {

    static async queryRow(queryText, ...args) {
        let client
        try {
            client = new Client({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                database: process.env.DB_DATABASE,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                connectionString: process.env.DB_CONN_STRING
            })

            await client.connect()
            const rows = await client.query(queryText, args).then(value => value.rows)
            await client.end()

            return rows[0]
        } catch(error) {
            if (client) {
                client.end()
            }
            throw new Error(error)
        }
    }
    
    static async queryRows(queryText, ...args) {
        let client
        try {
            client = new Client({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                database: process.env.DB_DATABASE,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                connectionString: process.env.DB_CONN_STRING
            })

            await client.connect()
            const rows = await client.query(queryText, args).then(value => value.rows)
            await client.end()
            
            return rows
        } catch(error) {
            if (client) {
                client.end()
            }
            throw new Error(error)
        }
    }    
}