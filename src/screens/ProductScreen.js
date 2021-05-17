import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


function ProduceScreen({match }) {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch() 
    const productDetail = useSelector(state=>state.productDetails)
    const { product, loading, error } = productDetail

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
    },[])


    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go back </Link>
            { loading ? <Loader />
                : error ? <Message variant='danger'> {error}</Message>
                    :
                    <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                            </ListGroup.Item>
    
                            <ListGroup.Item>
                                Price: Rs.{product.price}
                            </ListGroup.Item>
    
                            <ListGroup.Item>
                                Descripton: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:
                                        </Col>
                                        <Col>
                                            <strong>Rs: {product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
    
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:
                                        </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
    
                                <ListGroup.Item>
                                    <Row>
    
                                    <Button className="btn-block" disabled={product.countInStock==0} type="button">Add to Cart</Button>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

                }
            
        </div>  
    )
}

export default ProduceScreen
