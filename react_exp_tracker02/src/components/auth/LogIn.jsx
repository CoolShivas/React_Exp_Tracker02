import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import styles from "./LogIn.module.css";
import { useRef } from "react";

const LogIn = () => {

    const myWelPage = useHistory();

    const inputLoginEmail = useRef('');

    const inputLoginPassword = useRef('');

    const handlerOnSubmitLoginForm = (event) => {
        event.preventDefault();

        const enteredLoginEmail = inputLoginEmail.current.value;
        const enteredLoginPassword = inputLoginPassword.current.value;

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
        AIzaSyDH5JlMv2hpQuoT9E47PiPYHTdFE_P2Gs0`, {
            method: "POST",
            body: JSON.stringify({
                email: enteredLoginEmail,
                password: enteredLoginPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log(res);
            myWelPage.replace("/welcomepage");
            if (res.ok) {
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    let errMsg = "Authentication Failed";
                    if (data && data.error && data.error.message) {
                        errMsg = data.error.message;
                    }
                    // throw new Eroor(errMsg);
                    alert(errMsg);
                })
            }
        }).then((response) => {
            console.log(response);
            console.log(response.idToken);
            localStorage.setItem("SaveToken", response.idToken);
            // Saving the token id in localStorage of a particular user for future profile updates

        }).catch((err) => {
            console.log(err.message);
            alert(err.message);
        })

        enteredLoginEmail.current.value = '';
        enteredLoginPassword.current.value = '';
    };

    const handlerOnHaveNotAccount = () => {
        myWelPage.replace("/authformpage");
    };

    return (
        <div className={styles.login_page__div}>
            <div className={styles.login_container}>
                <form onSubmit={handlerOnSubmitLoginForm}>
                    <div className={styles.login_div}>
                        <h1> Login </h1>
                    </div>
                    <div className={styles.login_input__field}>
                        <input type="email" placeholder="Email" required ref={inputLoginEmail} />
                        <input type="password" placeholder="Password" required ref={inputLoginPassword} />
                    </div>
                    <div className={styles.login_actions}>
                        <button>
                            Login
                        </button>
                    </div>
                    <NavLink to="/changepassword" className={styles.forgot_password}> Forgot password </NavLink>
                </form>
            </div>
            <div className={styles.dont_have__account}>
                <button onClick={handlerOnHaveNotAccount}>
                    Don't have an account? Sign Up
                </button>
            </div>
        </div>
    )
}

export default LogIn;