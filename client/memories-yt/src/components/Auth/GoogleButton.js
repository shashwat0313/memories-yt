import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
// import jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'

import { useSelector } from 'react-redux';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const GoogleButton = ({ googleSuccess }) => {

    // const [GSIScriptLoaded, setGSIScriptLoaded] = useState(false)
    // const [handleGoogleCredentialScriptLoaded, SEThandleGoogleCredentialScriptLoaded] = useState(false);

    // useEffect(() => {

    //     if (!GSIScriptLoaded) {
    //         const googleScriptTag = document.createElement('script')
    //         googleScriptTag.src = "https://accounts.google.com/gsi/client"
    //         googleScriptTag.addEventListener('load', () => {
    //             setGSIScriptLoaded(true);
    //             console.log('google accounts script loaded');
    //         })
    //         document.body.appendChild(googleScriptTag)
    //     }
    // }, [GSIScriptLoaded])

    // console.log(clientId);

    // useEffect(() => {

    // }, [handleGoogleCredentialScriptLoaded])

    const [loaded, setLoadState] = useState(false)
    const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem('profile') ? true : false)

    const user = useSelector((state)=>{
        console.log("appjs state.auth.authData:",state.auth.authData);
        return (state.auth.authData);
    })

    useEffect(() => {
        console.log("issignedin=", isSignedIn);
        if (user) {
            window.location.href = '/'
        }
        const googleScriptTag = document.createElement('script')
        googleScriptTag.src = "https://accounts.google.com/gsi/client"
        googleScriptTag.addEventListener('load', () => {
            setLoadState(true)
            console.log('google accounts script loaded');
        })
        document.body.appendChild(googleScriptTag)
    }, [user])

    useEffect(() => {
        if (!loaded) { return }
        else {
            console.log("isSignedIn=", isSignedIn);
            //execute google.accounts.id.* here
            if (!isSignedIn) {
                console.log("entered if");
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleCredentialResponse
                });
                window.google.accounts.id.renderButton(
                    document.getElementById("buttonDiv"),
                    // customization attributes
                    {
                        theme: "filled_black",
                        size: "large",
                        text: "continue_with",
                    }
                );
                window.google.accounts.id.prompt()
            }
        }
        //eslint-disable-next-line
    }, [isSignedIn, loaded])


    function handleCredentialResponse(response) {
        googleSuccess(response);
        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', "/accounts/googleonetap", true);
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest')
        // xhr.onload = function () {
        //     window.location.href = xhr.responseText
        // };
        // xhr.send('credential=' + response.credential);
    }

    return (
        <>

            <div id='buttonDiv'>
            </div>

            {/* {GSIScriptLoaded ?
                <div>
                    <div id="g_id_onload"
                        data-client_id={clientId}
                        // data-login_uri="https://localhost:5555/auth"
                        data-callback="handleGoogleCredentialResponse"
                        data-auto_prompt="false">
                    </div>
                    <div class="g_id_signin"
                        data-type="standard"
                        data-size="large"
                        data-theme="outline"
                        data-text="sign_in_with"
                        data-shape="rectangular"
                        data-logo_alignment="left">
                    </div>
                </div>
                : null
            } */}

        </>
    )
}

export default GoogleButton
