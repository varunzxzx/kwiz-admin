import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './App.css';
import Main from './components/Main/Main';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: purple,
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type="title" color="default">
              KWIZ Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
        <Main />
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
