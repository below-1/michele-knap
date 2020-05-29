import { _cx } from './cx'

test('cx must work', () => {
  const p1 = [1, 2, 3, 4, 5, 6, 7, 8]
  const p2 = [8, 5, 2, 1, 3, 6, 4, 7]
  const result = _cx(p1, p2)
  console.log(result)
})