import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.navbar_div}>
            <a href=""> home </a>
            <a href=""> products </a>
            <a href=""> about us </a>
        </div>
    )
}

export default Navbar;