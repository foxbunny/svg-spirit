import Events from '../data/events.js'

export default function makeUndoable(context, eventName) {
	requestIdleCallback(() => {
		context.bus.send(Events.registerUndoableEvent, eventName)
	})
}
