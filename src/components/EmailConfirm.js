import react from "react";
import axios from "axios";

function Confirm(props){
    return (
        // Email code confirmation modal
        <div>
            <div className="form-group mb-2">
                            <h2>Confirm your email</h2>
                            <p>Please enter the code sent to your email</p>
                            <form onSubmit={props.onSubmit}>
                                <div className="form-group">
                                    <label>Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        onChange={props.onChange}
                                        value={props.code}
                                        required
                                    />
                                </div>
                                <div className="form-group" style = {{display: "flex",justifyContent: "center"}}>
                                    <button type="submit" className="btn btn-primary mt-3" >
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </div>
            </div>
    );


}

export default Confirm;