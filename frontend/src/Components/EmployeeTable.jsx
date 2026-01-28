import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import AddModal from "../Modal/AddModal";

import Eyemodal from "../Modal/Eyemodal";
import DesignEditModal from "../Modal/DesignEditmodal";
import DeleteModal from "../Modal/Deletemodal";
import "../styles/employeetable.css"
import DesignAddModal from "../Modal/DesignAddModal";



const EmployeeTable = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [deleteshow, setDeleteshow] = useState(false)
    const deletehandleShow = () => setDeleteshow(true);
    const deletehandleClose = () => setDeleteshow(false);

    const [editshow, seteditshow] = useState(false)
    const edithandleShow = () => seteditshow(true);
    const edithandleClose = () => seteditshow(false);

    const [eyeshow, seteyeshow] = useState(false)
    const eyehandleShow = () => seteyeshow(true);
    const eyehandleClose = () => seteyeshow(false);


    // const [formData, setFormData] = useState({
    //     name: "",
    //     role: "",
    //     department: "",
    //     EmployeeID: "",
    // });
    // const handleChange = (e) =>
    //     setFormData({ ...formData, [e.target.name]: e.target.value });

    const employees = [
        { id: 1, name: "PRITI", role: "Developer", department: "IT", EmployeeID: "023234" },
        { id: 2, name: "SUSHREE", role: "Designer", department: "UI/UX", EmployeeID: "023233" },
        { id: 3, name: "PRATIKSHYA", role: "Manager", department: "HR", EmployeeID: "023236" },
        { id: 4, name: "JYOTI", role: "Tester", department: "QA", EmployeeID: "023239" },
    ];
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="employee-table bg-white p-3 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Employee List</h5>
                 {/* Search Bar */}
                <div className="search-btn" style={{ gap: "10px",width:"400px",marginRight:"80px" }} >
                    <div className="input-group" >
                        <span className="input-group-text bg-primary">
                           <i class="bi bi-search text-white"></i>

                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
             </div>

                 <Button size="sm" onClick={handleShow}>
                    <i className="bi bi-plus-circle me-1"></i> Add Employee
                </Button>
            </div>
            <div className="table-responsive">
                <Table striped bordered hover className="align-middle mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>Slno.</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>EmployeeID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.role}</td>
                                <td>{emp.department}</td>
                                <td>{emp.EmployeeID}</td>
                                <td className="d-flex justify-content-center gap-2">
                                    <Button size="sm" variant="outline-primary" onClick={edithandleShow}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" onClick={deletehandleShow}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                    <Button size="sm" variant="outline-success" onClick={eyehandleShow}>
                                        <i className="bi bi-eye"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Modal */}
            <AddModal show={show} handelclose={handleClose} modalSize="small" style>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "linear-gradient(135deg, #007bff, #00b4d8)",
                        color: "#fff",
                        padding: "15px 20px",
                        borderRadius: "8px 8px 0 0",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                       
                    }}
                >
                    <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>
                     Employee Data
                    </h2>

                    <button
                        onClick={handleClose}
                        aria-label="Close"
                        style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            color: "#fff",
                            border: "none",
                            fontSize: "24px",
                            fontWeight: "bold",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        &times;
                    </button>
                </div>

                {/* <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter employee name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                name="role"
                                placeholder="Enter role"
                                value={formData.role}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                                type="text"
                                name="department"
                                placeholder="Enter department"
                                value={formData.department}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Employee ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="EmployeeID"
                                placeholder="Enter employee ID"
                                value={formData.EmployeeID}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </div>
                <Button
                    variant="primary"
                    onClick={handleChange} // your save handler
                    style={{
                        background: "linear-gradient(135deg, #007bff, #00b4d8)",
                        border: "none",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        color: "#fff",
                        fontWeight: "500",
                        padding: "8px",
                        borderRadius: "6px",
                        display: "flex",           
                        alignItems: "center",      
                        justifyContent: "end",  
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        marginLeft:"400px",
                        marginBottom:"10px"
                    }}
                >
                    Save
                </Button> */}
                <DesignAddModal/>

            </AddModal>
            <AddModal show={deleteshow} handleClose={deletehandleClose}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "linear-gradient(135deg, #007bff, #00b4d8)",
                        color: "#fff",
                        padding: "10px 10px",
                        borderRadius: "8px 8px 0 0",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",

                    }}
                >
                    <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>
                         Delete Data
                    </h2>

                    <button
                        onClick={deletehandleClose}
                        aria-label="Close"
                        style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            color: "#fff",
                            border: "none",
                            fontSize: "24px",
                            fontWeight: "bold",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        &times;
                    </button>

                </div>
                < DeleteModal />

            </AddModal>
            <AddModal show={editshow} handleClose={edithandleClose} modalSize="small" >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "linear-gradient(135deg, #007bff, #00b4d8)",
                        color: "#fff",
                        padding: "15px 20px",
                        borderRadius: "8px 8px 0 0",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                        
                    }}
                >
                    <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>
                        Add Edit Data
                    </h2>

                    <button
                        onClick={edithandleClose}
                        aria-label="Close"
                        style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            color: "#fff",
                            border: "none",
                            fontSize: "24px",
                            fontWeight: "bold",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                           
                        }}
                    >
                        &times;
                    </button>
                </div>


                <DesignEditModal />

            </AddModal>
            <AddModal show={eyeshow} handleClose={eyehandleClose} modalSize="small">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "linear-gradient(135deg, #007bff, #00b4d8)",
                        color: "#fff",
                        padding: "15px 20px",
                        borderRadius: "8px 8px 0 0",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                    }}
                >
                    <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>
                         Eye Data
                    </h2>

                    <button
                        onClick={eyehandleClose}
                        aria-label="Close"
                        style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            color: "#fff",
                            border: "none",
                            fontSize: "24px",
                            fontWeight: "bold",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        &times;
                    </button>
                </div>
                <Eyemodal />

            </AddModal>
        </div >
    );
};

export default EmployeeTable;
