import React from "react";
import '../../styles/Categories.css'
import { useSelector } from "react-redux";
import { Category, CreateButton, CategoryForm } from '../'

const Categories = () => {

    const { categories } = useSelector(state => state.flashcards)
    const { categoryFormIsActive } = useSelector(state => state.flashcards)

    const renderCategory = () => {
        
        return categories.map(item => <Category key={item.id} item={item} />)
    }
    return (
        <section className="Categories">
            <h2 className="Categories__heading">Your current categories</h2>
            {categories.length !== 0 && <h3 className="Categories__heading">Click the category to see the flashcards</h3>}
            {categories.length === 0 ?
                 <p className="Categories__message">You don't have any category yet</p> :
                <div className="Categories__box">{renderCategory()}</div>
            }
            <CreateButton>Create a new category</CreateButton>
            {categoryFormIsActive && <CategoryForm />}

        </section>

    )
}

export default Categories