


document.addEventListener('DOMContentLoaded', function () {
    const sideNavMenu = document.querySelector('.side-nav-menu');
    const openCloseIcon = document.querySelector('.open-close-icon');
    const linksList = document.querySelectorAll('.links li');

   

    openCloseIcon.addEventListener('click', function () {
        sideNavMenu.classList.toggle('menu-hidden');
        openCloseIcon.classList.toggle('open');

        // Toggle animate-links class for each li with a delay
        linksList.forEach((li, index) => {
            const delay = index * 50; // Adjust the delay as needed
            setTimeout(() => {
                li.classList.toggle('animate-links', openCloseIcon.classList.contains('open'));
            }, delay);
        });
    });
});


// Toggle the seach section

document.addEventListener('DOMContentLoaded', function () {
    const searchSection = document.getElementById('searchSection');
    const searchLink = document.getElementById('searchLink');

    searchLink.addEventListener('click', function (event) {
        event.preventDefault(); 
        toggleSection('searchSection');

        // searchSection.classList.toggle('show-search');
        document.body.classList.toggle('show-search');
        document.getElementById('searchSection').classList.toggle('show-search');

        
    });
});


// <<<<<<<<<<<<<<<<<Search section by Name  >>>>>>>>>>>>>>>>>

let searchInputName = document.getElementById('searchName');


async function searchByName() {
    let searchInput = searchInputName.value.trim(); 

    if (!searchInput) {
        console.log("Please enter a search term");
        return; 
    }

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    var finalResponse = await response.json();

    let mealSearch = finalResponse.meals;
    console.log(mealSearch);

    let cols =""

    for (let i = 0; i < mealSearch.length; i++){

        cols +=`
    <div class="col-md-4 text-center mealSize g-3 ">
          <div class="item position-relative rounded-2">
            <img src="${mealSearch[i].strMealThumb}">
            <div class="content meal-layer d-flex  align-items-center w-100 position-absolute p-3">
              <h3>${mealSearch[i].strMeal}</h3>
            </div>
          </div>
    </div>
        
        `
    }
    document.querySelector("#mealDisplay .row").innerHTML= cols;
}

searchInputName.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchByName();
    }
});



// <<<<<<<<<<<<<<<<<<<<search section by first letter >>>>>>>>>>>>>>>>>>

let searchLetter = document.getElementById("searchLetter");

