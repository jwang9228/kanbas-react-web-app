import { Link } from "react-router-dom";
import './dashboard.css';
import { Card, Button, Row, Col, Container} from "react-bootstrap";
import { FaEllipsisVertical } from "react-icons/fa6";

function Dashboard({
    courses, course, setCourse, addNewCourse, deleteCourse, updateCourse
}) 
{   
    return (
        <Container fluid>
            <div className="dashboard-margin">
                <div>
                    <div className="dashboard-title">Dashboard</div>
                    <div><hr/></div>
                </div>
                <div className="dashboard-courses-margin">
                    <div className="dashboard-published-courses">Published Courses ({courses.length})</div>
                    <div><hr/></div>
                    <Card className="mb-4">
                        <Card.Body>
                            <Row className="d-flex flex-row flex-wrap mb-2">
                                <Col>
                                    <label className="mb-1 ms-1 add-course-label">Course Name</label>
                                    <input
                                        value={course.name}
                                        className="form-control"
                                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                                    />
                                </Col>
                                <Col>
                                    <label className="mb-1 ms-1 add-course-label">Course Number</label>
                                    <input
                                        value={course.number}
                                        className="form-control"
                                        onChange={(e) => setCourse({ ...course, number: e.target.value })}
                                    />
                                </Col>
                            </Row>
                            <Row className="d-flex flex-row flex-wrap mb-2">
                                <Col>
                                    <label className="mb-1 ms-1 add-course-label">Start Date</label>
                                    <input
                                        value={course.startDate}
                                        className="form-control"
                                        type="date"
                                        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                                    />
                                </Col>
                                <Col>
                                    <label className="mb-1 ms-1 add-course-label">End Date</label>
                                    <input
                                        value={course.endDate}
                                        className="form-control"
                                        type="date"
                                        onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
                                    />
                                </Col>
                            </Row>
                            <Button
                                onClick={addNewCourse}
                                variant="light"
                                size="sm"
                                className="text-nowrap add-course-button mt-2 me-2">
                                Add
                            </Button>
                            <Button
                                onClick={updateCourse}
                                variant="light"
                                size="sm"
                                className="text-nowrap update-course-button mt-2"
                                style={{ backgroundColor: '#EDEDED' }}>
                                Update
                            </Button>
                        </Card.Body>
                    </Card> 
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
                                            <Button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);
                                                }}
                                                variant="light"
                                                size="sm"
                                                className="text-nowrap edit-course-button mt-2 me-1">
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }}
                                                variant="light"
                                                size="sm"
                                                className="focus text-nowrap add-assignment-btn mt-2">
                                                Delete
                                            </Button>
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