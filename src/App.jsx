import React, { Component } from 'react';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class App extends Component {
    constructor() {
        super();
        this.state = {
          name: 'React',
          open: false,
          pageNumber: 1,
        };
        this.handleDrawerClick = this.handleDrawerClick.bind(this);
        this.handleMenuClick1 = this.handleMenuClick1.bind(this);
        this.handleMenuClick2 = this.handleMenuClick2.bind(this);
    }
    handleMenuClick1() {
        this.setState({ pageNumber: 1 });
        this.handleDrawerClick();
      }
    
      handleMenuClick2() {
        this.setState({ pageNumber: 2 });
        this.handleDrawerClick();
      }
    
      menuControl() {
        if (this.state.pageNumber === 2) {
          return (<div><h1>Welcome to Menu 2</h1></div>);
        } else {
          return (<div><h1>Welcome to Menu 1</h1></div>);
        }
      }
    
      handleDrawerClick() {
        if (this.state.open === false)
          this.setState({ open: true });
        else
          this.setState({ open: false });
      }
    render() {
        return (
            <div class="App">
                <MuiThemeProvider>
                    <AppBar
                        title="Login"
                        onLeftIconButtonTouchTap={this.handleDrawerClick.bind()}
                    />
                    <Drawer open={this.state.open}>
                        <MenuItem onClick={this.handleMenuClick1.bind()}>Menu Item 1</MenuItem>
                        <MenuItem onClick={this.handleMenuClick2.bind()}>Menu Item 2</MenuItem>
                    </Drawer>
                    <TextField class=""
                        hintText="Enter your Username"
                        floatingLabelText="Username"
                    //  onChange = {(event,newValue) => this.setState({username:newValue})}
                    />
                    <br />
                    <TextField class="mdc-button"
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                    //    onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                    <br />
                    <RaisedButton class="mdc-button" label="Sign in" primary={true} onClick={(event) => this.handleClick(event)} />
                    <br />
                    <br />
                    <RaisedButton label="Log in" primary={true} onClick={(event) => this.handleClick(event)} />
                </MuiThemeProvider>
                {this.menuControl()}
            </div>
        );
    }
}

export default App;
