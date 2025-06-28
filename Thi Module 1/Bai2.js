
function areFractionsEqual(numerator1, denominator1, numerator2, denominator2) {
    return numerator1 * denominator2 === numerator2 * denominator1;
}


let numerator1 = parseInt(prompt("Nhập tử số phân số thứ nhất:"));
let denominator1 = parseInt(prompt("Nhập mẫu số phân số thứ nhất:"));
let numerator2 = parseInt(prompt("Nhập tử số phân số thứ hai:"));
let denominator2 = parseInt(prompt("Nhập mẫu số phân số thứ hai:"));

if (denominator1 === 0 || denominator2 === 0) {
    alert("Mẫu số không được bằng 0!");
} else {
    let result = areFractionsEqual(numerator1, denominator1, numerator2, denominator2);
    document.write("Hai phân số " + numerator1 + "/" + denominator1 + " và " +
                   numerator2 + "/" + denominator2 + " bằng nhau? " + result);
}
