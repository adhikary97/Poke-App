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
      experience: 0
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
    const height = json.height;
    const weight = json.weight;
    const experience = json.base_experience;
    this.setState({
      height,
      weight,
      types,
      abilities,
      experience
    });
  };

  componentDidMount() {
    const url1 = `https://pokeapi.co/api/v2/pokemon/${this.state.id}/`;
    this.handleLoad(url1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const id = this.props.location.state.id;
      const url1 = `https://pokeapi.co/api/v2/pokemon/${id}/`;
      this.setState({
        id
      });
      this.handleLoad(url1);
    }
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
        <Grid container justify="space-around" space={3}>
          <Paper
            elevation={8}
            style={{ backgroundColor: '#A9A9A9', padding: '20px' }}
          >
            <img
              src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.id}.png`}
              height={300}
              width={300}
              alt={this.state.name}
            />
          </Paper>
          <Paper
            elevation={8}
            style={{ backgroundColor: '#A9A9A9', padding: '20px' }}
          >
            <Typography variant="h4">
              <ul>
                <li>Base Experience: {this.state.experience}</li>
                <li>Height: {this.state.height}</li>
                <li>Weight: {this.state.weight}</li>
                <li>Types: {this.state.types}</li>
                <li>Abilities: {this.state.abilities}</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default SingleView;
