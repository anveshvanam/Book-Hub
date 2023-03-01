import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import Bookshelves from './components/Bookshelves'
import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/bookshelf" component={Bookshelves} />
  </Switch>
)

export default App
