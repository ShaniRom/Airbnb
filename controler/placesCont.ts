import Places from "../model/placesModel";




export const getToPlace = async (req, res) => {
 
 
 
  try {
    const { placeId } = req.params;
   
    if ( placeId) {
      const getplaces = await Places.findOne({_id:placeId });

      
     res.send(getplaces);
   
    } else {
      throw new Error("placeId is not the same as the __id");
    }
  } catch (error) {
    console.error(error.message);
    res.send({ error: error.message });
  }
};

export const searchAirbnb = async (req, res) => {
  try {
    let {searchLocation, checkIn, checkOut, adults, children, infants, pets } =req.query;
 

    let sum: any = Number(adults) + Number(children) + Number(infants) + Number(pets);  


    let dateOfCheckIn = new Date(`${checkIn}`);
    let dateOfCheckOut = new Date(`${checkOut}`);
    let differenceInTime = dateOfCheckOut.getTime() - dateOfCheckIn.getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    console.log("the days between checkIn checkOut is:" + differenceInDays)                

    
    const getplaces = await Places.find({ address_country: `${searchLocation}`, accommodates: {$lte:sum},  daysAvailable:{$lte:differenceInDays} }).limit(5);
    
    if(getplaces.length>0){
     
      res.send({ ok: true, getplaces });
     
    }else{
      res.send({ok: false})
    }
   
    
  } catch (error) {
    console.error(error.message);
    res.send({ error: error.message });
  }
};

export const searchAirbnbByCity = async (req, res) => {
  
  let { city } = req.body;

  const getplaces = await Places.find({ address_country: city }).limit(5);
  
  res.send({ ok: true,getplaces });
};
