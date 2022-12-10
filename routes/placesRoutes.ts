import express from 'express';
const router = express.Router();


import {loggedInUser} from '../controler/usersCont'

import { getToPlace } from '../controler/placesCont'
import { searchAirbnb } from '../controler/placesCont'
import {searchAirbnbByCity } from '../controler/placesCont'




router
      
    .get('/checkForUser', loggedInUser)
    .get('/getToPlace/:placeId', getToPlace)
    .get('/search-airbnb', searchAirbnb)
    .post('/search-city',searchAirbnbByCity )
    

export default router;