import styles from "./WelcomePage.module.css";
import InCompleteProfilePage from "./InCompleteProfilePage";


const WelcomePage = () => {
    return (
        <div className={styles.welcomepage_div}>
            <h3> Welcome to Expense Tracker!!! </h3>
            <span className={styles.incomplete_profilepage}>
                <InCompleteProfilePage
                ></InCompleteProfilePage>
            </span>
            <button className={styles.verify_ID__btn}> Verify ID </button>
            <hr />
        </div>
    )
}

export default WelcomePage;