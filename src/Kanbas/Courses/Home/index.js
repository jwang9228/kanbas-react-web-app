import ModuleList from "../Modules/ModuleList";
import { Link } from "react-router-dom";
import { Row, Col, Button} from "react-bootstrap";
import { TbFileImport } from "react-icons/tb";
import { BiTargetLock, BiBell } from "react-icons/bi";
import { CiBullhorn } from "react-icons/ci";
import { PiNumberCircleFiveFill } from "react-icons/pi"
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { ImStatsBars } from "react-icons/im";
import '../../Common/buttons.css';
import './home.css';

function Home() {
    const buttonData = [
        { text: 'Import Existing Content', icon: <TbFileImport /> },
        { text: 'Import from Commons', icon: <FaArrowRightFromBracket /> },
        { text: 'Choose Home Page', icon: <BiTargetLock /> },
        { text: 'View Course Stream', icon: <ImStatsBars /> },
        { text: 'New Announcement', icon: <CiBullhorn /> },
        { text: 'New Analytics', icon: <ImStatsBars /> },
        { text: 'View Course Notifications', icon: <BiBell /> },
    ];
      
    return (
        <div>
            <Row>
                <Col md={9} >
                    <ModuleList />
                </Col>
                <Col md={3} className="d-none d-md-block d-flex justify-end flex-column">
                    <div>
                        {buttonData.map((button, index) => (
                            <div key={index}>
                                <Button variant="light" className="default-button full-width focus mb-2 text-start" style={{ backgroundColor: '#EDEDED' }}>
                                    {button.icon} {button.text}
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="bold-text mt-1">
                        To Do
                    </div>
                    <hr/>
                    <Row>
                        <Col xs="auto">
                            <PiNumberCircleFiveFill className="kanbas-red"/>
                        </Col>
                        <Col>
                            <div><Link className="todo-item"> Grade A1 - ENV + HTML </Link></div>
                            <div className="todo-due-date">100 points <span>&#9679;</span> Sep 18 at 11:59pm</div>
                        </Col>
                        <Col xs="auto" className="d-flex justify-end">
                            <RxCross2/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="auto">
                            <PiNumberCircleFiveFill className="kanbas-red"/>
                        </Col>
                        <Col>
                            <div><Link className="todo-item"> Grade A2 - CSS + BOOTSTRAP </Link></div>
                            <div className="todo-due-date">100 points <span>&#9679;</span> Oct 2 at 11:59pm</div>
                        </Col>
                        <Col xs="auto" className="d-flex justify-end">
                            <RxCross2/>
                        </Col>
                    </Row>
                </Col>
            </Row>  
        </div>
    );
}
export default Home;