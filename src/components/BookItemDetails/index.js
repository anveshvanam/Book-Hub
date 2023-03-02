import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, bookDetails: {}}

  componentDidMount() {
    this.getBookDetails()
  }

  getFormattedData = book => ({
    aboutAuthor: book.about_author,
    aboutBook: book.about_book,
    authorName: book.author_name,
    coverPic: book.cover_pic,
    id: book.id,
    readStatus: book.read_status,
    title: book.title,
    rating: book.rating,
  })

  onClickRetry = () => {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const updatedData = this.getFormattedData(data.book_details)
      console.log(updatedData)
      this.setState({
        bookDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderBookDetailsSuccessView = () => {
    const {bookDetails} = this.state
    const {
      id,
      title,
      authorName,
      coverPic,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDetails
    return (
      <div className="book-details-main-container">
        <div className="cover-details-container">
          <img src={coverPic} alt="cover" className="details-cover-image" />
          <div className="details-container">
            <h1 className="details-book-name">{title}</h1>
            <p className="details-author-name">{authorName}</p>
            <div className="details-rating-container">
              <p className="details-avg-rating">Avg Rating </p>
              <BsFillStarFill className="details-star-icon" />
              <p className="details-avg-rating">{rating}</p>
            </div>
            <p className="details-status">
              Read Status :{' '}
              <span className="details-read-status">{readStatus}</span>{' '}
            </p>
          </div>
        </div>
        <hr className="h-line" />
        <div className="about-container">
          <h1 className="about-heading">About Author</h1>
          <p className="about-para">{aboutAuthor}</p>
          <h1 className="about-heading">About Book</h1>
          <p className="about-para">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="books-failure-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="failure view"
      />
      <p className="books-failure-heading">
        Something went wrong. Please try Again.
      </p>
      <button
        className="books-failure-btn"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetailsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return <p>test</p>
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details-bg-container">
          {this.renderBookDetails()}
          <Footer />
        </div>
      </>
    )
  }
}

export default BookItemDetails
