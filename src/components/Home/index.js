import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import Courses from '../Courses'
import FailureView from '../FailureView'
import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {apiStatus: apiConstantStatus.initial, courseList: []}

  componentDidMount() {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const api = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(item => ({
        id: item.id,
        name: item.name,
        logoUrl: item.logo_url,
      }))
      this.setState({
        courseList: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <ul className="ul-list">
        {courseList.map(eachCourse => (
          <Courses eachCourse={eachCourse} key={eachCourse.id} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="loader-con">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
      </div>
    </div>
  )

  getDetails = () => {
    this.getCoursesDetails()
  }

  renderFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="cant-find">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.getDetails}>
        Retry
      </button>
    </div>
  )

  renderCourses = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.failure:
        return this.renderFailureView()
      case apiConstantStatus.inProgress:
        return this.renderLoaderView()
      case apiConstantStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h1 className="courses">Courses</h1>
        {this.renderCourses()}
      </div>
    )
  }
}

export default Home
