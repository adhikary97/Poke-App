import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

class SingleView extends Component {
  constructor(props) {
    super(props);
    const name = this.props.location.state.name.toString();
    const id = this.props.location.state.id.toString();
    this.state = {
      name,
      id,
      height: 0,
      weight: 0,
      types: [],
      abilities: [],
      experience: 0,
      games: [],
      moves: [],
    };
  }

  separate = (first, second) => {
    const data = first.map(item => item[second].name);
    return data.join(', ');
  };

  handleLoad = async url => {
    const response = await fetch(url);
    const json = await response.json();
    let abilities = this.separate(json.abilities, 'ability');
    let types = this.separate(json.types, 'type');
    let games = this.separate(json.game_indices, 'version');
    let moves = this.separate(json.moves, 'move');
    const height = json.height;
    const weight = json.weight;
    const experience = json.base_experience;
    const id = json.id;
    const name = json.name;
    this.setState({
      height,
      weight,
      types,
      abilities,
      experience,
      games,
      moves,
      id,
      name
    });
  };

  componentDidMount() {
    const url1 = `https://pokeapi.co/api/v2/pokemon/${this.state.id}/`;
    this.handleLoad(url1);
  }

  render() {
    return (
      <Grid container space={3}>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginBottom: '20px' }}
        >
          <Typography variant="h3" color="primary">
            {this.state.name[0].toUpperCase() +
              this.state.name.substring(1, this.state.name.length)}
          </Typography>
        </Grid>
        <Grid container justify="center" space={1} direction='row'>
          <Paper
            elevation={0}
            style={{ backgroundColor: '#A9A9A9', padding: '20px' }}
          >
            <Grid item xs={3}>
            <img
              src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.id}.png`}
              height={300}
              width={300}
              alt={this.state.name}
            />
            </Grid>
            <Grid item xs={8}>
            <Typography variant="h4">
              <ul>
                <li>Base Experience: {this.state.experience}</li>
                <li>Height: {this.state.height}</li>
                <li>Weight: {this.state.weight}</li>
                <li>Types: {this.state.types}</li>
                <li>Abilities: {this.state.abilities}</li>
                <li>Games: {this.state.games}</li>
                <li>Moves: {this.state.moves}</li> 
              </ul>
            </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default SingleView;