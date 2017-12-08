import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Save from 'material-ui-icons/Save';
import Button from 'material-ui/Button';
import axios from 'axios';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';
  import Slide from 'material-ui/transitions/Slide';

class AddQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            select: "",
            error: [false,false,false,false,false,false,false],
            errorStatement: "It shouldn't be left empty!",
            question: "",
            op1: "",
            op2: "",
            op3: "",
            op4: "",
            type: "",
            submitted: false,
            notSubmitted: false,
            loading: false
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    checkErrors = () => {
        let arr = [],flag = true;
        arr[0] = this.state.type;
        arr[1] = this.state.question;
        arr[2] = this.state.op1;
        arr[3] = this.state.op2;
        arr[4] = this.state.op3;
        arr[5] = this.state.op4;
        arr[6] = this.state.select;
        const tmpError = this.state.error;
        // eslint-disable-next-line
        arr.map((value,i) => {
            if(value === "") {
                flag = false;
                tmpError[i] = true;
                this.setState({error: tmpError});
            } else {
                console.log(i);
            }
        })

        if(flag) {
            return true;
        }
        return false;
    }

    reInit = () => {
        const tmpError = [false,false,false,false,false,false,false];
        this.setState({error: tmpError},this.handleSubmit);
    }

    handleSubmit = () => {
        if(this.checkErrors()) {
            this.setState({loading: true})
            let arr;
            let str = "";
            let flag = false;
            let e = this.state.type;
            arr = e.toLowerCase().split(" ");
            // eslint-disable-next-line
            arr.map(value => {
              if(value !== "&") {
                if(flag) {
                  value = value.charAt(0).toUpperCase() + value.slice(1);
                  str += value;
                } else {
                  flag = true;
                  str += value;
                }
              }
            });
            this.submitAnswer(str);
        }        
    }

    submitAnswer = (str) => {
        const thiss = this;
        const payload = {
            type: str,
            question: this.state.question,
            op1: this.state.op1,
            op2: this.state.op2,
            op3: this.state.op3,
            op4: this.state.op4,
            crct: this.state.select,
            code: "n"
        }
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
                url: 'https://kwiz-msi.herokuapp.com/api/addQuestion',
                mode: 'cors',
                data: JSON.stringify(payload)
            })
            .then(function (response) {
                thiss.setState({loading: false, submitted: true});
                thiss.initialise();
            })
            .catch(function (error) {
                console.log("error");
                thiss.setState({loading: false, notSubmitted: true});
            });
    }

    initialise = () => {
        this.setState({
            question: "",
            op1: "",
            op2: "",
            op3: "",
            op4: "",
            select: ""
        });
    }
    handleRequestClose = () => {
        this.setState({
            submitted: false,
            notSubmitted: false
        })
    }
    render() {
        return(
            <div style={{width: "50%", margin: "auto"}}>
            <FormControl style={{marginTop: "16px", marginBottom: "8px"}} fullWidth error={this.state.error[0]}>
                    <InputLabel htmlFor="name-error">Type</InputLabel>
                    <Select
                        value={this.state.type}
                        onChange={this.handleChange}
                        name="type"
                        renderValue={value => `${value}`}
                        input={<Input id="name-error" />}
                    >
                        {
                            ["Basics","Classes & Inheritance","Function Overloading","Constructor & Destructor","Pointer","Array","Polymorphism"].map(type => {
                                return (<MenuItem key={type} value={type}>{type}</MenuItem>);
                            })
                        }
                    </Select>
                    {this.state.error[0] ? <FormHelperText>{this.state.errorStatement}</FormHelperText>: null}
                </FormControl>
                <TextField
                id="full-width"
                label="Question"
                helperText={this.state.error[1]?this.state.errorStatement:""}
                fullWidth
                error={this.state.error[1]}
                margin="normal"
                multiline
                rows="2"
                name="question"
                value={this.state.question}
                onChange={this.handleChange}
                />
                <TextField
                id="full-width"
                label="Option 1"
                helperText={this.state.error[2]?this.state.errorStatement:""}
                fullWidth
                error={this.state.error[2]}
                margin="normal"
                onChange={this.handleChange}
                name="op1"
                value={this.state.op1}
                />
                <TextField
                id="full-width"
                label="Option 2"
                helperText={this.state.error[3]?this.state.errorStatement:""}
                fullWidth
                error={this.state.error[3]}
                margin="normal"
                onChange={this.handleChange}
                name="op2"
                value={this.state.op2}
                />
                <TextField
                id="full-width"
                label="Option 3"
                helperText={this.state.error[4]?this.state.errorStatement:""}
                fullWidth
                error={this.state.error[4]}
                margin="normal"
                onChange={this.handleChange}
                name="op3"
                value={this.state.op3}
                />
                <TextField
                id="full-width"
                label="Option 4"
                helperText={this.state.error[5]?this.state.errorStatement:""}
                fullWidth
                error={this.state.error[5]}
                margin="normal"
                onChange={this.handleChange}
                name="op4"
                value={this.state.op4}
                />
                <FormControl style={{marginTop: "16px", marginBottom: "8px"}} fullWidth error={this.state.error[6]}>
                    <InputLabel htmlFor="name-error">Correct Option</InputLabel>
                    <Select
                        value={this.state.select}
                        onChange={this.handleChange}
                        name="select"
                        renderValue={value => `${value}`}
                        input={<Input id="name-error" />}
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                    </Select>
                    {this.state.error[6] ? <FormHelperText>{this.state.errorStatement}</FormHelperText>: null}
                </FormControl>
                <div style={{width: "40%", margin: " 5px auto 0 auto"}}>
                    {!this.state.loading && <Button onClick={this.reInit} style={{width: "100%"}} raised color="primary">
                        Submit
                        <Save />
                    </Button>}
                    {this.state.loading && <CircularProgress style={{marginLeft: "35%"}}/>}
                </div>
                <Dialog open={this.state.submitted} transition={Slide} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>{"Submitted Successfully"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Question has been posted successfully
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleRequestClose} color="primary" raised>
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.notSubmitted} transition={Slide} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>{"Error"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        This question already exists in the database
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleRequestClose} color="primary" raised>
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default AddQuestion;