import { Modal } from 'antd'
import React, { FormEvent, useState } from 'react'
import { Record } from './App'
import { validateCreate } from './validate'

const initialState = { name: '', address: '' } as Omit<Record, 'id'>

const CreateModal = (
  showCreateModal: boolean,
  setShowCreateModal: (value: boolean) => void,
  submitCreate: (record: Omit<Record, 'id'>) => void
) => {
  const [createData, setCreateData] = useState(initialState)

  const closeCreateModal = () => {
    setShowCreateModal(false)
    setCreateData(initialState)
  }

  const onSubmit = () => {
    const createRecord = validateCreate(createData)
    submitCreate(createRecord)
    setCreateData(initialState)
  }

  const onChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement  
    setCreateData({ ...createData, [name]: value })
  }

  return (
    <Modal open={showCreateModal} onCancel={closeCreateModal} onOk={onSubmit} title='Create'>
      <label>
        Name:
        <input type='text' name={'name'} value={createData.name} onChange={onChange} />
      </label>
      <br />
      <label>
        Address:
        <input type='text' name={'address'} value={createData.address} onChange={onChange} />
      </label>
    </Modal>
  )
}

export default CreateModal
