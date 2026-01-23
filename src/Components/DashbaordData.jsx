import React from 'react'
import { Card } from "react-bootstrap";
import ApexChart from "../Components/Piechart";


const DashbaordData = () => {
  return (
     <div>
            <div className="row g-3 mb-4">
              <div className="col-md-3 col-sm-6">
                <Card className="dashboard-card pink p-4">
                  <div className="d-flex align-items-center text-dark">
                    <i className="bi bi-people-fill icon"></i>
                    <div className="ms-3">
                      <h5 className="mb-0">150</h5>
                      <small>Total Employees</small>
                    </div>
                  </div>

                </Card>
              </div>

              <div className="col-md-3 col-sm-6">
                <Card className="dashboard-card blue p-4">
                  <div className="d-flex align-items-center text-dark">
                    <i className="bi bi-list-task icon"></i>
                    <div className="ms-3">
                      <h5 className="mb-0">24</h5>
                      <small>Tasks</small>
                    </div>
                  </div>

                </Card>
              </div>

              <div className="col-md-3 col-sm-6">
                <Card className="dashboard-card teal p-4">
                  <div className="d-flex align-items-center text-dark">
                    <i className="bi bi-graph-up icon"></i>
                    <div className="ms-3">
                      <h5 className="mb-0">75%</h5>
                      <small>Progress</small>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="col-md-3 col-sm-6">
                <Card className="dashboard-card green text-dark p-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-gear-fill icon"></i>
                    <div className="ms-3">
                      <h5 className="mb-0">12</h5>
                      <small>Total Modules</small>
                    </div>
                  </div>

                </Card>
              </div>
            </div>
             <ApexChart />
          </div>
  )
}

export default DashbaordData;