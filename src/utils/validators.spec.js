import {
  validateEmptyAndEmail, validateEmptyAndLength3
} from './validators'

describe('Validators utils', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório')
  })

  it('should give an error with less then 3 character payload', () => {
    expect(validateEmptyAndLength3('12')).toBe('*Este campo precisa de no mínimo 3 caracteres')
  })

  it('should returns true when input pass a correct param', () => {
    expect(validateEmptyAndLength3('1234')).toBe(true)
  })

  it('should give an error with empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório')
  })

  it('should give an error with an invalid email', () => {
    expect(validateEmptyAndEmail('ts@')).toBe('*Este campo precisa ser um e-mail')
  })

  it('should returns when input pass a valid email', () => {
    expect(validateEmptyAndEmail('email@gmail.com')).toBe(true)
  })
})
