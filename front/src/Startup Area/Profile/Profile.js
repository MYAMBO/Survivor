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

  if (!profile) return <p>Chargement...</p>

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-info">
          <h1>{profile.name}</h1>
          <h2>{profile.role}</h2>
        </div>
      </header>

      <section className="profile-section">
      </section>
    </div>
  )
}

export default Profile
