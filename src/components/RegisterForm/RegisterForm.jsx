import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
   const [isDisabled, setIsDisabled] = useState(false);
  const [first_name, setFirst_Name] = useState('');
  const [username, setUserName]= useState('')
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [accept_terms, setAccept_Terms] = useState(true);
  const [password2, setPassword2] = useState('');
  const [image, setImage] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  /**
   * Register User
   * On submit of the form - it checks if the passwords match - if so it dispatches the user creation
   * @param {*} event 
   */
  const registerUser = (event) => {
    event.preventDefault();
    if (password === password2) {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          first_name: first_name,
          password: password,
          last_name: last_name,
          email: email,
          birthday: "2021-10-20", 
          country: "United States of America", 
          accept_terms: accept_terms, 
          image: "C:\\", 
        }
      });
    }
  else {
    alert('Passwords is not matching incorrect');
  }
  }; // end registerUser

  const canBeSubmitted = () => {
    return accept_terms ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = () => {
  setAccept_Terms(!accept_terms);
    return canBeSubmitted();
  };
   
  return (
    <form className="formPanel card card-form" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="form-group">
        <label htmlFor="first_name">
          First name:
          <input
            className="form-control"
            type="text"
            name="first_name"
            value={first_name}
            required
            onChange={(event) => setFirst_Name(event.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="last_name">
          Last Name:
          <input
            className="form-control"
            type="text"
            name="last_name"
            value={last_name}
            required
            onChange={(event) => setLast_Name(event.target.value)}
          />
        </label>
      </div>
      {/* <div className="form-group"> 
        <label htmlFor="image">
          Add Profile Picture:
          <input
            className="form-control"
            type="file"
            name="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
      </div> */}
         <div className="form-group">
        <label htmlFor="text">
          Email:
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
        {/* <div className="form-group">
        <label htmlFor="birthday">
          Birthdate:
          <input
            className="form-control"
            type="date"
            name="birthday"
            value={birthday}
            required
            onChange={(event) => setBirthday(event.target.value)}
          />
        </label>
      </div> */}
      {/* <div className="form-group">
        <label htmlFor="country">
          Country:
          <select
            className="form-control"
            type="text"
            name="country"
            value={country}
            required
            onChange={(event) => setCountry(event.target.value)}
          >
            <option defaultValue="United States of America">
              United States of America
            </option>
            <option value="United States of America">
              United States of America
            </option>
            <option value="South America">South America</option>
            <option value="Canada">Canada</option>
          </select>
        </label>
      </div> */}
      <div className="form-group">
        <label htmlFor="username">
          Username:
          <input
            className="form-control"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUserName(event.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="password">
          Password:
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
       <div className="form-group">
        <label htmlFor="password">
          Re-enter Password:
          <input
            className="form-control"
            type="password"
            name="password"
            value={password2}
            required
            onChange={(event) => setPassword2(event.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="accept_terms">
          <input
            type="radio"
            name="accept_terms"
            defaultChecked
            value={accept_terms}
            required
            onChange={(event) => setAccept_Terms(event.target.value)}
            disabled={isDisabled}
          />{" "}
          I accept{" "}
          <a
            href="#exampleModalLong"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            terms and condition
          </a>
          <div
            className="modal fade"
            id="exampleModalLong"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Terms of Service
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <br />
                <h3 className="modal-body">Section 1</h3>
                <div className="modal-body">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Incidunt ab animi laboriosam perferendis maxime quia, eum
                  quibusdam nesciunt hic dolore placeat culpa. Recusandae illum
                  dolorem est laudantium nam odio, aliquam sit, laborum
                  distinctio eius delectus voluptatem aut. Exercitationem saepe
                  adipisci odio pariatur porro esse laudantium et, quia, alias
                  laborum qui tempore velit. Ipsum, ut expedita provident neque
                  dicta corporis, eius fuga doloribus, voluptate dolor
                  asperiores. Vel voluptas dolores dolorem modi perferendis
                  cumque praesentium temporibus maxime natus reiciendis placeat
                  molestias consequatur, deleniti itaque nostrum in. Ut animi
                  assumenda necessitatibus obcaecati. Vitae ea totam laborum
                  amet odit. Fugiat animi facilis dolorum. Facilis unde eligendi
                  ut eos accusantium laboriosam aperiam amet provident, saepe
                  aut maxime magnam eum maiores eaque commodi possimus officiis
                  error quae corporis incidunt sapiente tempora rem debitis
                  porro? Explicabo ex debitis eius voluptatibus quam minus.
                  Totam, quo nemo. Hic eos iure distinctio rerum dolores qui
                  illum. Impedit expedita sit sunt.
                </div>
                <br />
                <h3 className="modal-body">Section 1</h3>
                <div className="modal-body">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Incidunt ab animi laboriosam perferendis maxime quia, eum
                  quibusdam nesciunt hic dolore placeat culpa. Recusandae illum
                  dolorem est laudantium nam odio, aliquam sit, laborum
                  distinctio eius delectus voluptatem aut. Exercitationem saepe
                  adipisci odio pariatur porro esse laudantium et, quia, alias
                  laborum qui tempore velit. Ipsum, ut expedita provident neque
                  dicta corporis, eius fuga doloribus, voluptate dolor
                  asperiores. Vel voluptas dolores dolorem modi perferendis
                  cumque praesentium temporibus maxime natus reiciendis placeat
                  molestias consequatur, deleniti itaque nostrum in. Ut animi
                  assumenda necessitatibus obcaecati. Vitae ea totam laborum
                  amet odit. Fugiat animi facilis dolorum. Facilis unde eligendi
                  ut eos accusantium laboriosam aperiam amet provident, saepe
                  aut maxime magnam eum maiores eaque commodi possimus officiis
                  error quae corporis incidunt sapiente tempora rem debitis
                  porro? Explicabo ex debitis eius voluptatibus quam minus.
                  Totam, quo nemo. Hic eos iure distinctio rerum dolores qui
                  illum. Impedit expedita sit sunt.
                </div>
                <div className="modal-footer">
                  {accept_terms === false ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={onCheckboxClick}
                    >
                      Accept
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={onCheckboxClick}
                    >
                      Disagree
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div className="form-group">
        <input
          className="btn btn-primary"
          type="submit"
          name="submit"
          value="Sign Up"
          disabled={isDisabled}
        />
      </div>
    </form>
  );
}

export default RegisterForm;
