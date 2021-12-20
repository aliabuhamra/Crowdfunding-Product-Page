// Get Header Elements 
const navMobile = document.querySelector('.nav-main__mobile')
// Get toggle Nav Element
const hamburgerToggle = document.querySelector('.hamburger')
// Get Main Element
const Main = document.querySelector('main')
// Get the btn bookmark element
const bookmarkBtn = document.querySelector('.btn__bookmark')
// Get Modal Element
const modal = document.querySelector('.modal')
// Get btn primary element
const btn = document.getElementsByClassName('.btn')[0]
// Get Btns from Main Element
const openModalBtn = Main.querySelectorAll('.btn')
// Get Overlay Element
const overlay = document.getElementById('overlay')
// Get Close Button Element
const closeModalBtn = document.querySelectorAll('[data-close-btn]')
// Get Selected Label Element
const selectInputs = document.querySelectorAll('.select input')
// Get Close Button Element
const closebtn = document.querySelector('.modal__content')
// Get confirming Btn Element
const confirmBtn = document.querySelector('.got-it')
// Get Total Backers Element
const Backersdiv = document.querySelector('#backers')


let pledge = 0
let totalBackers
// 
//======== Navgetion =========//
//


hamburgerToggle.addEventListener("click", NavMobile)

// open and close Navgetion
function NavMobile() {
    const open = hamburgerToggle.getElementsByClassName('hamburger__open')[0]
    const close = hamburgerToggle.getElementsByClassName('hamburger__close')[0]
    const navBtn = [open, close]
    navBtn.forEach(btn => btn.classList.toggle('active'))
    navMobile.classList.toggle('active')
    if (navBtn[1]) {
        overlay.classList.toggle('inactive')
    }
}


// 
//======== Bookmarked Event =========//
//


// Click The Bookmark Button
function clickBookmark() {
    bookmarkBtn.classList.toggle('active')
    if (bookmarkBtn.classList.contains('active')) {
        bookmarkBtn.querySelector('p').textContent = 'Bookmarked'
    }
    else {
        bookmarkBtn.classList.remove('active')
        bookmarkBtn.querySelector('p').textContent = 'Bookmark'
    }
}


// 
//======== Modal Events ========= //
// 
// Close Overlay When clicking On Overlay Element
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        resetModal()
        closeModal(modal)
    })
})

// Open Modal
openModalBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        openModal(modal)
        selectIntoView(btn)
    })
})

// Hide The Modal Element When Clicking Button Close
closeModalBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.querySelector('.modal.active')
        resetModal()
        closeModal(modal)
    })
})

// Choose a new Select
selectInputs.forEach(select => {
    select.addEventListener('change', () => {
        clearSelection()
        selectNew(select) // if selected new option the old option will be clearSelection and scroll to the new option 
    })
})

const cardAmount = document.querySelectorAll('.card__amount button')
// Set Value A Price 
cardAmount.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        sendPrice()
    })
})


// 
//======= Modal Functions ========//
// 


// Open Modal
function openModal(modal) {
    modal.classList.add('active')
    overlay.classList.add('active')
}

// Close Modal
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

// Select from card to another card
function selectIntoView(btn) {
    const specificButtons = { button1: "#bamboo", button2: "#black", button3: "#mahogany" };
    if (btn.classList.contains('specific')) {
        const inputId = specificButtons[btn.id]
        const checkedOption = document.querySelector(inputId)
        checkedOption.checked = true
        selectNew(checkedOption)
    }
}

// Show Card Active When Selected
function selectNew(select) {
    const card = select.parentElement.parentElement.parentElement.parentElement
    card.classList.toggle('active')
    const pledge = document.querySelector('.card.active .pledge')
    pledge.style.maxHeight = pledge.scrollHeight + 'px'
    pledge.style.opacity = '1'
    select.checked = true;
    // Scroll to the selected card
    setTimeout(() => card.scrollIntoView({ behavior: "smooth" }), 500);
}

// Reset the Selected Modal If Close
function resetModal() {
    clearSelection()
    closebtn.scrollIntoView()
}

function sendPrice() {
    // Get the amount element 
    const cardActive = document.querySelector('.card.active')
    const input = cardActive.querySelector('input[type="number"]')
    pledge = Number(input.value)
    const pledgeSelect = cardActive.querySelector('.card__pledge')
    const pledgeNum = pledgeSelect.innerText
    const pledgeTarget = Number(pledgeNum.match(/\d+/g)[0])
    const message = cardActive.querySelector('.card__message-error')
    if (pledge < pledgeTarget) {
        message.style.opacity = '1'
    }
    else {
        openConfirming()
        updateStock()
        const num = Backersdiv.textContent
        console.log(num)
    }
}



function clearSelection() {
    const cardActive = document.querySelector('.card.active')
    const currentSelection = document.querySelector('.card.active')
    if (currentSelection) {
        const radio = cardActive.querySelector('input[type="radio"]')
        const pledge = cardActive.querySelector('.pledge')
        const message = cardActive.querySelector('.card__message-error')
        currentSelection.classList.remove('active')
        radio.checked = false
        pledge.style.maxHeight = 0
        message.style.opacity = 0
    }
}


// 
//======= confirming Events ========//
//
confirmBtn.addEventListener('click', (e) => {
    closeConfirming()
})

// 
//======= function Stock ==========//
// 

function updateStock() {
    const progress = document.querySelector('.progress__done')
    const progressData = progress.getAttribute('data-done')
    console.log(pledge)

}

function openConfirming() {
    const confirming = document.querySelector('.confirming__content')
    if (modal) {
        modal.classList.remove('active')
        confirming.classList.add('active')
    }
}

function closeConfirming() {
    const confirming = document.querySelector('.confirming__content')
    if (confirming.classList.contains('active')) {
        closeModal(modal)
        clearSelection()
        confirming.classList.remove('active')
    }
}
