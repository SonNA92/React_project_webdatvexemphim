import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import { history } from '../../App';
import './styleLogin.css'

// thử chức năng Login Fb
export default function LoginFacebook(props) {

    const dispatch = useDispatch();
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
        let action = {
            type:'SET_USER_FB',
            userLogin:{taiKhoan:state.name,email:state.email}
        }
        dispatch(action)
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