async function searchFisrtletter(){
    let searchInputLetter = searchLetter.value.trim(); 
// console.log(searchInputLetter)

    if (!searchInputLetter) {
        console.log("Please enter a search letter");
        return; 
    }

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputLetter}`);
    var finalResponse = await response.json();

    let mealSearchLetter = finalResponse.meals;
    console.log(finalResponse);

let newCols =""

for (let i =0; i < mealSearchLetter.length; i++ ){

newCols +=`
        <div class="col-md-4 text-center mealSize g-3">
        <div class="item position-relative">
        <img src="${mealSearchLetter[i].strMealThumb}">
        <div class="content meal-layer d-flex  align-items-center w-100 position-absolute p-3">
            <h3>${mealSearchLetter[i].strMeal}</h3>
        </div>
        </div>
        </div> 
        `

}

document.querySelector("#mealDisplay .row").innerHTML= newCols;

}

searchLetter.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchFisrtletter();
    }
});



  /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<category section>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

let categoriehLink = document.getElementById("categoriehLink");


async function mealCatergorie(){

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    var finalResponse = await response.json();
    // console.log("this is mealCategories" + finalResponse);
    let mealCategories = finalResponse.categories;
    

let categorycols = ""

for( let i =0 ;i < mealCategories.length; i++ ){

    categorycols+=`
    
    <div class="col-md-4 text-center mealSize g-3" onclick="showCategoryMeals('${mealCategories[i].strCategory}')">
    <div class="item position-relative">
    <img src="${mealCategories[i].strCategoryThumb}">
    <div class="content meal-layer  align-items-center w-100 position-absolute p-3">
        <h3>${mealCategories[i].strCategory}</h3>
        <p>${mealCategories[i].strCategoryDescription} </p>
    </div>
    </div>
    </div> 
           
    `
}

document.querySelector("#category .row").innerHTML =categorycols;


}


 // Define a new function to fetch and display category meals

 async function showCategoryMeals(category) {
    console.log('showCategoryMeals called with category:', category);

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    var finalResponse = await response.json();

    console.log('API response:', finalResponse);

    let mealsInCategory = finalResponse.meals;
    console.log(finalResponse); 

    console.log(mealsInCategory);
      // Log the structure of one item
  console.log(mealsInCategory[0]);

    let catergotyHtml=""
    for (let i=0 ; i< mealsInCategory.length; i++){
        catergotyHtml+=`
        
        <div class="col-md-4 text-center mealSize mealInfo g-3">
        <div class="item position-relative rounded-2 ">
        <img src="${mealsInCategory[i].strCategoryThumb}">
        <div class="content meal-layer d-flex align-items-center w-100 position-absolute p-2" >
        <h3>${mealsInCategory[i].strCategory}</h3>
        </div>
      </div>
    </div>
                 
        `
    }
   
    document.querySelector("#mealDisplayCategory .row").innerHTML = catergotyHtml;

    }


categoriehLink.addEventListener("click",()=>{
toggleSection('category');
mealCatergorie()

})













  /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<  Main Page section>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

  async function MainPageMeal(){

    var response = await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=`);
    var finalResponse = await response.json();

    let mainMeal = finalResponse.meals;
    // console.log(mainMeal);

    let mainMealCols = ""

    for (let i= 0 ; i < mainMeal.length ; i++ ){

        mainMealCols +=`
        <div class="col-md-4 text-center mealSize mealInfo g-3" onClick="getdetails(${mainMeal[i].idMeal})">
          <div class="item position-relative rounded-2 ">
            <img src="${mainMeal[i].strMealThumb}">
            <div class="content meal-layer d-flex align-items-center w-100 position-absolute p-2" >
              <h3>${mainMeal[i].strMeal}</h3>
            </div>
          </div>
    </div>
        
        `
    }
document.querySelector("#mainPage .row").innerHTML= mainMealCols;

  }
// Call the function to fetch meals for Main page
MainPageMeal(); 

            

           
 /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<  Area section>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

 document.addEventListener('DOMContentLoaded', function () {
    
    // Fetch the list of areas
    
    async function fetchAreas() {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await response.json();
        allArea =    data.meals.map(area => area.strArea)
        
        // console.log(allArea);
        
        let allAreaCols = "";
        for( let i =0 ; i < allArea.length; i++){
            allAreaCols+=`
            <div class="col-md-4 text-center g-1 areaIcon">
            <div class="">
            <i class=" text-white fa-solid fa-house-laptop" style="cursor: pointer"  onclick="showAreaMeals('${allArea[i]}')"></i>
            <div class="w-100  p-3">
                <h3>${allArea[i]}</h3>
            </div>
            </div>
            </div> 
            `
        }
    
        document.querySelector("#areaSection .row").innerHTML = allAreaCols;
    
    
    }
    
    async function showAreaMeals(area) {
    
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        var finalResponse = await response.json();
    
        let mealsByArea = finalResponse.meals;
    
        console.log('mealsByArea:', mealsByArea);
    
        let areaHtml = "";
        for (let i = 0; i < mealsByArea.length; i++) {
            areaHtml += `
                <div class="col-md-4 text-center mealSize mealInfo g-3">
                    <div class="item position-relative rounded-2 ">
                        <img src="${mealsByArea[i].strMealThumb}">
                        <div class="content meal-layer d-flex align-items-center w-100 position-absolute p-2" >
                            <h3>${mealsByArea[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            `;
        }
    
        
        document.querySelector("#areaHtml").innerHTML = areaHtml;
      
    }
    
    
    
    
    // Call the function to fetch meals for all areas
    
    const areaLink = document.getElementById('areaLink'); 
    
    areaLink.addEventListener('click', function () {
        toggleSection('areaSection');
        fetchAreas(); 
    });
    
    
    });
    



