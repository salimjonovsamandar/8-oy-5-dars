import "./index.css";
import { PersonOutline } from "react-ionicons";
import { EyeOutline } from "react-ionicons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { setToken } from "../../store/userToken";
import axios from "axios";

function Login() {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function validate(name: string, password: string) {
    if (name.trim() === "") {
      alert("Please enter a username");
      return false;
    }
    if (password.trim() === "") {
      alert("Please enter a password");
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (nameRef.current && passwordRef.current) {
      const username = nameRef.current.value;
      const password = passwordRef.current.value;

      if (validate(username, password)) {
        const user = {
          name: username,
          password: password,
        };

        axios
          .post("https://auth-rg69.onrender.com/api/auth/signin", user)

          .then((response) => {
            const data = response.data;
            if (data.id) {
              dispatch(setToken(data.accessToken));
              localStorage.setItem("token", data.accessToken);
              navigate("/home");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      console.error("Ref current is null");
    }
  }

  return (
    <div className="formWrapper">
      <div className="form-box login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">
              <PersonOutline color={"#00000"} />
            </span>
            <input type="text" ref={nameRef} required />
            <label>Username</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <EyeOutline color={"#00000"} />
            </span>
            <input type="password" ref={passwordRef} required />
            <label>Password</label>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="login-register">
            <p>
              Don't have an account?
              <Link className="register-link" to={"/register"}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
