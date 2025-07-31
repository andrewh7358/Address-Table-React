import { TableProps } from 'antd'
import React from 'react'
import { Record } from './App'

export const columnDefnition = (onEdit: (id: string) => void, onDelete: (id: string) => void): TableProps<Record>['columns'] => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <button type='button' onClick={() => onEdit(record.id)} style={{ marginRight: '8px' }}>Edit</button>
          <button type='button' onClick={() => onDelete(record.id)}>Delete</button>
        </>
      )
    }
  ]
}
