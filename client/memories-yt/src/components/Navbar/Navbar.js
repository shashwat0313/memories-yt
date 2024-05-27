import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import useStyles from './styles';
import memoriesText from '../../images/memories-Text.png'
import memoriesLogo from '../../images/memories-Logo.png'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {

    const classes = useStyles()
    const history = useHistory()
    // const [user, setUser] = useState(
    //     JSON.parse(
    //         localStorage.getItem('profile')
    //     )
    // )
    // const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const location = useLocation()


    const user = useSelector((state)=> state?.auth?.authData)
    // const user = localStorage.getItem('profile')

    // useEffect(()=>{

    // }, [location])

    // useEffect(() => {
    //     setUser(JSON.parse(localStorage.getItem('profile')))
    //     // console.log("user:", user);
    //     // // console.log("jwtDecode(user?.token).exp=", jwtDecode(user?.token).exp);

    //     // if (user) {
    //     //     const exp = jwtDecode(user?.token).exp;
    //     //     console.log("jwtDecode(user?.token)=", jwtDecode(user?.token));
    //     //     if (exp * 1000 < new Date().getTime()) {
    //     //         handleLogout(null)
    //     //     }

    //     // }

    //     // I cannot remember why location is a dependency
    // }, [location])

    // // const user2 = useSelector((state)=>{
    // //     console.log(state.auth);
    // //     console.log("state authdata in navbar user2", JSON.parse(state.auth.authData));
    // // })

    function handleLogout(e) {
        if (e) e.preventDefault();
        dispatch({ type: 'LOGOUT' })
        // setUser(null)
        history.push('/')
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">

            <div className={classes.brandContainer}>

                {/* <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'> */}
                {/* Memories */}
                {/* </Typography> */}
                <Link to='/' className={classes.brandContainer}>
                    <img className={classes.image} src={memoriesText} alt="memories" height="60" />
                    <img className={classes.image} src={memoriesLogo} alt="memories" height="60" />
                </Link>

            </div>

            {/* to show user's login status */}
            <Toolbar className={classes.toolbar}>

                {/* this ternary handles the login/logout text shown in the button
                    and other dependent attributes/functions
                */}
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple}
                            alt={user?.result?.name}
                            src={user?.result?.picture}
                        >
                            {/* NAME'S FIRST LETTER GOES HERE */}
                            {(user?.result?.name).charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>
                            {user?.result.name}
                            {/* NAME GOES HERE */}
                        </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>
                            Logout
                        </Button>

                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color="primary">Login</Button>
                )
                }

            </Toolbar>

        </AppBar>
    )
}