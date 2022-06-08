import ChaosCoinAPI from "./chaosCoinAPI"
import axios from "axios"

jest.mock("axios")

describe("Chaos Coin API", () => {
  var subject: ChaosCoinAPI
  var mockedClientInstance = axios as jest.Mocked<typeof axios>;
  
  beforeEach(() => {
    subject = new ChaosCoinAPI()
    subject.clientInstance = mockedClientInstance
  })

  it("should call register with corret arguments", (done) => {
    const userName = "anyUserName"
    mockedClientInstance.post.mockImplementation(() => Promise.resolve())
    
    subject.callRegister(userName, 2000)
      .finally(() => {
        expect(mockedClientInstance.post).toHaveBeenCalledWith(`/register?userName=${userName}`, {}, {"timeout": 2000})
        done()
      })
  })

  it("should call excavate with corret arguments", (done) => {
    mockedClientInstance.post.mockImplementation(() => Promise.resolve())

    subject.callExcavate(2000)
    .finally(() => {
      expect(mockedClientInstance.post).toHaveBeenCalledWith(`/excavate`, {}, {"timeout": 2000})
      done()
    })
  })

  it("should call store with corret arguments", (done) => {
    const bucketId = "anyValidBucketId"
    const userId = "anyValidUserId"
    
    mockedClientInstance.post.mockImplementation(() => Promise.resolve())

    subject.callStore(userId, bucketId, 2000)
      .finally(() => {
        expect(mockedClientInstance.post).toHaveBeenCalledWith(`/store?userId=${userId}&bucketId=${bucketId}`, {}, {"timeout": 2000})
        done()
      })
  })

  it("should call total with corret arguments", (done) => {
    const userId = "anyUserId"

    mockedClientInstance.get.mockImplementation(() => Promise.resolve())

    subject.callTotals(userId, 2000)
      .finally(() => {
        expect(mockedClientInstance.get).toHaveBeenCalledWith(`/totals?userId=${userId}`, {"timeout": 2000})
        done()
      })
  })
})
