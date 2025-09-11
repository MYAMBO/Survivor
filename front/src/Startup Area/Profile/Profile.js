import { useEffect, useState } from 'react'
import './Profile.css'

function Profile() {
  const [profile, setProfile] = useState(null)

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

  const handleChangeEmail = () => {
    const newEmail = prompt("Entrez votre nouvel email :", profile.email)
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
            alert("Email mis à jour avec succès.")
          } else {
            alert("Erreur lors de la mise à jour de l'email.")
          }
        })
        .catch(err => console.error("Erreur mise à jour email:", err))
      }
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Es-tu sûr de vouloir supprimer ton compte ? Cette action est irréversible.")) {
      fetch("http://localhost:3000/profile", {
        method: "DELETE",
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            alert("Compte supprimé avec succès.")
            window.location.href = "/login"
          } else {
            alert("Erreur lors de la suppression du compte.")
          }
        })
        .catch(err => console.error("Erreur suppression compte:", err))
    }
  }

  const handleChangePassword = () => {
    const newPassword = prompt("Entrez votre nouveau mot de passe :")
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
            alert("Mot de passe mis à jour avec succès.")
          } else {
            alert("Erreur lors de la mise à jour du mot de passe.")
          }
        })
        .catch(err => console.error("Erreur mise à jour mot de passe:", err))
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
      <header className="profile-header">
        <div className="profile-avatar">
          <img src={profile.image} alt="User profile" />
        </div>
        <div className="profile-info">
          <h1>{profile.name}</h1>
          <h2>{profile.role}</h2>
          <p className="profile-email">{profile.email}</p>
        </div>
      </header>

      <section className="profile-section">
        <h3>Paramètres du compte</h3>
        <div className="profile-actions">
          <button className="btn btn-primary" onClick={handleChangeEmail}>Changer l'email</button>
          <button className="btn btn-secondary" onClick={handleChangePassword}>Changer le mot de passe</button>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>Supprimer mon compte</button>
        </div>
      </section>
    </div>
  )
}

export default Profile;
