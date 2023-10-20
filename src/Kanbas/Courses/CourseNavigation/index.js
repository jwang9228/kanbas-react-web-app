import { Link, useParams, useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import '../../Common/section-navbar.css';
import { FaRegEyeSlash } from "react-icons/fa6";

function CourseNavigation() {
    const links = [
        { text: "Home", hidden: false },
        { text: "Modules", hidden: false },
        { text: "Assignments", hidden: false },
        { text: "Quizzes", hidden: false },
        { text: "Grades", hidden: false },
        { text: "People", hidden: false },
        { text: "Panopto Video", hidden: false },
        { text: "Discussions", hidden: true },
        { text: "Announcements", hidden: true },
        { text: "Pages", hidden: true},
        { text: "Files", hidden: true},
        { text: "Rubrics", hidden: true},
        { text: "Outcomes", hidden: true},
        { text: "Collaborations", hidden: true},       
        { text: "Syllabus", hidden: true},
        { text: "Progress Reports (EAB Navigate)", hidden: false},
        { text: "Settings", hidden: false}
    ];    
    const { courseId } = useParams();
    const { pathname } = useLocation();

    const parseLinkText = (text) => {
        // replace spaces with hyphens
        return text.replace(/ /g, '-');
    };

    return (
        <div>
            <Row className="d-flex flex-row flex-wrap">
                <Col>
                    <div className="list-group">
                        {links.map((linkItem, index) => {
                            const linkText = parseLinkText(linkItem.text);
                            const activeLink = pathname.includes(linkText);
                            const icon = linkItem.hidden ? <FaRegEyeSlash className="kanbas-black"/> : null;

                            return (
                                <Link 
                                    key={index} 
                                    to={`/Kanbas/Courses/${courseId}/${linkText}`} 
                                    className={`${activeLink ? "section-navbar-link-selected" : "section-navbar-link"}`}>
                                    <div className={`${activeLink ? "section-navbar-item-selected kanbas-red" : "section-navbar-item"}`}>
                                    <Row className="d-flex justify-content-between align-items-center">
                                        <Col style={{ flex: '0 0 auto', width: '200px' }}>
                                            {linkItem.text}
                                        </Col>
                                        <Col>
                                            {icon}
                                        </Col>
                                    </Row>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </Col>
            </Row>
        </div>
    );
}
export default CourseNavigation;