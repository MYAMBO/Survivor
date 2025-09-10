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

  if (!profile) return (
    <div>
      <div className="corner-band">In Develepment</div>
      <p>Chargement...</p>
    </div>
  )

  return (
    <div className="profile-container">
      <div className="corner-band">In Develepment</div>
      <header className="profile-header">
        <div className="profile-info">
          <h1>{profile.name}</h1>
          <h2>{profile.role}</h2>
          <img src={profile.image} alt="User profile" />
        </div>
      </header>

      <section className="profile-section">
      </section>
    </div>
  )
}

export default Profile
