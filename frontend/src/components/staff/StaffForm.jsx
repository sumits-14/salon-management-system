import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const StaffForm = ({
     show, 
     handleClose, 
     handleSave, 
     staff = null,
}) => {

     const [name, setName] = useState("");
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [role, setRole] = useState("worker");
     const [phone, setPhone] = useState("");
     const [address, setAddress] = useState("");
     
     useEffect(() => {
          if(staff) {
               setName(staff.name);
               setUsername(staff.username);
               setRole(staff.role);
               setPhone(staff.phone);
               setAddress(staff.address || "")

               setPassword("")
          } else {
               setName("");
               setUsername("");
               setPassword("")
               setRole("worker");
               setPhone("");
               setAddress("");
          }
     }, [staff, show]);

     const onSubmit = (e) => {
          e.preventDefault();

          const staffData = {
               name,
               username,
               role,
               phone,
               address,
          };

          if(!staff) {
               staffData.password = password;
          }

          handleSave(staffData);
     }

  return (
    <Modal
          show={show}
          onHide={handleClose}
          centered
    >
          <Modal.Header closeButton>
               <Modal.Title>
                    {staff ? "Edit Staff" : "Add Staff"}
               </Modal.Title>
          </Modal.Header>

          <Form onSubmit={onSubmit}>
               <Modal.Body>
                    <Form.Group className="mb-3">
                         <Form.Label>Name</Form.Label>

                         <Form.Control 
                              type="text"
                              value={name}
                              maxLength={50}
                              onChange={e => setName(e.target.value)}
                              required
                         />
                    </Form.Group>

                    <Form.Group className="mb-3">
                         <Form.Label>Username</Form.Label>

                         <Form.Control 
                              type="text"
                              value={username}
                              disabled = {!!staff}
                              onChange={e => setUsername(e.target.value)}
                              required
                         />
                    </Form.Group>

                    {
                         !staff && (
                              <Form.Group className="mb-3">
                                   <Form.Label>Password</Form.Label>

                                   <Form.Control 
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                   />
                              </Form.Group>
                         )
                    }

                    <Form.Group className="mb-3">
                         <Form.Label>Role</Form.Label>

                         <Form.Select
                              value={role}
                              onChange={e => setRole(e.target.value)}
                         >
                              <option value="worker">
                                   Worker
                              </option>

                              <option value="admin">
                                   Admin
                              </option>
                         </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                         <Form.Label>Phone</Form.Label>

                         <Form.Control 
                              type="tel"
                              maxLength={10}
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                              required
                         />
                    </Form.Group>

                    <Form.Group>
                         <Form.Label>Address</Form.Label>

                         <Form.Control 
                              as="textarea"
                              rows={2}
                              value={address}
                              onChange={e => setAddress(e.target.value)}
                         />
                    </Form.Group>
               </Modal.Body>

               <Modal.Footer>
                    <Button
                         variant="secondary"
                         onClick={handleClose}
                    >
                         Cancel
                    </Button>

                    <Button type="submit">
                         {staff ? "Update staff" : "Save Staff"}
                    </Button>
               </Modal.Footer>
          </Form>
    </Modal>
  )
}

export default StaffForm;
