import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [onchange, setOnchange] = useState(false);
  const [authToken, setAuthToken] = useState(() =>
    sessionStorage.getItem('authToken')
      ? sessionStorage.getItem('authToken')
      : null
  );
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const apiEndpoint = 'http://127.0.0.1:5555';

  function addUser(username, email, password, confirmPassword) {
    fetch(`${apiEndpoint}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, confirm_password: confirmPassword }), // Make sure keys match
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your account has been created, login.',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/login');
        } else if (res.status === 409) { // 409 for conflict
          Swal.fire({
            icon: 'error',
            text: 'Username or email already exists!',
          });
        } else if (res.status === 422) { // 422 for unprocessable entity
          Swal.fire({
            icon: 'error',
            text: 'Passwords do not match!',
          });
        }
      })
      .catch((err) => console.log(err));
  }
  

  function login(email, password) {
    fetch(`${apiEndpoint}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Invalid email or password');
        }
        return res.json();
      })
      .then((response) => {
        if (response.token) {
          sessionStorage.setItem('authToken', response.token);
          setAuthToken(response.token);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successful.',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/dashboard'); // Navigate to the User Dashboard
          setOnchange(!onchange);
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Login failed. Please try again.',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: error.message,
        });
      });
  }
  

  // Logout user
  function logout() {
    sessionStorage.removeItem('authToken');
    setCurrentUser(null);
    setAuthToken(null);
    setOnchange(!onchange);
  }

  // Get Authenticated user
  useEffect(() => {
    if (authToken) {
      fetch(`${apiEndpoint}/authenticated_user`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.email || response.username) {
            setCurrentUser(response);
          } else {
            setCurrentUser(null);
          }
        })
        .catch((error) => {
          console.error('Error fetching authenticated user:', error);
          setCurrentUser(null);
        });
    }
  }, [authToken, onchange]);

  // Context data
  const contextData = {
    addUser,
    login,
    logout,
    currentUser,
    authToken,
    onchange,
    setOnchange,
    apiEndpoint,
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
}
