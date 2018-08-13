const log4js = require('log4js')
const config = require('../config.js')

log4js.configure({
    appenders: {
        error: { type: 'dateFile', filename: config.logpath + 'error', pattern: "_yyyy_MM_dd.log", alwaysIncludePattern: true },
        default: { type: 'dateFile', filename: config.logpath + 'default', pattern: "_yyyy_MM_dd.log", alwaysIncludePattern: true },
        out: { type: 'console' }
    },
    categories: {
        default: { appenders: ['out', 'default'], level: 'info' },
        error: { appenders: ['error', 'out'], level: 'error' }
    }
})
// const info_logger = log4js.getLogger('out')
// const err_logger = log4js.getLogger('error')
// console.log = info_logger.info.bind(info_logger)
// console.error = err_logger.error.bind(err_logger)

module.exports = log4js
