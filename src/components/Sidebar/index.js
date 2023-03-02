import {Component} from 'react'
import './index.css'

const Sidebar = props => {
  const {bookshelvesList, updateActiveTab} = props

  const onClickFilter = filter => {}

  return (
    <div className="sidebar">
      <h1 className="bookshelves-heading">Bookshelves</h1>
      <ul className="filters-list">
        {bookshelvesList.map(eachItem => (
          <li className="filter-item" key={eachItem.id}>
            <button
              type="button"
              className="filter-button"
              onClick={onClickFilter(eachItem.value)}
            >
              {eachItem.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
