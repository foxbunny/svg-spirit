export function setStyleAlias(spritesheet, value, alias) {
	console.log(value, alias)
	if (!alias) delete spritesheet.aliases[value]
	else spritesheet.aliases[value] = alias
}
