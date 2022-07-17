import React, { useEffect, useState } from 'react';
import axios from 'axios'

const UsersForm = ({getUsers, userSelected, deselectUser}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")

    useEffect(() => {
        if(userSelected !== null){
            setEmail(userSelected.email)
            setPassword(userSelected.password)
            setFirstName(userSelected.first_name)
            setLastName(userSelected.last_name)
            setBirthday(userSelected.birthday)
        }
    }, [userSelected])

    const submit = (e) => {
        e.preventDefault();
        const userForm = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            birthday: birthday
        }

        if(userSelected !== null){
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, userForm)
                .then(() => {
                    getUsers(),
                    reset(),
                    deselectUser()
                })
        }else{
            axios.post('https://users-crud1.herokuapp.com/users/', userForm)
                .then(() => {
                    getUsers(),
                    reset()
                })
            .catch(error => console.log(error.response))
        }
    }

    const reset = () => {
        setEmail("")
        setPassword("")
        setFirstName("")
        setLastName("")
        setBirthday("")
    }

    const clear = () => {
        reset(),
        deselectUser()
    }

    return (
        <div className='form-card'>
            <form onSubmit={submit}>
                <h1>Users CRUD</h1>
                <div className="input-container">
                    <label htmlFor="email">Email </label>
                    <input 
                        type="text" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password </label>
                    <input 
                        type="text" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="firstName">First name </label>
                    <input 
                        type="text" 
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="lastName">Last name </label>
                    <input 
                        type="text" 
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="birthday">Birthday </label>
                    <input 
                        type="date" 
                        id="birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <button className='btn-submit'>Submit</button>
                <button type='button' onClick={() => clear()} className='btn-clear'>Clear</button>
            </form>
        </div>
    );
};

export default UsersForm;