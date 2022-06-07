import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');

  const handleChangeFilterParameter = (e) => setFilterText(e.target.value)

  useEffect(() => {
    console.log(filterText)
  }, [filterText]);

  useEffect(() => {
    showUsers();
  }, []);

  const endpoint = 'https://jsonplaceholder.typicode.com'

  const showUsers = async () => {
    const response = await fetch(`${endpoint}/users`);
    const data = await response.json();
    setUsers(data);
    console.log(data);
  }

  return (

    <div className="card-grid-user">
      <input
        id="search"
        type="text"
        placeholder="Filter By Name"
        aria-label="Search Input"
        value={filterText}
        onChange={handleChangeFilterParameter}
      />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {users
          .filter ((user) => {
            if(user.name.includes(filterText)) return true
            else if(user.username.includes(filterText)) return true
            else if(user.email.includes(filterText)) return true
            else if(user.phone.includes(filterText)) return true
            else return false
            }
            )
          .map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td><button><a href={"/users/"+user.id+"/editor"}>Editar</a></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;
