/* DOM elements */
const pantry = document.querySelector("div#pantry")
const recipeForm = document.querySelector("#recipe-form")

/* event listeners */
// pantry.addEventListener("click", event => {

//     if (event.target.matches("#like-btn")) {
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
    const img = document.querySelector(".pantry-image")
    const snackName = document.querySelector(".snack-name")
    const bioP = document.querySelector(".bio")
    bioP.textContent = snackObj.bio

    img.dataset.id = snackObj.id
    img.src = snackObj.image_url
    snackName.textContent = snackObj.name

    snackObj.recipe.forEach(ingredient => {
        renderIngredient(ingredient)
    })
}


/* fetch functions */

function 

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

getSnacks()