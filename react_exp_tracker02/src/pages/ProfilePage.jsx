import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import styles from "./ProfilePage.module.css";
import { useRef } from "react";

const ProfilePage = () => {

    const inputFullName = useRef();
    const inputImageUrl = useRef();

    const prevPage = useHistory();

    const handlerOnCancelBtn = () => {
        prevPage.push("/welcomepage");
    };

    const handlerOnUpdateProfile = async (event) => {
        try {
            event.preventDefault();

            const enteredFullName = inputFullName.current.value;
            const enteredImageUrl = inputImageUrl.current.value;

            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDH5JlMv2hpQuoT9E47PiPYHTdFE_P2Gs0`, {
                idToken: localStorage.getItem("SaveToken"),
                // // Getting the token id of user from the localStorage for updating profile. To test this start from signup then login then update it will work perfectly;
                displayName: enteredFullName,
                photoUrl: enteredImageUrl,
            })
            console.log(response);
            if (!response) {
                throw new Error("Profile update failed");
            }
            //  .then((res) => {
            //      console.log(res);
            //      if (!res.ok) {
            //          throw new Error("Profile update failed");
            //      }
            //  }).catch((err) => {

            //  })
        } catch (error) {
            console.log(error);
            alert(error);
        }
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
                        <input type="text" id="fullname" name="fullname" required ref={inputFullName} />
                    </div>

                    <div className={styles.profile_photo}>
                        <label htmlFor="profilephoto"> Profile Photo URL </label>
                        <input type="link" id="profilephoto" name="profilephoto" required ref={inputImageUrl} />
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