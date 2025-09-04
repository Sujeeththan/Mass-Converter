function converter() {
    const kilograms = parseFloat(document.getElementById("text").value);
    const from = parseFloat(document.getElementById("fromunit").value);
    const to = document.getElementById("tounit").value;

    const result = (kilograms * fromunit / tounit).toFixed(3);
    // console.log(result);
    document.getElementById("result").value = result;

    if (from == "Kilograms"  && to == "Grams") {
        
    }
};