// <<<<<<<<<<<< toggle function >>>>>>>>>>>>>>>

function toggleSection(sectionId) {
    const allSections = document.querySelectorAll('section');
    allSections.forEach((s) => {
        if (s.id === sectionId) {
            s.classList.remove('hidden');
        } else {
            s.classList.add('hidden');
        }
    });
}



 /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<  Detials  function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

    const boxDetail = document.getElementById('boxDetail');
    
    
    document.addEventListener('click', function (event) {
        const clickedElement = event.target.closest('.content');
    console.log(clickedElement)
        if (clickedElement) {
            const mealId = clickedElement.getAttribute('data-id');
    
            // Now you can use the mealId to fetch and display details
            getdetails(mealId);
    
            // Show the #boxDetail section
            boxDetail.classList.remove('hidden2');
        }
    });


    
// Close Buttone code 

function closeButton(){
    var closeButton = document.getElementById("closeIcon");
  
    boxDetail.classList.add('hidden')
  }
  


  async function getdetails(id) {
    
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    var finalResponse = await response.json();

    let mealDetail= finalResponse.meals;
   
//    console.log(mealDetail)

    document.querySelector("#boxDetail").innerHTML =`
    <div  class="row py-5 g-4 position-relative" style="width:80%">
          <div class="col-md-4">
              <img src="${mealDetail[0].strMealThumb}" class="w-75 mx-5 my-3"  alt="">
              <h2 class="mx-5">${mealDetail[0].strMeal}</h2>
          </div>
          
          <div class="col-md-8 closeIcon">
              <h2>Instructions</h2>
              <i  id="closeIcon" onClick="closeButton"  class="fa-solid fa-circle-xmark position-absolute "></i>
              <p>${mealDetail[0].strInstructions}</p>
              
              <div class="d-flex align-items-center">
                <h3 class="me-3">Area :</h3>
                <span>${mealDetail[0].strArea}</span>
              </div>
              
              <div class="d-flex align-items-center mb-2">
                <h3 class="me-3">Category :</h3>
                <span>${mealDetail[0].strCategory}</span>
              </div>
             
              
              <h3>Recipes :</h3>
              
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient1}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient2}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient3}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient4}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient5}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient6}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient7}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient8}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient9}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient10}</li>
                  <li class="alert alert-info m-2 p-1">${mealDetail[0].strIngredient11}</li>
              </ul>
              
              <h3>Tags: </h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  <li class="alert alert-danger m-2 p-1">${mealDetail[0].strCategory}</li>
               
              </ul>                    
                   
              <a target="_blank" href="${mealDetail[0].strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${mealDetail[0].strYoutube}" class="btn btn-danger">Youtube</a>
          </div>
      </div>
    `


}

 

/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<  Ingrediant  function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

async function Ingrediant() {
    var response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    var finalResponse = await response.json();

    // console.log(finalResponse);
    ingrediantDetial = finalResponse.meals;
    console.log(ingrediantDetial);

    let ingreduanCols = "";
    for (let i = 0; i < ingrediantDetial.length; i++) {
        ingreduanCols += `
        <div class="col-md-4 text-center g-1 areaIcon my-4" onclick="${showIngrediantMeals(ingrediantDetial[i].strMeal)}">
            <div class="">
                <i class="text-white fa-solid fa-drumstick-bite ingIcon" style="cursor: pointer"></i>
                <div class="w-100 p-3">
                    <h3>${ingrediantDetial[i].strIngredient}</h3>
                    <p class="par">${ingrediantDetial[i].strDescription} </p>
                </div>
            </div>
        </div> 
        `;
    }
    document.querySelector("#ingrdiant .row").innerHTML = ingreduanCols;
}



