import styles from "./Header.module.css";
import Navbar from "../navigator/Navbar";
import AppName from "../AppName";

const Header = () => {
    return (
        <div className={styles.header_div}>
            <AppName></AppName>
            <Navbar></Navbar>
        </div>
    )
}

export default Header;