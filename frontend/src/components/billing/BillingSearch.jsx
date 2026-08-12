import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';

const BillingSearch = ({
     filters,
     setFilters,
     staff,
     onSearch,
     onReset,
}) => {

     const handleChange = (e) => {
          const {name, value} = e.target;
          setFilters((previousFilters) => ({
               ...previousFilters, [name] : value,
          }));
     }

  return (
    <div className='mb-4'>
          <Row className='g-3'>

               {/* Customer Search */}
               <Col md={4}>
                    <Form.Group>
                         <Form.Label>
                              Search Customer
                         </Form.Label>

                         <Form.Control 
                              type='text'
                              name='search'
                              placeholder='Enter Customer name'
                              value={filters.search}
                              onChange={handleChange}
                         />
                    </Form.Group>
               </Col>

               {/* Staff Filter */}
               <Col md={2}>
                    <Form.Group>
                         <Form.Label>
                              Staff
                         </Form.Label>

                         <Form.Select
                              name='worker'
                              value={filters.worker}
                              onChange={handleChange}
                         >
                              <option value="">
                                   All staff
                              </option>

                              {staff.map((member) => (
                                   <option
                                        key={member._id}
                                        value={member._id}
                                   >
                                        {member.name}
                                   </option>
                              ))}
                         </Form.Select>
                    </Form.Group>
               </Col>
          
               {/* Payment Method */}
               <Col md={2}>
                    <Form.Group>
                         <Form.Label>
                              Payment
                         </Form.Label>
                         <Form.Select
                              name='paymentMethod'
                              value={filters.paymentMethod}
                              onChange={handleChange}
                         >
                              <option value="">
                                   All
                              </option>
                              <option value="">
                                   Cash
                              </option>
                              <option value="">
                                   UPI
                              </option>
                              <option value="">
                                   Card
                              </option>
                         </Form.Select>
                    </Form.Group>
               </Col>

               {/* From date */}
               <Col md={2}>
                    <Form.Group>
                         <Form.Label>
                              From
                         </Form.Label>

                         <Form.Control 
                              type='date'
                              name='from'
                              value={filters.from}
                              onChange={handleChange}
                         />
                    </Form.Group>
               </Col>

               {/* to date */}
               <Col md={2}>
                    <Form.Group>
                         <Form.Label>
                              To
                         </Form.Label>
                         <Form.Control 
                              type='date'
                              name='to'
                              value={filters.to}
                              onChange={handleChange}
                         />
                    </Form.Group>    
               </Col>
          </Row>

          {/* Buttons */}
          <Row className='mt-3'>
               <Col className='text-end'>
                    <Button 
                         variant='primary'
                         className='me-2'
                         onClick={onSearch}
                    >
                         Search
                    </Button>

                    <Button 
                         variant='secondary'
                         onClick={onReset}
                    >
                         Reset
                    </Button>
               </Col>
          </Row>
    </div>
  )
}

export default BillingSearch;
