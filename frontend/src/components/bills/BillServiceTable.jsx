import { Table, Form, Card } from "react-bootstrap"

const BillServiceTable = ({
  services, 
  selectedServices = [], 
  onServiceToggle = () => {},
}) => {
  
  if(!services.length) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center">
          No Service available!
        </Card.Body>
      </Card>
    );
  }
  
    return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">
          Available services
        </h5>
      </Card.Header>

      <Card.Body>
        <Table responsive hover>
          <thead>
            <tr>
              <th style={{width : "80px"}}>
                Select
              </th>

              <th>
                Service Name
              </th>

              <th className="text-end">
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            {
              services.map(service => (
                <tr key={service._id}>
                  <td>
                    <Form.Check 
                      type="checkbox"
                      // checked={selectedServices.includes(service._id)}
                      checked={selectedServices.some(
                        (selectedService) => selectedService._id === service._id  
                      )}
                      onChange={() => onServiceToggle(service)}
                    />
                  </td>

                  <td>
                    {service.serviceName}
                  </td>

                  <td className="text-end">
                    Rs. {service.price}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default BillServiceTable;
