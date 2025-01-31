import './index.css'
import Header from '../Header'

const FailureView = props => {
  const {getDetails} = props
  const retryAgain = () => {
    getDetails()
  }
  return (
    <div>
      <Header />
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
        <button type="button" className="retry-btn" onClick={retryAgain}>
          Retry
        </button>
      </div>
    </div>
  )
}

export default FailureView
