import { Link, useLocation } from "react-router-dom";
import './navbar.css';
import { TfiDashboard } from "react-icons/tfi";
import { FaBook, FaEnvelopeOpenText, FaDisplay, 
    FaArrowRightFromBracket, FaRegCircleQuestion, FaRegCircleUser
} from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa"
import { AiOutlineClockCircle} from "react-icons/ai"

function KanbasNavigation() {
    const links = [
        { text: "Account", icon: FaRegCircleUser, iconSize: 30, iconColor: "kanbas-bg-gray" },
        { text: "Dashboard", icon: TfiDashboard, iconSize: 30, iconColor: "kanbas-red" },
        { text: "Courses", icon: FaBook, iconSize: 28, iconColor: "kanbas-red" },
        { text: "Calendar", icon: FaCalendarAlt, iconSize: 30, iconColor: "kanbas-red" },
        { text: "Inbox", icon: FaEnvelopeOpenText, iconSize: 30, iconColor: "kanbas-red" },
        { text: "History", icon: AiOutlineClockCircle, iconSize: 30, iconColor: "kanbas-red" },
        { text: "Studio", icon: FaDisplay, iconSize: 30, iconColor: "kanbas-red" },
        { text: "Commons", icon: FaArrowRightFromBracket, iconSize: 30, iconColor: "kanbas-red" },
        { text: "Help", icon: FaRegCircleQuestion, iconSize: 30, iconColor: "kanbas-red" }
    ];

    const { pathname } = useLocation();

    return (
        <div className="navbar-height">
            <img src="../Images/nu-logo.png" width="86" height="85" alt="..." className="kanbas-bg-black"></img>
            <div className="list-group">
                {links.map((linkItem, index) => {
                    const linkText = linkItem.text;
                    const Icon = linkItem.icon;
                    const iconSize = linkItem.iconSize;
                    const iconColor = linkItem.iconColor;

                    return (
                        <Link key={index} to={`/Kanbas/${linkText}`} className="navbar-link">
                            <div className={`${pathname.includes(linkText) ? "navbar-item-selected kanbas-red" : "navbar-item"}`}>
                                <div className={`${iconColor} navbar-icon`}>
                                    <Icon size={iconSize} />
                                </div>
                                <div className="navbar-link-text-size">{linkText}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default KanbasNavigation;
