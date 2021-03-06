import React from 'react';

import bn from 'utils/bemnames';
/* import classNames from 'classnames'; */

import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutUser } from '../../sessions/actions/UserActions';
import { deleteCookie } from '../../functions';
import {
  Navbar,
  // NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  /* Badge, */
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

import {
  MdNotificationsActive,
  MdNotificationsNone,
  MdInsertChart,
  MdPersonPin,
  MdMessage,
  MdSettingsApplications,
  MdHelp,
  MdClearAll,
  MdExitToApp,
} from 'react-icons/lib/md';

import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';

import withBadge from 'hocs/withBadge';

import { notificationsData } from 'demos/header';

const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNotificationPopover: false,
      isNotificationConfirmed: false,
      isOpenUserCardPopover: false,
    };
    this.deleteCookie = deleteCookie.bind(this);
  }
  

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  logoutUser(e) {
    this.deleteCookie('userToken')
    .then((result) => {
      if(result === 1) {
        this.props.logoutUser(e);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    const { isNotificationConfirmed } = this.state;

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  size={25}
                  className="text-secondary can-click animated swing infinite"
                  onClick={this.toggleNotificationPopover}
                />
              )}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1">
              <PopoverBody>
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem>
          {
            (() => {
              if( this.props.user && this.props.user.name) {
                return(
                  <NavItem>            
                    <NavLink id="Popover2">
                      <Avatar
                        onClick={this.toggleUserCardPopover}
                        className="can-click"
                      />
                    </NavLink>
                    <Popover
                      placement="bottom-end"
                      isOpen={this.state.isOpenUserCardPopover}
                      toggle={this.toggleUserCardPopover}
                      target="Popover2"
                      className="p-0 border-0"
                      style={{ minWidth: 250 }}>
                      <PopoverBody className="p-0 border-light">
                        <UserCard
                          title={this.props.user.name}
                          subtitle={this.props.user.email}
                          text="Last updated 3 mins ago"
                          className="border-light">
                          <ListGroup flush>
                            <ListGroupItem tag="button" action className="border-light">
                              <MdPersonPin /> Profile
                            </ListGroupItem>
                            <ListGroupItem tag="button" action className="border-light">
                              <MdInsertChart /> Stats
                            </ListGroupItem>
                            <ListGroupItem tag="button" action className="border-light">
                              <MdMessage /> Messages
                            </ListGroupItem>
                            <ListGroupItem tag="button" action className="border-light">
                              <MdSettingsApplications /> Settings
                            </ListGroupItem>
                            <ListGroupItem tag="button" action className="border-light">
                              <MdHelp /> Help
                            </ListGroupItem>
                            <ListGroupItem tag="button" onClick={(e) => this.logoutUser(e)} action className="border-light">
                              <MdExitToApp /> Signout
                            </ListGroupItem>
                          </ListGroup>
                        </UserCard>
                      </PopoverBody>
                    </Popover>
                  </NavItem>
                );
              } else {
                return(
                  <NavItem>
                    <NavLink to="/login" tag={Link}>Login</NavLink>
                  </NavItem>
                );
              }
            })()              
          }
          
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (store) => {
  return({
    user: store.user
  })
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logoutUser
  },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header));
