import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const GoogleButton = ({ googleSuccess }) => {

    const [loaded, setLoadState] = useState(false)
    const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem('profile') ? true : false)

    const user = useSelector((state) => {
        console.log("appjs state.auth.authData:", state.auth.authData);
        return (state.auth.authData);
    })

    useEffect(() => {
        console.log("issignedin=", isSignedIn);
        if (user) {
            // window.location.href = '/'
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
        setIsSignedIn(true)
    }

    return (
        <div id='buttonDiv' />
    )
}

export default GoogleButton
