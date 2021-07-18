import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
export class Provider extends Component {
    state = {
        track_list: [
            { track: { track_name: 'abc' } },
            { track: { track_name: '123' } },
        ],
        heading: 'Top 10 Tracks'
    };

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=bf341cbf48c8dff630003705d5744898`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
