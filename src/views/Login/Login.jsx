import Axios from 'axios';
import React, { useState } from 'react';
import { useWallet } from "use-wallet";
import {useAccountConsumer} from "../../contexts/Account";

const Login = () => {
    const { account } = useAccountConsumer()
    const [selectedFile, setSelectedFile] = useState();

    // const changeHandler = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     setIsSelected(true);
    // };

    const handleSubmission = async () => {
        console.log(selectedFile);
        await Axios.post(`/api/user/uploadNft/${account}`, { pathToFile: selectedFile });
    };
    // if (account)
    return (
        <>
            <h1>Enter path to file you wish to upload</h1>
            <button onClick={() => { handleSubmission() }}>
                upload
                </button>
            <input type="text" name="filePath" onChange={e => setSelectedFile(e.target.value)} />
        </>
    )
    // else
    //     return (
    //         <h1> Connect your wallet to upload NFTs </h1>
    //     )
}

export default Login;


{/* <div>
<h1>Username:</h1>
<input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
<h1>Password</h1>
<input type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
<h1>Email</h1>
<input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
<button onClick={() => {
    onRegisterClick();
}}>
    Register
</button>
</div> */}
// const [errors, setErrors] = useState({});
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");
// const [email, setEmail] = useState("");

// const onRegisterClick = async () => {
//     try {
//         const signUpResponse = await Auth.signUp({
//             username,
//             password,
//             attributes: {
//                 email: email
//             }
//         });
//     } catch (error) {
//         let err = null;
//         !error.message ? err = { "message": error } : err = error;
//         setErrors({
//             ...errors,
//             cognito: err
//         })
//     }
// }