import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import db from "../../../Database";
import '../assignments.css';
import '../../../Common/buttons.css';
import { FaRegCircleCheck, FaCircleCheck, FaEllipsisVertical, FaPlus } from "react-icons/fa6";

function AssignmentEditor() {
    const { assignmentId } = useParams();
    const assignment = db.assignments.find(
        (assignment) => assignment._id === assignmentId);


    const { courseId } = useParams();
    const navigate = useNavigate();
    const handleSave = () => {
        console.log("Actually saving assignment TBD in later assignments");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    return (
        <div>
            <Col>
                {/*
                <div class="col-12 text-md-right">
                                <div class="d-flex justify-content-end me-3">
                                    <div class="published-container me-3">
                                        <i class="checkmark-icon fas fa-check-circle fa-lg me-1"></i>
                                        <span>Published</span>
                                    </div>
                                    <button class="btn default-button focus ms-1"><i class="fa-solid fa-ellipsis-vertical fa-lg" style="color: black;"></i></button>
                                </div>
                            </div>
                            */}
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
                <div className="assignment-edit-description mb-1">Assignment Name</div>
                <input value={assignment.title} className="form-control mb-2" />
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