import React, { useContext, useState } from "react";
import { Menu, Header} from "semantic-ui-react";
import { NavLink } from "react-router-dom"; // import NavLink instead of Link

import { AuthContext } from "../context/auth";

export default function PageHeader() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  // Set the active menu item based on the pathname
  const path = pathname === "/" ? "home" : pathname.slice(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  // Render the menu bar based on whether the user is logged in or not
  const pageHeader = user ? (
    <Menu pointing secondary size="massive" color="blue">
      {/* Display the username as the first menu item */}
      <Menu.Item
        name={user.username}
        active
        as={NavLink}
        exact="true"
        to="/"
      />{" "}
      {/* use NavLink */}
      {/* Display a logout button on the right */}
      <Menu.Item position="right">
        <Header color="blue">ButtSniffer</Header>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="yellow">
      {/* Display the home, login, and register links */}
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={NavLink} // use NavLink instead of Link
        exact="true"
        to="/" // add the `exact` prop to match only exact path
      />
        <Menu.Item>
        <Header>Buttsniffer</Header>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={NavLink} // use NavLink instead of Link
          exact="true"
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={NavLink} // use NavLink instead of Link
          exact="true"
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return pageHeader;
}
