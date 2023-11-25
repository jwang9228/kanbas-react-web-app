import KanbasNavigation from "./KanbasNavigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import Signin from "./users/signin";
import Signup from "./users/signup";
import Account from "./users/account";
import UserTable from "./users/table"
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

function Kanbas() {
	const courseColors = [
        {"image": "../Images/sky-blue.png", "titleColor": "#3a9fbf"},
        {"image": "../Images/pink.jpg", "titleColor": "#D198B7"},
        {"image": "../Images/light-purple.png", "titleColor": "#C3B1E1"},
        {"image": "../Images/pastel-green.png", "titleColor": "#03c03c"},
    ];
    const [courses, setCourses] = useState([]);
    const URL = `${API_BASE}/courses`;
    const findAllCourses = async () => {
      const response = await axios.get(URL);
      setCourses(response.data);
    };
  
    const [course, setCourse] = useState({
        name: "Orbital Mechanics",      
        number: "RS6000",
        startDate: "2023-09-10", 
        endDate: "2023-12-15",
        image: courseColors[0].image,
        titleColor: courseColors[0].titleColor,
    });

    const addNewCourse = async () => {
      const courseColor = courseColors[Math.floor(Math.random() * courseColors.length)];
      setCourse({...course, image: courseColor.image, titleColor: courseColor.titleColor});
      const response = await axios.post(URL, course);
      setCourses(
          [...courses,
          response.data]
      );
    };
    const deleteCourse = async (courseId) => {
      const response = await axios.delete(
        `${URL}/${courseId}`
      );
      setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = async () => {
		const response = await axios.put(
			`${URL}/${course._id}`,
			course
		);
        setCourses(
          courses.map((c) => {
            if (c._id === course._id) {
              return response.data;
            } else {
              return c;
            }
          })
        );
    };
    useEffect(() => {
      findAllCourses();
    }, []);

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
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/users" element={<UserTable />} />
          <Route path="Account" element={<Account />} />
          <Route path="/Account/:id" element={<Account />} />
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