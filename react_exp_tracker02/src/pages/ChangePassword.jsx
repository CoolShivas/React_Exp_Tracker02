import axios from "axios";
import styles from "./ChangePassword.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";


const ChangePassword = () => {

    const handlerOnChangePasswordSubmit = (event) => {
        event.preventDefault();



    };

    return (
        <div className={styles.change_password__div}>
            <form action="#" className={styles.container_change__pass} onSubmit={handlerOnChangePasswordSubmit}>

                <div className={styles.image_pass__forgot}>
                    <img src="../../public/Lock.jpg" alt="image not found" style={{ width: "350px", height: "300px" }} />
                </div>

                <div className={styles.change_password__profile}>

                    <label htmlFor="userid"> Enter the email by which you have registered </label>
                    <input type="email" id="userid" name="userid" required className="form-control" />

                    <div className={styles.btn_link__actions}>
                        <button className="send_link__btn"> Send Link </button>

                        <Link className={styles.link_forget__login}> Already a user? Login </Link>
                    </div>
                </div>

            </form >
        </div>

    )
}

export default ChangePassword;