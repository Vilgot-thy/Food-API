const SearchRecipes = document.getElementById('search-Recipes')
const searchButton = document.getElementById('searchButton')

searchButton.addEventListener('click', fetchData)

function show() {
  document.getElementById('Recipes').hidden = true
  document.querySelector('.cuisine-Ingredients').hidden = false

}

async function fetchData() {
  document.getElementById("list").remove();

  var input_Recipes = SearchRecipes.value;
  var input_Recipes = input_Recipes.toLowerCase()
  console.log(input_Recipes)
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=2fef306ea0034fc88482e469f03d03e6&query=${input_Recipes}&number=5`);
  const food = await response.json();

  for (var recipes of food.results) {
    const get = await fetch(`https://api.spoonacular.com/recipes/${recipes.id}/information?apiKey=2fef306ea0034fc88482e469f03d03e6&includeNutrition=false`)
    const Ingredients = await get.json();
    console.log(Ingredients)
    showfood(recipes, Ingredients)
  }
}
function showfood(recipes, Ingredients) {


  var ulCreat = document.createElement('ul');
  ulCreat.setAttribute('id', 'list')
  document.body.appendChild(ulCreat)
  
  var ulElem = document.getElementById("list");
  var liElem = document.createElement("li");
  var imgElem = document.createElement("img");

  var recipesnameElem = document.createElement("p");
  recipesnameElem.textContent = recipes.title;

  var creditsTextElem = document.createElement("p");
  creditsTextElem.textContent = Ingredients.creditsText
  creditsTextElem.setAttribute('cursor', 'pointer')
  creditsTextElem.href = Ingredients.sourceUrl

  imgElem.src = recipes.image
  liElem.appendChild(recipesnameElem);
  liElem.appendChild(creditsTextElem);
  liElem.appendChild(imgElem);

  for (let i = 0; i < Ingredients.extendedIngredients.length/2; i++) {
    var IngredientsElem = document.createElement("p");
    IngredientsElem.textContent = Ingredients.extendedIngredients[i].name;
    liElem.appendChild(IngredientsElem);
  }

   var instructionsElem = document.createElement("p");
   instructionsElem.textContent = Ingredients.instructions;
   liElem.appendChild(instructionsElem);

  // var srcElem = document.createElement("p");
  // srcElem.textContent = Ingredients;
  // liElem.appendChild(srcElem);

  ulElem.appendChild(liElem);
}
