import minEditDistance from '../howto/find-the-minimal-edit-distance.howto.js'

let EVENTS = {
	registerUndoableEvent: 'registerUndoableEvent',
	spritesheetUpdated: 'spritesheetUpdated',
	iconsAdded: 'iconsAdded',
	resetState: 'resetState',
	colorDeleted: 'colorDeleted',
	colorEdited: 'colorEdited',
	strokeWidthDeleted: 'strokeWidthDeleted',
	strokeWidthEdited: 'strokeWidthEdited',
}
let MIN_EDIT_DISTANCE_FOR_SIMILARITY = 7 // derived by manually testing

export default new Proxy(EVENTS, {
	get(target, key) {
		if (target.hasOwnProperty(key)) return key

		let eventNames = Object.keys(target)
		let similar = Object.keys(target)
			.map(eventType => ({
				eventType,
				editDist: minEditDistance(eventType, key),
			}))
			.filter(ev => ev.editDist < MIN_EDIT_DISTANCE_FOR_SIMILARITY)
			.sort((a, b) => a.editDist - b.editDist)
			.slice(0, 2)
			.map(ev => `"${ev.eventType}"`)
		let msg = `There are no events that match "${key}"`
		if (similar.length) msg += ` Did you mean ${similar.join(' or ')}?`
		else msg += ` Valid events are\n\n${eventNames.join('\n')}`
		console.warn(msg)
	},
})
