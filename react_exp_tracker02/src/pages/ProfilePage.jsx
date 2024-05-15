import { useHistory } from "react-router-dom/cjs/react-router-dom";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {

    const prevPage = useHistory();

    const handlerOnCancelBtn = () => {
        prevPage.push("/welcomepage");
    };

    const handlerOnUpdateProfile = () => {
        console.log('updated profile');
    };

    return (
        <div className={styles.profile_page}>
            <form onSubmit={handlerOnUpdateProfile} className={styles.form_profile__page}>

                <center>
                    <div className={styles.contact_details}>
                        <label htmlFor="contact"> Contact Details </label>
                        <button className={styles.cancel_btn} onClick={handlerOnCancelBtn}> Cancel </button>
                    </div>

                    <div className={styles.full_name}>
                        <label htmlFor="fullname"> Full Name </label>
                        <input type="text" id="fullname" name="fullname" required />
                    </div>

                    <div className={styles.profile_photo}>
                        <label htmlFor="profilephoto"> Profile Photo URL </label>
                        <input type="link" id="profilephoto" name="profilephoto" required />
                    </div>

                    <div className={styles.update_actions}>
                        <button type="submit"> Update </button>
                    </div>
                </center>

            </form>
        </div>
    )
}

export default ProfilePage;