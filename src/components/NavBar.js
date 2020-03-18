import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Paper, TextField } from '@material-ui/core';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      pastTerm: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => this.setState({ searchTerm: event.target.value });

  getSearch = async searchTerm => {
    const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}/`;
    let flag = 1;
    const response = await fetch(url).catch(err => {
      flag = 0;
    });
    if (flag) {
      const json = await response.json();
      console.log(json.id);
      return json.id;
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchTerm } = this.state;
    console.log(searchTerm);
    this.getSearch(searchTerm).then(id => {
      this.props.history.push({
        pathname: '/details',
        search: `?pokemon=${searchTerm}`,
        state: { id, name: searchTerm }
      });
    });
  };

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Link to="/">
          <Grid item>
            <img
              alt="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
            />
          </Grid>
        </Link>
        <Grid item lg={3} style={{ marginLeft: '15px' }}>
          <Paper elevation={6} style={{ padding: '5px' }}>
            <Grid
              container
              justify="space-evenly"
              direction="row"
              alignContent="center"
              alignItems="center"
            >
              <form onSubmit={this.handleSubmit} style={{ width: '300px' }}>
                <TextField
                  fullWidth
                  label="Search..."
                  onChange={this.handleChange}
                  color="primary"
                />
              </form>
              <img
                alt="search"
                height={20}
                width={25}
                src="https://i.dlpng.com/static/png/1486015-magnifying-glasspng-magnifying-glass-png-829_684_preview.png"
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(NavBar);
