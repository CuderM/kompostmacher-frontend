import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../style/Navbar.css";

const MyNavbar = (props) => {
  const { navItems } = props;
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
};

// const MyNavbar = (props) => {
//     const { navItems } = props;
//     return (
//       <div>
//         <Navbar collapseOnSelect expand="lg">
//           <p className="menuHeader">MENU</p>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="d-md-block sidebar">
//               {navItems &&
//                 navItems.map((item) => (
//                   <LinkContainer
//                     key={item.to}
//                     exact
//                     to={item.to}
//                     className="navLink"
//                     activeClassName="activeLink"
//                   >
//                     <Nav.Link>
//                       <i className={item.icon + " i"}></i> {item.title}
//                     </Nav.Link>
//                   </LinkContainer>
//                 ))}
//             </Nav>
//           </Navbar.Collapse>
//         </Navbar>
//       </div>
//     );
//   };

export default MyNavbar;
