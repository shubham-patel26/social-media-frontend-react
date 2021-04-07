import React,{Component} from 'react';
import {useState,useEffect} from 'react';
import {Form ,FormGroup,Input,Button} from 'reactstrap';
import Axios from 'axios';

const Chatbox = (props)=>{
    
    const [senderId,setSenderId] = useState(props.sender);
    const [recieverId,setRecieverId] = useState(props.receiverId);
    const [messages,setMessages] = useState([]);
    const [dummyState,toggleDummyState] = useState(false);
   
    // console.log(senderId);
    // console.log(recieverId);

    useEffect(() => {
        const fetchMessages=async ()=>{
            const api = `https://being-social26.herokuapp.com/messages/${senderId}/${recieverId}`;
            const bearer = 'Bearer ' + localStorage.getItem('token');
            // console.log(bearer);
            
            const data= await Axios.get(api,{
                headers:{
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                },
                
                
            })
            console.log(data.data);
            
            setMessages(data.data);
            toggleDummyState(!dummyState);
        }
        // if(messages[0])
        // fetchMessages();

        const timeoutId =setTimeout(() => {
            // if(messages[0])
            fetchMessages();
        },499);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [dummyState]);
    
    const handleSubmit=(event)=>{
        
        // console.log(event.target.message.value);
        
        
        let api = `https://being-social26.herokuapp.com/messages/post`;
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const data={
            senderRegNo: senderId,
            receiverRegNo:recieverId,
            message: event.target.message.value
        }
        Axios.post(api,data,{
            headers:{
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
        .then(resp=>{
            console.log(resp.data);
            // setMessages(resp.data);
            toggleDummyState(!dummyState);
        })
        .catch(err=>console.log(err));

        event.preventDefault();
        event.target.reset();
    }
    let message = null;
    return (
        <div className='container'>
            
            {messages.map(message=>{
                return (
                    
                    (message.sender_reg_no==senderId)? <div className='row' style={{display: 'flex', justifyContent: 'flex-start',backgroundColor:'white',width:'80%',marginTop:"8px"}}>{message.message} {message.sender_reg_no} </div>
                                                    : <div className='row' style={{display: 'flex', justifyContent: 'flex-end',backgroundColor:'white',width:'80%' ,marginTop:'8px'}}>{message.message} {message.sender_reg_no}</div>
                )
                
                })

                }
            
            
            <Form onSubmit={(event)=>handleSubmit(event)}>
                <FormGroup>
                    <Input type="text" id="message" name="message"
                        innerRef={(input) => {message = input}} />

               
                </FormGroup>
                <span><Button type="submit" value="submit" color="primary">Send</Button></span>
                

                
            </Form>
        </div>
    )
}

export default Chatbox;