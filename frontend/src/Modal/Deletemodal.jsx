import React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteModal = () => {
  return (
    <div
      className="container-fluid text-center p-3"
      style={{ backgroundColor: "#f8f9fa" }}
    >


      <div className="d-flex flex-wrap flex-md-nowrap justify-content-center align-items-start gap-3">
        {/* -------- LEFT SIDE: Ambiguous actions -------- */}
        <div className="text-center mb-3 mb-md-0">
          <div
            className="d-flex justify-content-center align-items-center mx-auto mb-2"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#ff4d4f",
              color: "#e2dbdbff",
              fontSize: "24px",
            }}
          >
            ✖
          </div>



          <Card
            className="p-2 border-0 shadow-sm mx-auto"
            style={{ width: "350px", borderRadius: "12px", height: "30vh" ,gap:"20px"}}
          >

            <div className="text-warning fs-5 mb-1">⚠️</div>
            <h6 className="fw-bold mb-1" style={{ fontSize: "14px" }}>
              Delete Employee 
            </h6>
            <p className="text-muted small mb-2" style={{ fontSize: "12px" }}>
              You’re going to delete the Employee list. Are you sure?
            </p>

            <div className="d-flex justify-content-center gap-1">
              <Button variant="outline-secondary" size="sm">
                No, Keep It
              </Button>
              <Button
                size="sm"
                style={{ backgroundColor: "#f06595", border: "none" }}
              >
                Yes, Delete!
              </Button>
            </div>
          </Card>


        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
