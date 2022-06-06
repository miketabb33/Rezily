import { sum } from './index'
describe("test", () => {
  it("should sum", () => {
    const result = sum(7, 8)
    expect(result).toEqual(15)
  })
})