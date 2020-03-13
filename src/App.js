import React, {Component} from 'react';
import {withCookies} from 'react-cookie';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form'
var FontAwesome = require('react-fontawesome');

class App extends Component {

   state ={
     movies: [],
     selectedMovie: null,
     editedMovie: null,
     token: this.props.cookies.get('mr-token')

   }

   componentDidMount(){
     if(this.state.token){
      fetch('http://127.0.0.1:8000/api/movies/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.state.token}`
        } 
      }).then( resp => resp.json())
      .then( res => this.setState({movies: res}))
      .catch(error => console.log(error))

     } else {
       window.location.href = '/';
     }
   }

   loadMovie = movie => {
     this.setState({selectedMovie: movie , editedMovie:null});
   }

   movieDeleted = selmovie =>{
     const movies = this.state.movies.filter(movie => movie.id !== selmovie.id );
     this.setState({movies: movies , selectedMovie: null})
   }

   editClicked =selmovie => {
     this.setState({editedMovie : selmovie});

   }

   newMovie =() => {
    this.setState({editedMovie : {title: '' , description: ''}});

  }

  cancelForm = () => {
    this.setState({editedMovie: null});
  }

  addMovie = (movie) => {
    this.setState({movies:[...this.state.movies, movie]});
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className="header">
            <h1> <FontAwesome name="film"/> Movie Rater</h1>
            </div>
          <div className="layout">

          <MovieList movies={this.state.movies} movieClicked={this.loadMovie}
          movieDeleted={this.movieDeleted} editClicked={this.editClicked} newMovie={this.newMovie} token={this.state.token}/>
          <div>
            {!this.state.editedMovie ?
            <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} token={this.state.token}/>
            : <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm}
            newMovie={this.addMovie} editedMovie={this.loadMovie} token={this.state.token}/>}
          </div>
          </div>
        </header>
      </div>
    );
  }




  }


export default withCookies(App);
