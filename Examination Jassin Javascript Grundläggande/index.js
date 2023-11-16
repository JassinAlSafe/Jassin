//Börja med att fetcha datan från API 


async function getApiKey() {
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
    method: "POST",
   
});
    const data = await response.json();
    console.log(data);
    return data.key;
}



async function getPlanets() {
    const key = await getApiKey();
    console.log(key);
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
        headers: { 
            "x-zocom": `${key}`, 
    },
    
});
    const data = await response.json();
    return data;
}



// Fetch the data for info 

async function planetInfo() {
    const data = await getPlanets();

    //Select the planet class from html
    const planetElements = document.querySelectorAll(".planet");

    //Loop/Iterate over each planet element. Index has a purpose to access the data from the data.bodies.array. 
    planetElements.forEach((planetElement, index) => {
        planetElement.addEventListener("click", () => {      //When clicking display the information about the planets to the console.log
            togglePlanetInfo(planetElement, data.bodies[index]); //koppla den till toggleplanetInfo
        });
    });
}



//Implementera en toggle funktion? and bind it to my planetInfo div in the html. thats where we cant to show the data of the planets to the users. 
//planetsInfo para will represent the html element 
//planetData para will represent the data and when clicked show the information about the planets that are stored in the data

function togglePlanetInfo(planetElement, planetData) {
    const planetsInfo = document.getElementById("planetInfo");
    
    if(planetInfo.innerHTML !== "") {  //Check to see if its no an empty string
        planetInfo.innerHTML = ""; 
    } else {
        const planetInfoDiv = document.createElement("div"); //Create a new div where the planet information while be shown in to the browser 
        planetInfoDiv.classList.add("planet-info"); 

        //Where the information we want to show will be and then show to the user when clicking on a planet
        
        planetInfoDiv.innerHTML = `
        <h1 class="planetName">${planetData.name}</h1>
        <h2 class="latinName">${planetData.latinName}</h2>
        <p class="planetDesc">${planetData.desc}</p>
        <section class="border"></section>
        <section class="grid-container">
        <h3 class="div-1"> Omkrets <br> ${planetData.circumference}</h3>
        <h3 class="div-2"> Max Temperatur <br> ${planetData.temp.day}</h3>
        <h3 class="div-3"> Min Temperatur <br> ${planetData.temp.night}</h3>
        <h3 class="div-4"> KM FRÅN SOLEN <br> ${planetData.distance}</h3>
        </section>
        <section class="border"></section>
        <h3 class="moon-text"> Månar: <br> <span class="moondata">${planetData.moons}</span> </h3>
        <section class="button"> 
        <button class="btn-close" onclick="closePlanetInfo()">Close</button>
        </section>
        `;

        planetsInfo.appendChild(planetInfoDiv)
    }
}

//Create a function that closes the information after its displayed so you can get back and view the other planets
function closePlanetInfo(){
    const planetsInfo = document.getElementById("planetInfo");
    planetsInfo.innerHTML = "";
}

planetInfo();