async function showIngrediantMeals(ingr){
    

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`);
    var finalResponse = await response.json();

    let mealsByingr = finalResponse.meals;

     let ingrHtml = "";
    for (let i = 0; i < mealsByingr.length; i++) {
        ingrHtml += `
            <div class="col-md-4 text-center mealSize mealInfo g-3">
                <div class="item position-relative rounded-2 ">
                    <img src="${mealsByingr[i].strMealThumb}">
                    <div class="content meal-layer d-flex align-items-center w-100 position-absolute p-2" >
                        <h3>${mealsByingr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }
    document.querySelector("#ingehtml").innerHTML = ingrHtml;;
    }


// Call the function to fetch meals for all areas
const ingrediantLink = document.getElementById('ingLink');
if (ingrediantLink) {
    ingrediantLink.addEventListener('click', function () {
        toggleSection('ingrdiant');
        Ingrediant();
    });
} else {
    console.error('Element with id "ingLink" not found.');
}





/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<  Contact Us  function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */


const  contactLink = document.getElementById('contacL');

contactLink.addEventListener('click', function () {
    toggleSection('contactUs');
    ;
});



// UserName validation

const userNameInput = document.getElementById('nameInput');
userNameInput.addEventListener('keyup', function () {
    const userName = this.value;
    const userNameAlert = document.getElementById('nameAlert');

    // Use regex to check the special characters or numbers
    const hasSpecialCharactersOrNumbers = /[^a-zA-Z]/.test(userName);

    if (hasSpecialCharactersOrNumbers) {
        userNameAlert.classList.remove('d-none'); 
    } else {
        userNameAlert.classList.add('d-none'); 
    }
});


// Password validation
const passwordInput = document.getElementById('passwordInput');
passwordInput.addEventListener('keyup', function () {
    const password = this.value;
    const passwordAlert = document.getElementById('passwordAlert');

    // Use regex to check if the password has at least eight characters, one letter, and one number
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    if (isValidPassword) {
        passwordAlert.classList.add('d-none');
    } else {
        passwordAlert.classList.remove('d-none');
    }
});

// email code validation
const emailInput = document.getElementById('emailInput');
emailInput.addEventListener('keyup', function () {
    const email = this.value;
    const emailAlert = document.getElementById('emailAlert');

    // Use regex to check if the email is valid
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isValidEmail) {
        emailAlert.classList.add('d-none');
    } else {
        emailAlert.classList.remove('d-none');
    }
});

// Phone Number Validation
const phoneInput = document.getElementById('phoneInput');
phoneInput.addEventListener('keyup', function () {
    const phoneNumber = this.value;
    const phoneAlert = document.getElementById('phoneAlert');

    // Use regex to check if the phone number is valid
    const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);

    if (isValidPhoneNumber) {
        phoneAlert.classList.add('d-none');
    } else {
        phoneAlert.classList.remove('d-none');
    }
});



// repasswordInput validation 

const repasswordInput = document.getElementById('repasswordInput');
const repasswordAlert = document.getElementById('repasswordAlert');

repasswordInput.addEventListener('keyup', function () {
    const password = passwordInput.value;
    const repassword = this.value;

    // Check if the re-entered password matches the original password
    const passwordsMatch = password === repassword;

    if (passwordsMatch) {
        repasswordAlert.classList.add('d-none'); // Hide the alert
    } else {
        repasswordAlert.classList.remove('d-none'); // Show the alert
    }
});

// Age Validation
const ageInput = document.getElementById('ageInput');
ageInput.addEventListener('keyup', function () {
    const age = this.value;
    const ageAlert = document.getElementById('ageAlert');

    // Use regex to check if the age contains only numeric values
    const isValidAge = /^\d+$/.test(age);

    if (isValidAge) {
        ageAlert.classList.add('d-none');
    } else {
        ageAlert.classList.remove('d-none');
    }
});
