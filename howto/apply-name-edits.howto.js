export default function applyNameEdits(nameEdits) {
	let editFns = nameEdits
		.filter(edit => edit.text)
		.map(edit => {
			switch (edit.type) {
				case 'rp':
					return createPrefixRemover(edit.text)
				case 'ap':
					return createPrefixAdder(edit.text)
				case 'rs':
					return createSuffixRemover(edit.text)
				case 'as':
					return createSuffixAdder(edit.text)
				default:
					throw Error(`Invalid edit type ${edit.type}`)
			}
		})
	return value => editFns.reduce((s, fn) => {
		return fn(s)
	}, value)
}

function regexSafe(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function createPrefixRemover(text) {
	let rxp = new RegExp('^' + regexSafe(text))
	return name => name.replace(rxp, '')
}

function createPrefixAdder(text) {
	return name => text + name
}

function createSuffixRemover(text) {
	let rxp = new RegExp(regexSafe(text) + '$')
	return name => name.replace(rxp, '')
}

function createSuffixAdder(text) {
	return name => name + text
}
