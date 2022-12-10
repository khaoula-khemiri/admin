import { React, useState, useEffect } from 'react';
import './user.css'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { userRequest } from "../../requestMethodes"
import moment from 'moment';

const User = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [file, setFile] = useState(null);


  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get("/users/find/" + id);
        setUser(res.data)
      } catch (err) {
        console.log(err.response.data);

      }
    };
    getUser();

  }, [user]);

  const updateUser = async (id, input) => {
    try {
      const res = await userRequest.put("/users/" + id, input);
      setUser(res.data)
    } catch (err) {
      console.log(err.response.data);

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
          const input = { username, email, img: downloadURL };
          updateUser(id, input);
        });
      }
    );
  }
  return (
    <div className='user'>
      <div className="userTitleContainer">
        <div className="userTitle">Edit User</div>
        <Link to="/newUser"><button className="userAddButton">Create</button></Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img className='userShowImg' src={user.img ? user.img : "https://uybor.uz/borless/uybor/img/user-images/no-avatar.png"} alt="" />
            <div className="userShowTopTitle">
              <span className='userShowUsername'>{user.username}</span>

            </div>
          </div>

          <div className="userShowBottom">
            <div className="userShowBottomTitle">
              Account Details
            </div>
            <div className="userShowBottomInfo">
              <PermIdentity className='userShowBottomIcone' />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>



            <div className="userShowBottomInfo">
              <MailOutline className='userShowBottomIcone' />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>

            <div className="userShowBottomInfo">
              <LocationSearching className='userShowBottomIcone' />
              <span className="userShowInfoTitle">{moment(user.createdAt).format('DD/MM/YYYY HH:mm')} </span>
            </div>
          </div>

        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form action="" className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label className='userUpdateLabel'> Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className='userUpdateInput'
                  onChange={e => setUsername(e.target.value)} />
              </div>


              <div className="userUpdateItem">
                <label className='userUpdateLabel'> Email</label>
                <input
                  type="email"
                  placeholder={user.email}
                  className='userUpdateInput'
                  onChange={e => setEmail(e.target.value)} />
              </div>



            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className='userUpdateImg' src={user.img ? user.img : "https://uybor.uz/borless/uybor/img/user-images/no-avatar.png"} alt="" />

                <label htmlFor="file"><Publish className='userUpdateIcone' /></label>
                <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
