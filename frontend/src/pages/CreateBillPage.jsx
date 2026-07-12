import React from 'react'
import { useLocation } from 'react-router-dom'

const CreateBillPage = () => {

  const location = useLocation();
  const customerId = location.state?.customerId

  return (
    <div>
          Create Bill Page!
    </div>
  )
}

export default CreateBillPage






