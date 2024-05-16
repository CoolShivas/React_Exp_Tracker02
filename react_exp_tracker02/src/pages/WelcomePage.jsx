import axios from "axios";
import styles from "./WelcomePage.module.css";
import InCompleteProfilePage from "./InCompleteProfilePage";


const WelcomePage = () => {

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

    return (
        <div className={styles.welcomepage_div}>
            <h3> Welcome to Expense Tracker!!! </h3>
            <span className={styles.incomplete_profilepage}>
                <InCompleteProfilePage
                ></InCompleteProfilePage>
            </span>
            <button className={styles.verify_ID__btn} onClick={handlerOnVerifyEmailId}> Verify ID </button>
            <hr />
        </div>
    )
}

export default WelcomePage;