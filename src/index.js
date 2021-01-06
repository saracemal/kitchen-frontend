//  Global Variables

let currentSnackId = 1
let currentUserId = 1
let filterSnacks = []

/* DOM elements */
const pantry = document.querySelector("div#pantry")
const snackForm = document.querySelector("#snack-form")
const likeBtn = document.querySelector(".like-btn")
const dislikeBtn = document.querySelector(".dislike-btn")
const snackDiv = document.querySelector("#snack-card")
const snackSafe = document.querySelector("#snack-safe")
const ingredientsUl = document.querySelector(".snack-ingredients")
const unmatchBtn = document.querySelector(".unmatch-btn")
const snackSafeCard = document.querySelector("#snack-safe-card")

const img = document.querySelector(".pantry-image")
const snackName = document.querySelector(".snack-name")
const bioP = document.querySelector(".bio")
const info = document.querySelector(".info")
const bioH5 = document.querySelector(".bio-header")
const ingH5 = document.querySelector(".ing-header")


<<<<<<< HEAD
let currentSnackId = 1
let currentUserId = 1

function snackCount() { // this works for rendertoSafe
    console.log(`current ID: ${currentSnackId}`)
    currentSnackId++
    console.log(`updated ID: ${currentSnackId}`)
}

function removeSnackFromDom() {
    snackCount()
    snackDiv.innerHTML = ''
    // snackCount()
    client.get(`snacks/${currentSnackId}`)
        .then(response => {
            const snackObj = response
            console.log(snackObj)
            renderSnack(snackObj)
        })
}

function renderToSnackSafe(snackObj) {
    // snackName.textContent = snackObj.name
    // snackSafeCard.append(img, snackName, unmatchBtn)
    // snackSafe.append(snackSafeCard)

    removeSnackFromDom(snackObj)
    appendToSnackSafe(snackObj)
    // snackSafe.append(snackObj)
}
/* event listeners */
=======
// Event Listeners
>>>>>>> aaron

// unmatchBtn.addEventListener("click", event => {
//     snackSafeCard.innerHTML = ''
// })

likeBtn.addEventListener("click", event => {
    const likeObj = {
        user_id: currentUserId,
        snack_id: currentSnackId
    }
    client.post("likes/", likeObj)
        .then(newLike => console.log(`New Like Created: ${newLike}`))
    client.get(`snacks/${currentSnackId}`)
        .then(response => {
            const snackObj = response
            renderToSnackSafe(snackObj)
        })
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
    const recipe = snackForm.recipe.value.split(",")
    const imageUrl = snackForm.image_url.value
    const newSnackObj = {
        name: name,
        bio: bio,
        recipe: JSON.stringify(recipe),
        image_url: imageUrl
    }
    client.post("snacks/", newSnackObj)
        .then(newSnackObj => console.log(newSnackObj))
    getNewSnackList()
})

<<<<<<< HEAD
/* render functions */

function appendToSnackSafe(snackObj) {
    img.dataset.id = snackObj.id
    img.src = snackObj.image_url
    snackName.textContent = snackObj.name
    snackSafeCard.append(img, snackName, unmatchBtn)
    snackSafe.append(snackSafeCard)
}

function renderIngredients(ingredientObj) {
    // const ingredientsUl = document.querySelector(".snack-ingredients")
    const ingredientsLi = document.createElement("li")
    ingredientsLi.textContent = ingredientObj
    ingredientsUl.append(ingredientsLi)

}
=======
// Render Functions
>>>>>>> aaron

function renderSnack(snackObj) {
    // const snackDiv = document.querySelector("#snack-card")
    // const img = document.querySelector(".pantry-image")
    // const snackName = document.querySelector(".snack-name")
    // const bioP = document.querySelector(".bio")
    // const info = document.querySelector(".info")
    // const bioH5 = document.querySelector(".bio-header")
    // const ingH5 = document.querySelector(".ing-header")

    bioP.textContent = snackObj.bio
    bioH5.append(bioP)
    img.dataset.id = snackObj.id
    img.src = snackObj.image_url
    snackName.textContent = snackObj.name
    info.append(bioH5, ingH5, likeBtn, dislikeBtn)
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

function renderToSnackSafe(snackObj) {
    snackSafe.append(snackObj)
    removeSnackFromDom(snackObj)
}

function removeSnackFromDom() {
    snackDiv.innerHTML = ''
    getNewSnackList()
}



// Helper Methods

function checkForInteraction (snackArray, currentUserId){
    const filterSnacks = snackArray.filter(snackObj => {
        const hasBeenLiked = snackObj.likes.some(like => (like.user_id === currentUserId) )
        const hasBeenDisliked = snackObj.dislikes.some(dislike => (dislike.user_id === currentUserId) )
        return !hasBeenLiked && !hasBeenDisliked
    })
    return filterSnacks
}


// GET Next Uninteracted Snck
function getNewSnackList(){
    client.get("snacks/")
    .then(snackArray => {
        filterSnacks = checkForInteraction(snackArray, currentUserId)
        currentSnackId = (filterSnacks[0].id)
        console.log(currentSnackId)
        renderSnack(filterSnacks[0])
    })
}


// /* initialize */
getNewSnackList()