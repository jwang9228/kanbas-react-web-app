import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./modulesReducer";
import * as client from "./client";
import { Button, Dropdown, ButtonGroup, ListGroup, Row, Col, Card} from 'react-bootstrap';
import '../../Common/buttons.css'
import '../../Common/modules.css'
import { FaRegCircleCheck, FaEllipsisVertical, } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbGripVertical } from "react-icons/tb";

function ModuleList() {
  const { courseId } = useParams();
  const modules = useSelector((state) => state.modulesReducer.modules);
  const module = useSelector((state) => state.modulesReducer.module);
  const dispatch = useDispatch();

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };


  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);
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
        <Card className="mb-4">
            <Card.Body>
                <label className="mb-1 ms-1 add-module-label">Module Name</label>
                <input
                    value={module.name}
                    className="form-control mb-1"
                    onChange={(e) =>
                        dispatch(setModule({ ...module, name: e.target.value }))
                    }
                />
                <label className="m-1 add-module-label">Module Description</label>
                <textarea 
                    value={module.description}
                    className="form-control"
                    onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
                />
                <div>
                    <Button
                        onClick={handleAddModule}
                        variant="light"
                        size="sm"
                        className="text-nowrap add-course-button mt-3 me-2">
                        Add
                    </Button>
                    <Button
                        onClick={handleUpdateModule}
                        variant="light"
                        size="sm"
                        className="text-nowrap update-course-button mt-3 me-2">
                        Update
                    </Button>
                </div>
            </Card.Body>
        </Card> 
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
                        <Col className="me-2">
                            <div className="d-flex justify-content-end">
                                <Button
                                    onClick={() => dispatch(setModule(module))}
                                    variant="light"
                                    size="sm"
                                    className="text-nowrap edit-course-button mt-2 me-1">
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => handleDeleteModule(module._id)}
                                    variant="light"
                                    size="sm"
                                    className="focus text-nowrap add-assignment-btn mt-2">
                                    Delete
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="">
                        <div className="module-description">{module.description}</div>
                    </Row>
                    <Row className="mb-2">
                        <div className="module-description">{module._id}</div>
                    </Row>
                </ListGroup>
                ))
            }
        </div>
    </div>
    
  );
}
export default ModuleList;