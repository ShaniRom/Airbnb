//---local storage 

function storeData(data) {
  try {
    if (data) {
      localStorage.setItem("airbnbData", JSON.stringify(data));
    }
  } catch (error) {
    console.error(error.message);
  }
}

function getData() {
  try {
    const airbnbNavFiltered = JSON.parse(localStorage.getItem("airbnbData"));

    if (Array.isArray(airbnbNavFiltered.getplaces)) {
      return airbnbNavFiltered.getplaces;
    } else if (typeof airbnbNavFiltered === "object") {
      return airbnbNavFiltered;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error.message);
  }
}

//---airbnb location search

function handleLoadPlaces() {
  const data = getData();
  handleCheckForUser();

  renderAirbnbOptions(data);
}

async function handleLoadPlace() {
  try {
    const data = await getData();

    renderPlace(data);
    handleCheckForUser();
  } catch (error) {
    console.error(error.message);
  }
}

async function handleGoToPlace(placeId) {
  try {
    const { data } = await axios.get(`/places/getToPlace/${placeId}`);

    storeData(data);

    if (data) {
      window.location.href = "place.html";
      handleLoadPlace();
    }
  } catch (error) {
    console.error(error.message);
  }
}   
  

function renderPlace(data) {
  try {
    const data = getData();


    let html = "";
    const rootChosenAirbnb = document.querySelector("#rootChosenAirbnb");

    html = ` <div class="mainUpper">
        <div class="mainUpper__title">
            <h1>${data.name} </h1>
            <h3>${data.address_country}, ${data.address_country_code}</h3>
            <h2>${data.price}$</h2>
        </div>
        <div class="mainUpper__photoGrid">
            <img class="img" src="${data.images}" alt="" ">

        </div>

    </div>
    <div class="mainMiddle">
        <div class="mainMiddle__left">
            <div class="mainMiddle__left--up">
                <div class="mainMiddle__left--up--title">
                    <h2>Entire rental unit hosted by ${data.host_name}</h2>
                </div>
                <h4>accommadates: ${
                  data.accommodates
                } <span>&#8226;</span> bedroom: ${
      data.bedrooms
    } <span>&#8226;</span> beds: ${data.beds} <span>&#8226;</span> bathroom: ${
      data.bathrooms
    }</h4>
            </div>
            <div class="mainMiddle__left--up--profile">
                <img src="${data.host_picture_url}">
            </div>
        </div>
        <div class="mainMiddle__left--great">
            <h5>${data.description}</h5>
            
        </div>
        <div class="mainMiddle__left--bed">
            <h2>Beds Available:${data.bed_type}</h2>
        </div>
        <div class="mainMiddle__left--list">
            <h2>This Airbnb offers:</h2>

           ${data.amenities.map((amentiy) => {
             return ` ${amentiy} `;
           })}
           

        </div>

    </div>

    
    <div class="reviews">
        <h2>Latest Review:</h2>
        <div class="reviews__review">
               <div class="reviews__review__user" >
                <img src="images/guestDefaultImage.webp" class="reviews__review__user--profilePic" alt="guest profile image">
                <h4>Alex97</h4>
               </div>
            <p>
            Very tidy and lovely AirBnb apartment equipped with everything you need. A good bed and nice bathroom. ${
              data.host_name
            } is a great host , Very nice and had excellent restaurant recommendations and was of great help. We had a great stay.
            </p>
        </div>

    </div>

    <div class="aboutHost">
        <div class="aboutHost--left">
            <div class="aboutHost--left--profileHost">
                <img src="${data.host_picture_url}" alt="host image">
            </div>
            <div class="aboutHost--left--title">
                <h2>
                    About host- ${data.host_name}
                </h2>
              
            </div>

        </div>
        <div class="aboutHost--right">
            <h4>
                Languages the host speaks: english, french, hebrew 
            </h4>
            <h4>
            Response time: within an hour
            </h4>
            <h4>
               Airbnb Rating: ${data.reviews_rating}
            </h4>


            <p class="payment">
                To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
            </p>
        </div>
    </div>
    <div class="houseInfo">
        <h2>Airbnb host rules:</h2>
        <ul>
            
            <li>
                Check-in: 4:00 PM - 10:00 PM
            </li>
            <li>
                Checkout: 11:00 AM
            </li>
            <li>
                No smoking
            </li>
            <li>
                No pets
            </li>
            <li>
                No parties or events
            </li>

        </ul>
        <h2> Health & Safety</h2>
        <ul>
            
            <li>
                Airbnb's social-distancing and other COVID-19-related guidelines apply
            </li>
            <li>

                Carbon monoxide alarm not reported Show more
            </li>
            <li>
                Smoke alarm not reported Show more
            </li>
            <li>
                Security Deposit - if you damage the home, you may be charged up to ₪2500
            </li>

        </ul>
        <div class="houseInfo__cancel">
            <h5>cancellation policy: ${data.cancel}</h5>
          

        </div>

    </div>`;

    rootChosenAirbnb.innerHTML = html;
  } catch (error) {
    console.error(error.message);
  }
}



