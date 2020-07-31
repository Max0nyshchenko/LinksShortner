import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const  message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const changeHandler = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }
    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(()=>{
        window.M.updateTextFields()
    }, [])
    const registerHandler = async () => {
        try
        {
            const data = await  request('/api/auth/register', "POST", {...form})
            message(data.msg)
        }
        catch (e) {
            
        }
    }
    const loginHandler = async () => {
        try
        {
            const data = await  request('/api/auth/login', "POST", {...form})
            auth.login(data.token, data.userId)
        }
        catch (e) {

        }
    }
    return (
        <div className='auth-page-bg'>
            <div className="container">
                <div className='row'>
                    <div className="col s6 offset-s3">
                        <h1>Links SHORTER</h1>
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Authorization</span>
                                <div>
                                    <div className="input-field">
                                        <input
                                            id="email"
                                            type="email"
                                            className="validate"
                                            name='email'
                                            value={form.email}
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            name='password'
                                            id="password"
                                            type="password"
                                            className="validate"
                                            value={form.password}
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <button
                                    className="btn yellow darken-4"
                                    disabled={loading}
                                    onClick={loginHandler}
                                >
                                    Sign in
                                </button>
                                <button
                                    className="btn grey lighten-1 black-text"
                                    onClick={registerHandler}
                                    disabled={loading}
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}