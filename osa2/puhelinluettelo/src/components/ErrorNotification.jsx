const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="failure">
        {message}
      </div>
    )
  }

export default ErrorNotification