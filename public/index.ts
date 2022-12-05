const dateValue: any = document.querySelectorAll("#date");
console.log(dateValue);

const date = new Date();
const todayDate = date.toISOString().slice(0, 10);
console.log(todayDate);
let dateArray = [...dateValue];

dateArray.forEach((date) => {
  date.defaultValue = todayDate;
  console.log((date.defaultValue = todayDate));
});

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
    <div id="map">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26081603.294420466!2d-95.677068!3d37.06250000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1siw!2s!4v1648657793371!5m2!1siw!2s"
            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div class="aboutHost">
        <div class="aboutHost--left">
            <div class="aboutHost--left--profileHost">
                <img src="${data.host_picture_url}" alt="host image">
            </div>
            <div class="aboutHost--left--title">
                <h2>
                    Hosted by ${data.host_name}
                </h2>
            </div>

        </div>
        <div class="aboutHost--right">
            <h4>
                Languages the host speaks: english, french, hebrew 
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
  } catch (err) {
    console.log(err.message);
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

  //console.log(data.getplaces); it shows that is has the array of objects
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
  console.log(city);

  const { data } = await axios.post("/places/search-city", { city });

  storeData(data);

  if (data) {
    window.location.href = "places.html";

    handleLoadPlaces();
  }
}
async function handleCheckForUser() {
  const { data } = await axios.get("/places/checkForUser");
  const { username, role } = data;
  console.log(username, role);
  if (username) {
    const userProfileButton: any = document.querySelector(".navigation--user");
    const showUsersName: any = document.querySelector("#theUsersName");
    const showSignOutOption: any = document.querySelector("#signOut");
    const ownerPageOption: any = document.querySelector("#toOwnerPage");
    if (role === "admin") {
     
      
      const ownerPage = "owner.html";
      ownerPageOption.innerHTML =  '<a href="' + ownerPage + '">Owner Page</a>';
      userProfileButton.style.backgroundColor = "#228B22";
      showSignOutOption.innerHTML = "SignOut";
    } else if (role === "host") {
      showUsersName.innerHTML = `${username}`;
      showSignOutOption.innerHTML = "SignOut";

      userProfileButton.style.backgroundColor = "#66CDAA";
    } else {
      showUsersName.innerHTML = `${username}`;
      showSignOutOption.innerHTML = "SignOut";
      userProfileButton.style.backgroundColor = "#3CB371";
    }
  } else {
    console.log("Username or Password or Role is incorrect");
  }
}

function renderAirbnbOptions(data: Array<any>) {
  try {
    if (!Array.isArray(data)) throw new Error("data is not an array");

    const rootAirbnbOptions = document.querySelector("#rootAirbnbOptions");
    let html = "";

    data.forEach((place) => {
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

function handlePopupLogin() {
  const showPopupText: any = document.querySelector(".popupForm");
  showPopupText.style.visibility = "visible";
  //showPopupText.style.visibility = ((showPopupText.style.visibility!='hidden') ? 'hidden' : 'visible');
}

function handleClosePopop() {
  const closePopupText: any = document.querySelector(".popupForm");
  closePopupText.style.visibility = "hidden";
}

async function handleLogin(ev) {
  ev.preventDefault();
  let { username, password, role } = ev.target.elements;
  username = username.value;
  password = password.value;
  role = role.value;

  const { data } = await axios.post("/users/login", {
    username,
    password,
    role,
  });

  if (data.login) {
    const showPopupText: any = document.querySelector(".popupForm");

    showPopupText.style.visibility = "hidden";

    handleCheckForUser();
  } else {
    console.log("Username or Password or Role is incorrect");
  }
}

async function handleRegister(ev) {
  ev.preventDefault();

  let { username, password, role } = ev.target.elements;
  username = username.value;
  password = password.value;
  role = role.value;

  const { data } = await axios.post("/users/add-User", {
    username,
    password,
    role,
  });

  if (data.register) {
    const showPopupText: any = document.querySelector(".popupForm");
    const userProfileButton: any = document.querySelector(".navigation--user");
    showPopupText.style.visibility = "hidden";
    const showUsersName: any = document.querySelector("#theUsersName");
    const showSignOutOption: any = document.querySelector("#signOut");

    if (role === "host" || role === "guest" ) {
  
      handleCheckForUser()
 
    } else {
      console.log("can not register as admin ");
    }
  } else {
    console.log("Username or Password or Role is incorrect");
  }
}

async function handleSignOut() {
  try {
    const result = await axios.get("/users/signOut-user");

    window.location.reload();
  } catch (err) {
    console.error(err.message);
  }
}

async function handleGetUsers() {
  try {
    const result = await axios.get("/users/get-Users");

    const { data } = result;
    const { users } = data;
    if (users) {
      renderUsersToOwnerPage(users);
      handleCheckForUser()
    }
  } catch (err) {
    console.error(err.message);
  }
}
function renderUsersToOwnerPage(users: Array<any>) {
  try {
    if (!Array.isArray(users)) throw new Error("data is not an array");

    const airbnbUsers: HTMLElement = document.querySelector("#airbnbUsers");
    let html = "";

    users.forEach((user) => {
      html += `<div class="airbnbUser" >
                       <h3 class="airbnbUser__username"> Username: ${user.username}</h3>
                       <p>id: ${user._id}</p>
                       <input type="text" value=${user.username} name="username" onblur="handleUpdateUsers(event,'${user._id}')" >                       
                       <p class="airbnbUser__role"> User Role: ${user.role}</p> 
                       <button class="airbnbUser__deleteUser" onclick='handleDeleteUsers("${user._id}")'>Delete User</button>                  
                       
                       

                    </div>`;
      airbnbUsers.innerHTML = html;
    });
  } catch (error) {
    console.error(error.message);
  }
}

async function handleUpdateUsers(ev, userId) {
  const username = ev.target.value;

  const { data } = await axios.patch("/users/update-user", {
    userId,
    username,
  });
}
async function handleDeleteUsers(userId) {
  const { data } = await axios.delete("/users/delete-user", {
    data: { userId },
  });
}