async function handleFindAirbnb(ev) {
  ev.preventDefault();

  const searchLocation = ev.target.elements.searchLocation.value;
  const checkIn = ev.target.elements.checkIn.value;
  const checkOut = ev.target.elements.checkOut.value;
  const adults = ev.target.elements.adults.value;
  const children = ev.target.elements.children.value;
  const infants = ev.target.elements.infants.value;
  const pets = ev.target.elements.pets.value;

  const { data } = await axios.get(
    `/places/search-airbnb?searchLocation=${searchLocation}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&infants=${infants}&pets=${pets} `
  );

  
  storeData(data);
  const { ok } = data;

  if (ok === true) {
    window.location.href = "places.html";

    handleLoadPlaces();
  } else {
    window.alert(
      "No airbnbs found for " + " Destination:" + `${searchLocation}`
    );
  }
}

async function handleCities(ev) {
  const city = ev.target.dataset.card;

  

  const { data } = await axios.post("/places/search-city", { city });

  storeData(data);

  if (data) {
    window.location.href = "places.html";

    handleLoadPlaces();
  }
}


function renderAirbnbOptions(data: Array<any>) {
  try {
    if (!Array.isArray(data)) throw new Error("data is not an array");

    const rootAirbnbOptions = document.querySelector("#rootAirbnbOptions");
    const map:any= document.querySelector('.airbnbOptions__grid--map')
    let html = "";


    data.forEach((place) => {
      if(place.address_country=== 'Tel Aviv'){       
        map.innerHTML='<iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Tel%20aviv+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/distance-area-calculator.html">measure distance on map</a></iframe>'
      }else if(place.address_country=== 'Eilat'){
        map.innerHTML='<iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Eilat+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/distance-area-calculator.html">measure area map</a></iframe>'
      
      }else if(place.address_country=== 'Jerusalem'){
        map.innerHTML='<iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Jerusalem&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>'
      
      }else if(place.address_country=== 'Harei Yehuda'){
        map.innerHTML='<iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Harei%20Yehuda+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/distance-area-calculator.html">area maps</a></iframe>'
      }

      html += ` <div class="airbnbOptions__container" onclick="handleGoToPlace('${
        place._id
      }')">
                      <div class="airbnbOptions__container__img">
                          <img src="${place.images}">
                      </div>
                      <div class="airbnbOptions__container__content">
                          <div class="airbnbOptions__container__content__namePlace">                                
                              
                                  <p>${place.name}</p>
                          </div>
                          <div class="airbnbOptions__container__content__description">
                              <p>${place.bathrooms} bathrooms\u00B7\n${
        place.bedrooms
      } bedrooms\u00B7${place.beds} beds\u00B7${place.accommodates} guests</p>
                             
                         
                              ${place.amenities
                                .map((amenity) => {
                                  return `${
                                    amenity.search(amenity) !== -1
                                      ? `${amenity}\u00B7 `
                                      : ""
                                  }`;
                                })
                                .join(" ")}
   
                            
                                                        
                          </div>
                        
                          <div class="airbnbOptions__container__content__priceRating">
                              <button class="btn btn-outline">
                              ₪${place.price} night
                              </button>
                              <button class="btn btn-outline">
                                 
                              ⭐${place.reviews_rating}(${
        place.number_of_reviews
      } reviews)
                                  

                              </button>
                          </div>

                      </div>
                  </div>`;
      html += `<br/>`;

      rootAirbnbOptions.innerHTML = html;
    });
  } catch (error) {
    console.error(error.message);
  }
}

