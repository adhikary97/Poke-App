import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';


class SingleView extends Component {
  constructor(props) {
    super(props);
    const name = this.props.name;
    const id = this.props.id;
    this.state = {
      name,
      id,
      height: 0,
      weight: 0,
      types: [],
      abilities: [],
      experience: 0,
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
      experience,
    });
  };

  componentDidMount() {
    const url1 = `https://pokeapi.co/api/v2/pokemon/${this.state.id}/`;
    this.handleLoad(url1);
  }

  render() {
    return (
      <Paper elevation={0} style={{padding:'10px',backgroundColor:'#A9A9A9'}}>
      <Typography variant="h5">
        Types: {this.state.types}
      </Typography>
      <Typography variant="h5">
        Physical Size: {this.state.height} height, {this.state.height} weight
      </Typography>
      <Typography variant="h5">
        Abilities: {this.state.abilities}
      </Typography>
      <Typography variant="h5">
        Experience: {this.state.experience}
      </Typography>
      </Paper>
    );
  }
}

export default SingleView;
