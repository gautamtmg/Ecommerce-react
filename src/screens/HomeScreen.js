import React from 'react'
import { Col, Row } from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'


function HomeScreen() {
    return (
        <div>
            <h1>Latest Product</h1>
            <Row>
                {products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={3} xL={4} >
                        <Product product = {product} />

                    </Col>
                ))}
            </Row>
            
        </div>
    )
}

export default HomeScreen
