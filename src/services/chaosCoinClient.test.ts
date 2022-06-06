import ChaosCoinClient from "./chaosCoinClient"
import axios from "axios"
import { User } from "../models/user"
import { MinedGold } from "../models/minedGold"
import { GoldTotal } from "../models/goldTotal"

jest.mock("axios")

describe("Chaos Coin Client", () => {
  var subject: ChaosCoinClient
  var mockedClientInstance = axios as jest.Mocked<typeof axios>;
  
  beforeEach(() => {
    subject = new ChaosCoinClient()
    subject.clientInstance = mockedClientInstance
  })

  describe("register", () => {
    it("should create an account and return username and id", (done) => {
      const userName = "anyUserName"
      const userId = "anyUserId"
      const mockedResponse: User = {user: userId, name: userName}

      mockedClientInstance.post.mockImplementation(() => {
        return Promise.resolve({ data: mockedResponse })
      })
      
      subject.register(userName)
        .then(res => {
          expect(res.data.user).toEqual(userId)
          expect(res.data.name).toEqual(userName)
          expect(mockedClientInstance.post).toHaveBeenCalledWith(`/register?userName=${userName}`)
          done()
        })
    })
  })

  describe("excavate", () => {
    it('should add gold to a bucket and return bucket id and gold amount', (done) => {
      const bucketId = "anyBucketId" 
      const goldUnits = 17
      const mockedResponse: MinedGold = { bucketId, gold: {units: goldUnits}}

      mockedClientInstance.post.mockImplementation(() => {
        return Promise.resolve({ data: mockedResponse })
      })

      subject.excavate()
      .then(res => {
        expect(res.data.bucketId).toEqual(bucketId)
        expect(res.data.gold.units).toEqual(goldUnits)
        expect(mockedClientInstance.post).toHaveBeenCalledWith(`/excavate`)
        done()
      })
    })
  })

  describe('store', () => {
    it("should apply the gold contents of a bucket to a user when given a valid bucket and user id", (done) => {
      const bucketId = "anyValidBucketId"
      const userId = "anyValidUserId"
      
      mockedClientInstance.post.mockImplementation(() => {
        return Promise.resolve({ data: true })
      })

      subject.store(userId, bucketId)
        .then(res => {
          expect(res.data).toBeTruthy()
          expect(mockedClientInstance.post).toHaveBeenCalledWith(`/store?userId=${userId}&bucketId=${bucketId}`)
          done()
        })
    })

    it("should return an error when bucketId and/or userId is invalid", (done) => {
      const bucketId = "invalidBucketId"
      const userId = "invalidUserId"
      const errorMessage = "cmon bro, that's not valid"
      
      mockedClientInstance.post.mockImplementation(() => {
        return Promise.reject({ response: { data: { error: errorMessage } } })
      })

      subject.store(userId, bucketId)
        .catch(err => {
          expect(err.response.data.error).toEqual(errorMessage)
          expect(mockedClientInstance.post).toHaveBeenCalledWith(`/store?userId=${userId}&bucketId=${bucketId}`)
          done()
        })
    })
  })

  describe('Get Totals', () => {
    it("should return totals when given a valid user ID", (done) => {
      const userId = "anyUserId"
      const userName = "anyUserName"
      const goldTotal = 12
      const mockedResponse: GoldTotal = { userName, goldTotal }

      mockedClientInstance.get.mockImplementation(() => {
        return Promise.resolve({ data: mockedResponse })
      })

      subject.getTotals(userId)
        .then(res => {
          expect(res.data.userName).toEqual(userName)
          expect(res.data.goldTotal).toEqual(goldTotal)
          expect(mockedClientInstance.get).toHaveBeenCalledWith(`/totals?userId=${userId}`)
          done()
        })
    })

    it("should return an error when userId is invalid", (done) => {
      const userId = "invalidUserId"
      const errorMessage = "Must have a registered 'userId' in query params"
      
      mockedClientInstance.get.mockImplementation(() => {
        return Promise.reject({ response: { data: { error: errorMessage } } })
      })

      subject.getTotals(userId)
        .catch(err => {
          expect(err.response.data.error).toEqual(errorMessage)
          expect(mockedClientInstance.get).toHaveBeenCalledWith(`/totals?userId=${userId}`)
          done()
        })
    })
  })
})
