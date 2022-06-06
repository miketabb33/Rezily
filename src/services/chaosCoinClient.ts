import axios, { AxiosInstance } from "axios";
import { CHAOS_COIN_BASE_URL } from "../constants";

export default class ChaosCoinClient {
  clientInstance: AxiosInstance
  private clientConfig = {
    baseURL: CHAOS_COIN_BASE_URL
  }

  constructor() {
    this.clientInstance = axios.create(this.clientConfig)
  }

  register(userName: string) {
    return this.clientInstance.post(`/register?userName=${userName}`)
  }

  excavate() {
    return this.clientInstance.post(`/excavate`)
  }
  
  store(userId: string, bucketId: string) {
    return this.clientInstance.post(`/store?userId=${userId}&bucketId=${bucketId}`)
  }

  getTotals(userId: string) {
    return this.clientInstance.get(`/totals?userId=${userId}`)
  }
} 
