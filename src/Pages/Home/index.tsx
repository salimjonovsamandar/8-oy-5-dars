import { Link } from "react-router-dom";
import "./index.css";

function index() {
  return (
    <div className="main">
      <h1>XUSH KELIBSIZ</h1>
      <div className="button">
        <Link className="link" to={"/register"}>
          Register pages
        </Link>
      </div>
    </div>
  );
}

export default index;
