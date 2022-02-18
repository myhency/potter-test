import { NextFunction, Request, Response } from 'express'
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.OT_SERVER_REQUEST_LOGGING !== 'false') {
    console.log(`[Logger] Request URL : [${req.method}] ${req.originalUrl}`)
    if (req.body) {
      console.log(`[Logger] Request Body is below `)
      console.group()
      console.dir(req.body)
      console.groupEnd()
    } else {
      console.log(`[Logger] No Request Body`)
    }
  }
  next()
}

export const responseLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.OT_SERVER_RESPONSE_LOGGING !== 'false') {
    console.log(`[Logger] Response Status Code : ${res.statusCode}`)
  }
  next()
}
