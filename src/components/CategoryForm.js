import React, { useState } from "react";
import '../styles/CategoryForm.css'
import DeleteButton from "./DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../modules/flashcards";

const CategoryForm = () => {
    const [categoryName, setCategoryName] = useState('')
    const [error, setError] = useState()
    const { categories } = useSelector(state => state.flashcards)

    console.log(categories)
    const dispatch = useDispatch()

    const changeHandler = e => {
        setCategoryName(e.target.value)
    }

    const submitHandler = e => {
        e.preventDefault()

        if (categoryName === '') {
            setError('The field can not be empty')
            return
        }

        const existItem = categories.filter(item => item.name === categoryName)

        if (existItem.length !== 0) {
            setError('This name has already been used')
            return
        }

        dispatch(addCategory(categoryName))
        setCategoryName('')

        // console.log(categories)
    }
    return (
        <div className="Form__box">
            <section className="Form__popup">
                <form onSubmit={submitHandler} className="Form__form">
                    <label className="Form__label">Category name
                        <input value={categoryName} onChange={changeHandler} type="text" className="Form__input" />
                        {error && <p className="Form__error">{error}</p>}
                    </label>
                    <label className="Form__label--submit">
                        <input type="submit" className="Form__input Form__input--submit" value="create" />
                    </label>
                </form>
                <DeleteButton />
            </section>
        </div >
    )
}

export default CategoryForm