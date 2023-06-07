let index = Array.from(document.querySelectorAll('template[id]'))
	.reduce((o, template) =>
			Object.assign(o, {[template.id]: template.content.cloneNode(true).firstElementChild})
		, {})

export default {
	getOrCreateById(templateName, id) {
		return document.getElementById(id)
			|| Object.assign(index[templateName].cloneNode(true), {id})
	},
	createFromTemplate(templateName) {
		return index[templateName].cloneNode(true)
	},
}
