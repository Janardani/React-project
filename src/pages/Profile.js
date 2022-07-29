import React, { useState, useEffect } from 'react'
import { storage, db, auth } from "../firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import profile from "../Asset/images/profile.png"
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    let navigate = useNavigate();
    const [user, setuser] = useState("")
    const [img, setimg] = useState("");
    const [userbio, setuserbio] = useState("");

    useEffect(() => {
        getDoc(doc(db, "user", auth.currentUser.uid)).then((docsnap) => {
            if (docsnap.exists) {
                setuser(docsnap.data())
            }
        })

        if (img) {
            const uploadimg = async () => {
                const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`);
                try {
                    if (user.avatarpath) {
                        await deleteObject(ref(storage, user.avatarpath));
                    }
                    const snap = await uploadBytes(imgRef, img);
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
                    await updateDoc(doc(db, "user", auth.currentUser.uid), {
                        avatar: url,
                        avatarpath: snap.ref.fullPath,
                    })

                    window.location.reload(true);
                } catch (error) {
                    console.log(error);
                }
            };

            uploadimg()

        }
    }, [img])
    useEffect(() => {
        getDoc(doc(db, "user", auth.currentUser.uid)).then((docsnap) => {
            if (docsnap.exists) {
                setuserbio(docsnap.data())

            }
        })
    }, [])
    const deleteimage = async () => {
        const confirm = window.confirm("Do you want to delete profile")
        if (confirm) {
            deleteObject(ref(storage, user.avatarpath));
        }
        await updateDoc(doc(db, "user", auth.currentUser.uid), {
            avatar: "",
            avatarpath: ""
        })
        window.location.reload(true);

    }

    const changebio = (e) => {
        setuserbio(e.target.value);
    }
    const savebio = async () => {
        const value = userbio;
        await updateDoc(doc(db, "user", auth.currentUser.uid), {
            bio: value,
        });
        navigate("/");
    }

    return user ? (

        <div className='profile-sec-wrapper'>
            <div className='profile-section'>
                <div className='profile-left'>
                    <div className='profile-sec-img'> <img src={user.avatar || profile} alt="profile-img-here" /></div>
                    <div className='upload-wrapper'>
                        <div className='upload-img'>
                            <label htmlFor='img-upload' className='pro-up'>upload</label>
                            <input type="file" accept="image/*" id='img-upload' style={{ display: "none" }} onChange={e => setimg(e.target.files[0])} />

                        </div>
                        <div>  {user.avatar ? <label onClick={deleteimage} className='pro-up'>delete</label> : null}</div>
                    </div>

                </div>
                <div className='profile-right'>
                    <p className='user-name'>{user.name}</p>
                    <p className='user-email'>{user.email}</p>
                    <textarea className='form-control bio-card' value={userbio.bio} onChange={(e) => changebio(e)} placeholder="Place your bio here"></textarea>
                    <button className='btn change-bio' onClick={savebio}>Save</button>
                </div>

            </div>
        </div>
    ) : null
}

export default Profile