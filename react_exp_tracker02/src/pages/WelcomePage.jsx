import AddExpensePage from "../pages/AddExpensePage"
import axios from "axios";
import styles from "./WelcomePage.module.css";
import InCompleteProfilePage from "./InCompleteProfilePage";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/ExpContext";
// import { useContext } from "react";
// import ExpContext from "../store/ExpContext";


const WelcomePage = () => {

    // const { logOut } = useContext(ExpContext);
    const dispatch = useDispatch();

    const returnToLogin = useHistory();

    const handlerOnVerifyEmailId = async () => {
        try {
            const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=
            AIzaSyDYXxCoZdE5z5sJ5vj2Y3hwTXpVHufKsxc`, {
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
        // localStorage.removeItem("SaveToken");
        // logOut();
        dispatch(authActions.logout());
        localStorage.removeItem("SaveToken");
        returnToLogin.replace("/login");
    };


    return (
        <>
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

            <AddExpensePage></AddExpensePage>

        </>
    )
}

export default WelcomePage;