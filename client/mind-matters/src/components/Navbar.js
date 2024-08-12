import { Navbar, Button, ListGroup } from 'flowbite-react';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


export default function Nav() {
  const { currentUser, logout } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);

  function handleEnter() {
    setIsVisible(true);
  }
  function handleLeave() {
    setIsVisible(false);
  }

  return (
    <Navbar fluid className="max-w-[1280px] px-0 mx-auto">
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Mind Matters
      </span>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <div className="flex px-4 md:px-0 flex-col md:flex-row gap-4 items-end md:items-center">
          <NavLink
            className={({ isActive }) => (isActive ? 'text-cyan-500' : null)}
            to="/">
            Home
          </NavLink>
          {currentUser && (
            <NavLink
              className={({ isActive }) => (isActive ? 'text-cyan-500' : null)}
              to="/bookings">
              Bookings
            </NavLink>
          )}
          {currentUser ? (
            <div className="relative">
              <button onClick={handleEnter}>
                <div
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white text-xl">
                  {currentUser.username[0].toUpperCase()}
                </div>
              </button>
              {isVisible && (
                <ListGroup
                  onMouseOver={handleEnter}
                  onMouseLeave={handleLeave}
                  className="w-24 absolute top-10 right-0 z-30">
                  <ListGroup.Item>
                    <NavLink to="/profile">Profile</NavLink>
                  </ListGroup.Item>
                  <ListGroup.Item onClick={logout}>
                    <NavLink onClick={handleLeave} to="/login">
                      Logout
                    </NavLink>
                  </ListGroup.Item>
                </ListGroup>
              )}
            </div>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-cyan-500' : null
                }
                to="/login">
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-cyan-500' : null
                }
                to="/signup">
                <Button
                  gradientDuoTone="cyanToBlue"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500"
                  size="xs">
                  Sign Up
                </Button>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-cyan-500' : null
                }
                to="/About">
                <Button
                  gradientDuoTone="cyanToBlue"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500"
                  size="xs">
                  About us
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
