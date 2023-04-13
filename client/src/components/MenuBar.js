import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';  // import NavLink instead of Link

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.slice(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={NavLink} exact to="/" /> {/* use NavLink */}
      
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={NavLink}  // use NavLink instead of Link
        exact to="/"  // add the `exact` prop to match only exact path
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={NavLink}  // use NavLink instead of Link
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={NavLink}  // use NavLink instead of Link
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
