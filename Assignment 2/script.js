
const searchBox = document.querySelector('.searchBox');
const searchButton = document.querySelector('.searchButton');
const playerContainer = document.querySelector('.playerContainer');
const cartContainer = document.querySelector('.cartConatiner');


let totalNumber = 0;


const loadPlayer = () => {
    fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal")
        .then((res) => res.json())
        .then((data) => {
            display(data.player);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
};



// loadPlayer();
const display = (players) => {
    players.forEach(pl => {
        const div = document.createElement("div");
        div.classList.add("pldiv");
        div.innerHTML = `
            <img src="${pl.strThumb}" alt=""/>
            <h3>${pl.strPlayer}</h3>
            <p>${pl.strTeam}</p>
            <button class="detailsButton">Details</button>
            <button class="addToGroupButton">Add to Group</button>
        `;
        playerContainer.appendChild(div);

        const addToGroupButton = div.querySelector('.addToGroupButton');
        addToGroupButton.addEventListener('click', () => {
            if (totalNumber < 11 && addToCart(pl)) {
                addToGroupButton.textContent = "Added";
                addToGroupButton.disabled = true;
            }
        });

        const detailsButton = div.querySelector('.detailsButton');
        detailsButton.addEventListener('click', () => showDetails(pl));
    });
};

const addToCart = (player) => {
    if (totalNumber >= 11) {
        alert("You cannot add more than 11 players to the group.");
        return false;
    }

    const cartItem = document.createElement('div');
    cartItem.classList.add('cartItem');
    cartItem.innerHTML = `
        <img src="${player.strThumb}" alt=""/>
        <h4>${player.strPlayer}</h4>
        <p>${player.strTeam}</p>
    `;
    cartContainer.appendChild(cartItem);

    totalNumber++;
    document.querySelector('nav h3').textContent = `Total Number: ${totalNumber}`;
    return true;
};
const showDetails = (player) => {

    const modal = document.getElementById("detailsModal");

    document.getElementById("modalPlayerName").textContent = `Name: ${player.strPlayer}`;
    document.getElementById("modalTeam").textContent = `Team: ${player.strTeam}`;
    document.getElementById("modalPosition").textContent = `Position: ${player.strPosition}`;
    document.getElementById("modalDescription").textContent = `Description: ${player.strDescriptionEN}`;
    document.getElementById("modalSport").textContent = `Sport: ${player.strSport}`;
    document.getElementById("modalFacebook").textContent = `Facebook: ${player.strFacebook}`;
    document.getElementById("modalTwitter").textContent = `Twitter: ${player.strTwitter}`;

    modal.style.display = "block";
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

  
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};

loadPlayer();