import React from 'react';
import io from 'socket.io-client'

export const CTX = React.createContext();

const initState = {
    general:[
        {from:"aaron" , msg:'hello'},{from:"chris" , msg:'hello'},{from:"karen" , msg:'hello'}
    ],
    topic2:[
        {from:"aaron" , msg:'hello'},{from:"chris" , msg:'hello'},{from:"karen" , msg:'hello'}
    ]
}

function reducer(state,action){
    const{from,msg,topic} = action.payload;
    switch(action.type){
        case 'RECIEVE_MESSAGE':
            return{
                ...state,
                [topic]:[
                    ...state[action.payload.topic],
                    {
                        from,
                       msg
                    }
                ]
            }
        default:
            return state
    }
}

let socket ;

function sendChatAction(value){
    socket.emit('chat message', value);
}


export default function Store(props) {

   const [allChats,dispatch] = React.useReducer(reducer,initState)

    if(!socket){
        socket = io(':3001'); 
        socket.on('chat message', function(msg){
            dispatch({type:'RECIEVE_MESSAGE',payload : msg})
          });
    }

    const user = 'aaa' + Math.random(100).toFixed(2)

        return(
            <CTX.Provider value={{allChats,sendChatAction,user}}>
                {props.children}
            </CTX.Provider>   
        )
}   