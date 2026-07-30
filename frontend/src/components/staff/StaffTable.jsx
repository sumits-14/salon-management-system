import { Table, Button, Badge } from "react-bootstrap";

const StaffTable = ({staff, onEdit, onToggleStatus,}) => {

     if(staff.length === 0) {
          return (
               <p className="text-center mt-4">
                    No Staff Found!
               </p>
          );
     }

  return (
    <Table
          striped
          bordered
          hover
          responsive
          className="mt-3"
    >
          <thead>
               <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th width="220">Actions</th>
               </tr>
          </thead>
          <tbody>
               {staff.map((member, index) => (
                    <tr key={member._id}>
                         <td>{index + 1}</td>
                         <td>{member.name}</td>
                         <td>{member.username}</td>
                         <td className="text-capitalize">{member.role}</td>
                         <td>{member.phone}</td>
                         <td>
                              <Badge bg={member.active ? "success" : "secondary"}>
                                   {member.active ? "Active" : "Inactive"}
                              </Badge>
                         </td>
                         <td>
                              <Button
                                   variant="warning"
                                   size="sm"
                                   className="me-2"
                                   onClick={() => onEdit(member)}
                              >
                                   Edit
                              </Button>

                              <Button
                                   variant={
                                        member.active ? "danger" : "success"
                                   }
                                   size="sm"
                                   onClick={() => 
                                        onToggleStatus(
                                             member._id,
                                             !member.active
                                        )
                                   }
                              >
                                   {
                                        member.active ? "Deactivate" : "Activate"
                                   }
                              </Button>
                         </td>
                    </tr>
               ))}
          </tbody>
    </Table>
  )
}

export default StaffTable;
