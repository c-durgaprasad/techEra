import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Header from '../Header'
import FailureView from '../FailureView'

const apiConstantStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class CourseItemDetails extends Component {
  state = {course: {}, apiStatus: apiConstantStatus.initial}

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({course: updatedData, apiStatus: apiConstantStatus.success})
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-con">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {course} = this.state
    const {imageUrl, name, description} = course
    return (
      <div>
        <Header />
        <div className="course-con">
          <img src={imageUrl} alt={name} className="course-img" />
          <div className="card-con">
            <h1 className="course-name">{name}</h1>
            <p className="course-desc">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  getDetails = () => {
    this.getCourseItemDetails()
  }

  renderFailureView = () => <FailureView getDetails={this.getDetails} />

  renderCourseView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.inProgress:
        return this.renderLoaderView()
      case apiConstantStatus.failure:
        return this.renderFailureView()
      case apiConstantStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderCourseView()}</div>
  }
}

export default CourseItemDetails
