import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

export class Search extends Component {
    state = {
        trackTitle: "",
    };

    findTrack = (dispatch, e) => {
        e.preventDefault();
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
            )
            .then((res) => {
                console.log(res.data.message.body.track_list);
                dispatch({
                    type: 'SEARCH_TRACKS', 
                    payload: res.data.message.body.track_list
                });
                this.setState({trackTitle:''})
            })
            .catch((err) => {
                console.log("Visit this site");
                console.log("https://cors-anywhere.herokuapp.com/corsdemo");
                console.log(err);
            });
    };

    onChange(e) {
        this.setState({ trackTitle: e.target.value });
    }
    render() {
        return (
            <Consumer>
                {(value) => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body p-b mb-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search For A Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Song title..."
                                        name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary btn-lg btn-block mt-2 mb-5 w-100"
                                    type="submit"
                                >
                                    Get Track Lyrics
                                </button>
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Search;
