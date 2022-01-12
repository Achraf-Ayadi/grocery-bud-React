import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')))
  } else {
    return []
  }
}

function App() {
  const [itemName, setItemName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [list, setList] = useState(getLocalStorage())
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type })
    setTimeout(() => {
      setAlert(false, '', ' ')
    }, 1000)
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    if (!itemName) {
      // alert
      showAlert(true, 'please enter value', 'danger')
    } else if (itemName && isEditing) {
      // edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: itemName }
          }
          return item
        })
      )
      setIsEditing(false)
      setEditId(null)
      setItemName('')
      showAlert(true, 'value changed', 'success')
    } else {
      const newItem = { id: new Date().getTime().toString(), title: itemName }
      setList([...list, newItem])
      showAlert(true, 'item added to the list', 'success')
      setItemName('')
    }
  }
  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
    showAlert(true, 'item removed', 'danger')
  }
  const removeAll = () => {
    setList([])
    showAlert(true, 'empty list', 'danger')
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setItemName(specificItem.title)
  }
  return (
    <>
      <section className='section-center'>
        <form onSubmit={handlesubmit} className='grocery-form'>
          {alert.show && <Alert {...alert} />}
          <h3>grocery bud </h3>
          <div className='form-control'>
            <input
              type='text'
              className='grocery'
              placeholder='e.g. milk'
              onChange={(e) => {
                setItemName(e.target.value)
              }}
              value={itemName}
            />
            <button className='submit-btn' type='submit'>
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        <div className='grocery-conatiner'>
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          {list.length > 0 && (
            <button className='clear-btn' onClick={removeAll}>
              clear items
            </button>
          )}
        </div>
      </section>
    </>
  )
}

export default App
