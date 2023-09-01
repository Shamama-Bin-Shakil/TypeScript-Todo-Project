import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/?type=all">All</Link>
      <Link to="/?type=active">Active</Link>
      <Link to="/?type=complete">Completed</Link>
    </nav>
  )
}

export default Navbar
