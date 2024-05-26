import axios from "axios";
import { useRef } from "react";
import styles from "./AuthForm.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/ExpContext";




const AuthForm = () => {

    const dispatch = useDispatch();

    const myHistory = useHistory();

    const inputEmail = useRef('');
    const inputPassword = useRef('');
    const inputConfirmPassword = useRef('');

    const handlerOnSubmitForm = async (event) => {
        event.preventDefault();

        try {
            const enteredEmail = inputEmail.current.value;
            const enteredPassword = inputPassword.current.value;
            const enteredConfirmPassword = inputConfirmPassword.current.value;

            const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
            AIzaSyCkRd0LJmwHHb9ebUv3yixIk1PPSFLQtp8`, {
                id: Math.random(),
                email: enteredEmail,
                password: enteredPassword,
                confirmPass: enteredConfirmPassword,
            });
            console.log(res);
            console.log(enteredEmail);
            console.log(enteredPassword);
            console.log(enteredConfirmPassword);
        } catch (error) {
            console.log(error);
        }
        console.log("Your are SignUp", authActions.signup());
        dispatch(authActions.signup());
        myHistory.replace("/login");
    };

    const handlerOnHaveAccount = () => {
        myHistory.replace("/login");
    };

    return (
        <div className={styles.auth_form__page}>
            <div className={styles.form_container}>
                <form onSubmit={handlerOnSubmitForm}>
                    <div className={styles.signup_div}>
                        <label htmlFor="signup"> SignUp </label>
                    </div>

                    <div className={styles.input_fieds__div}>

                        <input type="email" id="signup"
                            name="signup" placeholder="Email" required ref={inputEmail} />

                        <input type="password" placeholder="Password" required ref={inputPassword} />

                        <input type="password" placeholder="Confirm Password" required ref={inputConfirmPassword} />

                    </div>

                    <div className={styles.actions}>
                        <button> Sign Up </button>
                    </div>

                    <div className={styles.create_account}>
                        <button onClick={handlerOnHaveAccount}>
                            Have an account? Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AuthForm;