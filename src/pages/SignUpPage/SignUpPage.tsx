import { useEffect, useState, JSX } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logout, registerWithEmailAndPassword } from '@/lib/firebase';

const SignUpPage = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const isStrongPassword = (password: string): boolean => {
    // Add your password strength validation logic here
    // Minimum 8 characters, at least one letter, one digit, one special character
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isValidEmail = (email: string): boolean => {
    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const register = () => {
    if (!name) alert('Please enter name');
    if (!email) alert('Please enter email');
    if (!password) alert('Please enter password');
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (!isStrongPassword(password)) {
      alert(
        'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.',
      );
    }
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (error) console.log(error);
    if (user) navigate('/');
  }, [user, loading, error, navigate]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="email"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>

        <button onClick={logout}>Log out</button>

        <div>
          Already have an account? <Link to="/signin">Login</Link> now.
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
