import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Row, Col, InputGroup, FormControl, ListGroup, Modal } from 'react-bootstrap';
import '../../Common/buttons.css';
import '../../Common/modules.css';
import './assignments.css';
import { FaPenToSquare } from 'react-icons/fa6';
import { FaCircleCheck, FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignment } from "./assignmentsReducer";

function Assignments() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const assignments = useSelector((state) => state.assignmentsReducer.assignments);
    const dispatch = useDispatch();
    const courseAssignments = assignments.filter((assignment) => assignment.course === courseId);
    const [selectedAssignment, setSelectedAssignment] = useState({title: ''});
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const formatDate = (dateStr) => {
        const date = new Date(dateStr.replace(/-/g, '/'));
        const options = { month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
    const newAssignment = {
        title: "New Assignment", 
        description: "New Assignment Description",
        dueDate: "2023-09-18",
        availableFromDate: "2023-09-11",
        availableUntilDate: "2023-09-18"
    }

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
                        className="focus text-nowrap ms-1 add-assignment-btn"
                        onClick={() => { 
                            const id = new Date().getTime().toString();
                            navigate(`/Kanbas/Courses/${courseId}/Assignments/${id}`); 
                            dispatch(setAssignment({...newAssignment, course: courseId, _id: id}));
                        }}>
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
                                        <Link 
                                            to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} 
                                            className="assignment-header assignment-item-title ms-1"
                                            onClick={() => dispatch(setAssignment(assignment))}>
                                            {assignment.title}
                                        </Link>
                                        <div className="row ms-1 assignment-description">
                                            {assignment.description}
                                        </div>
                                        <div className="row ms-1 assignment-description">
                                            Multiple Modules | Due {formatDate(assignment.dueDate)} at 11:59pm | 100 pts
                                        </div>
                                    </Col>
                                    <Col className="mt-1">
                                        <div className="d-flex justify-content-end">
                                            <Button disabled variant="light" className="ms-1 module-header-button">
                                                <FaCircleCheck className="checkmark"/>
                                            </Button>
                                            <Button variant="light" className="module-header-button">
                                                <FaEllipsisVertical style={{ color: 'black' }} />
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    handleOpenModal();
                                                    setSelectedAssignment(assignment);
                                                }}
                                                variant="light"
                                                size="sm"
                                                className="focus text-nowrap add-assignment-btn mt-1 ms-1">
                                                Delete
                                            </Button>
                                            <Modal show={showModal} onHide={handleCloseModal} centered>
                                                <Modal.Header closeButton className="no-border">
                                                    <Modal.Title>Delete Assignment?</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Are you sure you want to delete {selectedAssignment.title}?
                                                </Modal.Body>
                                                <Modal.Footer className="no-border">
                                                    <Button 
                                                        variant="light"
                                                        className="default-button focus text-nowrap ms-1"
                                                        style={{ backgroundColor: '#EDEDED' }}
                                                        onClick={handleCloseModal}>
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            dispatch(deleteAssignment(selectedAssignment._id));
                                                            handleCloseModal();
                                                        }}
                                                        variant="light"
                                                        className="focus text-nowrap add-assignment-btn">
                                                        Ok
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
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