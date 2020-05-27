const knap = require('./knapsack')

test('sample must works correctly', () => {
    const all = [2, 4, 10, -3, 5, 11, 13, 27, 23]
    const result = knap.sample(all, 2)
    result.forEach(it => {
        expect(all.includes(it)).toBe(true)
    })
})