const amountInput = document.getElementById('amount');
const fromUnitSelect = document.getElementById('from-unit');
const toUnitSelect = document.getElementById('to-unit');
const swapBtn = document.getElementById('swap-btn');
const resultText = document.getElementById('result-text');
const resultUnit = document.getElementById('result-unit');

// Conversion rates to base unit (grams)
const ratesToGram = {
    kg: 1000,
    g: 1,
    mg: 0.001,
    lb: 453.59237,
    oz: 28.34952
};

function convert() {
    const amount = parseFloat(amountInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    if (isNaN(amount)) {
        resultText.textContent = '0';
        resultUnit.textContent = toUnit;
        return;
    }

    // Convert to grams first, then to target unit
    const valueInGrams = amount * ratesToGram[fromUnit];
    const convertedValue = valueInGrams / ratesToGram[toUnit];

    // Format output (limit decimals if necessary, but keep precision for small numbers)
    let formattedResult;
    if (Number.isInteger(convertedValue)) {
        formattedResult = convertedValue;
    } else {
        // Avoid scientific notation for reasonable numbers, limit to 6 decimals
        formattedResult = parseFloat(convertedValue.toFixed(6)); 
    }

    resultText.textContent = formattedResult;
    resultUnit.textContent = toUnit;
}

function swapUnits() {
    const temp = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = temp;
    convert();
    
    // Animate button spin
    swapBtn.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        swapBtn.style.transform = 'none'; // logic handles css hover override appropriately? actually css handles hover. 
        // For click, we might want a class, but the CSS hover handles the visual check. 
        // Let's just rely on the convert update for now. 
        // To make it distinct from hover:
        swapBtn.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(180deg)' }
        ], {
            duration: 300,
            easing: 'ease-in-out'
        });
    }, 0);
}

// Event Listeners
amountInput.addEventListener('input', convert);
fromUnitSelect.addEventListener('change', convert);
toUnitSelect.addEventListener('change', convert);
swapBtn.addEventListener('click', swapUnits);

// Initialize
convert();