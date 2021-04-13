import React, { useState } from 'react';
import { useHistory } from 'react-router';
import BaseView from '../BaseView';
// import FormErrors from "../FormErrors";
// import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

const Register = (props) => {
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
        }
    });
    const history = useHistory();

    const clearErrorState = () => {
        const _userInfo = userInfo;
        _userInfo.errors = { cognito: null, blankfield: false, passwordmatch: false };
        setUserInfo(_userInfo);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        // TODO Form validation
        clearErrorState();
        // const error = Validate(event, this.state);
        // if (error) {
        //   this.setState({
        //     errors: { ...this.state.errors, ...error }
        //   });
        // }
        const { username, email, password } = userInfo;
        try {
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email
                }
            });
            console.log(signUpResponse);
            history.push("/");
        } catch (error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error
            const _userInfo = userInfo;
            _userInfo.error = {
                ...userInfo.error,
                cognito: err,
            }
            setUserInfo(_userInfo);
        }
    };

    const onInputChange = e => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    return (
        <BaseView>
            <section className="section auth">
                <div className="container">
                    <h1>Register</h1>
                    {/* <FormErrors formerrors={this.state.errors} /> */}

                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <p className="control">
                                <input
                                    key={userInfo.username}
                                    className="input"
                                    type="text"
                                    id="username"
                                    aria-describedby="userNameHelp"
                                    placeholder="Enter username"
                                    value={userInfo.username}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="email"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    value={userInfo.email}
                                    onChange={onInputChange}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={userInfo.password}
                                    onChange={onInputChange}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    id="confirmpassword"
                                    placeholder="Confirm password"
                                    value={userInfo.confirmpassword}
                                    onChange={onInputChange}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <a href="/forgotpassword">Forgot password?</a>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button is-success">
                                    Register
                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </BaseView>
    );
}

export default Register;