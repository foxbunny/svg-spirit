export default function getSvgFromFiles(fileList) {
	return Promise.all(
		Array.from(fileList)
			.map(file => {
				let reader = new FileReader()
				return new Promise((resolve, reject) => {
					reader.onload = () =>
						resolve({name: file.name, svg: reader.result})
					reader.onerror = reject
					reader.readAsText(file)
				})
			})
	)
}
