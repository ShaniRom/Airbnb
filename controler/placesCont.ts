import Places from "../model/placesModel";


const secret=process.env.JWT_SECRET

export const getToPlace = async (req, res) => {
 
 
 
  try {
    const { placeId } = req.params;
    console.log(placeId)
    if ( placeId) {
      const getplaces = await Places.findOne({_id:placeId });

      console.log(getplaces)
     res.send(getplaces);
   
    } else {
      throw new Error("placeId is not the same as the __id");
    }
  } catch (error) {
    console.log(error.error);
    res.send({ error: error.massage });
  }
};

export const searchAirbnb = async (req, res) => {
  try {
    let {searchLocation, checkIn, checkOut, adults, children, infants, pets } =req.query;

    console.log(searchLocation, checkIn, checkOut, adults, children, infants, pets);

    let sum: any = Number(adults) + Number(children) + Number(infants) + Number(pets);
    console.log("the number of guests:" + sum);


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
    console.log(error.error);
    res.send({ error: error.message });
  }
};

export const searchAirbnbByCity = async (req, res) => {
  
  let { city } = req.body;

  const getplaces = await Places.find({ address_country: city }).limit(5);
  
  res.send({ ok: true,getplaces });
};
