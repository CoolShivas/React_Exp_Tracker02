import { useRef } from "react";
import styles from "./AuthForm.module.css";




const AuthForm = () => {

    const inputEmail = useRef('');
    const inputPassword = useRef('');
    const inputConfirmPassword = useRef('');

    const handlerOnSubmitForm = (event) => {
        event.preventDefault();

        const enteredEmail = inputEmail.current.value;
        const enteredPassword = inputPassword.current.value;
        const enteredConfirmPassword = inputConfirmPassword.current.value;

        console.log(enteredEmail);
        console.log(enteredPassword);
        console.log(enteredConfirmPassword);
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
                        <button>
                            Have an account? Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AuthForm;