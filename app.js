window.addEventListener("load", (event) => {
    //Elements
    let billElement = document.getElementById('bill');
    let tipWrappers = document.querySelectorAll('.tip-wrapper');
    let peopleCountElement = document.getElementById('people-count');
    let customTipElement = document.getElementById('custom-tip');
    let resetInputButton = document.getElementById('reset');
    const tipAmount = document.getElementById('tip-value');
    const billAmount = document.getElementById('total-value');

    //User Inputs
    let billInput = undefined;
    let tipInput = undefined;
    let countInput = undefined;

    //Event Listeners
    billElement.addEventListener('input' , (e) => {
        billInput = e.currentTarget.value;
        if(!isNumber(billInput) && String(billInput).charAt(billInput.length - 1) != '.') {
            billElement.value = String(billInput).slice(0, -1);
            billInput = billElement.value;
        }
        if(billInput == 0 || billInput == '' || billElement == undefined) {
            console.log(billInput);
            
            showErrorMessage(e.currentTarget.getAttribute('id'), e);
            e.currentTarget.classList.add('invalid');
            e.currentTarget.classList.remove('valid');
        } else {
            hideErrorMessage(e.currentTarget.getAttribute('id'), e);
            e.currentTarget.classList.add('valid');
            e.currentTarget.classList.remove('invalid');
        }
        generateBill();
    });

    peopleCountElement.addEventListener('input', (e) => {
        countInput = e.currentTarget.value;
        if(!isNumber(countInput) && String(countInput).charAt(countInput.length - 1) != '.') {
            peopleCountElement.value = String(countInput).slice(0, -1);
            countInput = peopleCountElement.value;
        }
        if(countInput == 0 || countInput == '' || countInput == undefined) {
            showErrorMessage(e.currentTarget.getAttribute('id'), e);
            e.currentTarget.classList.add('invalid');
            e.currentTarget.classList.remove('valid');
        } else {
            hideErrorMessage(e.currentTarget.getAttribute('id'), e);
            e.currentTarget.classList.add('valid');
            e.currentTarget.classList.remove('invalid');
        }
        generateBill();
    });

    customTipElement.addEventListener('input', (e) => {
        resetTips();
        tipInput = e.currentTarget.value;
        if(!isNumber(tipInput) && String(tipInput).charAt(tipInput.length - 1) != '.') {
            customTipElement.value = String(tipInput).slice(0, -1);
            
        }
        generateBill();
    });

    tipWrappers.forEach((wrapper) => {
        wrapper.addEventListener('click', (e) => {
            resetTips();
            wrapper.classList.toggle('selected');
            tipInput = wrapper.getAttribute('data-tip');
            generateBill();
        });
    });

    resetInputButton.addEventListener('click', reset);

    //Check if number
    function isNumber(value) {
        return /^[0-9]*\.?[0-9]+$/.test(value);
    }

    function showErrorMessage(id, e) {
        const eleID = `${id}-error-message`;
        document.getElementById(eleID).classList.remove('d-none');
    }

    function hideErrorMessage(id, e) {
        const eleID = `${id}-error-message`;
        document.getElementById(eleID).classList.add('d-none');
    }
    
    // Bill Calculation
    function generateBill() {
        console.log("Bill Input = " + billInput);
        console.log("Tip Input = " + tipInput);
        console.log("Count Input = " + countInput);
        console.log(billInput && tipInput && countInput);
        if(billInput && tipInput && countInput) {
            const tip = (((tipInput / 100) * billInput) / countInput).toFixed(2);
            const bill = (parseFloat(tip) + (billInput / countInput)).toFixed(2);
            updateDOM(tip, bill);
        } else {
            updateDOM('0.00', '0.00');
        }
    }
    // Update Bill Values in DOM
    function updateDOM(tip, bill) {
        tipAmount.textContent = '$' + tip;
        billAmount.textContent = '$' + bill;
    }

    // Resets
    function resetTips() {
        const allWrappers = document.querySelectorAll('.tip-wrapper');
        allWrappers.forEach((item) => {
            item.classList.remove('selected');
        });
        tipInput = 'undefined';
    }

    function reset() {
        resetInputs();
        resetDOM();
        document.getElementById('bill-error-message').classList.add('d-none');
        document.getElementById('people-count-error-message').classList.add('d-none');
        billElement.classList.remove('valid', 'invalid');
        peopleCountElement.classList.remove('valid', 'invalid')
    }

    function resetInputs() {
        billElement.value = '';
        peopleCountElement.value = '';
        customTipElement.value = '';
        resetTips();
    }

    function resetDOM() {
        tipAmount.textContent = '$0.00';
        billAmount.textContent = '$0.00';
    }

    // Reset on load
    reset();
  });