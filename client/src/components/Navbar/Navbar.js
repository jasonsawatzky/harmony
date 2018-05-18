import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import './Navbar.css'

export default () => (
	<Navbar inverse collapseOnSelect>
		<Navbar.Header>
			<Navbar.Brand>
				<Link to='/'>React-Redux App</Link>
			</Navbar.Brand>
			<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
			<Nav>
				<NavItem eventKey={1} className='navItem'>
					About
				</NavItem>
				<NavItem eventKey={2} className='navItem'>
					Privacy Policy
				</NavItem>
				<NavDropdown eventKey={3} title='Dropdown' id='basic-nav-dropdown'>
					<MenuItem eventKey={3.1}>Action</MenuItem>
					<MenuItem eventKey={3.2}>Another action</MenuItem>
					<MenuItem eventKey={3.3}>Something else here</MenuItem>
					<MenuItem divider />
					<MenuItem eventKey={3.3}>Separated link</MenuItem>
				</NavDropdown>
			</Nav>
			<Nav pullRight>
				<NavItem componentClass={Link} eventKey={4} to='/todoList' href='/todoList' className='navItem'>
					Todo List
				</NavItem>
				<NavItem componentClass={Link} eventKey={5} to='#' href='#' className='navItem'>
					Login
				</NavItem>
				<NavItem componentClass={Link} eventKey={6} to='/status' href='/status' className='navItem'>
					API Status
				</NavItem>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)