import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

//To Display all the user details after pressing the submit button
const Details = () => {
    const url = useSelector((state) => state.user.url);
    const [users, setUsers] = useState([]);

    const getAllUsers = useCallback(async (page) => {
        try {
            //Get all the user details from the database
            const respone = await axios.get(`${url}/get`);

            //If success show user details
            if (respone.status === 200) {
                setUsers([...respone.data.users])
            }
            else {
                throw new Error('Failed to Verify');
            }
        }
        catch (error) {
            console.log(error);
        }

    }, [url])

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);



    return (
        <div className="row justify-content-center">
            <h1 className="text-center">User Details</h1><br /><br /><br /><br /><br />
            <div className="col-md-9" >
                <Table striped >
                    <tbody>
                        <tr>
                            <th><h5 className="fw-bold">Name</h5></th>
                            <th><h5 className="fw-bold">Date of Birth</h5></th>
                            <th><h5 className="fw-bold">Age</h5></th>
                            <th><h5 className="fw-bold">Email</h5></th>
                            <th><h5 className="fw-bold">Phone Number</h5></th>
                        </tr>
                        {users.map((user) => {
                            let dob = new Date(user.dob).toISOString().slice(0, 10);
                            return (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{dob}</td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>

    );
};

export default Details;