import { MinedGold } from "../../models/minedGold"
import ChaosCoinAPI from "./chaosCoinAPI"
import { isFormatError, isServerError, isTimeout } from "./chaosCoinErrorCatcher"
import { formatExcavateResponse } from "./chaosCoinFormatter"


export default class ChaosCoinService {
  private api = new ChaosCoinAPI()

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
}
