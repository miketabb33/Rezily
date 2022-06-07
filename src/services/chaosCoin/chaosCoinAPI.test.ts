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

  it("should call register with corret path", (done) => {
    const userName = "anyUserName"
    mockedClientInstance.post.mockImplementation(() => Promise.resolve())
    
    subject.callRegister(userName)
      .finally(() => {
        expect(mockedClientInstance.post).toHaveBeenCalledWith(`/register?userName=${userName}`)
        done()
      })
  })

  it("should call excavate with corret path", (done) => {
    mockedClientInstance.post.mockImplementation(() => Promise.resolve())

    subject.callExcavate()
    .finally(() => {
      expect(mockedClientInstance.post).toHaveBeenCalledWith(`/excavate`)
      done()
    })
  })

  it("should call store with corret path", (done) => {
    const bucketId = "anyValidBucketId"
    const userId = "anyValidUserId"
    
    mockedClientInstance.post.mockImplementation(() => Promise.resolve())

    subject.callStore(userId, bucketId)
      .finally(() => {
        expect(mockedClientInstance.post).toHaveBeenCalledWith(`/store?userId=${userId}&bucketId=${bucketId}`)
        done()
      })
  })

  it("should call total with corret path", (done) => {
    const userId = "anyUserId"

    mockedClientInstance.get.mockImplementation(() => Promise.resolve())

    subject.callTotals(userId)
      .finally(() => {
        expect(mockedClientInstance.get).toHaveBeenCalledWith(`/totals?userId=${userId}`)
        done()
      })
  })
})
