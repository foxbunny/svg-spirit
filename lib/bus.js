export function create() {
	let eventTarget = new EventTarget()

	return {
		send(eventType, data) {
			eventTarget.dispatchEvent(new CustomEvent(eventType, { detail: data }))
		},
		on(eventType, callback) {
			callback.actual = ev => callback(ev.detail)
			eventTarget.addEventListener(eventType, callback.actual)
		},
		off(eventType, callback) {
			if (typeof callback.actual === 'function') callback = callback.actual
			eventTarget.removeEventListener(eventType, callback)
		},
	}
}
