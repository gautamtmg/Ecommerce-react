import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderAction'


function ProfileScreen({location, history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    

    const dispatch = useDispatch()

    const userDetails = useSelector(state=>state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state=>state.orderListMy)
    const { orders, loading:loadingOrders, error: errorOrders } = orderListMy
    
    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user || !user.name || success || userInfo._id !== Number(user._id)){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails(userInfo._id))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(updateUserProfile({
                'id':user._id,
                'name': name,
                'email': email,
                'password':password,
            }))
            setMessage('')
        }
    }



    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                { message && <Message variant="danger">{message}</Message>}
                { error && <Message variant="danger">{error}</Message>}
                { loading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter name"
                            value= {name}
                            onChange={(e)=>setName(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control

                            type="email"
                            placeholder="Enter email"
                            value= {email}
                            onChange={(e)=>setEmail(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type="password"
                            placeholder="Enter password"
                            value= {password}
                            onChange={(e)=>setPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="passwordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type="password"
                            placeholder="Confirm password"
                            value= {confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant="primary" className="my-3 btn-block">
                        Update
                    </Button>
                </Form>
            </Col>
            
            <Col md={9}>
                <h2>My Orders</h2>

                { loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            { orders.map(order =>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>Rs. {order.totalPrice}</td>
                                    <td>{ order.isPaid ? order.paidAt : (
                                        <i className="fas fa-times" style={{color:'red'}}></i>
                                    )}</td>
                                    <td>    
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm">Details</Button>
                                        </LinkContainer>
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                )
                
                }
            </Col>
        </Row>
    )
}

export default ProfileScreen
