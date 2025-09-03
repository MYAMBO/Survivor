import './Home.css'

function PresentationSection () {
  return (
    <div className='presentation-wrapper'>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </span>
    </div>
  )
}

function FeaturedProjectSection () {
  return (
    <div className='featured-project-wrapper'>

    </div>
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
