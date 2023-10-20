import React from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import { Button, Dropdown, ButtonGroup, ListGroup, Row, Col } from 'react-bootstrap';
import '../../Common/buttons.css'
import '../../Common/modules.css'
import { FaRegCircleCheck, FaCircleCheck, FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbGripVertical } from "react-icons/tb";

function ModuleList() {
  const { courseId } = useParams();
  const modules = db.modules;
  return (
    <div>
        <div className="d-flex justify-content-end">
            <Button
                variant="light"
                size="sm"
                className="default-button focus text-nowrap"
                style={{ backgroundColor: '#EDEDED' }}>
                Collapse All
            </Button>
            <Button
                variant="light"
                size="sm"
                className="default-button focus text-nowrap ms-1"
                style={{ backgroundColor: '#EDEDED' }}>
                View Progress
            </Button>
            <Dropdown as={ButtonGroup}>
                <Button
                    variant="light"
                    size="sm"
                    className="default-button focus text-nowrap ms-2">
                    <FaRegCircleCheck style={{ color: 'green' }} /> Publish All
                </Button>
                <Dropdown.Toggle
                    variant="light"
                    id="dropdown-split-basic"
                    size="sm"
                    className="default-button focus text-nowrap"
                />
                <Dropdown.Menu>
                </Dropdown.Menu>
            </Dropdown>
            <Button
                variant="light"
                size="sm"
                className="focus text-nowrap ms-1 add-assignment-btn">
                + Module
            </Button>
            <Button
                variant="light"
                size="sm"
                className="default-button focus ms-1">
                <FaEllipsisVertical style={{ color: 'black' }} />
            </Button>
        </div>
        <hr/>
        <div>
            {modules
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                <ListGroup key={index} className="ms-2 me-2 mb-4 module-head-color" variant="flush">
                    <Row>
                        <Col xs="auto">
                            <TbGripVertical className="vertical-icon"/>
                            <Link to="." className="module-header">{module.name}</Link>
                        </Col>
                        <Col className="mt-3">
                            <div className="d-flex justify-content-end">
                                <Button disabled variant="light" className="ms-1 module-header-button">
                                    <FaCircleCheck className="checkmark"/>
                                </Button>
                                <Button variant="light" className="ms-1 module-header-button">
                                    <FaPlus style={{ color: 'black' }} />
                                </Button>
                                <Button variant="light" className="ms-1 module-header-button">
                                    <FaEllipsisVertical style={{ color: 'black' }} />
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <div className="module-description">{module.description}</div>
                    </Row>
                </ListGroup>
                ))
            }
        </div>
    </div>
    
  );
}
export default ModuleList;