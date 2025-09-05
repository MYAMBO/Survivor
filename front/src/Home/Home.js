import './Home.css'

const projects = [
  {
    id: 1,
    name: "Project One",
    description: "A short description of this project goes here.",
    image: "https://images.unsplash.com/photo-1572177812156-58036aae439c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "#"
  },
  {
    id: 2,
    name: "Project Two",
    description: "A short description of this project goes here.",
    image: "https://imgs.search.brave.com/LOmbb8heM2GB5D6xUzLBELVJNiSvJs-MUWfnwmfdh_8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wcm9qZWN0LW1h/bmFnZW1lbnQtcGxh/bl8zNjQ1NjEtMzQ0/MDUuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MCZxPTgw",
    url: "#"
  },
  {
    id: 3,
    name: "Project Three",
    description: "A short description of this project goes here.",
    image: "https://imgs.search.brave.com/Wy3ydu6OqyDWXBc3B9SiF6wyAurrU0VzbbR_oLbHlMg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wcm9q/ZWN0cy1jb25jZXB0/LWJsYWNrLWNoYWxr/Ym9hcmQtZC1yZW5k/ZXJpbmctaGFuZHdy/aXR0ZW4tdG9wLXZp/ZXctb2ZmaWNlLWRl/c2stbG90LWJ1c2lu/ZXNzLW9mZmljZS1z/dXBwbGllcy03OTkw/NjczNC5qcGc",
    url: "#"
  },
  {
    id: 4,
    name: "Project Four",
    description: "A short description of this project goes here.",
    image: "https://imgs.search.brave.com/LnTM_4BymDkljOdRVDsHxsM-E8De1jbMrKH2BaVYxRY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1LzY4LzkyLzY0/LzM2MF9GXzE1Njg5/MjY0NzVfZThJbGJm/TWh3OE1hYUlaS1pq/SXQya1FRSkRsMnNM/TmwuanBn",
    url: "#"
  },
  {
    id: 5,
    name: "Project Five",
    description: "A short description of this project goes here.",
    image: "https://imgs.search.brave.com/vay89oMGMsMs1w346dKnx_Y_vxhgIIGQ85emTTZwc1c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/NDc1Mzk5L3Bob3Rv/L2FyY2hpdGVjdHVy/YWwtcHJvamVjdC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/OElIaXI4Z20xT2pU/VW91VDduTzZ0eE9i/cExjV1NkYWtXZ1B1/bXdWX21xOD0",
    url: "#"
  }
];

function PresentationSection () {
  return (
    <section className="presentation">
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

function Project({ project }) {
  return (
    <div className="ag-courses_item">
      <a href={project.url || "#"} className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <img
          src={project.image}
          alt={project.name}
          style={{ width: "100%", borderRadius: "10px" }}
        />

        <div className="ag-courses-item_title">{project.name}</div>

        <div className="ag-courses-item_date-box">
          <p>{project.description}</p>
        </div>
      </a>
    </div>
  );
}

function FeaturedProjectSection () {
  return (
    <section className="projects">
      <h2>Featured Projects</h2>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {projects.map((p) => (
            <Project key={p.id} project={p} />
          ))}
        </div>
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
