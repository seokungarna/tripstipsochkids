import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
// import Logo from './Logo'

import './Nav.css'

/* eslint-disable */

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  render() {
    console.log(this.props);
    const { active } = this.state,
      { subNav } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          {/* <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link> */}
          <div className="Nav--Links">
            <NavLink to="/">Hem</NavLink>
            {/* <NavLink to="/components/">Components</NavLink> */}
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'posts' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('posts') ||
                  this.props.location.pathname.includes('blog') ||
                  this.props.location.pathname.includes('postCategories')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('posts')}
              >
                Destinationer
                <div className="Nav--GroupLinks">
                  <NavLink to="/destinationer/" className="Nav--GroupLink">
                    Alla Destinationer
                  </NavLink>
                  <NavLink 
                  to="/destinationer/australien" className="Nav--GroupLink">
                    Australien
                    </NavLink>
                    <NavLink 
                  to="/destinationer/england" className="Nav--GroupLink">
                    England
                    </NavLink>
                    <NavLink 
                  to="/destinationer/italien" className="Nav--GroupLink">
                    Italien
                    </NavLink>
                    <NavLink 
                  to="/destinationer/nya-zeeland" className="Nav--GroupLink">
                   Nya Zeeland
                    </NavLink>
                    <NavLink 
                  to="/destinationer/spanien" className="Nav--GroupLink">
                   Spanien
                    </NavLink>
                    <NavLink 
                  to="/destinationer/usa" className="Nav--GroupLink">
                   USA
                    </NavLink>
                  {/* {subNav.posts.map((link, index) => (
                  
                    <NavLink
                      to={link.slug}
                      key={'posts-subnav-link-' + index}
                      className="Nav--GroupLink"
                    >
                      {link.title}
                    </NavLink>
                  ))} */}
                </div>
              </span>
            </div>
            <NavLink to="/resa-med-barn/">Resa med barn</NavLink>
            {/* <NavLink to="/contact/">Contact</NavLink> */}
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)