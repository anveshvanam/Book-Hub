import {Component} from 'react'
import './index.css'

const Sidebar = props => {
  const {bookshelvesList, updateActiveTab, activeTab} = props

  const onClickFilter = filter => {
    updateActiveTab(filter)
  }

  return (
    <div className="sidebar">
      <h1 className="bookshelves-heading-sidebar">Bookshelves</h1>
      <ul className="filters-list">
        {bookshelvesList.map(eachItem => (
          <li className="filter-item" key={eachItem.id}>
            <button
              type="button"
              className={`filter-button ${
                activeTab === eachItem.value ? 'active-tab-item' : ''
              }`}
              onClick={() => onClickFilter(eachItem.value)}
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
