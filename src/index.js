/* DOM elements */




/* render functions */
function renderSnacks(snackObj) {
    const img = document.querySelector(".pantry-image")
    const snackName = document.querySelector(".snack-name")
    const bioP = document.querySelector(".bio")
    bioP.textContent = snackObj.bio

   

    img.dataset.id = snackObj.id
    img.src = snackObj.image_url
    snackName.textContent = snackObj.name
        // bioHeader.createElem


}


/* fetch functions */

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