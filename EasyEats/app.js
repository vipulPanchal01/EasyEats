const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const recipeH1 = document.querySelector(".recipe-h1");
const icon1 = document.querySelector("#icon");


// fetch recipe
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {

        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Perfect for <span>${meal.strCategory}</span>.</p>
        `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // Adding event listener

            button.addEventListener("click", () => {
                openRecipePopUp(meal);
            })
            recipeContainer.appendChild(recipeDiv);
            icon1.innerHTML = "";
            recipeH1.innerHTML = "";
        });
    } catch (e) {
        recipeContainer.innerHTML = "<h2>Oops! Something went wrong in fetching recipes...</h2>";
        recipeH1.innerHTML = "";
        icon1.style.display = "none";
        let icon2 = document.createElement("img");
        let src = "https://cdn3d.iconscout.com/3d/premium/thumb/error-404-8808969-7122238.png?f=webp";
        let imgHt = "50%";
        icon2.setAttribute("src", src);
        icon2.setAttribute("height", imgHt);
        // recipeContainer.appendChild("");
        recipeContainer.appendChild(icon2);
    }
}

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }

    return ingredientsList;
}

const openRecipePopUp = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList" >${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h1>Instructions: </h1>
            <p>${meal.strInstructions}</p>
        </div>
    `


    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Hunger Pangs? Just Type Your Desired Dish into the Search Box!</h2>`
        return;
    }
    fetchRecipes(searchInput);
});