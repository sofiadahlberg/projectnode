/* Sofia Dahlberg
Mittuniversitet Sundsvall
Webbutvecklingsprogrammet DT162G 
2024-01-05*/
const express = require('express')
const router = express.Router()
const Order = require('../models/order')

//Hämta alla ordrar
router.get('/', async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  //Skapa ny order
  router.post('/', async (req, res) => {

    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  //Hämta order med id
  router.get('/:id', getOrder, (req, res) => {
    res.json(res.locals.order);
  });

  //uppdatera ordet med id
router.patch('/:id', getOrder, async (req, res) => {

    const orderById = req.params.id;
    try {
      const order = res.locals.order;
  
      if (req.body.category) {
        order.category = req.body.category;
      }
      if (req.body.type) {
        order.type = req.body.type;
      }
      if (req.body.quantity) {
        order.quantity = req.body.quantity;
      }
      if (req.body.storeNameOrder) {
        order.storeNameOrder = req.body.storeNameOrder;
      }
      if (req.body.price) {
        order.price = req.body.price;
      }
      
  await order.save();
      const updatedOrder = await Order.findOne({ _id: orderById });
      res.json(updatedOrder)
    } catch (error) {
      res.status(400).json({ message: error.message
       });
    }
  
  });
//Radera order med id
  router.delete('/:id', getOrder, async (req, res) => {
    const orderId = req.params.id;
   
    try {
      const order = res.locals.order;
      const deletedOrder = await Order.findOneAndDelete({ _id: orderId });
  
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order raderad' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  });
// Funktion för att hämta order med id
  async function getOrder(req, res, next) {
    const orderId = req.params.id;
    try {
      const order = await Order.findOne({ _id: orderId });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.locals.order = order;
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  
  }

module.exports = router;