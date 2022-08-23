const ErrorMessage = (message: string | undefined) => {
    if (!message || message == "") {
      return "";
    }
    return <div className="alert alert-danger">{message}</div>;
  };

export default ErrorMessage;