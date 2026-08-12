import { useState } from "react";
import {Row, Col, Spinner, Alert} from 'react-bootstrap';
import { useBillingHistory, useStaff } from "../hooks";
import BillingSearch from "../components/billing/BillingSearch.jsx";
import BillingTable from "../components/billing/BillingTable.jsx";
import BillDetailsModal from "../components/billing/BillDetailsModal.jsx";

const BillingHistoryPage = () => {

  const {
    bills,
    loading,
    error,
    
    filters,
    setFilters,

    refreshBills,

    selectedBill,
    setSelectedBill,

    fetchBillDetails,
    billLoading,
  } = useBillingHistory();

  const {
    staff,
    loading : staffLoading,
  } = useStaff();

  const [showModal, setShowModal] = useState(false);

  ////// Search Bills
  const handleSearch = () => {
    refreshBills(filters)
  }

  ////// Reset Filters
  const handleReset = () => {
    const resetFilters = {
      search: '',
      worker: '',
      paymentMethod: '',
      from: '',
      to: '',
    };
    setFilters(resetFilters);
    refreshBills(resetFilters)
  }

  //////// View Bill
  const handleViewBill = async(billId) => {
    setShowModal(true);
    await fetchBillDetails(billId)
  }

  //////// Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBill(null)
  }

  return (
      <>
          {/* Page Header */}
          <Row className="mb-4">
              <Col>
                <h2>Billing History</h2>
                <p className="text-muted mb-0">
                    View all generated bills and transactions.
                </p>
              </Col>
          </Row>

          {/* Search & Filters */}
          {
            staffLoading ? (
              <div className="text-center mb-4">
                <Spinner 
                    animation="border"
                    size="sm"
                />
              </div>
            ) : (
              <BillingSearch 
                filters={filters}
                setFilters={setFilters}
                staff={staff}
                onSearch={handleSearch}
                onReset={handleReset}
              />
            )
          }

          {/* Error  */}
          {
            error && (
              <Alert variant="danger">
                Unable to load billing history.
              </Alert>
            )
          }

          {/* Billing Table */}
          {
            loading ? (
              <div className="text-center mt-5">
                <Spinner animation="border"/>
              </div>
            ) : (
              <BillingTable 
                bills={bills}
                onView={handleViewBill}
              />
            )
          }

          {/* Bill Details Modal */}
          <BillDetailsModal 
            show={showModal}
            handleClose={handleCloseModal}
            bill={selectedBill}
            loading={billLoading}
          />
      </>
  )
}

export default BillingHistoryPage
