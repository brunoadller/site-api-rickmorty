const dataCharacter = []

fetch("https://rickandmortyapi.com/api/character")
    .then(data => data.json())
    .then(body => {
    
    body.results.forEach(element => {
        dataCharacter.push({
            gender: element.gender,
            id: element.id,
            image: element.image,
            name: element.name,
            species: element.species,
            status: element.status
        })
    });
    console.log(dataCharacter)

})
.catch(e => {
    console.log("Erro na requisição! ", e)
})


const inputValue = document.getElementById('value')
const button = document.getElementById('button')
const nameTitle = document.getElementById('name')
const imgCharacter = document.getElementById("imgCharacter")
const showResult = document.getElementById('showResult')
const resultNameContainer = document.getElementById('result-name-container')
const openMenu = document.getElementById('openMenu')
const menu = document.getElementById('menu')
const closeButton = document.getElementById('closeButton')
const openImg = document.getElementById('openImg')
const closeModal = document.getElementById('closeModal')
const modal = document.getElementById('modal')
const titleModal = document.getElementById("titleModal")


let pTag = []
let isCreateTag = false

window.addEventListener('resize', () => {
    if(window.innerWidth > 580){
       
    }
});
button.addEventListener('click', () => {
    if(inputValue.value == ""){
        modal.style.transform = 'translateX(0)'
        titleModal.textContent = "Preencha o campo com o nome Desejado"
    }else{
        searchCharacter(inputValue.value)
      
    }

})
closeModal.addEventListener('click', () => {
    modal.style.transform = 'translateX(-300px)'
    
})

closeButton.addEventListener('click', () => {
    menu.style.transform = 'translateX(-1100px);'
    inputValue.disabled = false
    button.disabled = false
})
openMenu.addEventListener('click', () => {
    menu.style.transform = 'translateX(-200px);'
    inputValue.disabled = true
    button.disabled = true
    console.log("deu")
})



const setNameCharacterInScreen = (name) => {
    nameTitle.textContent = name
}
const setImageInScreen = (img) => {
    imgCharacter.src =  img
}
const cleanInput = () => {
  inputValue.value = ""
}

const createTagsResultName = (gender, species, status) => {
    let description = [gender, species, status]
    let  titleDescription = ["Gênero", "Espécie", "Status"]
    let traduction = ["Macho"]
    if(pTag.length == 0){
        
        for(let i = 0; i < 3; i++){
            pTag[i] =  document.createElement('p')
            pTag[i].textContent = `${titleDescription[i]}: ${description[i]}`
            pTag[i].style.fontSize = '18px'
            pTag[i].style.fontWeight= 'bold'
            pTag[i].className = 'pTag'
            resultNameContainer.appendChild(pTag[i])
        }
    }
}
const searchCharacter = (nameCharacter) => {
  
    let filterData = dataCharacter.filter(element => element.name.toLowerCase() == nameCharacter.toLowerCase())
   console.log(filterData)
    if(filterData.length > 0){
       filterData.forEach(element => {
        setNameCharacterInScreen(element.name)
        setImageInScreen(element.image)
        cleanInput()
        createTagsResultName(element.gender, element.species, element.status )
        
       })
    }else{
        modal.style.transform = 'translateX(0)'
        titleModal.textContent = "Nome não encontrado"
        inputValue.disabled = false
        button.disabled = false
        cleanInput()
    }
    

}





