import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../img/687851-200.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

const gitHubIcon = <FontAwesomeIcon icon={faGithub}/>;

const Header = () => {
    return (
        <header className='header'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="world"><img src={logo} width='75' height='75' alt=""/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">World</Nav.Link>
                        <Nav.Link href="countries">Countries</Nav.Link>
                        <Nav.Link href='graph'>Graph</Nav.Link>
                        <Nav.Link href='search'>Search</Nav.Link>
                        <Nav.Link href='map'>Map</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link target='_blank' href='https://github.com/Razent1' >
                            {gitHubIcon}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}


export default Header;