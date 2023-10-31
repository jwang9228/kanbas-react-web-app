import KanbasNavigation from "./KanbasNavigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { Container, Row, Col } from 'react-bootstrap';
import db from "./Database";
import { useState } from "react";
import store from "./store";
import { Provider } from "react-redux";

function Kanbas() {
	const courseColors = [
        {"image": "../Images/sky-blue.png", "titleColor": "#3a9fbf"},
        {"image": "../Images/pink.jpg", "titleColor": "#D198B7"},
        {"image": "../Images/light-purple.png", "titleColor": "#C3B1E1"},
        {"image": "../Images/pastel-green.png", "titleColor": "#03c03c"},
    ];
    const [courses, setCourses] = useState(db.courses);
    const [course, setCourse] = useState({
        name: "Orbital Mechanics",      
        number: "RS6000",
        startDate: "2023-09-10", 
        endDate: "2023-12-15",
    });
    const addNewCourse = () => {
        const courseColor = courseColors[Math.floor(Math.random() * courseColors.length)]
        setCourses(
            [...courses,
            {...course,
            _id: new Date().getTime().toString(),
            image: courseColor.image,
            titleColor: courseColor.titleColor}]
        );
    };
    const deleteCourse = (courseId) => {
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = () => {
        setCourses(
          courses.map((c) => {
            if (c._id === course._id) {
              return course;
            } else {
              return c;
            }
          })
        );
    };    
	return (
    <Provider store={store}>
      <Container fluid className="p-0 overflow-hidden">
        <Row className="d-flex flex-row">
        <Col xs="auto">
          <KanbasNavigation />
        </Col>
        <Col>
          <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element={null} />
          <Route path="Dashboard" element={
            <Dashboard 
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
            />
          } />
          <Route path="Courses/:courseId/*" element={
            <Courses courses={courses} />} 
          />
        </Routes>
        </Col>
        </Row>
      </Container>
    </Provider>
	);}
export default Kanbas;