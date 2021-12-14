import React, {useState, useEffect} from 'react';


const UserContext = React.creatContext();

const initialUserData ={
    name:'',
    email:'',
    password:'',
    authCode:'',
}