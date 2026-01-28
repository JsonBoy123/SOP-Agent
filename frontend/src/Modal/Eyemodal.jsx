import React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EyeModal = () => {
  return (
    <div
      className="container-fluid text-center p-3 mt-4 mb-4"
      style={{
        backgroundColor: "#99b7d6ff",
        maxWidth: "400px",
        margin: "0 auto",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
    

      {/* Modal Body */}
      <div className="p-3">
        <Card className="p-3 border-0 shadow-sm" style={{ borderRadius: "10px" }}>
          <h6 className="fw-bold mb-2">Employee Details</h6>
          <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
            <strong>Name:</strong> Priti Pratikshya
          </p>
          <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
            <strong>Role:</strong> Developer
          </p>
          <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
            <strong>Department:</strong> IT
          </p>

          <div className="d-flex justify-content-end mt-3 gap-2">
            <Button variant="outline-secondary" size="sm">
              Close
            </Button>
            <Button size="sm" style={{ backgroundColor: "#007bff", border: "none" }}>
              Edit
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EyeModal;
