import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

const BookItem = props => {
  const {itemDetails} = props
  const {title, id, coverPic, authorName, rating, readStatus} = itemDetails

  return (
    <Link to={`/books/${id}`} className="link-item">
      <li test-id="bookItem" className="book-item">
        <img src={coverPic} alt={title} className="book-item-image" />
        <div className="book-item-details">
          <h1 className="book-name">{title}</h1>
          <p className="author-name">{authorName}</p>
          <div className="rating-container">
            <p className="avg-rating">Avg Rating</p>
            <BsFillStarFill className="star-icon" />
            <p className="avg-rating">{rating}</p>
          </div>
          <p className="status">
            Status : <span className="read-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
