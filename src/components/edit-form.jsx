import { useState, useEffect } from 'react'
const EditForm = ({ editItem, saveItem, setShowEditForm }) => {
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
  })

  useEffect(() => {
    editItem && setEditData({ ...editItem })
  }, [editItem])

  const onChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    saveItem(editData)
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className='form'>
      <input
        className='form-input'
        type='text'
        name='name'
        value={editData.name}
        onChange={(e) => onChange(e)}
      />
      <input
        className='form-input'
        type='text'
        name='phone'
        value={editData.phone}
        onChange={(e) => onChange(e)}
      />
      <button type='submit' className='secondary'>
        Edit data
      </button>
      <button
        type='button'
        className='close'
        onClick={() => setShowEditForm(false)}
      >
        X
      </button>
    </form>
  )
}

export default EditForm
