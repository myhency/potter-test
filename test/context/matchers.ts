import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to'
import matchers from 'expect/build/matchers'
import { Resource } from '@azure/cosmos'
import { AES256_CBC } from '@/context'
const crypto = AES256_CBC.createCrypto()
export {}
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCloseToNow(ms: Number): R
      toBeRows(expected: any[]): R
      toBeStrictRows(expected: any[]): R
      toBeRow(expected: any): R
      toBeDeepCloseTo: (
        expected: number | number[] | number[][] | object,
        decimals?: number
      ) => R
      toMatchCloseTo: (
        expected: number | number[] | number[][] | object,
        decimals?: number
      ) => R
      toBeResponse(expected: Response): R
      toBeAPIError(
        expected: Partial<Pick<APIError, 'code' | 'message' | 'error'>>
      ): R
      toCosmosEqual(expected: any): R
      toMatchCosmosObject(expected: any): R
      toBeDecryptedTo(expected: any): R
    }
  }
}

const toBeCloseToNow = (received: Date | string, ms = 1000) => {
  if (typeof received === 'string') {
    return toBeCloseToNow(new Date(received), ms)
  }
  const gap = Math.abs(Date.now() - received.getTime())
  return {
    pass: gap <= ms,
    message: () => `Received date is ${received} - [gap:${gap}]`,
  }
}

const toBeRows = (received: any[], expected: any[]) => {
  const sorted1 = received.sort((r1, r2) =>
    String.prototype.localeCompare.call(r1.id, r2.id)
  )
  const sorted2 = expected.sort((r1, r2) =>
    String.prototype.localeCompare.call(r1.id, r2.id)
  )
  return toBeStrictRows(sorted1, sorted2)
}

const toBeStrictRows = (received: any[], expected: any[]) => {
  if (received.length !== expected.length) {
    return {
      pass: false,
      message: () =>
        `Received's length is ${received.length}\n But expected one was ${expected.length}`,
    }
  }
  const results = []
  for (let i = 0; i < received.length; i++) {
    results.push(toBeRow(received[i], expected[i]))
  }
  return {
    pass: results.every((r) => r.pass === true),
    message: () => results.map((r) => r.message()).join('\n'),
  }
}

const convertToJSON = (e: any) => {
  return e && typeof e.toJSON === 'function' ? e.toJSON() : e
}

const isIsoDateString = (str: string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false
  return new Date(str).toISOString() === str
}

const toBeRow = (received: any, expected: any) => {
  const t1 = typeof received
  const t2 = typeof expected
  if (t1 !== t2) {
    return {
      pass: false,
      message: () => `type mismatch expected ${t2}\nBut was ${t1}`,
    }
  }
  const s1 = JSON.parse(JSON.stringify(convertToJSON(received)))
  const s2 = JSON.parse(JSON.stringify(convertToJSON(expected)))
  let pass = true
  for (const k of Object.keys(s2)) {
    const v1 = s1[k]
    const v2 = s2[k]
    if (isIsoDateString(v1) && isIsoDateString(v2)) {
      const gap = Math.abs(new Date(v1).getTime() - new Date(v2).getTime())
      pass = pass && gap <= 1000
    } else if (v1 === undefined && v2 === null) {
      pass = pass && true
    } else if (Array.isArray(v1) && Array.isArray(v2)) {
      pass = pass && toBeRows(v1, v2).pass
    } else if (v1 instanceof Object && v2 instanceof Object) {
      pass = pass && toBeRow(v1, v2).pass
    } else {
      pass = pass && v1 === v2
    }
  }
  return {
    pass,
    message: () =>
      `Received was ${JSON.stringify(s1)}. Expected is ${JSON.stringify(s2)}`,
  }
}

interface Response {
  status: number
  data?: any
}
const toBeResponse = (received: Response, expected: Response) => {
  const reduced = { status: received.status, data: received.data }
  return matchers.toEqual(reduced, expected)
}

const toBeAPIError = (received: any, expected: APIError) => {
  if (received instanceof APIError) {
    return {
      pass:
        expected.code === received.code &&
        expected.message === received.message &&
        expected.error === received.error,
      message: () =>
        `Expected is [${expected.code}][${expected}][${expected.error}]\nBut was [${received.code}][${received}][${received.error}]`,
    }
  } else if (received instanceof Error) {
    return {
      pass: false,
      message: () => `Expected is APIError.\nBut was [${received}]`,
    }
  } else {
    return {
      pass: false,
      message: () =>
        `Expected is APIError.\nBut was ${JSON.stringify(received, null, 2)}`,
    }
  }
}

const toCosmosEqual = (received: Resource, expected: Resource) => {
  const { _ts: rts, _etag: retag, _rid: rid, _self: rself, ...r } = received
  const { _ts: ets, _etag: eetag, _rid: erid, _self: eself, ...e } = expected
  return matchers.toStrictEqual(r, e)
}

const toMatchCosmosObject = (received: Resource, expected: Resource) => {
  const { _ts: rts, _etag: retag, _rid: rid, _self: rself, ...r } = received
  const { _ts: ets, _etag: eetag, _rid: erid, _self: eself, ...e } = expected
  return matchers.toMatchObject(r, e)
}

const toBeDecryptedTo = (received: string, expected: Resource) => {
  return matchers.toBe(crypto.decrypt(received), expected)
}

expect.extend({
  toBeCloseToNow,
  toBeRows,
  toBeStrictRows,
  toBeRow,
  toBeDeepCloseTo,
  toMatchCloseTo,
  toBeResponse,
  toBeAPIError,
  toCosmosEqual,
  toMatchCosmosObject,
  toBeDecryptedTo,
})
