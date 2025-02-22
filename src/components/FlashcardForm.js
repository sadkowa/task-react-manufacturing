import React, { useState } from "react";
import '../styles/Form.css'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { addFlashcard } from "../modules/flashcards";

import { Popup, DeleteButton } from '.'

const FlashcardForm = ({setPopupActive, category}) => {
    const [flashcardName, setFlashcardName] = useState('')
    const [definition, setDefinition] = useState('')

    const [error, setError] = useState()

    const dispatch = useDispatch()

    const changeHandler = e => {
        const { name, value } = e.target
        if (name === 'name') {
            setFlashcardName(value)
        }
        if (name === 'definition') {
            setDefinition(value)
        }
    }

    const submitHandler = e => {
        e.preventDefault()

        if (flashcardName === '' || definition === '') {
            setError('All fields must be completed')
            return
        }

        const newItem = { id: uuidv4(), name: flashcardName, definition }
        
        dispatch(addFlashcard(newItem, category))
        setPopupActive(false)

    }

    return (
        <Popup>
            <form onSubmit={submitHandler} className="Form__form">
                <label className="Form__label" >Flashcard name
                    <input
                        className="Form__input"
                        name="name"
                        value={flashcardName}
                        onChange={changeHandler}
                        type="text" />
                </label>
                <label className="Form__label" >Definition
                    <textarea
                        className="Form__input Form__input--textarea"
                        name="definition"
                        value={definition}
                        onChange={changeHandler}
                        type="text" />
                </label>
                {error && <p className="Form__error">{error}</p>}

                <label className="Form__label--submit">
                    <input
                        type="submit"
                        className="Form__input Form__input--submit"
                        value="create" />
                </label>
            </form>
            <DeleteButton buttonId='FlashcardForm' setPopupActive={setPopupActive}/>
        </Popup>
    )
}

export default FlashcardForm