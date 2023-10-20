import React from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import { Button, Row, Col, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import '../../Common/buttons.css';
import '../../Common/modules.css';
import './assignments.css';
import { BsThreeDots } from 'react-icons/bs';
import { FaPenToSquare } from 'react-icons/fa6';
import { FaCircleCheck, FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import { TbGripVertical } from "react-icons/tb";

function Assignments() {
  const { courseId } = useParams();
  const assignments = db.assignments;
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === courseId);
  return (
    <div>
        <Row>
            <Col md={6}>
                <InputGroup>
                <FormControl type="text" placeholder="Search for Assignment" />
                </InputGroup>
            </Col>
            <Col md={6} className="text-md-right">
                <div className="d-flex justify-content-end">
                <Button
                    variant="light"
              
                    className="default-button focus text-nowrap ms-1"
                    style={{ backgroundColor: '#EDEDED' }}>
                    + Group
                </Button>
                <Button
                    variant="light"
   
                    className="focus text-nowrap ms-1 add-assignment-btn">
                    + Assignment
                </Button>
                <Button
                    variant="light"
        
                    className="default-button focus ms-1">
                    <FaEllipsisVertical style={{ color: 'black' }} />
                </Button>
                </div>
            </Col>
        </Row>
        <hr/>
        <ListGroup>
            <ListGroup.Item className="list-group-item-secondary ">
                <Row>
                    <Col xs="auto" className="text-center">
                        <Link to="." className="assignment-header">ASSIGNMENTS</Link>
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-end">
                            <span className="border rounded-pill border-dark p-1">40% of Total</span>
                            <Button variant="light" className="ms-1 module-header-button">
                                <FaPlus style={{ color: 'black' }} />
                            </Button>
                            <Button variant="light" className="ms-1 module-header-button">
                                <FaEllipsisVertical style={{ color: 'black' }} />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </ListGroup.Item>
            {courseAssignments.map((assignment) => (
                <ListGroup.Item className="assignment-item-left-border assignment-hover">
                    <Row className="d-flex align-items-center justify-content-between">
                        <Col>
                            <Row>
                                <Col className="col-auto mt-2 ms-1">
                                    <FaPenToSquare style={{ color: 'green' }} />
                                    </Col>
                                    <Col className="col-auto">
                                    <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="assignment-header assignment-item-title ms-1">{assignment.title}</Link>
                                    <div className="row ms-1 assignment-description">
                                        Multiple Modules | Due at 11:59pm | 100 pts
                                    </div>
                                </Col>
                                <Col className="mt-1">
                                    <div className="d-flex justify-content-end">
                                        <Button disabled variant="light" className="ms-1 module-header-button">
                                            <FaCircleCheck className="checkmark"/>
                                        </Button>
                                        <Button variant="light" className="ms-1 module-header-button">
                                            <FaEllipsisVertical style={{ color: 'black' }} />
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    </div>
  );
}
export default Assignments;