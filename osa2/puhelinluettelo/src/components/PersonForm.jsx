const PersonForm = (props) => {
    return(
    <div>
      <form onSubmit={props.onSubmit}>
          <div>
            name: 
            <input
               value={props.nameValue} 
               onChange={props.nameOnChange}
               name="name_text" />
          </div>
          <div>
            number: <input 
            value={props.numberValue} 
            onChange={props.numberOnChange} 
            name="number_text"
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    </div>
    )
  }

export default PersonForm