import React from 'react'
import { Card, Button, Stack } from 'react-bootstrap'

const CustomerActions = ({ onEdit, onGenerateBill, onDelete }) => {

  return (
    <Card className='Shadow-sm mb-4'>
      <Card.Header>
        <h5 className='mb-0'>⚡Quick Actinos</h5>
      </Card.Header>

      <Card.Body>
        <Stack gap={3}> 
          <Button variant='warning' onClick={onEdit}>
            ✏️ Edit Customer
          </Button>

          <Button variant='primary' onClick={onGenerateBill}>
            📃 Generate Bill
          </Button>

          <Button variant='danger' onClick={onDelete}>
            🗑️ Delete Customer
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default CustomerActions
