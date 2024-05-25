import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import useStyles from './styles'
// import Icon from "./icon";
import GoogleButton from "./GoogleButton";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import {signin, signup} from '../../actions/auth'

// const emptyForm = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function Auth() {
    const [isSignup, setisSignUp] = useState(false)
    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState()

    const dispatch = useDispatch()
    const history = useHistory()

    function handleShowPassword() {
        setShowPassword((wasShown) => wasShown ? false : true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log("handlesubmit called");
        if (isSignup) {
            dispatch(signup(formData, history));
        }
        else {
            console.log("called dispatch signin");
            dispatch(signin(formData, history));
        }

    }

    function handleChange(e) {
        console.log(e.target);
        setFormData({ ...formData, [e.target.name]: e.target.value })
        // console.log("formdata:",formData);
    }

    function switchMode() {
        setisSignUp((wasisSignUp) => !wasisSignUp)
        handleShowPassword(false)
    }

    function googleSuccess({credential}) {
        const googleID = jwtDecode(credential)
        try {
            // we should save the google account details named as googleID to ensure there is a difference or we may use
            // the presence of iss field in the result to determine whether the user is a google user or not
            dispatch({ type: "LOGIN", data: {result:googleID, token:credential} })
            history.push('/')
        } catch (error) {
            console.log("error in googlesuceess:", error);
        }
    }

    // function googleFailure(err) {
    //     console.log("google signin failed: ", err);
    // }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon></LockOutlinedIcon>
                </Avatar>
                <Typography variant="h5">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>

                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    {/* we will create a custom component, since there are so many similar/same components */}
                                    {/* <Grid><TextField name="firstname" label="First Name" handleChange={handleChange} autoFocus xs={6}></TextField></Grid>
                                    <Grid><TextField name="firstname" label="Last Name" handleChange={handleChange} autoFocus xs={6}></TextField></Grid> */}

                                    {/* these will only be shown for signup */}

                                    <Input label="First Name" name="firstname" handleChange={handleChange} autoFocus half />
                                    <Input label="Last Name" name="lastname" handleChange={handleChange} half />

                                </>
                            )
                        }
                        <Input label="Email" name="email" handleChange={handleChange} type="email" autoFocus={true} />
                        <Input label="Password" name="password" handleChange={handleChange}

                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}

                        ></Input>

                        {/* Show confirm password input field if signup is performed */}
                        {
                            isSignup &&

                            <Input label="Repeat Password" name="confirmPassword" handleChange={handleChange}

                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}

                            ></Input>
                        }

                    </Grid>

                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>
                            <GoogleButton googleSuccess={googleSuccess}></GoogleButton>
                        </Grid>
                    </Grid>

                    {/* <GoogleLogin
                        clientId="1041261791254-mbtvjmn3kep32isbfr7mn6v2fp99ibu8.apps.googleusercontent.com"
                        render={(renderProps)=>{
                            <Button 
                                className={classes.googleButton} 
                                color="primary" fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon/>}>
                            </Button>
                        }}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    ></GoogleLogin> */}

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign in"}
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ?
                                    'Already have an account? Sign In' :
                                    "Don't have an account? Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Paper>
        </Container>
    )
}