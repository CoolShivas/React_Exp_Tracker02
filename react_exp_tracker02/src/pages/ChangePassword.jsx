import axios from "axios";
import styles from "./ChangePassword.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useRef, useState } from "react";


const ChangePassword = () => {

    const [isLoading, setIsLoading] = useState(false);

    const registeredEmail = useRef();

    const handlerOnChangePasswordSubmit = async (event) => {

        try {
            event.preventDefault();
            setIsLoading(true);

            const enteredRegEmail = registeredEmail.current.value;
            console.log(enteredRegEmail);

            const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=
            AIzaSyDYXxCoZdE5z5sJ5vj2Y3hwTXpVHufKsxc`, {
                requestType: "PASSWORD_RESET",
                email: enteredRegEmail,
            })
            console.log(res);
            setIsLoading(false);
            return (res);

        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    return (
        <div className={styles.change_password__div}>
            <form action="#" className={styles.container_change__pass} onSubmit={handlerOnChangePasswordSubmit}>

                <div className={styles.image_pass__forgot}>
                    <img src="../../public/Lock.jpg" alt="image not found" style={{ width: "350px", height: "300px" }} />
                </div>

                <div className={styles.change_password__profile}>

                    <label htmlFor="userid"> Enter the email by which you have registered </label>
                    <input type="email" id="userid" name="userid" required className="form-control" ref={registeredEmail} />

                    <div className={styles.btn_link__actions}>
                        {!isLoading && <button className="send_link__btn"> Send Link </button>}

                        {isLoading && <button className="send_link__btn"> Sending Request... </button>}

                        <NavLink to="/login" className={styles.link_forget__login}> Already a user? Login </NavLink>
                    </div>
                </div>

            </form >
        </div>

    )
}

export default ChangePassword;