import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useBillCreation from '../hooks/useBillCreation.js';
import BillCustomerCard from '../components/bills/BillCustomerCard.jsx';
import BillServiceTable from '../components/bills/BillServiceTable.jsx';
import BillSummaryCard from '../components/bills/BillSummaryCard.jsx';


const CreateBillPage = () => {

  const { customerId } = useParams();
  const {
    customer,
    services,
    selectedServices,
    handleServiceToggle,
    loading,
    error,
  } = useBillCreation(customerId)

  if (loading) {
    return (
      <div className='text-center mt-5'>
        <Spinner animation='border' />
      </div>
    )
  }
  if (error) {
    return (
      <Alert variant='danger'>
        Unable to load Bill Information!
      </Alert>
    )
  }

  return (
    <Container className='mt-4'>
      <h2 className='mb-4'>
        Create Bill
      </h2>

      <Row>
        <Col lg={4}>
          <BillCustomerCard customer={customer} />

          <BillSummaryCard selectedServices={selectedServices}/>
        </Col>

        {/* <Col lg={4}>
          <BillCustomerCard/>
        </Col> */}

        <Col lg={8}>
          <BillServiceTable 
            services={services}
            selectedServices={selectedServices}
            onServiceToggle={handleServiceToggle} 
          />
        </Col>
      </Row>
    </Container>
  )
}

export default CreateBillPage;
