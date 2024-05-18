import axios from "axios";
import styles from "./AddExpensePage.module.css";
import React, { useEffect, useState } from 'react'

const AddExpensePage = () => {

    const [items, setItems] = useState([]);

    const [inputSpentMoney, setInputSpentMoney] = useState();
    const [inputDescription, setInputDescription] = useState();
    const [inputChooseCategory, setInputChooseCategory] = useState();



    const handlerOnSpentMoney = (event) => {
        setInputSpentMoney(event.target.value);
    };

    const handlerOnDescription = (event) => {
        setInputDescription(event.target.value);
    };

    const handlerOnChooseCategory = (event) => {
        setInputChooseCategory(event.target.value);
    };


    const handlerOnAddBtnSubmitForm = async (event) => {
        event.preventDefault();
        // console.log(inputSpentMoney);
        // console.log(inputDescription);
        // console.log(inputChooseCategory);
        // setItems([...items, { inputSpentMoney, inputDescription, inputChooseCategory }]);
        const expTracker = {
            spentMoney: inputSpentMoney,
            details: inputDescription,
            selectCat: inputChooseCategory,
        };

        try {
            const res = await axios.post(`https://exptracker-9462a-default-rtdb.firebaseio.com/moneySpent.json`, expTracker)
            console.log(expTracker);
            setItems([...items, expTracker])
        } catch (error) {
            console.log(error);
        }
        setInputSpentMoney('');
        setInputDescription('');
        setInputChooseCategory('');
    };





    useEffect(() => {

        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`https://exptracker-9462a-default-rtdb.firebaseio.com/moneySpent.json`);
                const dataArray = Object.entries(response.data).map(([key, value]) => {
                    return { id: key, ...value };
                });
                // console.log(response.data);
                setItems(dataArray);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses(); // Call the fetch function
    }, []); // Run only on component mount






    return (
        <>
            <div className={styles.add_exp__div}>
                <div className={styles.daily_expenses}>
                    <form onSubmit={handlerOnAddBtnSubmitForm}>

                        <label htmlFor="spent_money"> Spent Money </label>
                        <input type="number" id="spent_money" name="spent_money" required value={inputSpentMoney}
                            onChange={handlerOnSpentMoney} />

                        <label htmlFor="description"> Description </label>
                        <input type="text" id="description" name="description" required value={inputDescription}
                            onChange={handlerOnDescription} />

                        <label htmlFor="chooseCat"> Choose Category </label>
                        <select name="chooseCat" id="chooseCat" value={inputChooseCategory} onChange={handlerOnChooseCategory}
                        >
                            <option value="none"> None </option>
                            <option value="food"> Food </option>
                            <option value="petrol"> Petrol </option>
                            <option value="fruits"> Fruits </option>
                            <option value="other"> Other </option>
                        </select>

                        <button type="submit" className={styles.add_exp__btn}> Add Expense </button>
                    </form>
                </div>
            </div>
            {console.log(items)}
            <ol className={styles.listing_items}>

                {items.length > 0 && items.map((currElem) => {
                    return <li key={currElem.id} className={styles.individual_items}
                    >
                        Rs. {currElem.spentMoney} /- {currElem.details} {currElem.selectCat}
                        {/* Rs. {currElem.inputSpentMoney} /- {currElem.inputDescription} {currElem.inputChooseCategory} */}

                    </li>
                })}
            </ol>
        </>
    )
}

export default AddExpensePage;