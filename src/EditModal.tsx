import { Modal } from 'antd'
import React, { FormEvent, useState } from 'react'
import { Record } from './App'
import { validateEdit } from './validate'

const initialState = { name: '', address: '' } as Omit<Record, 'id'>

const EditModal = (
  showEditModal: boolean,
  setShowEditModal: (value: boolean) => void,
  id: string,
  submitEdit: (id: string, record: Partial<Omit<Record, 'id'>>) => void
) => {
  const [editData, setEditData] = useState(initialState)

  const closeEditModal = () => {
    setShowEditModal(false)
    setEditData(initialState)
  }

  const onSubmit = () => {
    const editRecord = validateEdit(editData)
    submitEdit(id, editRecord)
    setEditData(initialState)
  }

  const onChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement  
    setEditData({ ...editData, [name]: value })
  }

  return (
    <Modal open={showEditModal} onCancel={closeEditModal} onOk={onSubmit} title='Edit'>
      <label>
        Name:
        <input type='text' name={'name'} value={editData.name} onChange={onChange} />
      </label>
      <br />
      <label>
        Address:
        <input type='text' name={'address'} value={editData.address} onChange={onChange} />
      </label>
    </Modal>
  )
}

export default EditModal
