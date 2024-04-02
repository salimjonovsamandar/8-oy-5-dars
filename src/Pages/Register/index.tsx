import "./index.css";
import { PersonOutline } from "react-ionicons";
import { EyeOutline } from "react-ionicons";
import { MailOutline } from "react-ionicons";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

function Register() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rePasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function validate() {
    if (!userNameRef.current || userNameRef.current.value.trim() === "") {
      alert("Please enter a username");
      return false;
    }
    if (!emailRef.current || emailRef.current.value.trim() === "") {
      alert("Please enter an email");
      return false;
    }
    if (!passwordRef.current || passwordRef.current.value.trim() === "") {
      alert("Please enter a password");
      return false;
    }
    if (
      !rePasswordRef.current ||
      rePasswordRef.current.value.trim() === "" ||
      rePasswordRef.current.value.trim() !== passwordRef.current.value.trim()
    ) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validate()) {
      const user = {
        name: userNameRef.current,
        email: emailRef.current,
        password: passwordRef.current,
      };

      axios
        .post("https://auth-rg69.onrender.com/api/auth/signup", user)
        .then((response) => {
          const data = response.data;
          console.log(data.message);
          if (data.message === "User registered successfully!") {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <div className="formWrapper">
      <div className="form-box login">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} action="">
          <div className="input-box">
            <span className="icon">
              <PersonOutline color={"#00000"} />
            </span>
            <input ref={userNameRef} type="text" required />
            <label>Username</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <MailOutline color={"#00000"} />
            </span>
            <input ref={emailRef} type="email" required />
            <label>Email</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <EyeOutline color={"#00000"} />
            </span>
            <input ref={passwordRef} type="password" required />
            <label>Password</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <EyeOutline color={"#00000"} />
            </span>
            <input ref={rePasswordRef} type="password" required />
            <label>Re-enter Password</label>
          </div>

          <button type="submit" className="btn">
            {isLoading ? <div>Loading...</div> : <div>Register</div>}
          </button>
          <div className="login-register">
            <p>
              Already have an account?
              <Link className="register-link" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
