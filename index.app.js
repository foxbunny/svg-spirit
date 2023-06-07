import createUndo from './data/undo.js'
import addIcons from './features/add-icons.feat.js'
import deleteColor from './features/delete-color.feat.js'
import deleteStrokeWidth from './features/delete-stroke-width.feat.js'
import downloadSpritesheet from './features/download-spritesheet.feat.js'
import editColor from './features/edit-color.feat.js'
import editStrokeWidth from './features/edit-stroke-width.feat.js'
import seeIconList from './features/see-icon-list.feat.js'
import seeColorList from './features/see-color-list.feat.js'
import createSpritesheet from './data/spritesheet.js'
import seeStrokeWidthList from './features/see-stroke-width-list.feat.js'
import selectIcons from './features/select-icons.feat.js'
import undoAndRedo from './features/undo-and-redo.feat.js'
import * as bus from './services/bus.service.js'
import views from './services/views.service.js'

let context = {
	bus: bus.create(),
	views,
	spritesheet: createSpritesheet(),
	undo: createUndo()
}

undoAndRedo(context)

addIcons(context)
seeIconList(context)
selectIcons(context)

seeColorList(context)
deleteColor(context)
editColor(context)

seeStrokeWidthList(context)
deleteStrokeWidth(context)
editStrokeWidth(context)

downloadSpritesheet(context)
