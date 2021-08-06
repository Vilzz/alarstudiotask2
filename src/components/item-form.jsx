const ItemForm = ({ onSubmit, setNewItem, newItem, setShowAddForm }) => {
  const onChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value })
  }
  return (
    <form onSubmit={(e) => onSubmit(e)} className='form'>
      <input
        className='form-input'
        type='text'
        name='name'
        required
        placeholder='Add a name'
        onChange={(e) => onChange(e)}
      />
      <input
        className='form-input'
        type='text'
        name='phone'
        required
        placeholder='Add a phone number'
        onChange={(e) => onChange(e)}
      />
      <button type='submit' className='secondary'>
        Add data
      </button>
      <button
        type='button'
        className='close'
        onClick={() => setShowAddForm(false)}
      >
        X
      </button>
    </form>
  )
}

export default ItemForm
