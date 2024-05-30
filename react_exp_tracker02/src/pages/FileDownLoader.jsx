import styles from "./FileDownLoader.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const FileDownLoader = () => {

    const { expensing } = useSelector((store) => store.addExpenses)

    const makeCsv = (expensing) => {
        // Transform data into an array of arrays
        const transformedData = expensing.map((obj) => Object.values(obj));
        console.log(transformedData);

        // Convert array of arrays into CSV string
        return transformedData.map((row) => row.join(",")).join("\n");
    };

    const handleCsvDownload = () => {
        const csvData = makeCsv(expensing);
        const blob = new Blob([csvData], { type: "text/plain" });
        const downloadLink = document.getElementById("download-link");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.setAttribute("download", "data.csv");
        // Simulate click to trigger download
        downloadLink.click();
    };

    return (
        <>
            <span onClick={handleCsvDownload}>
                <Link to="#" className={styles.css_downloader}> Download File </Link>
            </span>
            <a id="download-link" ></a>
            {/* Hidden anchor tag for download */}
        </>
    );
};

export default FileDownLoader;