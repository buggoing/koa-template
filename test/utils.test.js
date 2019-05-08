const utils = require('../lib/utils')

it('utils', () => {
    let a = 4, b = 5
    let res = utils.sum(a, b)
    expect(res).toBe(9)
})