import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ items, editItem, deleteItem }) => {
  return (
    <>
      <div className='grocery-container'>
        <div className='grocery-list'>
          {items.map((item) => {
            const { id, title } = item
            return (
              <article className='grocery-item' key={id}>
                <p className='title'>{title}</p>
                <div className='btn-container'>
                  <button
                    onClick={() => {
                      editItem(id)
                    }}
                    className='edit-btn'
                  >
                    <FaEdit />
                  </button>
                  <button
                    className='delete-btn'
                    onClick={() => {
                      deleteItem(id)
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default List
