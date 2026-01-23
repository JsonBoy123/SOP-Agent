import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const DesignEditModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    EmployeeID: "",
    PhoneNumber: "",
    salary: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    console.log("Saved data:", formData);
    alert("Employee details saved successfully ✅");
  };

  return (
    <div style={{ marginBottom: "10px" }}>

      <Form style={{ padding: "20px" }}>
        <Row>
          
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Email</Form.Label>
              <Form.Control
                type="text"
                name="Email Address"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                placeholder="Enter role"
                value={formData.role}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                placeholder="Enter department"
                value={formData.department}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Employee ID</Form.Label>
              <Form.Control
                type="text"
                name="EmployeeID"
                placeholder="Enter employee ID"
                value={formData.EmployeeID}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Phone Number</Form.Label>
              <Form.Control
                type="number"
                name="PhoneNumber"
                placeholder="Enter phone number"
                value={formData.PhoneNumber}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          variant="primary"
          onClick={handleSave}
          style={{
            background: "linear-gradient(135deg, #007bff, #00b4d8)",
            border: "none",
            boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            color: "#fff",
            fontWeight: "500",
            padding: "10px 35px",
            borderRadius: "30px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "linear-gradient(135deg, #0062cc, #0096c7)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "linear-gradient(135deg, #007bff, #00b4d8)")
          }
        >
          Submit
        </Button>
      </div>
    </div >
  );
};

export default DesignEditModal;
