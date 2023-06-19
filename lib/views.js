let index = Array.from(document.querySelectorAll('template[id]'))
	.reduce((o, template) =>
			Object.assign(o, {[template.id]: template.content.cloneNode(true).firstElementChild})
		, {})

export default {
	getOrCreateById(templateName, id) {
		let $existing = document.getElementById(id)
		if ($existing) return $existing
		let $new = index[templateName].cloneNode(true)
		if (id) $new.id = id
		return $new
	},
	createFromTemplate(templateName) {
		return index[templateName].cloneNode(true)
	},
}
