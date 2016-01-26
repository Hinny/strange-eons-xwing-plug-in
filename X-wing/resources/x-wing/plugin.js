/*
 * plugin.js
 */

useLibrary( 'extension' );
importClass( gamedata.SymbolVariantUtilities );


// Added this code just to make register game work...
const template = new JavaAdapter(
	AbstractExpansionSymbolTemplate,
	{
		// In our example game, there is only one variant of each expansion symbol,
		// which is described as "Golden".
		getVariantCount: function getSymbolCount() {
			return 1;
		},
		// Returns the "Golden" name for the symbol style.
		getVariantName: function getSymbolName( n ) {
			this.checkIndex( n );
			return 'Golden';
		},
		// Returns a standard icon that features a characteristic colour (#e1b733)
		// from the "Golden" symbol design.
		getVariantIcon: function getVariantIcon( n ) {
			this.checkIndex( n );
			// the icon is only created if actually requested
			if( this.icon == null ) {
				this.icon = SymbolVariantUtilities.createDefaultVariantIcon( 0xe1b733 );
			}
			return this.icon;
		},
		icon: null,
		// returns the sample symbol
		getDefaultSymbol: function getDefaultSymbol( n ) {
			this.checkIndex( n );
			return image( 'template-sample-symbol' );
		},
		// this game draws expansion symbols itself; see register-game-diy.js
		isCustomDrawn: function isCustomDrawn() {
			return true;
		},
		// since there is only one symbol variant, this function rejects
		// all indices other than 0
		checkIndex: function checkIndex( n ) {
			if( n != 0 ) throw new Error( 'invalid symbol index: ' + n );
		}
	}
);


/**
 * Called when the plug-in is loaded. This is the entry point for
 * extension plug-ins; whatever you want the plug-in to do should
 * be included here.
 */
function initialize() {
	// Note that if this returns false, Strange Eons will stop loading
	// the plug-in. You might do this, for example, if your plug-in
	// requires a game that is not currently installed.
		// Try to set up the plug-in; if anything throws an exception we
	// will return false, which tells Strange Eons not to conrinue
	// loading the plug-in.
	try {
		
		// load localized strings
		Language.getInterface().addStrings( 'x-wing/text/ui' );
		Language.getInterface().addStrings( 'x-wing/text/common' );
		Language.getGame().addStrings( 'x-wing/text/game' );
		Language.getGame().addStrings( 'x-wing/text/common' );

		// create the Xwing named object
		useLibrary( 'res://x-wing/namedobj.js' );
		const Xwing = Eons.namedObjects.Xwing;

		// register Talisman as a game supported by Strange Eons
		Game.register('XW', @xw_game, #xw_game,	ImageUtils.get( 'x-wing/plugin.png' ), template);
				
		// now that the game is regsietered, we can add the
		// default settings to use for new cards
		Game.get( 'XW' ).masterSettings.addSettingsFrom( 'x-wing/base.settings' );
				
		ClassMap.add( 'x-wing/base.classmap' );

	} catch( ex ) {
		Eons.log.severe( 'X-wing plug-in failed to start' );
		Error.handleUncaught( ex );
		return false;
	}
	return true;
}

/**
 * Returns a short name for the plug-in.
 */
function getName() {
	return @xw-plug-name;
}


/**
 * Returns a brief description of the plug-in.
 */
function getDescription() {
	return @xw-plug-desc;
}


/**
 * Returns a version number for the plug-in.
 */
function getVersion() {
	return 1.0;
}


/**
 * This function is called when the plug-in is being unloaded.
 * (Extension plug-ins are unloaded during application shutdown.)
 *
 * If this function is empty, you can safely delete it from your script.
 */
function unload() {
}
