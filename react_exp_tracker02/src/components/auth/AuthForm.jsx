import styles from "./AuthForm.module.css";




const AuthForm = () => {

    return (
        <div className={styles.auth_form__page}>
            <div className={styles.form_container}>
                <form>
                    <div className={styles.signup_div}>
                        <label htmlFor="signup"> SignUp </label>
                    </div>

                    <div className={styles.input_fieds__div}>

                        <input type="email" id="signup"
                            name="signup" placeholder="Email" required />

                        <input type="password" placeholder="Password" required />

                        <input type="password" placeholder="Confirm Password" required />

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