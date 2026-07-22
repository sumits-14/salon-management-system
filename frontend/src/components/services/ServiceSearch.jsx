import React from 'react'
import { Form } from 'react-bootstrap'

const ServiceSearch = ({search, setSearch}) => {

  return (
    <Form.Control 
          type='text'
          placeholder='Search service...'
          className='mb-3'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
    />
  )
}

export default ServiceSearch
