import KanbasNavigation from "./KanbasNavigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { Container, Row, Col } from 'react-bootstrap';

function Kanbas() {
	return (
		<Container fluid className="p-0 overflow-hidden">
		  <Row className="d-flex flex-row">
			<Col xs="auto">
			  <KanbasNavigation />
			</Col>
			<Col>
			  <Routes>
				<Route path="/" element={<Navigate to="Dashboard" />} />
				<Route path="Account" element={null} />
				<Route path="Dashboard" element={<Dashboard />} />
				<Route path="Courses/*" element={null} />
				<Route path="Courses/:courseId/*" element={<Courses />} />
			  </Routes>
			</Col>
		  </Row>
		</Container>
	);}
export default Kanbas;