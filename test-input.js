const correctData = `
068700101403
068700122002
068700125003
068700130007
068700123405
068700112003
068700115004
068700120008
068700116704
068700102998
068700011016
068700011078
068700011030
068700011809
068700077746
`

const toolboxProResult = `
D68700101403
068700122002
068700125003
DC8700130007
068700123405
068700112003
068700115004
068700120008
068700116704
068700102998
068700011016
068700011078
D68700011030
068700011809
068700077746
`
const prizmoResult = `
068700101403
068700122002
068700125003
068700130007
068700123405
068700112003
068700115004
06870012008
048700116704
068700102998
068700011016
068700011078
`

function testData(result) {
	result = result.trim().split('\n')
	const correctUPCs = []
	const incorrectUPCs = []
	correctData
		.trim()
		.split('\n')
		.forEach((upc, i) => {
			if (result[i]) {
				if (result[i] === upc) correctUPCs.push(upc)
				else incorrectUPCs.push(upc)
			}
		})
	const numCorrect = correctUPCs.length
	const totalConsidered = correctUPCs.length + incorrectUPCs.length
	return `${Math.round(
		100 * (numCorrect / totalConsidered),
	)}% correct (${numCorrect} / ${totalConsidered})`
}

console.log('toolbox:')
console.log(testData(toolboxProResult))

console.log('\nprizmo:')
console.log(testData(prizmoResult))
