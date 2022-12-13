//---airbnb users and nav bar


const dateValue: any = document.querySelectorAll("#date");


const date = new Date();
const todayDate = date.toISOString().slice(0, 10);

let dateArray = [...dateValue];

dateArray.forEach((date) => {
  date.defaultValue = todayDate;
  
});

async function handleGetUsers() {
  try {
    const result = await axios.get("/users/get-Users");

    const { data } = result;
    const { users } = data;
    handleCheckForUser()
    if (users) {
      renderUsersToOwnerPage(users);
      
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

async function handleCheckForUser() {
  const { data } = await axios.get("/places/checkForUser");
  const { username, role } = data;

  try{
  if (username) {
    const userProfileButton:HTMLElement = document.querySelector(".navigation--user");
    const showUsersName:HTMLElement = document.querySelector("#theUsersName");
    const showSignOutOption:HTMLElement = document.querySelector("#signOut");
    const ownerPageOption:HTMLElement = document.querySelector("#toOwnerPage");
    if (role === "admin") {
     
      
      const ownerPage = "owner.html";
      ownerPageOption.innerHTML =  '<a href="' + ownerPage + '" class="ownerPageLink">Owner Page</a>';
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
    console.log("Username or Password or Role is incorrect");}
  } catch (err) {
    console.error(err.message);
  }
}

function handlePopupLogin() {
  const showPopupText:HTMLElement = document.querySelector(".popupForm");
  showPopupText.style.visibility = "visible";
  
}

function handleClosePopop() {
  
    const closePopupText:HTMLElement= document.querySelector(".popupForm");
    closePopupText.style.visibility = "hidden";
  
  
}

function handleKeepPopop() {
  const showPopupText:HTMLElement = document.querySelector(".popupForm");
  showPopupText.style.visibility = "visible";
  
}

async function handleLogin(ev) {
  ev.preventDefault();
  try{
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
    const showPopupText:HTMLElement = document.querySelector(".popupForm");

    showPopupText.style.visibility = "hidden";

    handleCheckForUser();
  } } catch (error) {
    console.error(error.message);
   
  }
}

async function handleRegister(ev) {
  ev.preventDefault();

  let { username, password, role } = ev.target.elements;
  username = username.value;
  password = password.value;
  role = role.value;
 try{
  const { data } = await axios.post("/users/add-User", {
    username,
    password,
    role,
  });

  if (data.register) {
    const showPopupText:HTMLElement = document.querySelector(".popupForm");

    showPopupText.style.visibility = "hidden";
 

    if (role === "host" || role === "guest" ) {
  
      handleCheckForUser()
 
    } else {
      console.log("can not register as admin ");
    }
  } } catch (err) {
    console.error(err.message);
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
