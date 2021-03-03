
// Basic Info
const name = document.querySelector('input[name=user-name');
name.setAttribute('autofocus', '');
name.focus()

// Job Role Selection
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.display = 'none'

const title = document.querySelector('#title');

title.addEventListener('change', () => {
    if (title.value == 'other') {
        otherJobRole.style.display = 'initial';
    } else {
        otherJobRole.style.display = 'none';
    }
});

// Shirt Selection
const shirtDesign = document.querySelector('#design');
const shirtColor = document.querySelector('#color');

shirtColor.setAttribute('disabled', '');

shirtDesign.addEventListener('change', (e) => {
    // Enable so user can now select shirt color
    shirtColor.removeAttribute('disabled');
    for (let i = 1; i < shirtColor.options.length; i++) {
        let shirt = shirtColor.options[i];
        // reset the list to make all options visible 
        shirt.removeAttribute('hidden');
        // hide unecessary options
        if (shirt.dataset.theme !== e.target.value) {
            shirt.setAttribute('hidden', '');
        }
    }
})

// Register for Activities Section
const activities = document.querySelector('#activities');
const activityCost = document.querySelector('#activities-cost');
let userTotalCost = 0;

activities.addEventListener('change', (e) => {
    let item = e.target;

    if (item.tagName == 'INPUT') {
        let cost = parseInt(item.dataset.cost);
        if (item.checked) {
            userTotalCost += cost;
        } else {
            userTotalCost -= cost;
        }
    }
    activityCost.textContent = `Total: $${userTotalCost}`;
 })

// "Payment Info" section
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

// Hide all payment methods on load
function hideAllPaymentOptions () {
    creditCard.style.display = 'none';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
}

// Payment type selector
const paymentSel = document.querySelector('#payment');
paymentSel.addEventListener('change', (e) => {
    let select = e.target;
    hideAllPaymentOptions();
    if (select.value == 'bitcoin') {
        bitcoin.style.display = 'block';
    } else if (select.value == 'paypal') {
        paypal.style.display = 'block';
    } else {
        creditCard.style.display = 'block';
    }
})

// Select credit-card on load as default method
paymentSel.value = 'credit-card';
const changeEvent = new Event('change');
paymentSel.dispatchEvent(changeEvent);
