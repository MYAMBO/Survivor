import './Home.css'

function PresentationSection () {
  return (
    <section class="presentation">
      <div className="overlay">
        <div className="content">
          <h2>JEB INCUBATOR</h2>
          <p>
            Uniting breakthrough ideas with global capital. We fast-track early-stage startups by providing funding, expertise, and an unparalleled international network.
          </p>
        </div>
      </div>
    </section>
  )
}

function Project ({name, description, image}) {
   return (
    <div className="card">
      <img src={image} alt={name}/>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  )
}

function FeaturedProjectSection () {
  return (
    <section className="projects">
    <h2>Featured Projects</h2>
    <div className="cards">
      <Project 
        name="Project One" 
        description="A short description of this project goes here."
        image="https://via.placeholder.com/400x250"
      />
      <Project 
        name="Project Two" 
        description="A short description of this project goes here."
        image="https://via.placeholder.com/400x250"
      />
      <Project 
        name="Project Three" 
        description="A short description of this project goes here."
        image="https://via.placeholder.com/400x250"
      />
      <Project 
        name="Project Four" 
        description="A short description of this project goes here."
        image="https://via.placeholder.com/400x250"
      />
      <Project 
        name="Project Five" 
        description="A short description of this project goes here."
        image="https://via.placeholder.com/400x250"
      />
    </div>
  </section>
  )
}


function Home() {
  return (
    <div className="home-wrapper">
      <PresentationSection/>
      <FeaturedProjectSection/>
    </div>
  )
}

export default Home;
