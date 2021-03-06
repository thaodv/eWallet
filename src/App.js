import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';
import { loginUser, logoutUser } from './sessions/actions/UserActions';
import componentQueries from 'react-component-queries';

/* import {
  // MdCardGiftcard,
  MdLoyalty,
  MdImportantDevices,
} from 'react-icons/lib/md'; */

import NotificationSystem from 'react-notification-system';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { setCookie, getCookie, checkCookie } from './functions';

// layouts
import { Header, Sidebar, Content, Footer } from 'components/Layout';

import GAListener from 'components/GAListener';

// pages
import LoginPage from 'pages/LoginPage';
import DashboardPage from 'pages/DashboardPage';
import WidgetPage from 'pages/WidgetPage';
import ButtonPage from 'pages/ButtonPage';
import TypographyPage from 'pages/TypographyPage';
import AlertPage from 'pages/AlertPage';
import TablePage from 'pages/TablePage';
import CardPage from 'pages/CardPage';
import BadgePage from 'pages/BadgePage';
import ButtonGroupPage from 'pages/ButtonGroupPage';
import DropdownPage from 'pages/DropdownPage';
import ProgressPage from 'pages/ProgressPage';
import ModalPage from 'pages/ModalPage';
import FormPage from 'pages/FormPage';
import InputGroupPage from 'pages/InputGroupPage';
import ChartPage from 'pages/ChartPage';

import './styles/reduction.css';

class App extends React.Component {  
  constructor(props) {
    super(props);    
    this.setCookie = setCookie.bind(this);
    this.getCookie = getCookie.bind(this);
    this.checkCookie = checkCookie.bind(this);
    this.checkLoginUser = this.checkLoginUser.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }
  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({ breakpoint, user }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }
  
  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);
    this.checkLoginUser(this.props.user);    
    /* setTimeout(() => {
      this.notificationSystem.addNotification({
        title: <MdImportantDevices />,
        message: 'Welome to Reduction Admin!',
        level: 'info',
      });
    }, 1500);

    setTimeout(() => {
      this.notificationSystem.addNotification({
        title: <MdLoyalty />,
        message:
          'Reduction is carefully designed template powered by React and Bootstrap4!',
        level: 'info',
      });
    }, 2500); */
  }

  // close sidebar when
  handleContentClick = event => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      App.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }
  getUserData() {
    jwt.verify(this.getCookie('userToken'), 'ewallet', function(err, data) {
      if(!err) {
        this.props.loginUser({
          name: "krishna",
          email: data.email,
          id: 1
        })                                
      } else {
        console.log(err);
      }                            
    }.bind(this));
  }
  checkLoginUser(user) {
    if(!user.length) {
      if(this.checkCookie('userToken')) {
        this.getUserData();
      } else {
        if(window.location.pathname !== "/login") {
          window.location = "/login";
        }
        //this.props.history.push('/login');
      }
    }
  }

  openSidebar(openOrClose) {
    let check = document.getElementsByClassName('cr-sidebar');
    //console.log(check);
    if(typeof(check) !== 'undefined' && check != null && check.length) {
      if (openOrClose === 'open') {
        return document
          .querySelector('.cr-sidebar')
          .classList.add('cr-sidebar--open');
      }
      document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
    }    
  }

  render() {
    return (
      <BrowserRouter>        
        <Switch>          
          <Route exact path="/" render={(props) => {
            if((this.props.user && this.props.user.length) || (this.checkCookie('userToken'))) {
              return(<Redirect to="/home" />);
            } else {
              return(<Redirect to="/login" />);
            }
          }} />
          <Route exact path="/login" render={(props) => <LoginPage {...props} />} />
          <Route path="/home" render={(props) => {
            if(!(this.props.user && this.props.user.length) && !(this.checkCookie('userToken'))) {
              return(<Redirect to="/login" />);
            } else {
              //this.getUserData();
              return(
                <GAListener>
                  <main className="cr-app bg-light">
                    <Sidebar />
                    <Content fluid onClick={this.handleContentClick}>
                      <Header />
                      <Switch>
                        <Route exact path="/home/" component={DashboardPage} />
                        <Route path="/home/buttons" component={ButtonPage} />
                        <Route path="/home/cards" component={CardPage} />
                        <Route path="/home/widgets" component={WidgetPage} />
                        <Route path="/home/typography" component={TypographyPage} />
                        <Route path="/home/alerts" component={AlertPage} />
                        <Route path="/home/tables" component={TablePage} />
                        <Route path="/home/badges" component={BadgePage} />
                        <Route path="/home/button-groups" component={ButtonGroupPage} />
                        <Route path="/home/dropdowns" component={DropdownPage} />
                        <Route path="/home/progress" component={ProgressPage} />
                        <Route path="/home/modals" component={ModalPage} />
                        <Route path="/home/forms" component={FormPage} />
                        <Route path="/home/input-groups" component={InputGroupPage} />
                        <Route path="/home/charts" component={ChartPage} />
                        <Redirect to="/" />
                      </Switch>
                      <Footer />
                    </Content>
          
                    <NotificationSystem
                      dismissible={false}
                      ref={notificationSystem =>
                        (this.notificationSystem = notificationSystem)
                      }
                      style={NOTIFICATION_SYSTEM_STYLE}
                    />
                  </main>
                </GAListener>
              )
            }
            
          }}/>
          <Redirect to="/" />
        </Switch>        
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};
const mapStateToProps = (store) => {
  return({
    user: store.user
  })
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loginUser,
    logoutUser
  },dispatch)  
}
export default connect(mapStateToProps, mapDispatchToProps)(componentQueries(query)(App));
