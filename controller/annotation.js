const conn = require('../lib/data')

exports.assignImage = function (imageList, userid, optype, src_src) {
    let assignImageSql = ''
    if (optype === 0) {
        assignImageSql = 'update shampoo.image set point_status = 0, processing_id = ? where id in '
    } else if (optype === 1) {
        assignImageSql = 'update shampoo.image set verify_status = 0, verify_id = ? where id in '
        exports.updateCurrentMatchSrcsrc(src_src)
        exports.updateShampooForMatch(src_src)
    } else if (optype === 2) {
        assignImageSql = 'update shampoo.image set verify_status = 1, verify_id = ? where id in '
    }
    if (imageList.length === 0) {
        return Promise.resolve()
    }
    // assignImageSql = 'select * from shampoo.image where processing_id = ? and id in '
    let imageidString = imageList.join(',')
    assignImageSql += '(' + imageidString + ')'
    return conn.execsql(assignImageSql, [userid])

}


exports.getAllUsers = function () {
    let querySql = 'select * from chikick_exp.staff where id > 8 order by CONVERT(real_name USING gbk);'
    return conn.execsql(querySql)
}
