import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Grid, TextField, Paper, Typography, IconButton, InputAdornment} from '@material-ui/core';
import { Search } from '@material-ui/icons';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  render () {
    return (
      <Grid container direction="row" justify="center" alignItems="center" spacing={5} style={{paddingBottom:'20px'}}>
        <Link to="/">
          <Grid item>
            <img
              alt="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
            />
          </Grid>
        </Link>
        <Grid item>
            <Typography variant="h3" color="primary">
              Pokedex Viewer
            </Typography>
          </Grid>
        <Grid item xs={5}>
          <Paper elevation={3} style={{ backgroundColor: '#A0A0A0', padding:'10px', alignItems:"center", width:'100%'}}>
          <Grid container spacing={1} alignItems="center" justify="center">
            <Grid item xs={12}>
              <TextField placeholder="Enter Pokemon or ID..." onChange={this.handleChange} variant="outlined" label="Search" fullWidth InputProps={{
              startAdornment:
                <InputAdornment position="start"> <Link to={{pathname:'/details', state: {id: this.state.query, name: this.state.query}}}>
                  <IconButton color="primary">
                    <Search />
                  </IconButton></Link>
                </InputAdornment> }}/>
            </Grid>
          </Grid>
        </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default NavBar;
