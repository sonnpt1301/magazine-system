import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import { io } from 'socket.io-client'
import moment from 'moment'
import { afterSendMessage } from '../../actions/chat.action'
import './style.css'
let socket
let messagesEnd
const Chat = () => {
    const auth = useSelector(state => state.auth)
    const msg = useSelector(state => state.message)
    const userStore = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState(msg.messages)
    const [users, setUsers] = useState(userStore.users)
    const [receiverName, setReceiverName] = useState('')
    const [receiverId, setReceiverId] = useState('')

    const { user } = auth

    const endpoint = "http://localhost:5000"

    const _submitChatMessage = (e) => {
        // e.preventDefault()

        socket.emit('Input chat message', {
            message,
            sender: user._id,
            receiver: receiverId,
        })
        setMessage('')
    }

    const handleShowBoxMessage = (id) => {
        setReceiverId(id)
        const user = users.find(usr => usr._id === id)
        setReceiverName(user.lastName)
    }

    useEffect(() => {
        socket = io(endpoint)
        const room = 'Joker'

        socket.emit('room', room);

        socket.on('Output chat message', (msg) => {
            console.log(msg)
            dispatch(afterSendMessage(msg))
        })

        return () => {
            socket.emit("disconnection");

            socket.off();
        };
    }, [])

    useEffect(() => {
        messagesEnd.scrollIntoView({ behavior: 'smooth' })
    })

    useEffect(() => {
        setMessages(msg.messages)
        setUsers(userStore.users)
    }, [msg.messages, userStore.users])


    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card">
                                <div className="card-header text-uppercase">Friends</div>
                                <div className="card-body" style={{ padding: '0'}}>
                                    {
                                        users.filter(usr => usr._id !== user._id && usr.role !== 'admin').map(usr => (
                                            <ul class="list-group">

                                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                                    style={{ borderRadius: '10px', cursor: 'pointer' }}
                                                    onClick={() => handleShowBoxMessage(usr._id)}
                                                >
                                                    <div className="user-profile" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src="https://via.placeholder.com/110x110" className="img-circle user-profile" alt="user avatar" />
                                                        <span><h6 style={{ paddingLeft: '10px' }} className="mt-0 mb-1 ml-1">{usr.lastName}</h6></span>
                                                    </div>
                                                </li>
                                            </ul>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="card">
                                <div className="card-header text-uppercase">
                                    <div className="user-profile" style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src="https://via.placeholder.com/110x110" className="img-circle user-profile" alt="user avatar" />
                                        <span><div className="mt-0 mb-1 ml-1">{receiverName}</div></span>
                                    </div>
                                </div>

                                <div class="card-body outer-message" >
                                    {
                                        receiverId ? messages.filter(msg => (msg.sender._id === user._id && msg.receiver._id === receiverId) || (msg.sender._id === receiverId && msg.receiver._id === user._id)).map(msg => (
                                            <div>
                                                {
                                                    msg.sender._id !== user._id ? (
                                                        <>
                                                            <div className="user-profile" style={{ display: 'flex', marginTop: '10px' }}><img src="https://via.placeholder.com/110x110" className="img-circle user-profile" alt="user avatar" />
                                                                <div className="card ml-1" style={{ borderRadius: '15px', marginBottom: '0' }}>
                                                                    <div className="card-body" style={{ padding: '5px 20px' }}>
                                                                        <div className="list-unstyled">
                                                                            <div className="media">
                                                                                <div className="media-body" style={{ wordBreak: 'break-all' }}>
                                                                                    {msg.message}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{ wordBreak: 'break-all' }}><small style={{ marginLeft: '60px', color: 'rgb(172 170 170)' }}>{moment(msg.createdAt).fromNow()}</small></div>
                                                        </>
                                                    ) : (
                                                            <>
                                                                <div className="user-profile" style={{ display: 'flex', marginTop: '10px', justifyContent: 'flex-end' }}>
                                                                    <div className="card ml-1" style={{ borderRadius: '15px', backgroundColor: 'rgb(0, 132, 255)', marginBottom: '0' }}>
                                                                        <div className="card-body" style={{ padding: '5px 20px' }}>
                                                                            <div className="list-unstyled">
                                                                                <div className="media">
                                                                                    <div className="media-body" style={{ wordBreak: 'break-all' }}>
                                                                                        {msg.message}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <img src="https://via.placeholder.com/110x110" style={{ marginLeft: '5px', }} className="img-circle user-profile" alt="user avatar" />
                                                                </div>
                                                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}><small style={{ marginRight: '40px', color: 'rgb(172 170 170)' }}>{moment(msg.createdAt).fromNow()}</small></div>
                                                            </>
                                                        )
                                                }
                                            </div>
                                        )) : null
                                    }
                                    <div
                                        ref={el => {
                                            messagesEnd = el;
                                        }}
                                        style={{ float: 'left', clear: 'both' }}
                                    />
                                </div>
                            </div>
                            <input type="text"
                                class="form-control form-control-rounded"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={event => event.key === 'Enter' && _submitChatMessage()} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Chat