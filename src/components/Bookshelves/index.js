import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
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

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  render() {
    const {activeTabName} = this.state

    return (
      <>
        <Header bookshelves />
        <div className="bookshelves-bg-container">
          <div className="sidebar-container">
            <Sidebar bookshelvesList={bookshelvesList} />
          </div>
          <div className="bookshelves-main-container">
            <div className="filter-name-search-container">
              <h1 className="heading">{activeTabName} Books</h1>
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
                <BsSearch className="search-icon" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default BookShelves
