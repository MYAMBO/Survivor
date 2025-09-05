import { useEffect, useState } from 'react'
import './Profile.css'

function Profile() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/profile')
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
          <p>{profile.bio}</p>
        </div>
      </header>

      <section className="profile-section">
        <h3>Compétences</h3>
        <ul className="skills-list">
          {profile.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="profile-section">
        <h3>Projets récents</h3>
        <div className="projects">
          {profile.projects.map((proj, index) => (
            <div className="project" key={index}>
              <h4>{proj.title}</h4>
              <p>{proj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <h3>Contact</h3>
        <p>Email : <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></p>
        <p>LinkedIn : <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">{profile.contact.linkedin}</a></p>
        <p>GitHub : <a href={profile.contact.github} target="_blank" rel="noreferrer">{profile.contact.github}</a></p>
      </section>
    </div>
  )
}

export default Profile
