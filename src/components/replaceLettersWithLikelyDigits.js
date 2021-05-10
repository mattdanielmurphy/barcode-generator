const letterToNumber = {
	A: 8,
	B: 8,
	C: 0,
	D: 0,
	E: 8,
	F: 8,
	G: 0,
	H: 8,
	I: 1,
	J: 0,
	K: 8,
	L: 1,
	M: 0,
	N: 8,
	O: 0,
	P: 2,
	Q: 0,
	R: 8,
	S: 5,
	T: 7,
	U: 0,
	V: 0,
	W: 0,
	X: 0,
	Y: 1,
	Z: 0,
}

export function replaceLettersWithLikelyDigits(str) {
	return str
		.split('')
		.map((digit) => {
			if (isNaN(Number(digit))) {
				console.log(digit)
				return letterToNumber[digit]
			} else return digit
		})
		.join('')
}
