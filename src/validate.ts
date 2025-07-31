import { Record } from './App'

export const validateCreate = (record: Omit<Record, 'id'>): Omit<Record, 'id'> => {
  const { name, address } = record
  return {
    name: name ? name : '<no name>',
    address: address ? address : '<no address>'
  }
}

export const validateEdit = (record: Omit<Record, 'id'>): Partial<Omit<Record, 'id'>> => {
  const { name, address } = record
  let ret = {} as Partial<Omit<Record, 'id'>>

  if (name) {
    ret = {
      ...ret,
      name
    }
  }

  if (address) {
    ret = {
      ...ret,
      address
    }
  }

  return ret
}
