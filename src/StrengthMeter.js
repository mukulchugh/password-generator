function StrengthMeter({
    poorPassword,
    weakPassword,
    strongPassword,
    passwordError
  }) {
    return (
      <>
        <ul>
          {poorPassword === true ? (
            <li style={{ padding: "1px 0px", color: "red" }}></li>
          ) : (
            ""
          )}
          {weakPassword === true ? (
            <li style={{ padding: "1px 0px", color: "yellow" }}></li>
          ) : (
            ""
          )}
          {strongPassword === true ? (
            <li style={{ padding: "0px 0px", color: "green" }}></li>
          ) : (
            ""
          )}
        </ul>
        <p> {passwordError}</p>
      </>
    );
  }
  
  export default StrengthMeter;
  