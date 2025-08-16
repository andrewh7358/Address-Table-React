import { Table, TableProps } from 'antd'
import React, { useState } from 'react'
import CreateModal from './CreateModal'
import EditModal from './EditModal'
import { initialData } from './initialData'
import { columnDefnition } from './columnDefinition'

export interface Record {
  id: string
  name: string
  address: string
}

const App = () => {
  const [data, setData] = useState(initialData)
  const [nextId, setNextId] = useState(initialData.length + 1)
  const [editId, setEditId] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const onCreate = () => {
    setShowCreateModal(true)
  }

  const onEdit = (id: string) => {
    setEditId(id)
    setShowEditModal(true)
  }

  const onDelete = (id: string) => {
    const index = data.findIndex((d) => d.id === id)
    setData(data.slice(0, index).concat(data.slice(index + 1)))
  }

  const submitCreate = (record: Omit<Record, 'id'>) => {
    const insertRecord: Record = {
      ...record,
      id: nextId + ''
    }

    setData(data.concat(insertRecord))
    setNextId(nextId + 1)
    setShowCreateModal(false)
  }

  const submitEdit = (id: string, record: Partial<Omit<Record, 'id'>>) => {
    const index = data.findIndex((d) => d.id === id)
    data[index] = {
      ...data[index],
      ...record
    }

    setData(data)
    setEditId('')
    setShowEditModal(false)
  }

  const columns = columnDefnition(onEdit, onDelete)
  const createModal = CreateModal(showCreateModal, setShowCreateModal, submitCreate)
  const editModal = EditModal(showEditModal, setShowEditModal, editId, submitEdit)

  return (
    <>
      <h1>Address Table</h1>
      <button className='createButton' type='button' onClick={onCreate}>Add Address</button>
      <Table className='addressTable' dataSource={data} columns={columns} pagination={false} />
      {createModal}
      {editModal}
    </>
  )
}

export default App
