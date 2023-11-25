import * as client from "./client";
import { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";
function Account() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/signin");
  };
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };
  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, []);
  return (
    <div className="w-50 dashboard-margin">
      <h1>Account</h1>
      {account && (
        <div>
          <input
            className="form-control mb-2" 
            value={account.username}
            placeholder="Username"
            onChange={(e) => setAccount({ ...account,
              username: e.target.value })}/>
          <input
            className="form-control mb-2" 
            value={account.password}
            type="password"
            placeholder="Password"
            onChange={(e) => setAccount({ ...account,
              password: e.target.value })}/>
          <input 
            className="form-control mb-2" 
            value={account.firstName}
            placeholder="First name"
            onChange={(e) => setAccount({ ...account,
              firstName: e.target.value })}/>
          <input
            className="form-control mb-2"  
            value={account.lastName}
            placeholder="Last name"
            onChange={(e) => setAccount({ ...account,
              lastName: e.target.value })}/>
          <input 
            className="form-control mb-2" 
            value={(account.dob && account.dob.substring(0, 10))}
            type="date"
            onChange={(e) => setAccount({ ...account,
              dob: e.target.value })}/>
          <input 
            className="form-control mb-2" 
            value={account.email}
            placeholder="Email"
            onChange={(e) => setAccount({ ...account,
              email: e.target.value })}/>
            <Form.Select aria-label="Default select example"
                onChange={(e) => setAccount({ ...account,
                    role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </Form.Select>
            <div>
                <Button
                    className="mt-2"
                    onClick={save}>
                    Save
                </Button>
            </div>
            <div>
                <Link to="/Kanbas/admin/users" className="btn btn-warning mt-2">
                    Users
                </Link>
            </div>
            <div>
                <Button
                    className="mt-2"
                    onClick={signout}>
                    Signout
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}
export default Account;