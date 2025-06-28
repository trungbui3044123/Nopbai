function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

let a = [];
let b = [];
let n;

do {
    n = parseInt(prompt("Nhập số lượng phần tử mảng a (n <= 50):"));
} while (isNaN(n) || n <= 0 || n > 50);


for (let i = 0; i < n; i++) {
    let value = parseInt(prompt(`Nhập phần tử thứ ${i + 1}:`));
    a.push(value);
    if (isPrime(value)) {
        b.push(value);
    }
}


console.log(" a: " + a.join(", ") + "<br>");
console.log(" b (số nguyên tố): " + b.join(", "));
