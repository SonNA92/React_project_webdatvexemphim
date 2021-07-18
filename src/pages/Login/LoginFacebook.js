import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { history } from '../../App';


export default function LoginFacebook(props) {

    const [state,setState] = useState({
        isLoggedIn : false,
        userId:'',
        name:'',
        email:'',
        picture:''
    })
    let fbContent;
    const responseFacebook = (response) => {
        setState({
            isLoggedIn:true,
            userId:response.userId,
            name: response.name,
            email:response.email,
            picture:response.picture?.data.url
        })
    }
    const componentClicked = () => {
        console.log('clicked');
    }

    if (state.isLoggedIn){
        history.push('/home')
    }else{
        fbContent=(
            <FacebookLogin
            appId="354748022693678"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook} 
        />
        )
    }


    return (
        <div>
            {fbContent}
        </div>
    )
}
