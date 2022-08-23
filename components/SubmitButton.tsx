const SubmitButton = (isBusy: Boolean) => {
    if (!isBusy) {
      return (
        <button
          className="btn btn-primary btn-login w-100 mb-2"
          tabIndex={3}
          type="submit"
        >
          <span>Continue</span>
        </button>
      );
    }
  
    return (
      <button
        className="btn btn-primary btn-login w-100 mb-2"
        tabIndex={3}
        type="submit"
        disabled
      >
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        &nbsp;&nbsp;
        <span>Continue</span>
      </button>
    );
  };

export default SubmitButton