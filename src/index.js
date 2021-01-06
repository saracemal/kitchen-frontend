//  Snack Handler

/* DOM elements */
const pantry = document.querySelector("div#pantry")
const snackForm = document.querySelector("#snack-form")
const likeBtn = document.querySelector(".like-btn")
const dislikeBtn = document.querySelector(".dislike-btn")
const snackDiv = document.querySelector("#snack-card")
const snackSafe = document.querySelector("#snack-safe")
const ingredientsUl = document.querySelector(".snack-ingredients")


const img = document.querySelector(".pantry-image")
const snackName = document.querySelector(".snack-name")
const bioP = document.querySelector(".bio")
const info = document.querySelector(".info")
const bioH5 = document.querySelector(".bio-header")
const ingH5 = document.querySelector(".ing-header")


let currentSnackId = 1
let currentUserId = 1

function snackCount() {
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

    snackSafe.append(snackObj)
    removeSnackFromDom(snackObj)
}
/* event listeners */

likeBtn.addEventListener("click", event => {

    const likeObj = {
        user_id: currentUserId,
        snack_id: currentSnackId
    }
    client.post("likes/", likeObj)
        .then(newLike => console.log(newLike))

    client.get(`snacks/${currentSnackId}`)
        .then(response => {
            const snackObj = response
            console.log(snackObj)
            renderToSnackSafe(snackObj)
        })



})

dislikeBtn.addEventListener("click", event => {
    const snackObj = client.get(`snacks/${currentSnackId}`)
    const dislikeObj = {
        user_id: currentUserId,
        snack_id: currentSnackId
    }
    client.post("dislikes/", dislikeObj)
        .then(newDislike => console.log(newDislike))
    removeSnackFromDom(snackObj)
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
        recipe: recipe,
        image_url: imageUrl
    }

    client.post("snacks/", newSnackObj)
        .then(newSnackObj => console.log(newSnackObj))
})



/* render functions */

function renderIngredients(ingredientObj) {
    // const ingredientsUl = document.querySelector(".snack-ingredients")
    const ingredientsLi = document.createElement("li")
    ingredientsLi.textContent = ingredientObj
    ingredientsUl.append(ingredientsLi)

}

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



/* fetch functions */



// /* initialize */

// GET FIRST SNACK + SET THE FIRST SNACKID
client.get("snacks/")
    .then(snackArray => {
        currentSnackId = snackArray[0].id
        renderSnack(snackArray[0])
    })