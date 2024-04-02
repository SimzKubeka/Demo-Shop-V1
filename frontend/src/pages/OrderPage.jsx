import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'  
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import {toast } from 'react-toastify'
import  Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from '../slices/ordersApiSlice'

const OrderPage = () => {
  const { id: OrderId } = useParams()
  const { data: order, refetch, error, isLoading } = useGetOrderDetailsQuery(OrderId)

  const [ payOrder, { isLoading: isPaying } ] = usePayOrderMutation()

  const [ {isPending}, paypalDispatch ] = usePayPalScriptReducer()

  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery()
  
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const laodPayPalScript = async () => {
        paypalDispatch({ type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD'
          }
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      if (order && !order.isPaid) {
        if(!window.paypal) {
          laodPayPalScript()
        }
      }
    }
  }, [paypal, paypalDispatch, loadingPayPal, errorPayPal, order])
    
  function onApprove( data, actions)  {
    return actions.order.capture().then(async function(details) {
      try {
        await payOrder({ OrderId, details})
        refetch()
        toast.success('Order Paid')
      } catch (err) {
        toast.error(err?.data?.message || err.message)
      }
    })
  }

  async function onApproveTest() {
    await payOrder({ OrderId, details:{payer:{}}})
    refetch()
    toast.success('Order Paid')
    console.log(OrderId)
  }
  
  function onError  (err) {
    toast.error(err?.data?.message || err.message)
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice
          }
        }
      ]
    }).then((orderId) => {
      return orderId
    })
  }


  return isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <>
      <h1>Order {order._id}</h1>
      <Row>

        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x R{item.price} = R{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
                    
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup
                variant='flush'
              >
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPaying && <Loader />}
                    {isPending ? <Loader />: (
                      <div>
                        <Button onClick={onApproveTest} style={{marginBottom:'10px'}}>Test Pay</Button>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                      ></PayPalButtons>
                      </div>
                    )}
                  </ListGroup.Item>
                )}
                {/* Deliver Order PlaceHolder */}
              </ListGroup>
            </ListGroup>
          </Card>
        </Col>

      </Row>
    </>
  )
}

export default OrderPage