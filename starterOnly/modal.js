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
const closeThanks = document.getElementById('fermer')
const thanks = document.querySelector('.thanks')
const form = document.querySelector('.modal-body')
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block"
    thanks.style.display = "none"
}

//close the modal

close.addEventListener('click', function () {
    modalbg.style.display = "none"
    form.style.display = "block"
})

closeThanks.addEventListener('click', function () {
    modalbg.style.display = "none"
    form.style.display = "block"
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
    if (prenom.value.trim() === "") {
        addErrorDataSet(0, "Vous avez oublié de saisir le prénom")
        return false
    } else if (prenom.value.trim().length < 2) {
        addErrorDataSet(0, "Le prénom ne posséde pas assez de caractères")
        return false
    } else {
        removeErrorDataSet(0)
        return true
    }
}

function isValidNom() {
    if (nom.value.trim() === "") {
        addErrorDataSet(1, "Vous avez oublié de saisir le nom")
        return false
    } else if (nom.value.trim().length < 2) {
        addErrorDataSet(1, "Le nom ou le nom ne posséde pas assez de caractères")
        return false
    } else {
        removeErrorDataSet(1)
        return true
    }
}

function isValidEmail() {
    const regex = /[a-z0-9-_.]+@[a-z0-9-_.]+\.[a-z]{2,}/
    if (email.value === null) {
        addErrorDataSet(2, "Vous avez oublié de saisir l'email")
        return false
    } else if (!regex.test(email.value)) {
        addErrorDataSet(2, "Le format de l'email est incorrect")
        return false
    } else {
        removeErrorDataSet(2)
        return true
    }
}

function isValidBirthdate() {
    if (birthdate.value.trim() !== "") {
        const transformBirthdate = birthdate.value.split("-")
        const year = parseInt(transformBirthdate[0])
        const date = new Date()
        const currentYear = date.getFullYear()
        if (year <= 1900 || year >= (currentYear - 18)) {
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
    if (quantity.value.trim() === "") {
        addErrorDataSet(4, "Vous avez oublié de saisir la quantité de participation")
        return false
    } else if (!regex.test(quantity.value)) {
        addErrorDataSet(4, "Vous n'avez pas écrit de nombre")
        return false
    }
    removeErrorDataSet(4)
    return true
}

function isValidCheckBox() {
    for (let i = 0; i < checkbox.length - 2; i++) {
        if (checkbox[i].checked) {
            removeErrorDataSet(5)
            return true
        }
    }
    addErrorDataSet(5, "Vous avez oublié de saisir une ville")
    return false
}

function isValidConditionsOfUse() {
    if (checkbox[checkbox.length - 2].checked) {
        removeErrorDataSet(6)
        return true
    }
    addErrorDataSet(6, "Vous avez oublié d'accepter les conditions d'utilisations")
    return false
}

function validate() {
    saveFormData()
    const isValid = [isValidPrenom(), isValidNom(), isValidEmail(), isValidBirthdate(), isValidQuantity(), isValidCheckBox(), isValidConditionsOfUse()].every(Boolean);
    if (isValid
    ) {
        localStorage.removeItem("data")
        thanks.style.display = "block"
        form.style.display = "none"
    }
    return false
}







