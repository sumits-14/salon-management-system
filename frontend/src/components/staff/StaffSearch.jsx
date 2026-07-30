import { Form } from "react-bootstrap";

const StaffSearch = ({searchTerm, setSearchTerm}) => {

  return (
     <Form.Control 
          type="text"
          placeholder="Search staff by name, username or phone number..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
     />
  )
}

export default StaffSearch;
