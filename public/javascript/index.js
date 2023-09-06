const charactersAPI = new APIHandler('http://localhost:8000');
const container = document.querySelector(".characters-container")

function characterAppendToContainer( name, occupation, weapon, cartoon) {

const characterInfoDiv = document.createElement("div")
  //const idDiv = document.createElement("div")
  const nameDiv = document.createElement("div")
  const occupationDiv = document.createElement("div")
  const weaponDiv = document.createElement("div")
  const cartoonDiv = document.createElement("div")

  //const idSpan = document.createElement("Span")
  const nameSpan = document.createElement("Span")
  const occupationSpan = document.createElement("Span")
  const weaponSpan = document.createElement("Span")
  const cartoonSpan = document.createElement("Span")

  // idDiv.className="id"
  // idDiv.innerHTML ="id:"
  characterInfoDiv.className="character-info"
  nameDiv.className="name"
  nameDiv.innerHTML="Character name"
  occupationDiv.className="occupation"
  occupationDiv.innerHTML="Character occupation"
  cartoonDiv.className="cartoon"
  cartoonDiv.innerHTML="Is a Cartoon?"
  weaponDiv.className="Weapon"
  weaponDiv.innerHTML="Character Weapon"

  //idSpan.innerHTML = id
  nameSpan.innerHTML = name
  occupationSpan.innerHTML = occupation
  cartoonSpan.innerHTML = cartoon
  weaponSpan.innerHTML = weapon

  //idDiv.appendChild(idSpan)
  nameDiv.appendChild(nameSpan)
  occupationDiv.appendChild(occupationSpan)
  cartoonDiv.appendChild(cartoonSpan)
  weaponDiv.appendChild(weaponSpan)

  //characterInfoDiv.appendChild(idDiv)
  characterInfoDiv.appendChild(nameDiv)
  characterInfoDiv.appendChild(occupationDiv)
  characterInfoDiv.appendChild(cartoonDiv)
  characterInfoDiv.appendChild(weaponDiv)

  container.appendChild(characterInfoDiv)
  
}
window.addEventListener('load', () => {
  document.getElementById('fetch-all')
  .addEventListener('click', function (event) {
    charactersAPI.getFullList()
      .then(allCharacters => {
        const getFullList = allCharacters.data
        container.innerHTML = ""

        getFullList.forEach(character => {
          console.log(character)
          const {  name, occupation, cartoon, weapon } = character
          characterAppendToContainer(  name, occupation, weapon, cartoon)
        })
      })
      .catch(error => console.error('Error while getFullList', error))
  })




  document.getElementById('fetch-one').addEventListener('click', function (event) {
    charactersAPI.getFullList()

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {


  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

  });
});
