import { useMemo, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import useStaff from "../hooks/useStaff.js";
import StaffSearch from "../components/staff/StaffSearch.jsx";
import StaffForm from "../components/staff/StaffForm.jsx";
import StaffTable from "../components/staff/StaffTable.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const StaffPage = () => {

  const {user} = useAuth()

  const {
    staff,
    loading,
    addStaff,
    editStaff,
    changeStaffStatus,
  } = useStaff(user?.role === 'admin');

  const [showModal, setshowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const search = searchTerm.toLowerCase();

      return (
        member.name.toLowerCase().includes(search) ||
        member.username.toLowerCase().includes(search) ||
        member.role.toLowerCase().includes(search) ||
        member.phone.toString().includes(search)
      )
    })
  }, [staff, searchTerm])

  const handleAdd = () => {
    setSelectedStaff(null);
    setshowModal(true);
  }

  const handleEdit = (member) => {
    setSelectedStaff(member);
    setshowModal(true);
  }

  const handleClose = () => {
    setshowModal(false);
    setSelectedStaff(null);
  }

  const handleSave = async (staffData) => {
    try {
      if (selectedStaff) {
        await editStaff(selectedStaff._id, staffData);
      } else {
        await addStaff(staffData);
      }
    
      handleClose();
    
    } catch (error) {
      
    }
  };

  return (
    <>
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <h2>Staff Management</h2>
        </Col>

        <Col
          md={6}
          className="text-md-end mt-3 mt-md-0"
        >
          <Button
            onClick={handleAdd}
          >
            + Add Staff
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <StaffSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Col>
      </Row>

      {
        loading ? (
          <p>Loading staff...</p>
        ) : (
          <StaffTable
            staff={filteredStaff}
            onEdit={handleEdit}
            onToggleStatus={changeStaffStatus}
          />
        )
      }

      <StaffForm
        show={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        staff={selectedStaff}
      />
    </>
  )
}

export default StaffPage;
