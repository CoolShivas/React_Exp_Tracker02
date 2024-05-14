import { NavLink } from "react-router-dom/cjs/react-router-dom";
import styles from "./InCompleteProfilePage.module.css";

const InCompleteProfilePage = () => {
    return (
        <div className={styles.incompleteprofile_page}>
            <h4> Your profile is incomplete.</h4>
            <NavLink to="/profilepage" className={styles.complete_profile}> Complete now
            </NavLink>
        </div>
    )
}

export default InCompleteProfilePage;