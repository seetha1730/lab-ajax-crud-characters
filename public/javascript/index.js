
//const APIHandler =  require('./APIHandler')

const charactersAPI = new APIHandler('http://localhost:8000');
const container = document.querySelector(".characters-container")

function characterAppendToContainer(name, occupation, weapon, cartoon) {
  const characterInfoDiv = document.createElement("div");
  characterInfoDiv.className = "character-info";

  const nameDiv = document.createElement("div");
  nameDiv.className = "name";
  nameDiv.innerHTML = `Name: ${name}`;

  const occupationDiv = document.createElement("div");
  occupationDiv.className = "occupation";
  occupationDiv.innerHTML = `Occupation: ${occupation}`;

  const cartoonDiv = document.createElement("div");
  cartoonDiv.className = "cartoon";
  cartoonDiv.innerHTML = `Is a Cartoon: ${cartoon ? 'Yes' : 'No'}`;

  const weaponDiv = document.createElement("div");
  weaponDiv.className = "weapon";
  weaponDiv.innerHTML = `Weapon: ${weapon}`;

  characterInfoDiv.appendChild(nameDiv);
  characterInfoDiv.appendChild(occupationDiv);
  characterInfoDiv.appendChild(cartoonDiv);
  characterInfoDiv.appendChild(weaponDiv);

  container.appendChild(characterInfoDiv);
}


function removeCharacterInfo() {
  const characterInfoElement = document.querySelector('.character-info');
  if (characterInfoElement) {
    characterInfoElement.remove();
  }
}
window.addEventListener('load', () => {
   document.getElementById('fetch-all')
.addEventListener('click', function (event) {
  
    charactersAPI.getFullList()
    .then(allCharacters => {
       console.log(allCharacters)
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
    // Get the character ID from the input field
    const characterId = document.querySelector('input[name="character-id"]').value;
 
    // Check if characterId is not empty
    if (characterId.trim() === "") {
      throw new Error('Character ID is empty');
        return;
    }
    container.innerHTML = ""
    charactersAPI.getOneRegister(characterId)
    .then(character => {
        console.log(character.data);
        const getOneCharacter = character.data 
       
       const {  name, occupation, cartoon, weapon } = getOneCharacter
          characterAppendToContainer(  name, occupation, weapon, cartoon)
  // Handle the response data here, e.g., update the UI with character information
    })
    .catch(error => console.error('Error while getOneRegister', error));
 });



 document.getElementById('delete-one').addEventListener('click', function (event) {
  const characterId = document.querySelector('input[name="character-id-delete"]').value;

  if (characterId.trim() === "") {
    throw new Error('Character ID is empty');
    return;
  }

  charactersAPI.deleteOneRegister(characterId)
    .then(response => {
      console.log('Character deleted successfully');
      // Remove character information from the DOM
      removeCharacterInfo();

    })
    .catch(error => console.error('Error while deleteOneRegister', error));
});



  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    const characterId = document.getElementById("edit-id").value
    const name = document.getElementById("edit-name").value
    const occupation = document.getElementById("edit-occupation").value
    const weapon = document.getElementById("edit-weapon").value
    const cartoon = document.getElementById("edit-cartoon").checked
    if ( characterId === '', name === '' || occupation === '' || weapon === '' ) {
      throw new Error('Please enter Id, Name, Occupation and Weapon')
    }
  const characterInfo = {
    characterId,
      name,
      occupation,
      weapon,
      cartoon,
  };

  charactersAPI.updateOneRegister(characterId,characterInfo)
  .then(characterData => {
      const { characterId,name, occupation, cartoon, weapon } = characterData;
      characterAppendToContainer(id, name, occupation, weapon, cartoon);
      console.log('Character created successfully');
      
      // You can reset the form here if needed
      document.getElementById('new-character-form').reset();
   
  })
  .catch(error => console.error('Error while createOneRegister', error));


  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const name = document.getElementById("name").value
    const occupation = document.getElementById("occupation").value
    const weapon = document.getElementById("weapon").value
    const cartoon = document.getElementById("cartoon").checked

    if (name === '' || occupation === '' || weapon === '') {
      throw new Error('Please enter Name, Occupation and Weapon')
    }
    const characterInfo = {
      name,
      occupation,
      weapon,
      cartoon,
  };
    charactersAPI.createOneRegister(characterInfo)
    .then(characterData => {
        const { name, occupation, cartoon, weapon } = characterData;
        characterAppendToContainer(name, occupation, weapon, cartoon);
        console.log('Character created successfully');
        
        // You can reset the form here if needed
        document.getElementById('new-character-form').reset();
     
    })
    .catch(error => console.error('Error while createOneRegister', error));
    
  });
});
