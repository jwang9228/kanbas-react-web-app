import React, {useState} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Col, Row, Button, Card } from "react-bootstrap";
import '../assignments.css';
import '../../../Common/buttons.css';
import { FaCircleCheck, FaEllipsisVertical } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import {
    addAssignment,
    setAssignment,
    updateAssignment,
} from "../assignmentsReducer.js";

function AssignmentEditor() {
    const dispatch = useDispatch();
    const { assignmentId } = useParams();
    const { courseId } = useParams();
    const assignments = useSelector((state) => state.assignmentsReducer.assignments);
    const assignment = useSelector((state) => state.assignmentsReducer.assignment);
    const foundAssignment = assignments.find((assignment) => assignment._id === assignmentId);
    const navigate = useNavigate();
    const handleSave = () => {
        dispatch(foundAssignment ? updateAssignment(assignment) : addAssignment(assignment));
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    const [assignmentTitle, setAssignmentTitle] = useState(assignment.title);
    const [assignmentDescription, setAssignmentDescription] = useState(assignment.description);
    const [assignmentDue, setAssignmentDue] = useState(assignment.dueDate);
    const [availableFrom, setAvailableFrom] = useState(assignment.availableFromDate);
    const [availableTo, setAvailableTo] = useState(assignment.availableUntilDate);

    return (
        <div>
            <Col>
                <div className="d-flex justify-content-end">
                    <div className="published-container me-3">
                        <FaCircleCheck className="checkmark-icon fa-lg me-1" />
                        <span className="assignment-edit-description">Published</span>
                    </div>
                    <Button
                        variant="light"
                        size="sm"
                        className="default-button focus ms-1">
                        <FaEllipsisVertical style={{ color: 'black' }} />
                    </Button>
                </div>
                <hr/>
                <div className="assignment-edit-description size-17 mb-2 ms-1">Assignment Name</div>
                <input 
                    value={assignmentTitle} 
                    className="form-control mb-3" 
                    onChange={(e) => {
                        console.log('new title 4: ' + assignment.title);
                        setAssignmentTitle(e.target.value);
                        dispatch(setAssignment({ ...assignment, title: e.target.value }));
                        console.log('new title 5: ' + assignment.title);
                    }}
                />
                <textarea 
                    value={assignmentDescription}
                    className="form-control"
                    onChange={(e) => {
                        setAssignmentDescription(e.target.value);
                        dispatch(setAssignment({ ...assignment, description: e.target.value }));
                    }}
                />
                <div className="d-flex justify-content-end mt-3">
                    <label for="points" className="float-end size-17">Points</label>
                    <input 
                        id="points"
                        value="100"
                        className="form-control ms-3" 
                        style={{ width: '50%' }}
                    />
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <label className="float-end size-17">Assign</label>
                    <Card className="mb-4 ms-3" style={{ width: '50%' }}>
                        <Card.Body>
                            <div>
                                <label className="size-17 bold-label">Due</label>
                            </div>
                            <div>
                                <input 
                                    type="date" 
                                    className="form-control"
                                    style={{ width: '100%' }}
                                    value={assignmentDue}
                                    onChange={(e) => {
                                        setAssignmentDue(e.target.value);
                                        dispatch(setAssignment({ ...assignment, dueDate: e.target.value }));
                                    }}
                                />
                            </div>
                            <Row className="mt-2 mb-2">
                                <Col>
                                    <div>
                                        <label className="size-17 bold-label">Available from</label>
                                    </div>
                                    <div>
                                        <input 
                                            type="date" 
                                            className="form-control"
                                            style={{ width: '100%' }}
                                            value={availableFrom}
                                            onChange={(e) => {
                                                setAvailableFrom(e.target.value);
                                                dispatch(setAssignment({ ...assignment, availableFromDate: e.target.value }));
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label className="size-17 bold-label">Until</label>
                                    </div>
                                    <div>
                                        <input 
                                            type="date" 
                                            className="form-control"
                                            style={{ width: '100%' }}
                                            value={availableTo}
                                            onChange={(e) => {
                                                setAvailableTo(e.target.value);
                                                dispatch(setAssignment({ ...assignment, availableUntilDate: e.target.value }));
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card> 
                </div>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn default-button focus me-2">
                        Cancel
                    </Link>
                    <button onClick={handleSave} className="btn add-assignment-btn focus">
                        Save
                    </button>
                </div>
                <hr/>
            </Col>
        </div>
    );
}


export default AssignmentEditor;