import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Form, Button } from 'react-bootstrap';
import { BsFillCheckCircleFill, BsPencil, BsPlusCircleFill, BsTrash3Fill }
  from "react-icons/bs";
import * as client from "./client";

function UserTable() {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const createUser = async () => {
        try {
        const newUser = await client.createUser(user);
        setUsers([newUser, ...users]);
        } catch (err) {
        console.log(err);
        }
    };
    const selectUser = async (user) => {
        try {
          const u = await client.findUserById(user._id);
          setUser(u);
        } catch (err) {
          console.log(err);
        }
      };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };
    const deleteUser = async (user) => {
        try {
          await client.deleteUser(user);
          setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
          console.log(err);
        }
    };
    useEffect(() => { fetchUsers(); }, []);

    return (
        <div className="dashboard-margin">
            <h1>User List</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <input className="form-control" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                        </td>
                        <td>
                        <input className="form-control" type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                        </td>
                        <td>
                            <input className="form-control" placeholder="First name" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
                        </td>
                        <td>
                            <input className="form-control" placeholder="Last name" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
                        </td>
                        <td>
                            <Form.Select aria-label="Default select example"
                                value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </Form.Select>
                        </td>
                        <td>
                            <BsFillCheckCircleFill onClick={updateUser}
                                className="me-2 text-primary fs-1 text" />
                            <BsPlusCircleFill onClick={createUser}
                                className="text-success fs-1 text" />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <Link to={`/Kanbas/Account/${user._id}`}>
                                    {user.username}
                                </Link>
                            </td>
                            <td></td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => selectUser(user)}>
                                    <BsPencil  />
                                </button>
                                <button className="btn btn-danger" onClick={() => deleteUser(user)}>
                                    <BsTrash3Fill />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );    
}
export default UserTable;