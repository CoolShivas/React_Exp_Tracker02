import axios from "axios";
import styles from "./WelcomePage.module.css";
import InCompleteProfilePage from "./InCompleteProfilePage";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


const WelcomePage = () => {

    const returnToLogin = useHistory();

    const handlerOnVerifyEmailId = async () => {
        try {
            const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDH5JlMv2hpQuoT9E47PiPYHTdFE_P2Gs0`, {
                requestType: "VERIFY_EMAIL",
                idToken: localStorage.getItem("SaveToken"),
            })
            console.log(res);
            return (res);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    const handlerOnLogOutBtn = () => {
        localStorage.removeItem("SaveToken");
        returnToLogin.replace("/login");
    };


    return (
        <div className={styles.welcomepage_div}>
            <h3> Welcome to Expense Tracker!!! </h3>
            <span className={styles.incomplete_profilepage}>
                <InCompleteProfilePage
                ></InCompleteProfilePage>
                <button className={styles.verify_ID__btn} onClick={handlerOnVerifyEmailId}> Verify ID </button>
                <button className={styles.logout_btn}
                    onClick={handlerOnLogOutBtn}
                > Logout </button>
            </span>

            <hr />
        </div>
    )
}

export default WelcomePage;