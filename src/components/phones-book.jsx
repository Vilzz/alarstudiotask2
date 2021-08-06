import ItemForm from './item-form'
import EditForm from './edit-form'
import { useState, useEffect } from 'react'
import { validate } from '../utils/phone-validation'
import './phones-book.css'

const Phonesbook = ({ phones }) => {
  const [phoneBook, setPhoneBook] = useState([])

  useEffect(() => {
    if (phones.length > 0) {
      setPhoneBook(phones)
    }
  }, [phones])

  const [newItem, setNewItem] = useState({
    name: '',
    phone: '',
  })
  const [editItem, setEditItem] = useState({})

  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showError, setShowError] = useState(false)

  const showForm = () => {
    if (showEditForm) {
      setShowEditForm(false)
    }
    setShowAddForm(true)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (validate(newItem.phone)) {
      setPhoneBook([...phoneBook, newItem])
      setShowAddForm(false)
    } else {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 1000)
    }
  }

  const onDelete = (e) => {
    const itemForDelete = e.target.attributes.data.value

    const updatedPhoneBook = phoneBook.filter(
      ({ phone }) => phone.toString() !== itemForDelete
    )
    setPhoneBook(updatedPhoneBook)
  }

  const onEditItem = (e) => {
    const item = phoneBook.filter(
      ({ phone }) => phone.toString() === e.target.attributes.data.value
    )[0]
    setEditItem({ ...item })
    if (showAddForm) {
      setShowAddForm(false)
    }
    setShowEditForm(true)
  }
  const saveItem = (item) => {
    if (validate(item.phone)) {
      const ind = phoneBook.findIndex((el) => el.phone === editItem.phone)
      const newPhoneBook = [...phoneBook]
      newPhoneBook[ind] = item
      setPhoneBook(newPhoneBook)
      setShowEditForm(false)
    } else {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 1000)
    }
  }
  return (
    <div className='phones-book'>
      {phoneBook.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>
                <button className='secondary' onClick={showForm}>
                  new
                </button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {phoneBook.map(({ name, phone }) => (
              <tr key={phone}>
                <td>{name}</td>
                <td>{phone}</td>
                <td>
                  <button
                    data={phone}
                    className='primary'
                    onClick={(e) => onEditItem(e)}
                  >
                    edit
                  </button>
                  <button
                    data={phone}
                    className='danger'
                    onClick={(e) => onDelete(e)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h3>No data found</h3>
          <button className='secondary' onClick={showForm}>
            Add contact
          </button>
        </div>
      )}
      {showAddForm && (
        <ItemForm
          onSubmit={onSubmit}
          setNewItem={setNewItem}
          newItem={newItem}
          setShowAddForm={setShowAddForm}
        />
      )}
      {showEditForm && phoneBook.length > 0 && (
        <EditForm
          saveItem={saveItem}
          editItem={editItem}
          setShowEditForm={setShowEditForm}
        />
      )}
      {showError && (
        <div className='error'>
          <h2>Phone number is incorrect!</h2>
        </div>
      )}
    </div>
  )
}

// This initial dummy data for testing purposes only
Phonesbook.defaultProps = {
  phones: [
    {
      name: 'Artur Pirojkov',
      phone: '555-555-5555',
    },
    {
      name: 'Semen Slepakov',
      phone: '(555)555-5555',
    },
    {
      name: 'Conan Varvar',
      phone: '(555) 555-5555',
    },
    {
      name: 'David Ivanov',
      phone: '555 555 5555',
    },
  ],
}
export default Phonesbook
