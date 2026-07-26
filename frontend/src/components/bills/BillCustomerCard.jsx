import { Card, ListGroup } from "react-bootstrap"

const BillCustomerCard = ({ customer }) => {
  if (!customer) {
    return null;
  }
  
  // console.log("BillCustomerCard:", customer);
  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">
          Customer Information
        </h5>
      </Card.Header>

      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Name:</strong>
          <br />
          {customer.customerName}
        </ListGroup.Item>

        <ListGroup.Item>
          <strong>Mibile:</strong>
          <br />
          {customer.mobileNumber}
        </ListGroup.Item>

        <ListGroup.Item>
          <strong>Total Visits:</strong>
          <br />
          {customer.totalVisits}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default BillCustomerCard;
