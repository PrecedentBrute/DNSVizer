import React from "react";
import './Navbar.scss';
import { NavLink } from "react-router-dom";
import Fade from 'react-reveal/Fade';

const Nav = (props) => {
  const opacity = props.opacity ? Math.max(props.opacity, 0.2) : 0;
  const borderBottomWidth = props.opacity === 1 ? props.borderBottomWidth : 0;

  return (
    <div
      className="navbar navbar-default navbar-static-top"
      role="navigation"
      style={{ opacity, borderBottomWidth }}
    >
      <div className="container">
        <div className="navbar-header" style={{color:"white", backgroundColor:"#111"}}>
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#nav-id"
            onClick={() => {window.scrollTo({top:0, behavior:"smooth"})}}
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a href="#" className="navbar-brand" style={{color:"#FFO"}}>
            <span style={{color:"#FF0"}}>DNSVizer</span>
          </a>
        </div>
        <div className="collapse navbar-collapse" id="nav-id">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}
                to="/"
              >
                <span style={{color:"#73DE0A"}}>Vizualize</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}
                to="/add"
              >
                <span style={{color:"#73DE0A"}}>Add URL</span>
              </NavLink>
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
};

const Header = (props) => (
  <div
    className="header"
    style={{ height: props.height, borderBottomWidth: props.borderBottomWidth }}
  >
    
    <div><img src="/log.png" width="50px" style={{marginTop:"20px"}} alt="logo"/></div>
    <div className="name" style={{color:"#FFO"}}>DNSVizer</div>
    <div className="links">
      
        <NavLink
          className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}
          to="/"
        >
          <span style={{color:"#73DE0A"}}>Vizualize</span>
        </NavLink>

      
        <NavLink
          className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}
          to="/add"
        >
          <span style={{color:"#73DE0A"}}>Add URL</span>
        </NavLink>

    </div>
    
  </div>
);

const Content = () => (
  <div className="content">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Scroll Me</h1>
          <p>
            Phasellus scelerisque ante et odio egestas imperdiet. Mauris enim
            diam, accumsan bibendum nunc dictum, suscipit auctor quam. Quisque
            rhoncus arcu justo, non suscipit nunc condimentum vel. Nunc non
            viverra est, ac ultricies leo. Suspendisse dignissim eget sem a
            aliquet. Suspendisse vel dui et turpis mollis volutpat ut vitae
            odio. Aliquam dictum feugiat.
          </p>
        </div>
      </div>
    </div>
  </div>
);

class Navbar extends React.Component {
  static defaultProps = {
    bottomBorderWidth: 2,
    headerHeight: 200,
    fadeInDistance: 40,
  };

  constructor(props) {
    super(props);
    this.state = { navOpacity: 0 };
    this.updateNavOpacity = this.updateNavOpacity.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateNavOpacity);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateNavOpacity);
  }

  updateNavOpacity() {
    const navbarHeight = 50; // Bootstrap default
    const { bottomBorderWidth, headerHeight, fadeInDistance } = this.props;
    const endFade = headerHeight - navbarHeight - bottomBorderWidth;
    const startFade = endFade - fadeInDistance;
    const scrolly = window.scrollY;

    if (scrolly < startFade) {
      if (this.state.opacity === 0) return;
      this.setState({ navOpacity: 0 });
      return;
    }

    if (scrolly > endFade) {
      if (this.state.opacity === 1) return;
      this.setState({ navOpacity: 1 });
      return;
    }

    const pxPastStartFade = scrolly - startFade;
    const navOpacity = pxPastStartFade / (endFade - startFade);
    this.setState({ navOpacity });
  }

  render() {
    return (
      <div>
        <Nav
          opacity={this.state.navOpacity}
          borderBottomWidth={this.props.bottomBorderWidth}
        />
        <Header
          height={this.props.headerHeight}
          borderBottomWidth={this.props.bottomBorderWidth}
        />
      </div>
    );
  }
}

export default Navbar;
