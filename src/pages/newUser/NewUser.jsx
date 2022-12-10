import "./newUser.css"
import { React, useState, useEffect } from 'react';
import { publicRequest } from "../../requestMethodes";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

const NewUser = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false)


  const register = async (user) => {
    try {
      const res = await publicRequest.post("/auth/register", user)
      console.log(res);
    
    } catch (err) {
      setError(true)
      console.log("err" + err);
    }
  }
  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          register({ username, email, password, img: downloadURL })
        });
      }
    );

  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">

        <div className="newUserItem">
          <label htmlFor="" className="newUserItemLabel">
            username
          </label>

          <input className="newUserItemInput" type="text"  onChange={(e) => { setUsername(e.target.value)}}/>
        </div>

        <div className="newUserItem">
          <label htmlFor="" className="newUserItemLabel">
            Full Name
          </label>

          <input className="newUserItemInput" type="text"  />
        </div>

        <div className="newUserItem">
          <label htmlFor="" className="newUserItemLabel">
            Email
          </label>

          <input className="newUserItemInput" type="email"  onChange={(e) => { setEmail(e.target.value)}}/>
        </div>

        <div className="newUserItem">
          <label htmlFor="" className="newUserItemLabel" >
            Password
          </label>

          <input className="newUserItemInput" type="password"  onChange={(e) => { setPassword(e.target.value)}}/>
        </div>
        <div  className="newUserItem">
          <label className="newUserItemLabel">Image</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])}/>
        </div>
        <button className="newUserItemSubmit" type="submit" value="Create"  onClick={handleClick}>Create</button>


      </form>






    </div>
  );
}

export default NewUser;
