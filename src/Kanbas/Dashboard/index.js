import { Link } from "react-router-dom";
import db from "../Database";
import './dashboard.css';
import { Card, Button, Row, Col, Container} from "react-bootstrap";
import { FaEllipsisVertical, FaRegPenToSquare } from "react-icons/fa6";

function Dashboard() {
    const courses = db.courses;
    return (
        <Container fluid>
            <div className="dashboard-margin">
                <div>
                    <div className="dashboard-title">Dashboard</div>
                    <div><hr/></div>
                </div>
                <div className="dashboard-courses-margin">
                    <div class="dashboard-published-courses">Published Courses ({courses.length})</div>
                    <div><hr/></div>
                    <Row className="d-flex flex-row flex-wrap">
                        {courses.map((course, index) => {
                            const { startDate, number, name } = course;
                            const [startYear, startMonth, startDay] = startDate.split("-");
                            const courseNumberFull = `${number}.${startYear}${startMonth}`;
                            const courseDescription = `${startYear}${startMonth}_${startDay} Fall ${startYear} Semester Full Term`;
                            const courseTitle = `${number} ${name}`;
                            return (
                                <Col key={index} xl={3} lg={4} md={6} sm={12} xs={12} className="card-margins">
                                    <Card className="shadow-sm">
                                        <Link to={`/Kanbas/Courses/${course._id}`}>
                                            <Card.Img src={course.image} alt="..." className="card-img-top card-image"/>
                                        </Link>
                                        <Button className="btn card-image-icon" variant="link">
                                            <FaEllipsisVertical className="color-white" size={20}/>
                                        </Button>
                                        <Card.Body>
                                            <Link to={`/Kanbas/Courses/${course._id}`} className="card-link">
                                                <div className="dashboard-card-title" style={{ color: course.titleColor }}>{courseTitle}</div>
                                                <div className="dashboard-card-course-num">{courseNumberFull}</div>
                                                <div className="dashboard-card-course-desc">{courseDescription}</div>
                                            </Link>
                                            <Link to={`/Kanbas/Courses/${course._id}`}>
                                                <Button className="btn card-button" variant="link">
                                                    <FaRegPenToSquare className="color-black" size={20}/>
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
        </Container>
    );
}
export default Dashboard;