import axios from "axios";
import styles from "./AddExpensePage.module.css";
import React, { useEffect, useState } from 'react'

const AddExpensePage = () => {

    const [items, setItems] = useState([]);

    const [inputSpentMoney, setInputSpentMoney] = useState();
    const [inputDescription, setInputDescription] = useState();
    const [inputChooseCategory, setInputChooseCategory] = useState();
    // const [toggleBtnEdit, setToggleBtnEdit] = useState(true);
    const [isEditing, setIsEditing] = useState(null);



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
        const expTracker = {
            spentMoney: inputSpentMoney,
            details: inputDescription,
            selectCat: inputChooseCategory,
        };


        try {
            const res = await axios.post(`https://exptracker-9462a-default-rtdb.firebaseio.com/moneySpent.json`, expTracker)
            console.log(expTracker);
            setItems([...items, expTracker]);
        } catch (error) {
            console.log(error);
        }

        setInputSpentMoney('');
        setInputDescription('');
        setInputChooseCategory('');

    };




    const handlerOnDeleteBtn = async (id) => {
        console.log('deleting');
        try {
            await axios.delete(`https://exptracker-9462a-default-rtdb.firebaseio.com/moneySpent/${id}.json`)
            setItems(items.filter((item) => item.id !== id));
        } catch (error) {
            console.log(error);
        }
    };


    const handlerOnEditBtn = async (currElem) => {
        console.log(currElem);
        try {
            // const res = await axios.get(`https://exptracker-9462a-default-rtdb.firebaseio.com/moneySpent/${currElem}.json`);

            // console.log(res);

            setInputSpentMoney(currElem.spentMoney);
            setInputDescription(currElem.details);
            setInputChooseCategory(currElem.selectCat);
            // handlerOnEditUpdate(currElem.id);
            const res = await axios.delete(`https://exptracker-9462a-default-rtdb.firebaseio.com/moneySpent/${currElem.id}.json`);

            const res2 = await axios.get(`https://exptracker-9462a-default-rtdb.firebaseio.com/moneySpent.json`);
            const dataArray = Object.entries(res2.data).map(([key, value]) => {
                return { id: key, ...value };
            });// In firebase the data is wrapped inside the unique id for taking the data back we have used the Object.entries to get the proper id and value;
            // console.log(response.data);
            setItems(dataArray);


        } catch (error) {
            console.log(error);
        }
    };

    // const handlerOnEditUpdate = async (id) => {
    //     try {
    //         // const expenseData = {
    //         //     inputSpentMoney: inputSpentMoney,
    //         //     inputDescription: inputDescription,
    //         //     inputChooseCategory: inputChooseCategory,
    //         // };

    //         const res = await axios.delete(`https://exptracker-9462a-default-rtdb.firebaseio.com/moneySpent/${id}.json`);

    //         const res2 = await axios.get(`https://exptracker-9462a-default-rtdb.firebaseio.com/moneySpent.json`);
    //         const dataArray = Object.entries(res2.data).map(([key, value]) => {
    //             return { id: key, ...value };
    //         });
    //         // console.log(response.data);
    //         setItems(dataArray);
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     }

    // };


    // const handlerOnEditBtn = (id) => {
    //     let inputData = items.find((elem) => {
    //         return elem.id === id;
    //     })
    //     console.log(inputData);
    //     setInputSpentMoney(inputData.spentMoney);
    //     setInputDescription(inputData.details);
    //     setInputChooseCategory(inputData.selectCat);
    //     axios.put(`https://exptracker-9462a-default-rtdb.firebaseio.com/moneySpent/${id}.json`, {
    //         inputData
    //     });
    //     setItems(items.map((arr) => {
    //         if (arr.id === id) {
    //             return { ...arr }
    //         }
    //     }))
    //     setItems(...items);
    //     console.log(items);
    //     // setIsEditing(id);
    // };



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

                        {/* {toggleBtnEdit ? <button type="submit" className={styles.add_exp__btn}> Add Expense </button> : <button type="submit" className={styles.edit_btn}
                        > Edit </button>} */}
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


                        <div className={styles.edit_del__actions}>
                            <button className={styles.edit_btn}
                                onClick={() => handlerOnEditBtn(currElem)}
                            > Edit </button>
                            <button className={styles.del_btn}
                                onClick={() => handlerOnDeleteBtn(currElem.id)}
                            > Delete </button>
                        </div>


                    </li>
                })}
            </ol>
        </>
    )
}

export default AddExpensePage;