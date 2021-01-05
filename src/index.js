/* DOM elements */
const pantry = document.querySelector("div#pantry")
const recipeForm = document.querySelector("#recipe-form")
const likeBtn = document.querySelector(".like-btn")
const dislikeBtn = document.querySelector(".dislike-btn")

/* event listeners */

likeBtn.addEventListener("click", event => {

})


// pantry.addEventListener("click", event => {

//     if (event.target.matches(".like-btn")) {
//         } 
//     else 
// })

// recipeForm.addEventListener("submit", event => {
//     event.preventDefault()

//     const newRecipeObj = {

//     }
// })



/* render functions */

function renderIngredient(ingredientObj) {
    const ingredientsUl = document.querySelector(".snack-ingredients")
    const ingredientsLi = document.createElement("li")
    ingredientsLi.textContent = ingredientObj
    ingredientsUl.append(ingredientsLi)

}

function renderSnacks(snackObj) {
    const snackDiv = document.querySelector("#snack-card")
    const img = document.querySelector(".pantry-image")
    const snackName = document.querySelector(".snack-name")
    const bioP = document.querySelector(".bio")
    bioP.textContent = snackObj.bio

    img.dataset.id = snackObj.id
    img.src = snackObj.image_url
    snackName.textContent = snackObj.name

    snackDiv.append(img, snackName, )

    snackObj.recipe.forEach(ingredient => {
        renderIngredient(ingredient)
    })
}



/* fetch functions */

// function 

function getSnacks() {
    fetch("http://localhost:3000/api/v1/snacks")
        .then(r => r.json())
        .then(snackArray =>
            snackArray.forEach(snackObj => {
                renderSnacks(snackObj)
            })
        )
}





// /* initialize */

// getSnacks()
client.get("snacks/")
    .then(snackArray =>
        snackArray.forEach(snackObj => {
            renderSnacks(snackObj)
        })
    )