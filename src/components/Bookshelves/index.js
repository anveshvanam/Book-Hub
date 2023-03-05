import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import BookItem from '../BookItem'
import Footer from '../Footer'
import Sidebar from '../Sidebar'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    activeTab: bookshelvesList[0].value,
    activeTabName: bookshelvesList[0].label,
    searchText: '',
    booksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  getFormattedData = books => ({
    title: books.title,
    id: books.id,
    coverPic: books.cover_pic,
    authorName: books.author_name,
    rating: books.rating,
    readStatus: books.read_status,
  })

  onClickRetry = () => {
    this.getBooks()
  }

  onSubmitSearch = event => {
    event.preventDefault()
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchText, activeTab} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeTab}&search=${searchText}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(response)
    console.log(data)

    if (response.ok) {
      const updatedBooks = data.books.map(eachItem =>
        this.getFormattedData(eachItem),
      )
      // console.log(updatedBooks)

      this.setState({
        apiStatus: apiStatusConstants.success,
        booksList: updatedBooks,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="books-failure-image"
        src="https://res.cloudinary.com/dq9eefxnb/image/upload/v1677406194/bookshelves-failure_ikax1p.png"
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

  renderNoBooksView = () => {
    const {searchText} = this.state
    return (
      <div className="no-match-found-container">
        <img
          className="no-match-image"
          src="https://res.cloudinary.com/dq9eefxnb/image/upload/v1677406176/book-search-not-found_wnh3jp.png"
          alt="no books"
        />
        <p className="no-match-paragraph">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderBooksSuccessView = () => {
    const {booksList} = this.state
    return (
      <>
        {booksList.length > 0
          ? booksList.map(eachItem => (
              <BookItem itemDetails={eachItem} key={eachItem.id} />
            ))
          : this.renderNoBooksView()}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  updateActiveTab = filter => {
    this.setState({activeTab: filter}, this.getBooks)
  }

  renderBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeTabName, activeTab, searchText} = this.state

    return (
      <>
        <Header bookshelves />
        <div className="bookshelves-bg-container">
          <div className="sidebar-container">
            <Sidebar
              bookshelvesList={bookshelvesList}
              updateActiveTab={this.updateActiveTab}
              activeTab={activeTab}
            />
          </div>
          <div className="bookshelves-main-container">
            <div className="filter-name-search-container">
              <h1 className="active-tab-name">{activeTabName} Books</h1>
              <form className="search-container" onSubmit={this.onSubmitSearch}>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  value={searchText}
                />
                <button
                  type="submit"
                  className="search-button"
                  testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </form>
            </div>
            <h1 className="bookshelves-heading">Bookshelves</h1>
            <ul className="responsive-filters-container">
              {bookshelvesList.map(eachFilter => (
                <li className="responsive-filter-item" key={eachFilter.id}>
                  <button
                    type="button"
                    className={`responsive-filter-btn ${
                      activeTab === eachFilter.value
                        ? 'active-responsive-filter'
                        : ''
                    }`}
                    onClick={() => this.updateActiveTab(eachFilter.value)}
                  >
                    {eachFilter.label}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="books-container">{this.renderBooks()}</ul>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default BookShelves
