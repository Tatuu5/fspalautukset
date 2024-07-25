const Filter = (props) => {
    return(
    <div>
      filter shown with <input value={props.filtering} onChange={props.onChangeFilter} name="filter"/>
    </div>
    )
  }

export default Filter