// Get the modal
const modal = document.getElementById("coffee-modal");

// Get the button that opens the modal
const btnCoffee = document.getElementById("add-coffee-btn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btnCoffee.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function afficherCafe() {
  let nomCafe = "";

  fetch("https://insta-api-api.0vxq7h.easypanel.host/coffees")
    .then(response => response.json())
    .then(response => {
      const nouvelElement = document.querySelector("#cafe-list");
      response.forEach(cafe => {
        nomCafe += `<div class="coffee-post">
                        <img class="coffee-img" src=${cafe.pictureUrl}>
                        <div class="coffee-post-bottom">
                            <div class="coffee-post">
                                <span>Nom du café: ${cafe.name}</span>
                                <span>Description: ${cafe.description}</span>
                            </div>
                            <img class="coffee-icons" src="icons/trash-can-solid.svg" onclick="supprimerCafe(${cafe.id})">
                        </div>
                    </div>`;
      });
      nouvelElement.innerHTML = nomCafe;
    });
}

function ajouterCafe() {
  const nom = inputName.value;
  const description = inputDescription.value;
  const imageUrl = inputImageUrl.value;

  const cafeData = {
    name: nom,
    description: description,
    pictureUrl: imageUrl
  };

  fetch("https://insta-api-api.0vxq7h.easypanel.host/coffees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cafeData)
  })
    .then(response => response.json())
    .then(() => {
        afficherCafe();
        addCoffeeModal.style.display = "none";

        inputName.value = "";
        inputDescription.value = "";
        inputImageUrl.value = "";
    });
    
}

function supprimerCafe(cafeId) {
  fetch(`https://insta-api-api.0vxq7h.easypanel.host/coffees/${cafeId}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        afficherCafe();
      }
    })
    .catch(error => {
      console.error("Erreur lors de la suppression du café:", error);
    });
}

const addCoffeeModal = document.getElementById("coffee-modal");
const btnSubmit = document.querySelector("#coffee-modal button");
const inputName = document.getElementById("add-coffee-name");
const inputDescription = document.getElementById("add-coffee-description");
const inputImageUrl = document.getElementById("add-coffee-image-url");

btnSubmit.addEventListener("click", ajouterCafe);

afficherCafe();
