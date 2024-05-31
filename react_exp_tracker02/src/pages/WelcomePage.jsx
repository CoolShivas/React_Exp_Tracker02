import AddExpensePage from "../pages/AddExpensePage"
import axios from "axios";
import styles from "./WelcomePage.module.css";
import InCompleteProfilePage from "./InCompleteProfilePage";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addExpActions, authActions, themeActions } from "../store/ExpContext";
import { useEffect, useState } from "react";
// import { useContext } from "react";
// import ExpContext from "../store/ExpContext";


const WelcomePage = () => {

    const { darkMode } = useSelector((store) => store.theming);

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


    useEffect(() => {

        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`https://expensetracker02-e2058-default-rtdb.firebaseio.com/moneySpent.json`);
                const dataArray = Object.entries(response.data).map(([key, value]) => {
                    return { id: key, ...value };
                });
                // console.log(response.data);
                // setItems(dataArray);  // Now, we setting the array in redux's expensing array ;
                // dispatch(addExpActions.setItems(dataArray));
                dispatch(addExpActions.setItems(dataArray));

            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses(); // Call the fetch function
    }, [dispatch]); // Run only on component mount


    const [dayTheme, setDayTheme] = useState(false);

    const handlerOnThemeChange = () => {
        setDayTheme((oldState) => !oldState);
        dispatch(themeActions.themeChanger());
    };


    return (
        <div style={{ backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black" }}>
            <div className={styles.welcomepage_div}>
                <h3> Welcome to Expense Tracker!!! </h3>
                <span>
                    <span>
                        <button
                            className={styles.theme_btn}
                            onClick={handlerOnThemeChange}
                        >
                            {dayTheme ? "Day" : "Night"}
                        </button>
                    </span>
                </span>
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

        </div>
    )
}

export default WelcomePage;