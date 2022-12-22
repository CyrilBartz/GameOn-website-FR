function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector('.close');
const prenom = document.querySelector('#first')
const nom = document.querySelector('#last')
const email = document.querySelector('#email')
const birthdate = document.querySelector('#birthdate')
const quantity = document.querySelector('#quantity')
const checkbox = document.querySelectorAll('.checkbox-input')
const form = document.querySelector('form')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

//close the modal
close.addEventListener('click', function () {
    modalbg.style.display = "none";
})

function addErrorDataSet(index, message) {
    formData[index].dataset.error = message
    formData[index].dataset.errorVisible = true
}

function removeErrorDataSet(index) {
    formData[index].removeAttribute('data-error')
    formData[index].dataset.errorVisible = false
}

// save data form

function saveFormData() {
    let data = {}
    for (let i = 0; i < formData.length; i++) {
        const elements = formData[i].querySelector('input')
        if (elements.name)
            if (elements.name === "location") {
                let dataLocation = {}
                for (let i = 0; i < checkbox.length - 2; i++) {
                    dataLocation[i + 1] = checkbox[i].checked
                }
                data[elements.name] = dataLocation
            } else {
                data[elements.name] = elements.value
            }

    }
    localStorage.setItem("data", JSON.stringify(data))
}

// check data form

// show the value
const data = JSON.parse(localStorage.getItem("data"))
if (data != null) {
    prenom.value = data.first
    nom.value = data.last
    email.value = data.email
    birthdate.value = data.birthdate
    quantity.value = data.quantity
    for (let i = 0; i < checkbox.length - 2; i++) {
        let numCountry = i + 1
        checkbox[i].checked = data.location[numCountry]
    }
}


function isValidPrenom() {
    if (prenom.value === null || prenom.value.length < 2) {
        addErrorDataSet(0, "Vous avez oublié de saisir le prénom ou le prénom ne posséde pas assez de caractères")
        return false
    } else {
        removeErrorDataSet(0)
        return true
    }
}

function isValidNom() {
    if (nom.value === null || nom.value.length < 2) {
        addErrorDataSet(1, "Vous avez oublié de saisir le nom ou le nom ne posséde pas assez de caractères")
        return false
    } else {
        removeErrorDataSet(1)
        return true
    }
}

function isValidEmail() {
    const regex = /[a-z0-9-_.]+@[a-z0-9-_.]+\.[a-z]{2,}/
    if (email.value === null || !regex.test(email.value)) {
        addErrorDataSet(2, "Vous avez oublié de saisir l'email ou le format de l'email est incorrect")
        return false
    } else {
        removeErrorDataSet(2)
        return true
    }
}

function isValidBirthdate() {
    if (birthdate.value !== null) {
        const transformBirthdate = birthdate.value.split("-")
        const year = parseInt(transformBirthdate[0])
        if (year <= 1900 || year >= 2023) {
            addErrorDataSet(3, "L'année est incorrect")
            return false
        } else {
            removeErrorDataSet(3)
            return true
        }
    }
    addErrorDataSet(3, "Vous avez oublié de saisir la date")
    return false
}

function isValidQuantity() {
    const regex = /^\d+$/
    if (quantity.value === null || !regex.test(quantity.value)) {
        addErrorDataSet(4, "Vous avez oublié de saisir la quantité de participation ou vous n'avez pas écrit de nombre")
        return false
    }
    removeErrorDataSet(4)
    return true
}

function isValidCheckBox() {
    for (let i = 0; i < checkbox.length - 2; i++) {
        if (checkbox[i].checked)
            return true
    }
    return false
}

function isValidConditionsOfUse() {
    if (checkbox[checkbox.length - 2].checked)
        return true
    return false
}

function validate() {
    saveFormData()
    if (isValidPrenom() &&
        isValidNom() &&
        isValidEmail() &&
        isValidBirthdate() &&
        isValidQuantity() &&
        isValidCheckBox() &&
        isValidConditionsOfUse()
    ) {
        localStorage.removeItem("data")
        for (let i = 0; i < formData.length; i++) {
            formData[i].style.display = "none"
        }
        document.querySelector('.btn-submit').style.display = "none"
        document.querySelector('.text-label').style.display = "none"
        // Affiche le message lorsque la réponse est reçue
        const input = document.createElement('input')
        input.value = "Fermer"
        input.classList.add('button')
        input.type = "button"
        input.classList.add('btn-submit')
        const paragraph = document.createElement('p')
        paragraph.innerText = "Merci de votre inscription"
        paragraph.classList.add('text-label')
        paragraph.style.textAlign = "center"
        form.insertAdjacentElement('afterend', paragraph)
        paragraph.insertAdjacentElement('afterend', input)
        return true
    }
    return false
}







