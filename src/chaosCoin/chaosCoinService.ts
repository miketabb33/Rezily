import { GoldTotal } from "../models/goldTotal"
import { MinedGold } from "../models/minedGold"
import { User } from "../models/user"
import ChaosCoinAPI from "./chaosCoinAPI"
import { isFormatError, isServerError, isTimeout } from "../utils/networkResponseValidator"
import { formatExcavateResponse, formatRegisterResponse, formatStoreResponse, formatTotalResponse } from "./chaosCoinFormatter"
import { NetworkResponse } from "../models/networkResponse"
import ExponentialBackoff from "../utils/exponentialBackoff"

export default class ChaosCoinService {
  private api = new ChaosCoinAPI()
  private xbackoff = new ExponentialBackoff()

  register = async (userName: string): Promise<User> => {
    try {
      const response: NetworkResponse = await this.api.callRegister(userName, this.xbackoff.getCurrentTimeout())
      const user = formatRegisterResponse(response)
      this.xbackoff.resetAttempts()
      return user
    } catch(e: any) {
      if (isServerError(e) || isTimeout(e)) {
        this.xbackoff.registerAttempt()
        return this.register(userName)
      } else {
        this.xbackoff.resetAttempts()
        throw e
      }
    }
  }

  excavate = async (): Promise<MinedGold> => {
    try {
      const response: NetworkResponse = await this.api.callExcavate(this.xbackoff.getCurrentTimeout())
      const minedGold = formatExcavateResponse(response)
      this.xbackoff.resetAttempts()
      return minedGold
    } catch(e: any) {
      if(isServerError(e) || isTimeout(e) || isFormatError(e)) {
        this.xbackoff.registerAttempt()
        return this.excavate()
      } else {
        this.xbackoff.resetAttempts()
        throw e
      }
    }
  }

  store = async (userId: string, bucketId: string): Promise<void> => {
    try {
      const response: NetworkResponse = await this.api.callStore(userId, bucketId, this.xbackoff.getCurrentTimeout())
      const isSuccessful = formatStoreResponse(response)
      if(!isSuccessful) {
        console.info('Store was not successful, retrying...')
        this.xbackoff.registerAttempt()
        return this.store(userId, bucketId)
      }
      this.xbackoff.resetAttempts()
    } catch(e: any) {
      if(isServerError(e) || isTimeout(e)) {
        this.xbackoff.registerAttempt()
        return this.store(userId, bucketId)
      } else {
        this.xbackoff.resetAttempts()
        throw e
      }
    }
  }

  getTotal = async (userId: string): Promise<GoldTotal> => {
    try {
      const response: NetworkResponse = await this.api.callTotals(userId, this.xbackoff.getCurrentTimeout())
      const goldTotals = formatTotalResponse(response)
      this.xbackoff.resetAttempts()
      return goldTotals
    } catch(e: any) {
      if(isServerError(e) || isTimeout(e)) {
        this.xbackoff.registerAttempt()
        return this.getTotal(userId)
      } else {
        this.xbackoff.resetAttempts()
        throw e
      }
    }
  }
}
