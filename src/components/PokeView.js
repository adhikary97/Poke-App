import React, { Component } from 'react';
import PokeHolder from './PokeHolder';
import { Grid, Button, Typography } from '@material-ui/core';

class PokeView extends Component {
  constructor(props) {
    super(props);
    this.state = { pokeList: [], offset: 0 };
    this.handleMore = this.handleMore.bind(this);
  }
  handleMore = async offset => {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
    const response = await fetch(url);
    const json = await response.json();
    const pattern = '/([0-9]+)/';
    const pokemon = json.results.map(item => {
      let match = item.url.match(pattern);
      let id = match[1];
      return { name: item.name, id: id };
    });
    this.setState({
      offset: this.state.offset + 20,
      pokeList: [...pokemon]
    });
    return pokemon;
  };
  render() {
    return (
      <Grid container justify="center" alignItems="center">
        <Grid container justify="space-evenly">
          <Grid container>
            <PokeHolder
              pokemon={this.state.pokeList}
              loader={() => this.handleMore(this.state.offset)}
            />
          </Grid>
          <Grid container justify="center">
            <div style={{ padding: 20 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleMore(this.state.offset)}
              >
                View More
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default PokeView;
