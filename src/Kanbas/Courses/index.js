import './courses.css';
import '../Common/section-navbar.css'
import '../Common/buttons.css'
import { useParams, useLocation } from "react-router-dom";
import { Button, Row, Col, Container, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { HiBars3 } from "react-icons/hi2";
import { FaGlasses } from "react-icons/fa6";
import { Link, Navigate, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
const API_BASE = process.env.REACT_APP_API_BASE_A6;

function Courses({ courses }) {
    const { courseId } = useParams();

    const URL = `${API_BASE}/courses`;
    const findCourseById = async (courseId) => {
        const response = await axios.get(
          `${URL}/${courseId}`
        );
        setCourse(response.data);
    };
    
    const [course, setCourse] = useState({});
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");

    const getCourseTitle = async (courseId) => {
        const response = await axios.get(
            `${URL}/${courseId}/title`
        );
        setCourseTitle(response.data);
    }
    const getCourseDescription = async (courseId) => {
        const response = await axios.get(
            `${URL}/${courseId}/description`
        );
        setCourseDescription(response.data);
    }

    const location = useLocation();
    const currentURL = location.pathname;
    const urlSegments = currentURL.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];

    const parseLinkText = (text) => {
        // replace hyphens with spaces
        return text.replace(/-/g, ' ');
    };

    useEffect(() => {
        findCourseById(courseId);
        getCourseTitle(courseId);
        getCourseDescription(courseId);
    }, [courseId]);

    return (
        <Container>
            <div className="section-header section-margin">
                <Row>
                    <Col xs="auto">
                        <Button className="focus bars-button">
                            <HiBars3 size={30} className="kanbas-red" />
                        </Button>
                    </Col>
                    <Col xs="auto" className="mt-1">
                        <Breadcrumb style={{ "--bs-breadcrumb-divider": "'>'" }}>
                            <BreadcrumbItem active>
                                <Link to="." className="section-menu-link">{courseTitle}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active style={{ color: "black" }}>{parseLinkText(lastSegment)}</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                    <Col>
                        <div className="d-flex align-items-center justify-content-end">
                        <Button
                            variant="light"
                            size="md"
                            className="default-button focus text-nowrap mt-2">
                            <FaGlasses /> Student View
                        </Button>
                        </div>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs="auto" className="d-none d-md-block">
                        <div className="section-navbar-course-desc">{courseDescription}</div>
                        <CourseNavigation />    
                    </Col>
                    <Col className="ms-4">
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home/>} />
                            <Route path="Modules" element={<Modules/>} />
                            <Route path="Assignments" element={<Assignments/>} />
                            <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>
                            <Route path="Grades" element={<h1>Grades</h1>} />
                        </Routes>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
export default Courses;