import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem('authToken') || null);
  const [onchange, setOnchange] = useState(false);
  const navigate = useNavigate();
  const apiEndpoint = 'http://127.0.0.1:5555';

  const [currentUser, setCurrentUser] = useState(null)

  async function addUser(username, email, password, confirmPassword) {
    try {
      const res = await fetch(`${apiEndpoint}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, confirm_password: confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your account has been created. Please log in.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login');
      } else if (res.status === 409) {
        Swal.fire({
          icon: 'error',
          text: data.details || 'Username or email already exists!',
        });
      } else if (res.status === 422) {
        Swal.fire({
          icon: 'error',
          text: data.details || 'Passwords do not match!',
        });
      } else if (res.status === 400) {
        Swal.fire({
          icon: 'error',
          text: data.details || 'Invalid input data!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: data.details || 'An unexpected error occurred. Please try again later.',
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        text: 'Network error. Please check your connection and try again.',
      });
    }
  }

  async function login(email, password) {
    try {
      const res = await fetch(`${apiEndpoint}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error('Invalid email or password');
      }
      const response = await res.json();
      if (response.token) {
        sessionStorage.setItem('authToken', response.token);
        setAuthToken(response.token);

        const userRes = await fetch(`${apiEndpoint}/authenticated_user`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${response.token}`,
          },
        });
        const user = await userRes.json();
        
        sessionStorage.setItem('userId', user.id);
        if (user.email.includes("@doctor.com")) {
          navigate('/doctor-dashboard');
        } else {
          navigate('/user-dashboard');
        }

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login successful.',
          showConfirmButton: false,
          timer: 1500,
        });

        setOnchange(!onchange);
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Login failed. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.message,
      });
    }
  }

  function logout() {
    sessionStorage.removeItem('authToken');
    setCurrentUser(null)
    setAuthToken(null);
    setOnchange(!onchange);
    navigate('/login');
  }
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
            setCurrentUser(response)
          } else {
            setCurrentUser(null)
          }
        })
    }
  }, [authToken, onchange])
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
