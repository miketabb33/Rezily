import { CONNECTION_ABORTED_ERROR, FORMAT_ERROR } from "../../constants"

export const isServerError = (err: any) => {
  const statusCode: number = err.response?.status
  return statusCode >= 500 && statusCode < 600
}

export const isTimeout = (err: any) => {
  return err.code === CONNECTION_ABORTED_ERROR
}

export const isFormatError = (err: any) => {
  return err.code === FORMAT_ERROR
}