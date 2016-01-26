/*
 * test-lib.js
 *
 * The DIY scripts in this plug-in import this library
 * when they are run directly from a script editor.
 */

// Load our settings files. If some version of the plug-in is running,
// then the Talisman game will be installed and we will add the settings
// to the game's master settings. Otherwise, we will add them as temporary
// global settings.

importClass( gamedata.Game );

var settings;
var xwingGame = Game.get( 'XW' );
if( xwingGame != null ) {
	settings = xwingGame.masterSettings;
} else {
	settings = Settings.shared;
}
settings.addSettingsFrom( 'x-wing/base.settings' );

//// If we can find the 'HD' plug-in, either in another project resources
//// folder or as an installed plug-in, load the HD keys, too.
//if( ResourceKit.composeResourceURL( 'talisman/hd.settings' ) != null ) {
//	settings.addSettingsFrom( 'talisman/hd.settings' );
//}

// If the extension plug-in isn't installed, then the Talisman
// named object might not exist, so we'll create it now.
// Note that we load it using a project: URL instead of the
// res:// URL we'd use to load it under normal circumstances.
// That's so that we can change the script while the plug-in
// is installed. When the plug-in is installed, the res://
// URL will resolve to the copy of the script in the plug-in,
// so changes won't get picked up unless we make the plug-in,
// install it, and restart (or else run the bundle in test mode).
useLibrary( 'project:X-wing/resources/x-wing/namedobj.js' );


// Load our string tables. When a string table is loaded
// directly from a project: source, it is allowed to replace
// strings with the same keys
var projBase = 'project:X-wing/resources/x-wing/text/';
Language.getGame().addStrings( projBase + 'game' );
Language.getGame().addStrings( projBase + 'common' );
Language.getInterface().addStrings( projBase + 'ui' );
Language.getInterface().addStrings( projBase + 'common' );
