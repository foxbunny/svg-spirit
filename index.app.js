import createUndo from './data/undo.js'
import addIcons from './features/add-icons.feat.js'
import aliasStyle from './features/alias-style.feat.js'
import deleteColor from './features/delete-color.feat.js'
import deleteIcons from './features/delete-icons.feat.js'
import deleteStrokeWidth from './features/delete-stroke-width.feat.js'
import downloadSpritesheet from './features/download-spritesheet.feat.js'
import editColor from './features/edit-color.feat.js'
import editStrokeWidth from './features/edit-stroke-width.feat.js'
import seeIconList from './features/see-icon-list.feat.js'
import seeColorList from './features/see-color-list.feat.js'
import createSpritesheet from './data/spritesheet.js'
import seeStrokeWidthList from './features/see-stroke-width-list.feat.js'
import selectIcons from './features/select-icons.feat.js'
import toggleBetweenListAndTileView from './features/toggle-between-list-and-tile-view.feat.js'
import toggleDarkLightMode from './features/toggle-dark-light-mode.feat.js'
import toggleOpenSettings from './features/toggle-open-settings.feat.js'
import undoAndRedo from './features/undo-and-redo.feat.js'
import * as bus from './lib/bus.js'
import views from './lib/views.js'

let context = {
	bus: bus.create(),
	views,
	spritesheet: createSpritesheet(),
	undo: createUndo(),
};

[
	addIcons,
	aliasStyle,
	deleteColor,
	deleteIcons,
	deleteStrokeWidth,
	downloadSpritesheet,
	editColor,
	editStrokeWidth,
	seeColorList,
	seeIconList,
	seeStrokeWidthList,
	selectIcons,
	toggleBetweenListAndTileView,
	toggleDarkLightMode,
	toggleOpenSettings,
	undoAndRedo,
]
	.forEach(feature => feature(context))
