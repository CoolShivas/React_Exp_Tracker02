import { NavLink } from "react-router-dom/cjs/react-router-dom";
import styles from "./LogIn.module.css";

const LogIn = () => {
    return (
        <div className={styles.login_page__div}>
            <div className={styles.login_container}>
                <form>
                    <div className={styles.login_div}>
                        <h1> Login </h1>
                    </div>
                    <div className={styles.login_input__field}>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                    </div>
                    <div className={styles.login_actions}>
                        <button>
                            Login
                        </button>
                    </div>
                    <NavLink to="" className={styles.forgot_password}> Forgot password </NavLink>
                </form>
            </div>
            <div className={styles.dont_have__account}>
                <button>
                    Don't have an account? Sign Up
                </button>
            </div>
        </div>
    )
}

export default LogIn;