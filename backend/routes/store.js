/* Sofia Dahlberg
Mittuniversitet Sundsvall
Webbutvecklingsprogrammet DT162G 
2024-01-05*/

const express = require('express')
const router = express.Router()
const Store = require('../models/store')

//Hämtar alla butiker
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Skapa ny butik
router.post('/', async (req, res) => {

  try {
    const newStore = await Store.create(req.body);
    res.status(201).json({ message: 'Store created successfully', store: newStore });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Hämta butik med id
router.get('/:id', getStore, (req, res) => {
  res.json(res.locals.store);
});

//uppdatera butik med id
router.patch('/:id', getStore, async (req, res) => {

  const storeById = req.params.id;
  try {
    const store = res.locals.store;

    if (req.body.storeName) {
      store.storeName = req.body.storeName;
    }
    if (req.body.storeLocation) {
      store.storeLocation = req.body.storeLocation;
    }
    if (req.body.storeZipcode) {
      store.storeZipcode = req.body.storeZipcode;
    }
    if (req.body.storeCity) {
      store.storeCity = req.body.storeCity;
    }
    if (req.body.storeEmail) {
      store.storeEmail = req.body.storeEmail;
    }
    if (req.body.storeNumber) {
      store.storeNumber = req.body.storeNumber;
    }
    //Spara ändringar
await store.save();
    const updatedStore = await Store.findOne({ _id: storeById });
    res.json(updatedStore)
  } catch (error) {
    res.status(400).json({ message: error.message
     });
  }
});
//Radera butik med id
router.delete('/:id', getStore, async (req, res) => {
  const storeId = req.params.id;
  try {
    const store = res.locals.store;
    const deletedStore = await Store.findOneAndDelete({ _id: storeId });

    if (!deletedStore) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json({ message: 'Butik raderad' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});
//Funktion för att hämta id, samlingsfunktion för get/id, update/id och delete/id
async function getStore(req, res, next) {
  req.params.id;
  let store;
  try {
    const store = await Store.findOne();
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.locals.store = store;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
module.exports = router;