import React, { useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";

import { userActions } from "../../store/user-slice";

//First Page for user to enter is details and submit
const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const url = useSelector((state) => state.user.url);

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const phoneInputRef = useRef();
    const dobInputRef = useRef();

    const userHandler = async (event) => {
        try {
            event.preventDefault();
            const enteredName = nameInputRef.current.value;
            const enteredDob = dobInputRef.current.value;
            const enteredEmail = emailInputRef.current.value;
            const enteredPhone = phoneInputRef.current.value;

            // Age Validation using DOB
            //To find age using DOB
            const getAge = (birthDateString) => {
                const today = new Date();
                const birthDate = new Date(birthDateString);

                const yearsDifference = today.getFullYear() - birthDate.getFullYear();

                const isBeforeBirthday =
                    today.getMonth() < birthDate.getMonth() ||
                    (today.getMonth() === birthDate.getMonth() &&
                        today.getDate() < birthDate.getDate());

                return isBeforeBirthday ? yearsDifference - 1 : yearsDifference;
            };

            const age = getAge(enteredDob);
            //If age is less than 18 do not submit
            if (age < 18) {
                alert("Age cannot be less than 18 years")
                return false;
            }

            const userDetails = {
                name: enteredName,
                email: enteredEmail,
                dob: enteredDob,
                age: age,
                phone: enteredPhone,
            }

            //Sending user details to backend
            const respone = await axios.post(`${url}/post`, userDetails);

            //If success navigate to next page
            if (respone.status === 200) {
                nameInputRef.current.value = '';
                dobInputRef.current.value = '';
                emailInputRef.current.value = '';
                phoneInputRef.current.value = '';
               
                dispatch(userActions.submit());
                navigate('/details');
            }
            else {
                throw new Error('Failed to Verify');
            }
        }
        catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };


    return (
        <Fragment><br />
            <div className="row justify-content-center">
                <h1 className="text-center">Enter Your Details</h1><br /><br /><br /><br />

                <div className="col-md-4">
                    <form id="loginform" onSubmit={userHandler}>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                required ref={nameInputRef}
                            />
                        </div><br />

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Date of Birth"
                                required ref={dobInputRef}
                            />
                        </div><br />

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required ref={emailInputRef}
                            />
                        </div><br />

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Phone Number"
                                ref={phoneInputRef}
                            />
                        </div><br />

                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary" size="lg">Submit</Button>
                        </div>

                    </form><br /><br /><br />
                </div>
            </div>
        </Fragment>
    );
};

export default User;