import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/create', { name, age })
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err));
    }
    
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <form onSubmit={handleSubmit}>
                <h2>Add Student</h2>
                <div className='mb-2'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        placeholder='Enter Name'
                        className='form-control'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='age'>Age</label>
                    <input
                        type='number'
                        id='age'
                        placeholder='Enter Age'
                        className='form-control'
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn btn-success'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateStudent;
