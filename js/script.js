
// Basic Info
const email = document.querySelector('#email');
const userName = document.querySelector('input[name=user-name');
userName.setAttribute('autofocus', '');
userName.focus()

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
    shirtColor.options[0].removeAttribute('selected');
    shirtColor.options[0].setAttribute('selected', '');
})

// Register for Activities Section
const activities = document.querySelector('#activities-box');
const checkboxes = activities.querySelectorAll('input[type=checkbox]');
const activityCost = document.querySelector('#activities-cost');
let userTotalCost = 0;

activities.addEventListener('change', (e) => {
    let item = e.target;

    if (item.tagName == 'INPUT') {
        // Add up cost of workshops
        let cost = parseInt(item.dataset.cost);
        if (item.checked) {
            userTotalCost += cost;
        } else {
            userTotalCost -= cost;
        }
        // Setup loop to check for date conflicts
        let date = item.dataset.dayAndTime;
        let workshop = item.name;
        checkboxes.forEach(function(arrItem) {
            // If any other item has this item's date, 
            // blank out the other item
            let arrItemDate = arrItem.dataset.dayAndTime;
            if (arrItemDate == date && arrItem.name !== workshop) {
                arrItem.disabled = true;
                arrItem.parentElement.classList.add('disabled')
            }
            if (date == arrItemDate && !item.checked) {
                arrItem.disabled = false;
                arrItem.parentElement.classList.remove('disabled');
            }
        });
    }
    activityCost.textContent = `Total: $${userTotalCost}`;
})

// Set focus and blur events on checkboxes
activities.addEventListener('focusin', (e) => {
    let item = e.target;
    if (item.tagName == 'INPUT') {
        item.parentElement.className = 'focus';
    }
});

activities.addEventListener('focusout', (e) => {
    let item = e.target;
    if (item.tagName == 'INPUT') {
        item.parentElement.className = '';
    }
});

// "Payment Info" section
const creditCard = document.querySelector('#credit-card');
const creditCardNumber = document.querySelector('#cc-num');
const creditCardZIP = document.querySelector('#zip');
const creditCardCVV = document.querySelector('#cvv');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

// Hide all payment methods on load
function hideAllPaymentOptions() {
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


// Validation
const form = document.querySelector('form');


function addErrorStyles(element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.lastElementChild.style.display = 'block';
}

function removeErrorStyles(element) {
    element.parentElement.classList.remove('not-valid');
    element.parentElement.classList.add('valid');
    element.parentElement.lastElementChild.style.display = 'none';
}

// Realtime validations:
userName.addEventListener('keyup', (e) => {
    if (!isValidName(userName.value)) {
        addErrorStyles(userName);
    } else {
        removeErrorStyles(userName);
    }
})

activities.addEventListener('change', (e) => {
    if (!isValidActivities(activities)) {
        addErrorStyles(activities);
    } else {
        removeErrorStyles(activities);
    }
});

email.addEventListener

// Form submit
form.addEventListener('submit', (e) => {
    // Check validation before form submit
    if (!isValidName(userName.value)) {
        e.preventDefault();
        addErrorStyles(userName);
    } else {
        removeErrorStyles(userName);
    }

    if (email.value == '') {
        addErrorStyles(email);
        email.nextElementSibling.textContent = 'Please add an email address';
    }
    else if (!isValidEmail(email.value)) {
        e.preventDefault();
        addErrorStyles(email);
        email.nextElementSibling.textContent = 'Email address must be formatted correctly';
    } else {
        removeErrorStyles(email);
    }

    if (!isValidActivities(activities)) {
        e.preventDefault();
        addErrorStyles(activities);
    } else {
        removeErrorStyles(activities);
    }

    if (paymentSel.value === 'credit-card') {
        if (!isValidCCNumber(creditCardNumber.value)) {
            e.preventDefault();
            addErrorStyles(creditCardNumber);
        } else {
            removeErrorStyles(creditCardNumber);
        }

        if (!isValidZip(zip.value)) {
            e.preventDefault();
            addErrorStyles(zip);
        } else {
            removeErrorStyles(zip);
        }

        if (!isValidCVV(cvv.value)) {
            e.preventDefault();
            addErrorStyles(cvv);
        } else {
            removeErrorStyles(cvv);
        }
    }

});

// Validator/regex functions
function isValidName(nameString) {
    if (nameString == '' | nameString == null) {
        return false;
    }
    return true;
};

function isValidEmail(email) {
    return /^[^@\s]+@[^@.]+\.[a-z]+$/.test(email);
};

function isValidActivities(inputs) {
    let length = inputs.querySelectorAll('input[type=checkbox]:checked').length;
    if (length > 0) {
        return true
    }
    return false
};

function isValidCCNumber(cardNum) {
    return /^\d{13,16}$/.test(cardNum);
}

function isValidZip(zip) {
    return /^\d{5}$/.test(zip);
}

function isValidCVV(cvv) {
    return /^\d{3}$/.test(cvv);
}
