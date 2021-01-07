//  Global Variables

let currentSnackId = 1
let currentUserId = 1
let filterSnacks = []
let likedSnacks = []

/* DOM elements */

/*  PANTRY  */

const pantry = document.querySelector("div#pantry")

const snackName = document.querySelector(".snack-name")
const img = document.querySelector(".pantry-image")
const bioP = document.querySelector(".bio")
const info = document.querySelector(".info")
const bioH5 = document.querySelector(".bio-header")
const ingredientsUl = document.querySelector(".snack-ingredients")

const likeBtn = document.querySelector(".like-btn")
const dislikeBtn = document.querySelector(".dislike-btn")

/* FORM */
const snackForm = document.querySelector("#snack-form")

/*  SNACK SAFE  */

const snackDiv = document.querySelector("#snack-card")
const snackSafe = document.querySelector("#snack-safe")


/*  MODAL  */
const modalDiv = document.querySelector(".modal-content")
const modalImg = document.querySelector(".modal-image")
const modalName = document.querySelector(".modal-name")
const modalInfo = document.querySelector(".modal-info")
const modalBioHeader = document.querySelector(".modal-bio-header")
const modalBio = document.querySelector(".modal-bio")
const modalUl = document.querySelector(".modal-snack-ingredients")

// Event Listeners


likeBtn.addEventListener("click", event => {
    likeSnack()
})

dislikeBtn.addEventListener("click", event => {
    // const snackObj = client.get(`snacks/${currentSnackId}`)
    const dislikeObj = {
        user_id: currentUserId,
        snack_id: currentSnackId
    }
    client.post("dislikes/", dislikeObj)
        .then(newDislike => console.log(newDislike));
    removeSnackFromDom()
})

snackForm.addEventListener("submit", event => {
    event.preventDefault()
    const name = snackForm.name.value
    const bio = snackForm.bio.value
    const recipe = snackForm.recipe.value
    const imageUrl = snackForm.image_url.value
    const newSnackObj = {
        name: name,
        bio: bio,
        recipe: recipe,
        image_url: imageUrl
    }
    client.post("snacks/", newSnackObj)
        .then(newSnackObj => console.log(newSnackObj))
    snackForm.reset()
    likeSnack()
    getNewSnackList()
})

// Render Functions

function renderSnack(snackObj) {
    bioP.textContent = snackObj.bio
    bioH5.append(bioP)
    img.dataset.id = snackObj.id
    img.src = snackObj.image_url
    snackName.textContent = snackObj.name
    info.append(bioH5, likeBtn, dislikeBtn)
    snackDiv.append(img, snackName, info)
    ingredientsUl.innerHTML = "" 
    snackObj.recipe.forEach(ingredient => {
        renderIngredients(ingredient)
    })
}

function renderIngredients(ingredientObj) {
    const ingredientsLi = document.createElement("li")
    ingredientsLi.textContent = ingredientObj
    ingredientsUl.append(ingredientsLi)
}

function createSnackTile(snackObj, newLikeId) {
    const cardImg = document.createElement("img")
    cardImg.className = "snack-safe-card-image"

    const cardName = document.createElement("h5")
    const unmatchBtn = document.createElement("button")


    // const modalBtn = document.getElementById("myBtn")
    const modalBtn = document.createElement("button")
    modalBtn.id = "myBtn"
    modalBtn.textContent = "View"

    const snackSafeCard = document.createElement("div")
    snackSafeCard.className = "snack-safe-card"
    snackSafeCard.dataset.id = snackObj.id
    console.log(`card id: ${snackSafeCard.dataset.id}`)


    let newNewLikeId = newLikeId
    console.log(newLikeId)

    unmatchBtn.className = "unmatch-btn"
    unmatchBtn.textContent = "Unlike"
    // modalBtn.className = "modal-btn"
    
    

    // cardImg.dataset.id = snackObj.id
    cardImg.src = snackObj.image_url
    cardName.textContent = snackObj.name

    // UNMATCH 
    snackSafeCard.addEventListener("click", event => {
        // need to click on the corresponding unmatch button to remove from dom 
        if (event.target.matches(".unmatch-btn")) {
        // const snackId = snackSafeCard.dataset.id
        // console.log(`clicked: ${snackSafeCard.dataset.id}`)
        console.log(newLikeId)
        console.log(`like id: ${newNewLikeId}`)
        client.delete(`likes/${newNewLikeId}`)
        // .then(console.log())
        
        snackSafeCard.remove()
        }

        // MODAL 
        if (event.target.matches("#myBtn")) {
                const modal = document.getElementById("myModal");
                // Get the <span> element that closes the modal
                const span = document.getElementsByClassName("close")/*[0]*/;

                // When the user clicks the button, open the modal 
                modalBtn.onclick = function() {
                    renderToModal(snackObj)
                    modal.style.display = "block";
                }

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
        }   
    })

    snackSafeCard.append(cardImg, cardName, unmatchBtn, modalBtn)
    snackSafe.append(snackSafeCard)
}

