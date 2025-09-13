# ubiquitous-pancake-romnum-converter
Converts romnums to arabics with a teacher.
full:
🏛 Roman Numeral Converter — Current Feature Set
Core Conversion
Roman → Arabic conversion with correct subtractive notation handling (MCMXCIX → 1999).

Case‑insensitive input (mcmxcix works the same as MCMXCIX).

Validation
Detects invalid characters (anything outside MDCLXVI).

Flags illegal subtractive pairs (IC, IL, XD, etc.).

Enforces repeat limits (I, X, C, M max 3 in a row; V, L, D max 1).

Error Highlighting
Highlights every mistake in the numeral, not just the first.

Works for:

Wrong letters

Wrong order

Too many repeats

Inline explanations for each error (mobile‑friendly, no hover needed).

Auto‑Correction
Suggests the closest valid numeral when input is invalid.

Fixes common mistakes automatically (MIM → MCMXCIX).

Shows both the corrected numeral and its Arabic value.

Interactive UX
Suggestion is clickable — one tap fills the input and converts instantly.

Green flash animation confirms the correction was applied.

Works seamlessly with your UI library’s styling.

Educational Value
Acts like a Roman numeral grammar checker — teaches rules as you type.

Inline feedback makes it clear why something is wrong.

Encourages learning through correction, not just rejection.
