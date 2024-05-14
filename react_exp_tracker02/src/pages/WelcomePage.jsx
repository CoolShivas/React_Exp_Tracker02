import styles from "./WelcomePage.module.css";
import InCompleteProfilePage from "./InCompleteProfilePage";


const WelcomePage = () => {
    return (
        <div className={styles.welcomepage_div}>
            <h3> Welcome to Expense Tracker!!! </h3>
            <InCompleteProfilePage></InCompleteProfilePage>
            <hr />
        </div>
    )
}

export default WelcomePage;