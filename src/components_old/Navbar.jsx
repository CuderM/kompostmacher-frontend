import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../style/Navbar.css';


// import {
//     ProSidebar,
//     Menu,
//     MenuItem,
//     SidebarHeader,
//     SidebarContent,
// } from "react-pro-sidebar";

// import { FaList, FaRegHeart } from "react-icons/fa";
// import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
// import { RiPencilLine } from "react-icons/ri";
// import { BiCog } from "react-icons/bi";

const MyNavbar = (props) => {
    const { navItems } = props;
    // return (<div>
    //     <Navbar collapseOnSelect expand="lg" >
    //         <p style={{ color: 'white', fontSize: 16, padding: 20 }}>MENU</p>
    //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //         <Navbar.Collapse id="responsive-navbar-nav">
    //             <Nav className="d-md-block sidebar">
    //                 {navItems && navItems.map(item => (
    //                     <LinkContainer
    //                         key={item.to}
    //                         exact
    //                         to={item.to}
    //                         className='navLink'
    //                         activeClassName="activeLink">
    //                         <Nav.Link><i className={item.icon + ' i'}></i> {item.title}</Nav.Link>
    //                     </LinkContainer>))}
    //             </Nav>
    //         </Navbar.Collapse>
    //     </Navbar>
    // </div>
    // );
    return (
        <div>
          <Navbar style={{ paddingTop: "0px", paddingBottom: "0px" }}>
            <p className="menuHeader">MENU</p>
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
            {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
            <Nav className="d-md-block sidebar">
              {navItems &&
                navItems.map((item) => (
                  <LinkContainer
                    key={item.to}
                    exact
                    to={item.to}
                    className="navLink"
                    activeClassName="activeLink"
                  >
                    <Nav.Link>
                      <i className={item.icon + " i"}></i>{" "}
                      <h5 className="itemTitle">{item.title}</h5>
                    </Nav.Link>
                  </LinkContainer>
                ))}
            </Nav>
            {/* </Navbar.Collapse> */}
          </Navbar>
        </div>
      );
    // const [menuCollapse, setMenuCollapse] = useState(false)

    // //create a custom function that will change menucollapse state from false to true and true to false
    // const menuIconClick = () => {
    //     //condition checking to change state from true to false and vice versa
    //     menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    // };



    // return (<div id="header" >
    //     <ProSidebar collapsed={menuCollapse}>
    //         <SidebarHeader>
    //             <div className="logotext">
    //                 <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
    //             </div>
    //             <div className="closemenu" onClick={menuIconClick}>
    //                 {menuCollapse ? (
    //                     <FiArrowRightCircle />
    //                 ) : (
    //                     <FiArrowLeftCircle />
    //                 )}
    //             </div>
    //         </SidebarHeader>
    //         <SidebarContent>
    //             <Menu iconShape="square">
    //                 <MenuItem active={true} icon={<FiHome />}>Home</MenuItem>
    //                 <MenuItem icon={<FaList />}>Category</MenuItem>
    //                 <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
    //                 <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
    //                 <MenuItem icon={<BiCog />}>Settings</MenuItem>
    //             </Menu>
    //         </SidebarContent>
    //     </ProSidebar>
    // </div>);
};

export default MyNavbar;

