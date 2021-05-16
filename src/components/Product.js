import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}) {
    return (
        <Card className="my-2">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image}/>

            </Link>
            <Card.Body>
        <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>

            </Link>
            

            <Card.Text as="h4">
                Rs.{product.price}
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default Product
