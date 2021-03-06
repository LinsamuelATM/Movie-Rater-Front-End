import React , {Component} from 'react';



class MoiveForm extends Component {

    state= {
        editedMovie : this.props.movie
       
    }

    cancelClicked = () => {
       this.props.cancelForm();
    }

    inputChanged = (event) => {
        let movie = this.state.editedMovie;
        movie[event.target.name] = event.target.value;
        this.setState({editedMovie: movie});
    }

    saveClicked = () => {
        fetch(`http://127.0.0.1:8000/api/movies/`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Token ${this.props.token}`
       },
       body: JSON.stringify(this.state.editedMovie)
       }).then( resp => resp.json())
       .then( res => this.props.newMovie(res))
       .catch(error => console.log(error))
    }

    updateClicked = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/`, {
            method: 'PUT',
            headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Token ${this.props.token}`
       },
       body: JSON.stringify(this.state.editedMovie)
       }).then( resp => resp.json())
       .then( res => this.props.editedMovie(res))
       .catch(error => console.log(error))
    }


    render(){

        const isDiabled = this.state.editedMovie.title.length === 0 ||
                            this.state.editedMovie.description === 0;


        return (
         <React.Fragment>
           <span>Title</span><br/>

           <input type="text" name="title" value={this.props.movie.title} 
                onChange={this.inputChanged}/><br/>
           <span>Description</span><br/>
           <textarea name="description" value={this.props.movie.description} 
                onChange={this.inputChanged}/><br/>
            
            {this.props.movie.id ? 
                    <button disabled = {isDiabled} onClick={this.updateClicked}>Update</button>: 
                    <button disabled = {isDiabled} onClick={this.saveClicked}>Save</button>}
            &nbsp;
           <button onClick={this.cancelClicked}>Cancel</button>
        </React.Fragment>
        )
    }
}


export default MoiveForm