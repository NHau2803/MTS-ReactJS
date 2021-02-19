import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MoreIcon from '@material-ui/icons/MoreVert';
import ButtonIcon from 'custom-fields/ButtonIcon'
import {NavLink} from 'react-router-dom'
import { COLOR_PRIMARY } from 'styles/Color';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    display: "flex",
    justifyContent: 'flex-end',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NotiProfileSide(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const handleLogout = () =>{
    

  // }

  const menuId = 'primary-search-account-menu';
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
  //   </Menu>
  // );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <ButtonIcon aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </ButtonIcon>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <ButtonIcon aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </ButtonIcon>
        <p>Notifications</p>
      </MenuItem>

      <NavLink
          to="/"
          exact
      >
        <ButtonIcon
            edge="end"
            aria-controls={menuId}
            color={COLOR_PRIMARY}
            icon={<PowerSettingsNewIcon />}
          >
            Logout
          </ButtonIcon>
      </NavLink>

    </Menu>
  );

  return (
    <div className={classes.grow}>
     
      <div className={classes.sectionDesktop}>
        <ButtonIcon aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </ButtonIcon>

        <ButtonIcon aria-label="show 18 new notifications" color="inherit">
          <Badge badgeContent={18} color="secondary">
            <NotificationsIcon />
          </Badge>
        </ButtonIcon>

        <NavLink
            to="/"
            exact
        >
          <ButtonIcon
            edge="end"
            aria-controls={menuId}
            color={COLOR_PRIMARY}
            icon={<PowerSettingsNewIcon />}
          />
          
        </NavLink>
        
      </div>

      <div className={classes.sectionMobile}>
        <ButtonIcon
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
          icon={<MoreIcon />}
        />
      </div>
 
      {renderMobileMenu}
      {/* {renderMenu} */}
    </div>
  );
}
