import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'
import Header from '../Header'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, booksList: []}

  componentDidMount() {
    this.getToPRatedBooks()
  }

  getToPRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        booksList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSliderSuccessView = () => {
    const {booksList} = this.state

    return (
      <Slider {...settings}>
        {booksList.map(eachBook => {
          const {id, title, coverPic, authorName} = eachBook

          return (
            <div className="top-rated-book-item-container" key={id}>
              <Link to={`/books/${id}`} className="nav-link">
                <div className="top-rated-book-image-container">
                  <img
                    className="top-rated-book-image"
                    src={coverPic}
                    alt={title}
                  />
                </div>
                <h1 className="top-rated-book-name">{title}</h1>
                <p className="top-rated-book-author">{authorName}</p>
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <Header home />
        <div className="home-page-bg-container">
          <h1 className="home-heading" key="title">
            Find Your Next Favorite Books?
          </h1>
          <p className="home-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="home-find-books-btn books-responsive-btn-sm"
            type="button"
            onClick={this.onClickFindBooks}
          >
            Find Books
          </button>
          <div>
            <div className="home-top-rated-container">
              <div className="top-rated-heading-container">
                <h1 className="top-rated-heading">Top Rated Books</h1>
                <button
                  className="home-find-books-btn books-responsive-btn-lg"
                  type="button"
                  onClick={this.onClickFindBooks}
                >
                  Find Books
                </button>
              </div>
              <div className="slick-container">
                {this.renderSliderSuccessView()}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
