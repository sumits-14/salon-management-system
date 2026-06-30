import { Form } from 'react-bootstrap'

const CustomerSearch = ({search, setSearch}) => {
     return (
          <Form.Control 
               type='text'
               placeholder = 'Search by customer name or mobile number...'
               value={search}
               onChange={e => setSearch(e.target.value)}
               className='mb-3'
          />
     )
}

export default CustomerSearch
