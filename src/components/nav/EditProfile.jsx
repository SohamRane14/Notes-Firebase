import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useStateContext } from "../../context/StateContext";
import { database } from "../../firebase";
import Edit from "../note/img/Edit";
import "./nav-sass/EditProfile.scss";
import LoadingSvg from "../note/img/LoadingSvg";
import ProfileImg from "./ProfileImg";
import Offline from "../note/sub-component/Offline";
import DefaultProfileImg from "./DefaultProfileImg";

export default function EditProfile() {
  const {
    setProfileEdit,
    userName,
    setUserName,
    defaultTheme,
    profileChoose,
    setProfileChoose,
    defaultProfileImg,
    setDefaultProfileImg,
    onlineStatus,
    setOnlineStatus
  } = useStateContext();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Edit Profile Close
  const handleClose = () => {
    database.users
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.data()) {
          if (doc.data().profileImg) {
            setDefaultProfileImg(doc.data().profileImg);
          }
        }
      });
    setSaved(true);
    setTimeout(() => {
      setProfileEdit(false);
    }, 300);
  };

  // Profile Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (navigator.onLine) {
      setLoading(true);
      if (currentUser) {
        database.users
          .doc(currentUser.uid)
          .update({
            name: userName,
            profileImg: defaultProfileImg,
          })
          .then(() => {
            setLoading(false);
            setSaved(true);
            setTimeout(() => {
              setProfileEdit(false);
            }, 300);
          });
      }
    }
    if (navigator.onLine === false) {
      setOnlineStatus(true);
      console.log("offline");
    }
  };

  return (
    <div className={`profileEditCon ${saved && "fadeOutProfileEdit"}`}>
      {onlineStatus && <Offline />}
      {loading && (
        <div className="loading">
          <LoadingSvg />
        </div>
      )}
      {profileChoose && <ProfileImg />}
      <form
        className="profileEdit"
        onSubmit={(e) => handleSubmit(e)}
        style={{ background: defaultTheme[1] }}
      >
        <div className="profileImg">
          <DefaultProfileImg defaultImg={defaultProfileImg} />
          <button
            type="button"
            className="profileImgEdit"
            style={{ background: defaultTheme[5], color: defaultTheme[2] }}
            onClick={() => setProfileChoose(true)}
          >
            <Edit />
          </button>
        </div>
        <div className="inputCon">
          <input
            type="text"
            minLength="3"
            maxLength="15"
            value={userName}
            style={{ background: defaultTheme[1], color: defaultTheme[2] }}
            onChange={(e) => setUserName(e.target.value)}
          />
          <h1 style={{ color: defaultTheme[2] }}>{userName.length}/15</h1>
        </div>
        <div className="buttonCon">
          <button
            style={{ background: defaultTheme[3], color: defaultTheme[2] }}
            onClick={handleClose}
            type="button"
          >
            Cancel
          </button>
          <button
            style={{ background: defaultTheme[3], color: defaultTheme[2] }}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
