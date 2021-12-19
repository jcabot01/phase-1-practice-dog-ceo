console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function () { //fires JS after HTML loads
    let dogsImgContainer = document.getElementById('dog-image-container')//destination of dog images
    let dogUl = document.querySelector('#dog-breeds')
    let breedDropdown = document.querySelector('#breed-dropdown')
    //Challenge 1
    fetch("https://dog.ceo/api/breeds/image/random/4") //fetching data
    .then(res => res.json())  //returns a promise to send back json data
    .then(function(jsonObject) { //jsonObject is object containing images
        let arrOfDogUrls = jsonObject.message //drill down into jsonObject and retrieve message containing arrays of urls, assign to arrOfDogUrls as a variable that we can iterate
        arrOfDogUrls.forEach(url => { //for every url in array......
            dogsImgContainer.innerHTML += makeImageTagString(url) // modify the innerHTML of dogsImgContainer, aggregate images URLs using +=
        })
    }) //returns parsed json data, which we send to handler function
    
    //Challenge 2
    fetch("https://dog.ceo/api/breeds/list/all") //fetch breed data
    .then(res => res.json()) //returns a promise to send back json data
    .then(function(jsonObject) { //returns json data as an object, need to convert to an array
        let dogBreedsArr = Object.keys(jsonObject.message) //strip out the keys from the jsonObject, within in the "message" nest and assign to a variable
        dogBreedsArr.forEach((breed) => { //perform a function => each breed will be placed into the <ul> as a <li>
            dogUl.innerHTML += `<li data-info='breed'>${breed}</li>`    //innerHTML parses the data and makes it look good.  innerText would take it literally and it would 100's of <li>'s in it.      
        })
    })

   //Challenge 3
    dogUl.addEventListener('click', (event) => { //there's no CSS file, so we can't use class.  So we have to use inline styling.  We find the stable parent <ul> to manipulate its children.  If children get added, this will remain working.
            if(event.target.dataset.info === "breed") { //gate it with a condition
                event.target.style.color = 'red' //change the font color to red
            }else {
                event.target.style.color = 'black'
            }
       })
    //Challege 4
       //identify array of breeds, perform sort() method and map() them to a new array that can accessed through the dropdown
       //breed-dropdown.addEventListener('click', clickHandler)
       //clickhandler produces  a new <ul> with <li>s containing the selected letter.
    let dogSelect = document.getElementById('breed-dropdown') //create a variable assigned to HTML element
    dogSelect.addEventListener('change', (event) => { //addEventListener, use 'change' instead of click, that way it only happens when we change the dropdown option not click it
        makeFetchHappen() //call our previous fetch function to get breeds object
        .then(res => { //send json object thru function to 1st convert object to array, then drill down.
            let dogBreedsArr = Object.keys(res.message) //strip out keys of breeds into an array and assign it to a variable
            let filteredArray = dogBreedsArr.filter(breed => { //create a new variable that will contain filtered results, use filter(key) method.  Use startsWith() method.  Selected dropdown letter is passed-in   event.target.value
                return breed.startsWith(event.target.value)
            })
        dogUl.innerHTML = "" //deletes everything so that we can write a new set of <li>s
        filteredArray.forEach((breed) => { //loop through each dog breed under the filtered results
            dogUl.innerHTML += `<li data-info='breed'>${breed}</li>`    //innerHTML parses the data and makes it look good.  innerText would take it literally and it would 100's of <li>'s in it.      
        })
        })
        })
    
    //DOMContentLoaded
   
    })
function makeFetchHappen() {
    return fetch("https://dog.ceo/api/breeds/list/all") //fetching data
    .then(res => res.json())
}

function makeImageTagString(url) { //return the url of each element from the arrofDogUrls as a string using interpolation
    return `<img src="${url}"/>`
}

