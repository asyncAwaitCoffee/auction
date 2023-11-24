import { DB } from "./db.js"

export async function authCheck(req, res, next) {
    try {
        const account_token = req.cookies.test
        const data = await DB.queryRow('select account_id, login from vue3_learning.verify_account($1)', account_token)
        res.locals.account_id = data.account_id
        res.locals.login = data.account_login
        next()
    } catch(error) {
        res.locals.login = null
        res.locals.account_id = null
        next()
    }
}