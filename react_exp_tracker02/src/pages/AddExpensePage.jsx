import axios from "axios";
import styles from "./AddExpensePage.module.css";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addExpActions } from "../store/ExpContext";

const AddExpensePage = () => {

    const { expensing } = useSelector((store) => store.addExpenses);

    const dispatch = useDispatch();

    // const [items, setItems] = useState([]);
    // Now, we are using ReduxToolkit. Therefore, we store the array in the redux createSlice i.e,  expensing: [] ;
    // So, there is no use of items array ;

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
        const expTracker = {
            spentMoney: inputSpentMoney,
            details: inputDescription,
            selectCat: inputChooseCategory,
        };


        try {
            const res = await axios.post(`https://expensetracker02-e2058-default-rtdb.firebaseio.com/moneySpent.json`, expTracker)
            console.log(expTracker);
            // setItems([...items, expTracker]); // Now, we setting the array in redux's expensing array ;
            dispatch(addExpActions.addItems(expTracker));
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
            await axios.delete(`https://expensetracker02-e2058-default-rtdb.firebaseio.com/moneySpent/${id}.json`)
            // setItems(items.filter((item) => item.id !== id));  // Now, we are filter the array from redux's expensing array reducer function ;

            dispatch(addExpActions.deleteItems(id));

        } catch (error) {
            console.log(error);
        }
    };


    const handlerOnEditBtn = async (currElem) => {
        console.log(currElem);
        try {

            setInputSpentMoney(currElem.spentMoney);
            setInputDescription(currElem.details);
            setInputChooseCategory(currElem.selectCat);

            const res = await axios.delete(`https://expensetracker02-e2058-default-rtdb.firebaseio.com/moneySpent/${currElem.id}.json`);

            const res2 = await axios.get(`https://expensetracker02-e2058-default-rtdb.firebaseio.com/moneySpent.json`);
            const dataArray = Object.entries(res2.data).map(([key, value]) => {
                return { id: key, ...value };
            });// In firebase the data is wrapped inside the unique id for taking the data back we have used the Object.entries to get the proper id and value;
            // console.log(response.data);

            // setItems(dataArray);  // Now, we setting the array in redux's expensing array ;

            dispatch(addExpActions.editItems(dataArray));
            dispatch(addExpActions.deleteItems(currElem.id));

        } catch (error) {
            console.log(error);
        }
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
                dispatch(addExpActions.setItems(dataArray));

            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses(); // Call the fetch function
    }, [dispatch]); // Run only on component mount


    const totalExpense = expensing.reduce((acc, item) => acc + Number(item.spentMoney), 0);
    console.log(totalExpense);

    // console.log(expensing)
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


            {/* {console.log(items)} */}
            <ol className={styles.listing_items}>

                {/* Now, instead of items array we are using expensing array of redux */}

                {/* {items.length > 0 && items.map((currElem) => { */}
                {expensing.length > 0 && expensing.map((currElem) => {
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
            <center>
                {totalExpense >= 10000 && <button className={styles.active_premium__btn}> Activate Premium </button>}
            </center>

        </>
    )
}

export default AddExpensePage;