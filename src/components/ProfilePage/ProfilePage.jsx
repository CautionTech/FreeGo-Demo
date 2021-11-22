import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function ProfilePage() {
  const history = useHistory();
  const user = useSelector(store => store.user);
  const editUser = useSelector(store => store.editUser);
  const dispatch = useDispatch();
  
  // fetches user and saves it to a editUser reducer
  useEffect(() => {
    dispatch({ 
      type: 'FETCH_USER',
    });
    dispatch({
      type: 'SET_USER_TO_EDIT',
      payload: user
    })
  }, [])

  // dispatching updated information to db 
  // fetching updated info and navigating back to user page
  const userProfile = (event) => {
    event.preventDefault();
    alert('Changes Submitted');

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: editUser
    });
    dispatch({ 
      type: 'FETCH_USER',
    });
    history.push('/user');
    }

    // updating info in reducer as user types
    const handleChange = (event) => {
      dispatch({
        type: 'UPDATE_EDIT_USER',
        payload: {
            ...editUser, 
            [event.target.name]: event.target.value
        }
      });
    }

  return (
    <>
      <form className="card card-form formPanel" onSubmit={userProfile}>
        <h2 onClick={user}>Profile Page</h2>
        <div>
          <image src={user.image}/>
        </div>
        <div >
          <label htmlFor="first_name">
            First name:
            <input
              className="form-control"
              type="text"
              name="first_name"
              value={editUser.first_name}
              required
              onChange={handleChange}
              disabled
            />
          </label>
        </div>
        <div>
          <label htmlFor="last_name">
            Last Name: 
            <input
              className="form-control"
              type="text"
              name="last_name"
              value={editUser.last_name}
              required
              onChange={handleChange}
              disabled
            />
          </label>
        </div>
          <div>
          <label htmlFor="text">
            Email: 
            <input
              className="form-control"
              type="email"
              name="email"
              value={editUser.email}
              required
              onChange={handleChange}
              disabled
            />
          </label>
        </div>
          {/* <div>
          <label htmlFor="birthday">
            Birthdate:  
            <input
              className="form-control"
              type="date"
              name="birthday"
              value={editUser.birthday}
              required
              onChange={handleChange}
            />
          </label>
        </div> */}
        <div>
          <label htmlFor="country">
            Country: 
            <select
              className="form-control"
              type="text"
              name="country"
              value={editUser.country}
              required
              onChange={handleChange}
              disabled
            >
            <option value="United States of America">United States of America</option>
            <option value="South America">South America</option>
            <option value="Canada">Canada</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Username:
            <input
              className="form-control"
              type="text"
              name="username"
              value={editUser.username}
              required
              onChange={handleChange}
              disabled
            />
          </label>
        </div>
        <div>
          <input className="btn btn-primary" type="submit" name="submit" value="Update" disabled/>
        </div>
      </form>   
    </>
  )
}    