import { flatStringify } from "./parser"

describe("Parser", () => {
  it("should flat stringify when given a nested obj", () => {
    const value = {
      test: {
        subtest1: "subtest1",
        subtest2: "subtest2"
      }
    }

    const expectedResult = '[{"test":"1"},{"subtest1":"2","subtest2":"3"},"subtest1","subtest2"]'
    const result = flatStringify(value)
    expect(result).toEqual(expectedResult)
  })
})