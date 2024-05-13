import { NavLink } from "react-router-dom/cjs/react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.navbar_div}>
            <NavLink to="/homepage" className={styles.navlink}> home </NavLink>
            <NavLink to="/productpage" className={styles.navlink}> products </NavLink>
            <NavLink to="/aboutpage" className={styles.navlink}> about us </NavLink>
            <NavLink to="/authformpage" className={styles.navlink}> signin </NavLink>
        </div>
    )
}

export default Navbar;