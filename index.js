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
const loading = document.getElementById('loading')


let pTag = []

const getSearchEvent = () => {
    if(inputValue.value == ""){
        showModal("Preencha o campo com o nome Desejado")
       
    }else{
        searchCharacter(inputValue.value)
    }

}
window.addEventListener('resize', () => {
     if(window.innerWidth > 580){
        menu.style.display = 'none'
     }else{
        menu.style.display = 'flex'
     }
})
button.addEventListener('click', () => {
    loading.style.display = 'block'
    showResult.style.display = 'none'
    setTimeout(() => {
        loading.style.display = 'none'
        showResult.style.display = 'block'
    }, 2000)
    getSearchEvent()
   
})
closeModal.addEventListener('click', () => {
    modal.style.transform = 'translateX(-300px)'
    
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
        showModal('Nome não encontrado')
        inputValue.disabled = false
        button.disabled = false
        cleanInput()
    }
    

}
const showModal = (message) => {
    modal.style.display = 'flex'
    modal.style.transform = 'translateX(0)'
    titleModal.textContent = message
    setTimeout(() => {
        modal.style.transform = 'translateX(-300px)'
    }, 2000)
}


openMenu.addEventListener('click', () => {
    menu.style.transform = 'translateX(0px)'
    inputValue.disabled = true
    button.disabled = true
})
closeButton.addEventListener('click', () => {
    menu.style.transform = 'translateX(200px)'
    inputValue.disabled = false
    button.disabled = false
})

inputValue.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        loading.style.display = 'block'
        showResult.style.display = 'none'
        setTimeout(() => {
            loading.style.display = 'none'
            showResult.style.display = 'block'
        }, 2000)
        getSearchEvent()
    }
})

