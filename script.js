// Show Caesar Cipher Section
function showCaesar() {
  document.getElementById("caesar").style.display = "block";
  document.getElementById("playfair").style.display = "none";
}

// Show Playfair Cipher Section
function showPlayfair() {
  document.getElementById("caesar").style.display = "none";
  document.getElementById("playfair").style.display = "block";
}

// Caesar Cipher
function encryptCaesar() {
  let text = document.getElementById("caesarInput").value;
  let shift = parseInt(document.getElementById("shift").value);
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char.match(/[a-z]/i)) {
      let code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }
    result += char;
  }
  document.getElementById("caesarResult").innerText = "Encrypted: " + result;
}

function decryptCaesar() {
  let text = document.getElementById("caesarInput").value;
  let shift = parseInt(document.getElementById("shift").value);
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char.match(/[a-z]/i)) {
      let code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      }
    }
    result += char;
  }
  document.getElementById("caesarResult").innerText = "Decrypted: " + result;
}

// Playfair Cipher Helper Functions
function generateMatrix(keyword) {
  keyword = keyword.toUpperCase().replace(/J/g, "I");
  let matrix = [];
  let seen = new Set();
  let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

  keyword.split("").forEach(c => {
    if (!seen.has(c) && alphabet.includes(c)) {
      seen.add(c);
      matrix.push(c);
    }
  });

  alphabet.split("").forEach(c => {
    if (!seen.has(c)) {
      seen.add(c);
      matrix.push(c);
    }
  });

  let grid = [];
  for (let i = 0; i < 5; i++) {
    grid.push(matrix.slice(i * 5, i * 5 + 5));
  }
  return grid;
}

function findPosition(matrix, char) {
  for (let i = 0; i < 5; i++) {
    let j = matrix[i].indexOf(char);
    if (j !== -1) return [i, j];
  }
}

// ✅ Modified to insert 'X' between duplicate letters and add 'Z' at the end if needed
function formatText(text) {
  text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  let formatted = "";
  let i = 0;

  while (i < text.length) {
    let a = text[i];
    let b = text[i + 1];

    if (a === b) {
      formatted += a + "X";
      i++;
    } else if (b) {
      formatted += a + b;
      i += 2;
    } else {
      formatted += a + "Z";
      i++;
    }
  }

  return formatted.match(/.{1,2}/g) || [];
}

// Playfair Cipher Encrypt
function encryptPlayfair() {
  let text = document.getElementById("playfairInput").value;
  let keyword = document.getElementById("keyword").value;
  let matrix = generateMatrix(keyword);
  let pairs = formatText(text);
  let result = "";

  pairs.forEach(pair => {
    let [a, b] = pair;
    let [rowA, colA] = findPosition(matrix, a);
    let [rowB, colB] = findPosition(matrix, b);

    if (rowA === rowB) {
      result += matrix[rowA][(colA + 1) % 5] + matrix[rowB][(colB + 1) % 5];
    } else if (colA === colB) {
      result += matrix[(rowA + 1) % 5][colA] + matrix[(rowB + 1) % 5][colB];
    } else {
      result += matrix[rowA][colB] + matrix[rowB][colA];
    }
  });

  document.getElementById("playfairResult").innerText = "Encrypted: " + result;
}

// Playfair Cipher Decrypt
function decryptPlayfair() {
  let text = document.getElementById("playfairInput").value;
  let keyword = document.getElementById("keyword").value;
  let matrix = generateMatrix(keyword);
  let pairs = formatText(text);
  let result = "";

  pairs.forEach(pair => {
    let [a, b] = pair;
    let [rowA, colA] = findPosition(matrix, a);
    let [rowB, colB] = findPosition(matrix, b);

    if (rowA === rowB) {
      result += matrix[rowA][(colA + 4) % 5] + matrix[rowB][(colB + 4) % 5];
    } else if (colA === colB) {
      result += matrix[(rowA + 4) % 5][colA] + matrix[(rowB + 4) % 5][colB];
    } else {
      result += matrix[rowA][colB] + matrix[rowB][colA];
    }
  });

  document.getElementById("playfairResult").innerText = "Decrypted: " + result;
}
