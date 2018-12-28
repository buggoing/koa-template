exports.waitForTimeout =  async (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('random')
        }, delay)
    })
}