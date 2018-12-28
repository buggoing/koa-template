const mysql = require('mysql')
const config = require('../config.js')
const log4js = require('./log.js')

const log = log4js.getLogger('default')

const dbConfig = process.env.NODE_ENV === 'prod' ? config.dbConfigProd : config.dbConfig
log.info(dbConfig)
const pool = mysql.createPool(dbConfig)

exports.execsql = function (sql, param) {
    // log.info(sql, param)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return reject(err)
            }
            conn.query(sql, param, (err, rows) => {
                conn.release()
                if (err) {
                    return reject({err})
                }
                resolve(rows)
            })
        })
    })
}

exports.exectrans = function (sqlparamsEntities) {
    log.info(sqlparamsEntities)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }
            connection.beginTransaction((err) => {
                if (err) {
                    return reject(err)
                }
                let funcAry = []
                sqlparamsEntities.forEach(sqlEntity => {
                    let temp = () => {
                        return new Promise((resolve2, reject2) => {
                            let sql = sqlEntity.sql
                            let params = sqlEntity.params

                            connection.query(sql, params, function (tErr, rows, fields) {
                                if (tErr) {
                                    connection.rollback(function () {
                                        reject2(tErr)
                                    })
                                } else {
                                    resolve2({ code: 0 })
                                }
                            })
                        })
                    }
                    funcAry.push(temp())
                })

                Promise.all(funcAry).then(results => {
                    connection.commit(function (err1, info) {
                        if (err1) {
                            connection.rollback(function (err) {
                                connection.release()
                                return reject(err1)
                            })
                        } else {
                            connection.release()
                            return resolve({ success: true })
                        }
                    })
                }).catch(err => {
                    connection.rollback(function (err2) {
                        connection.release()
                        return reject(err)
                    })
                })
            })
        })
    })
}