function renderToModal(snackObj){
    modalBio.textContent = snackObj.bio
    // modalBioHeader.append(modalBio)
    modalImg.dataset.id = snackObj.id
    modalImg.src = snackObj.image_url
    modalName.textContent = snackObj.name
    // modalUl.innerHTML = "" 
    snackObj.recipe.forEach(ingredient => {
        const ingredientsLi = document.createElement("li")
        ingredientsLi.textContent = ingredient
        modalUl.append(ingredientsLi)
        }




    )
}

    // modalInfo.append(modalBio, )
    // modalDiv.append(modalImg, modalName, modalInfo)



function renderToSnackSafe(snackObj, newLikeId) {
    createSnackTile(snackObj, newLikeId)
    // snackSafe.append(snackObj)
    removeSnackFromDom(snackObj)
}

function removeSnackFromDom() {
    snackDiv.innerHTML = ''
    getNewSnackList()
}

// function openModal(snackObj) {
    // const modal = document.getElementById("myModal");
    // renderSnack(snackObj)
    // // Get the <span> element that closes the modal
    // const span = document.getElementsByClassName("close")[0];

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    // modal.style.display = "none";
    // }

    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    // if (event.target == modal) {
    //     modal.style.display = "none";
    // }
    // }





// Helper Methods

function checkForInteraction (snackArray, currentUserId){
    const filterSnacks = snackArray.filter(snackObj => {
        const hasBeenLiked = snackObj.likes.some(like => (like.user_id === currentUserId) )
        const hasBeenDisliked = snackObj.dislikes.some(dislike => (dislike.user_id === currentUserId) )
        return !hasBeenLiked && !hasBeenDisliked
    })
    return filterSnacks
}

function checkForLikedSnacks (snackArray, currentUserId){
    const likedSnacks = snackArray.filter(snackObj => {
        const hasBeenLiked = snackObj.likes.some(like => (like.user_id === currentUserId) )
        // const hasBeenDisliked = snackObj.dislikes.some(dislike => (dislike.user_id === currentUserId) )
        return hasBeenLiked
    })
    return likedSnacks 
}

function likeSnack(){
    const likeObj = {
        user_id: currentUserId,
        snack_id: currentSnackId
    }
    let newLikeId = 0
    client.post("likes/", likeObj)
        .then(newLike => newLikeId = newLike.id)
    client.get(`snacks/${currentSnackId}`)
        .then(response => {
            const snackObj = response
            renderToSnackSafe(snackObj, newLikeId)
        })
    }
    
    
    // GET Next Uninteracted Snck
    function getNewSnackList(){
        client.get("snacks/")
        .then(snackArray => {
            filterSnacks = checkForInteraction(snackArray, currentUserId)
            likedSnacks = checkForLikedSnacks(snackArray, currentUserId)
            // console.log(likedSnacks)
            console.log(likedSnacks)
            likedSnacks.forEach(snack => createSnackTile(snack, snack.likes[0].id)) // removed 
            currentSnackId = (filterSnacks[0].id)
            // console.log(currentSnackId)
            renderSnack(filterSnacks[0])
        })
    }
    
    
    // /* initialize */
    getNewSnackList()