import { describe, test, expect } from 'vitest'
import { add } from './math'

describe('math tool test', () => {
  test('add method', () => {
    expect(add(1, 2)).toBe(3)
  })
})
