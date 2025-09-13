const dom = document;
const numinput = dom.getElementById("roman-num-input");
const targetbox = dom.getElementById("result");
function romanToArabic(roman) {
    const romanMap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let total = 0;

    for (let i = 0; i < roman.length; i++) {
        const current = romanMap[roman[i]];
        const next = romanMap[roman[i + 1]];

        // If the current value is less than the next value, subtract it
        if (next && current < next) {
            total -= current;
        } else {
            total += current;
        }
    }

    return total;
}
function isValidRoman(roman) {
    // Matches valid Roman numerals from 1 to 3999
    const romanRegex = new RegExp(
  '^(M{0,3})(CM|CD|D?C{0,3})' +
  '(XC|XL|L?X{0,3})' +
  '(IX|IV|V?I{0,3})$',
  'i'
);
    return romanRegex.test(roman);
}

function highlightRomanErrorsInline(roman) {
    roman = roman.toUpperCase();

    const validSymbols = ["M", "D", "C", "L", "X", "V", "I"];
    const maxRepeats = { M: 3, C: 3, X: 3, I: 3, D: 1, L: 1, V: 1 };
    const validSubtractive = ["IV", "IX", "XL", "XC", "CD", "CM"];

    let resultHTML = "";
    let i = 0;
    let repeatCount = 1;

    while (i < roman.length) {
        const char = roman[i];
        const nextChar = roman[i + 1];

        // 1. Invalid character
        if (!validSymbols.includes(char)) {
            resultHTML += `<span style="background-color: yellow; color: red;">${char}</span><small style="color: gray;"> (Not a Roman numeral)</small>`;
            i++;
            continue;
        }

        // 2. Check repeats
        if (nextChar === char) {
            repeatCount++;
            if (repeatCount > maxRepeats[char]) {
                resultHTML += `<span style="background-color: yellow; color: red;">${char}</span><small style="color: gray;"> (Too many repeats — max ${maxRepeats[char]})</small>`;
                i++;
                continue;
            }
        } else {
            repeatCount = 1;
        }

        // 3. Check subtractive notation
        if (nextChar && validSymbols.includes(nextChar)) {
            const pair = char + nextChar;
            const charValue = romanToArabic(char);
            const nextValue = romanToArabic(nextChar);

            if (charValue < nextValue) {
                if (!validSubtractive.includes(pair)) {
                    resultHTML += `<span style="background-color: yellow; color: red;">${char}</span><small style="color: gray;"> (Invalid subtractive pair: ${pair})</small>`;
                    i++;
                    continue;
                } else {
                    // Valid subtractive pair — add both and skip next
                    resultHTML += pair;
                    i += 2;
                    continue;
                }
            }
        }

        // If we got here, it's a valid single symbol
        resultHTML += char;
        i++;
    }

    return resultHTML;
}
function suggestCorrection(roman) {
    roman = roman.toUpperCase();

    // Remove invalid characters
    let cleaned = roman.replace(/[^MDCLXVI]/g, "");

    // Fix common illegal subtractive pairs
    const fixes = {
        IC: "XCIX",
        IL: "XLIX",
        ID: "CDXCIX",
        IM: "CMXCIX",
        VX: "V",
        XD: "CDXC",
        XM: "CM"
    };

    for (let bad in fixes) {
        if (cleaned.includes(bad)) {
            cleaned = cleaned.replace(bad, fixes[bad]);
        }
    }

    // If cleaned version is valid, return it
    if (isValidRoman(cleaned)) {
        return cleaned;
    }

    // Otherwise, no confident suggestion
    return null;
}


numinput.addEventListener("input", () => {
    const roman = numinput.value.toUpperCase();

    if (isValidRoman(roman)) {
        targetbox.textContent = romanToArabic(roman);
    } else {
        const highlighted = highlightRomanErrorsInline(roman);
        const suggestion = suggestCorrection(roman);

        if (suggestion) {
            targetbox.innerHTML = `${highlighted} ❌ Invalid<br>
                💡 Did you mean: <strong style="cursor:pointer; color:blue; text-decoration:underline;" id="suggestion">${suggestion}</strong> (${romanToArabic(suggestion)})`;

            const suggestionEl = document.getElementById("suggestion");
            suggestionEl.addEventListener("click", () => {
                numinput.value = suggestion;
                targetbox.textContent = romanToArabic(suggestion);

                // Flash green for confirmation
                numinput.style.transition = "background-color 0.3s";
                numinput.style.backgroundColor = "#b6fcb6";
                setTimeout(() => {
                    numinput.style.backgroundColor = "";
                }, 500);
            });
        } else {
            targetbox.innerHTML = `${highlighted} ❌ Invalid<br>
                No confident suggestion available.`;
        }
    }
});
