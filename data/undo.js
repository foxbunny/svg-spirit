export default function createUndo() {
	return window.__undo = {
		stack: [{
			icons: [],
		}],
		index: 0,
	}
}
