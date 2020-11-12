import React, {useContext, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreatePage =() => {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [date, setDate] = useState('');

    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/detail/generate', 'POST', {
                    name,
                    surname,
                    date,
                }, { Authorization: `Bearer ${auth.token}`})
                console.log(data);
            } catch (e) {}
        }
    }

    return (
        <div>
            <h1>Main Page</h1>
            <input
                type="text"
                placeholder="Insert name"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyPress={pressHandler}
            />
            <input
                type="text"
                placeholder="Insert surname"
                id="surname"
                value={surname}
                onChange={e => setSurname(e.target.value)}
                onKeyPress={pressHandler}
            />
            <input
                type="text"
                placeholder="Insert birthday date"
                id="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                onKeyPress={pressHandler}
            />
            <label htmlFor="detail">Insert data</label>
        </div>
    )
}
