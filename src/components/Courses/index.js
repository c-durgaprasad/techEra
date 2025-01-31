import {Link} from 'react-router-dom'
import './index.css'

const Courses = props => {
  const {eachCourse} = props
  const {logoUrl, name, id} = eachCourse
  return (
    <li className="course-details">
      <Link to={`/courses/${id}`} className="li">
        <img src={logoUrl} alt={name} className="logo" />
        <p className="name">{name}</p>
      </Link>
    </li>
  )
}

export default Courses
