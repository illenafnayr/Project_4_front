import React, { Component } from 'react'
import Location from './components/Location'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Map from './components/Map'
import axios from 'axios'
import Create from './components/Create'
import ProtecedRoute from './Protected.route'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  state = {
    name: '',
    price: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    lat: '',
    lng: '',
    img1: '',
    img2: '',
    img3: '',
    locations: [],
  }
  
  // Handle atributes allow you to create 
  handleChange = (event) => {
    event.preventDefault()
    this.setState({
      ...this.prevState, [event.target.id]: event.target.value,
    
    })
  }

  handleSubmit = (event) => {
    // event.target.reset()
    event.preventDefault()
    axios.post('https://altliving.herokuapp.com/locations/', this.state).then((response) => {
      this.getLocations()
    })
  }
// ===========DELETE ==================
  deleteLocation = (event) => {
    let id = parseInt(event.target.value)
    axios.delete('https://altliving.herokuapp.com/locations/' + id).then((response) => {
      this.getLocations()

    })
  }
// ===========UPDATE ==================

  updateLocation = (event) => {
    event.preventDefault()
    // event.target.reset()
    let id = parseInt(event.target.id)
    axios
      .put('https://altliving.herokuapp.com/locations/' + id, this.state)
      .then((response) => {
        this.getLocations()
    })
  }
// ===========GET ==================

  getLocations = () => {
    axios
    .get('https://altliving.herokuapp.com/locations')
    .then(
      (response) => this.setState({ locations: response.data }),
      (err) => console.error(err) 
    )
    .catch((error) => console.error(error))
  }
// ===========DID MOUNT ==================

  componentDidMount = () => {
    this.getLocations()
  }

// ===========Display ON SCREEN RENDER ==================

  render = () => {
    return (
    <div className="all">
      <Route exact path="/altliving">
        <Navbar 
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}/>
      </Route>
      
      <ProtecedRoute exact path="/altliving/admin">
        <Create 
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}/>
      </ProtecedRoute>


      <img className="homeImg" src="https://images.unsplash.com/photo-1596135811068-0daf0b1e3b3f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1692&q=80" alt='HomeImg'/>
      <Map />
      <div className="scrollBox">
      {this.state.locations.map((location) => {
        return <Location key={location.id}
        location={location}
        updateLocation={this.updateLocation}
        deleteLocation={this.deleteLocation}
        handleChange={this.handleChange}
        // handleSubmit={this.handleSubmit}
        />
      })}
      </div>
      <Footer />
    </div>
    )
  }
}

export default App
