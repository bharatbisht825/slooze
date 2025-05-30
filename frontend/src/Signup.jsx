import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
      const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(name,email,country,password,role)

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, country, role, password })
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/login")
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  <form
    onSubmit={handleSignup}
    className="bg-white p-8 rounded shadow-md w-80 space-y-4"
  >
    <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Name"
      className="border p-2 w-full"
      required
    />

    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      className="border p-2 w-full"
      required
    />

    <select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      className="border p-2 w-full"
      required
    >
      <option value="">Select Country</option>
      <option value="india">India</option>
      <option value="usa">USA</option>
    </select>

    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="border p-2 w-full"
      required
    >
      <option value="">Select Role</option>
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="member">Member</option>
    </select>

    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      className="border p-2 w-full"
      required
    />

    <button
      type="submit"
      className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
    >
      Register
    </button>
  </form>
</div>

  );
}

export default Signup;
