import React from "react";

const SignIn = ()=>{
    
    const [emailVal,setEmailVal] = React.useState("")
    const[passVal,setPassVal] = React.useState("")
    const[error,setError] = React.useState(null)

    const handleEmailChanged = (event) => {
        setEmailVal(event.target.value)
    }
    
    const handlePassChanged = (event) => {
        setPassVal(event.target.value)
    }

    const signIn = async ()=>{
        const userDetails = {"email":emailVal,"password":passVal}
        console.log(userDetails)
        const response = await fetch("http://localhost:3000/signInUser", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            alert(json.error)
        }
        if(response.ok){
            setError(null)
            setEmailVal("")
            setPassVal("")
            console.log("User signed in")
            alert("User Signed in")
        }

    }

    return(
        <div>
            <div>
                <label for="Email">Email </label>
                <input type="text" id="Email" name="Email" value={emailVal} onChange={handleEmailChanged}></input>
            </div>

            <div>
                <label for="Password">Password </label>
                <input type="password" id="Password" name="Password" value={passVal} onChange={handlePassChanged}></input>
            </div>

            <div>
                <button type="button" onClick={signIn}> Sign In </button>
            </div>
        </div>
    )
}

export default SignIn