import { GoldTotal } from "../../models/goldTotal"
import { MinedGold } from "../../models/minedGold"
import { User } from "../../models/user"
import ChaosCoinAPI from "./chaosCoinAPI"
import { isFormatError, isServerError, isTimeout } from "./chaosCoinValidator"
import { formatExcavateResponse, formatRegisterResponse, formatStoreResponse, formatTotalResponse } from "./chaosCoinFormatter"


export default class ChaosCoinService {
  private api = new ChaosCoinAPI()

  register = async (userName: string): Promise<User> => {
    try {
      const response = await this.api.callRegister(userName)
      const user = formatRegisterResponse(response)
      return user
    } catch(e: any) {
      if (isServerError(e) || isTimeout(e)) {
        return this.register(userName)
      } else {
        throw e
      }
    }
  }

  excavate = async (): Promise<MinedGold> => {
    try {
      const response = await this.api.callExcavate()
      const minedGold = formatExcavateResponse(response)
      return minedGold
    } catch(e: any) {
      if(isServerError(e) || isTimeout(e) || isFormatError(e)) {
        return this.excavate()
      } else {
        throw e
      }
    }
  }

  store = async (userId: string, bucketId: string): Promise<void> => {
    try {
      const response = await this.api.callStore(userId, bucketId)
      const isSuccessful = formatStoreResponse(response)
      if(!isSuccessful) {
        console.info('Store was not successful, retrying...')
        return this.store(userId, bucketId)
      }
    } catch(e: any) {
      if(isServerError(e) || isTimeout(e)) {
        return this.store(userId, bucketId)
      } else {
        throw e
      }
    }
  }

  getTotal = async (userId: string): Promise<GoldTotal> => {
    try {
      const response = await this.api.callTotals(userId)
      const goldTotals = formatTotalResponse(response)
      return goldTotals
    } catch(e: any) {
      if(isServerError(e) || isTimeout(e)) {
        return this.getTotal(userId)
      } else {
        throw e
      }
    }
  }
}
