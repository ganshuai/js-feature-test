import { runTest } from '../tools'
import { Validator, TestType } from './types'

const testExpression = `
  function *a() {
    return function.sent
  }

  return a().next(1)
`

const name = 'functionSent'
export const validator: Validator = {
  name,
  test(content: any, done) {
    return runTest({
      done, name,
      description: 'https://www.babeljs.cn/docs/plugins',
      type: TestType.checkResult,
      expression: testExpression,
      expectResult: 1
    })
  }
}
