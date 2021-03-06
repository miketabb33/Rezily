import { NetworkResponse } from "../models/networkResponse"
import { formatExcavateResponse, formatRegisterResponse, formatStoreResponse, formatTotalResponse } from "./chaosCoinFormatter"

describe("Chaos Coin Formatter", () => {
  it("should format successful register response", () => {
    const userId = "anyUserId"
    const userName = "anyUserName"

    const fakeResponse: NetworkResponse = {
      data: { user: userId, name: userName},
      status: 0,
      statusText: "",
      headers: {},
      config: {}
    }

    const result = formatRegisterResponse(fakeResponse)
    expect(result.userId).toEqual(userId)
    expect(result.userName).toEqual(userName)
  })

  it("should format successful excavate response", () => {
    const bucketId = "anyBucketId"
    const anyAmount = 12 

    const fakeResponse: NetworkResponse = {
      data: { bucketId,  gold: { units: anyAmount }},
      status: 0,
      statusText: "",
      headers: {},
      config: {}
    }

    const result = formatExcavateResponse(fakeResponse)

    expect(result.bucketId).toEqual(bucketId)
    expect(result.amount).toEqual(anyAmount)
  })

  it("should format succesful store response", () => {
    const fakeResponse: NetworkResponse = {
      data: true,
      status: 0,
      statusText: "",
      headers: {},
      config: {}
    }

    const result = formatStoreResponse(fakeResponse)
    expect(result).toBeTruthy()
  })

  describe("Format Total Response", () => {
    it("expected format", () => {
      var result
      var error

      const userName = "anyUserName"
      const goldTotal = 43
      const fakeResponse: NetworkResponse = {
        data: { userName, goldTotal},
        status: 0,
        statusText: "",
        headers: {},
        config: {}
      }
      
      try {
        result = formatTotalResponse(fakeResponse)
      } catch(err) {
        error = err
      }
      expect(result?.userName).toEqual(userName)
      expect(result?.amount).toEqual(goldTotal)
    })

    it("missing data", () => {
      var result
      var error

      const fakeResponse: NetworkResponse = {
        data: true,
        status: 0,
        statusText: "",
        headers: {},
        config: {}
      }

      try {
        result = formatTotalResponse(fakeResponse)
      } catch(err) {
        error = err
      }

      expect(result).toBeUndefined()      
      expect(error).toBeDefined()
    })
  })
})