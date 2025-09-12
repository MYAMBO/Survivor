import { useEffect, useState } from 'react'
import './Profile.css'
import Popup from './UpdateForm/UpdateForm'

function Profile() {
  const [profile, setProfile] = useState(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Erreur fetch:', err))
  }, [])

  const handleChangeName = () => {
    const newName = prompt("Enter your new name :", profile.name)
    if (newName && newName !== profile.name) {
      fetch("http://localhost:3000/profile/name", {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newName }),
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            setProfile({ ...profile, name: newName })
            alert("Name updated succesfully.")
          } else {
            alert("Error while updating Name.")
          }
        })
        .catch(err => console.error("Error while updating Name:", err))
      }
  }

  const handleChangeEmail = () => {
    const newEmail = prompt("Enter you new email :", profile.email)
    if (newEmail && newEmail !== profile.email) {
      fetch("http://localhost:3000/profile/email", {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: newEmail }),
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            setProfile({ ...profile, email: newEmail })
            alert("Email updated succesfully.")
          } else {
            alert("Error while updating Email.")
          }
        })
        .catch(err => console.error("Error while updating Email:", err))
      }
  }

  const handleDeleteAccount = () => {
    if (window.confirm(
      "Are you sure to delete your account? This action is definitive.")) {
      fetch("http://localhost:3000/profile", {
        method: "DELETE",
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            alert("Account succesfully deleted.")
            window.location.href = "/login"
          } else {
            alert("Error while deleting Account.")
          }
        })
        .catch(err => console.error("Error while suppressing account:", err))
    }
  }

  const handleChangePassword = () => {
    const newPassword = prompt("Enter your new Password :")
    if (newPassword) {
      fetch("http://localhost:3000/profile/password", {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "password": newPassword }),
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            alert("Password updated succesfully.")
          } else {
            alert("Error while updating Password.")
          }
        })
        .catch(err => console.error("Error while updating password:", err))
    }
  }

  if (!profile) {
    return (
      <div className='profile-container'>
        <div className="profile-loading">
          <p>Chargement du profil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
          <div className="profile-avatar">
            <img src={profile.image} alt="User profile" />
          </div>
          <div className="profile-info">
            <h1>{profile.name}</h1>
            <h2>{profile.role}</h2>
            <p className="profile-email">{profile.email}</p>
          </div>
      </div>
      <div className="profile-section">
          <h3>Paramètres du compte</h3>
          <div className="profile-actions">
            <button className="btn btn-primary" onClick={handleChangeName}>Change name</button>
            <button className="btn btn-primary" onClick={handleChangeEmail}>Change email</button>
            <button className="btn btn-secondary" onClick={handleChangePassword}>Change password</button>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete account</button>
          </div>
      </div>
      <Popup id={id} active={active}/>
    </div>
  )
}

export default Profile;
