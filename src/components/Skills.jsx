const Skills = () => {
  return (
    <section className='skills mx-4' id='skills'>
      <h2 className='text-purple subheading'>Skills</h2>
      <div className="container">
        <div className="row">
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-html5"></i>
              <h3>HTML</h3>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-css3-alt"></i>
              <h3>CSS</h3>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-js"></i>
              <h3>JAVASCRIPT</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-react"></i>
              <h3>REACT.JS</h3>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-java"></i>
              <h3>CORE JAVA</h3>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-php"></i>
              <h3>PHP</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-laravel"></i>
              <h3>LARAVEL</h3>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-node"></i>
              <h3>NODE.JS</h3>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-envira"></i>
              <h3>MONGODB</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-github"></i>
              <h3>GITHUB</h3>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4'>
            <div className="icon-group">
              <i className="fa-brands fa-git"></i>
              <h3>GIT</h3>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4'>
            {/* <img src={sql} alt=""width={"80px"}  /> */}
            <div className="icon-group">
              <i>Sql</i>
              <h3>SQL</h3>
            </div>
          </div>

        </div>



      </div>
    </section>
  )
}

export default Skills
