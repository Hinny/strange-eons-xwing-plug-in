useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'imageutils' );
useLibrary( 'markup' );

importClass( arkham.component.DefaultPortrait );

// When the script is run directly from the editor, this will load
// the test-lib library, which does the setup tasks that the
// plug-in would have done if it was run. This lets us test and
// develop the plug-in without having to rebuild the plug-in bundle
// and start a new copy of Strange Eons every time we make a change.
if( sourcefile == 'Quickscript' ) {
	useLibrary( 'project:X-wing/resources/x-wing/test-lib.js' );
}
const Xwing = Eons.namedObjects.Xwing;

function create( diy ) {
	diy.version = 1;
	diy.extensionName = 'Xwing.seext';
	diy.faceStyle = FaceStyle.CARD_AND_MARKER;
	diy.transparentFaces = false;
	diy.variableSizedFaces = false;
	diy.transparentFaces = true;
	
	diy.customPortraitHandling = true;
	initPortraits(diy);

	diy.setTemplateKey(0, 'condition-front');
	diy.setTemplateKey(1, 'condition-back');
	diy.setTemplateKey(2, 'condition-marker');

	// set the default name; DIY components have support for a name
	// and comments built in---other attributes are added manually
	diy.name = #xw-condition-name;
	$UniqueCondition = #xw-condition-unique;
	$ConditionText = #xw-condition-text;
}

var portraits = [];

function getPortraitCount() {
	return portraits.length;
}

function getPortrait( index ) {
	if( index < 0 || index >= portraits.length ) {
		throw new Error( 'invalid portrait index: ' + index );
	}
	return portraits[ index ];
}

function createInterface( diy, editor ) {
	var bindings = new Bindings( editor, diy );

	var nameField = textField( '', 30 );
	// tell the DIY which control will hold the component's name
	// (the DIY has special support for a component's name and
	// no binding is required)
	diy.setNameField( nameField );
	
	var uniqueCheckbox = checkBox( @xw-unique );
	bindings.add( 'UniqueCondition', uniqueCheckbox, [0] );
	
	var conditionTextArea = textArea( '', 6, 15, true );
	bindings.add( 'ConditionText', conditionTextArea, [0] );
    
    var symbolsTagTip = tipButton( @xw-symbol-tooltip );
    var headersTagTip = tipButton( @xw-header-tooltip );
    var shipsTagTip = tipButton( @xw-ship-tooltip );
	
	var conditionPortrait = portraitPanel( diy, 0, @xw-condition-portrait-shared );
	var portraitApply = button(@xw-condition-portrait-apply, null, applyPortraits);

	var panel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	panel.place( @xw-condition-name, '', nameField, 'span, growx, wrap' );
	panel.place( uniqueCheckbox, 'wrap para' );
	panel.place( separator(), 'span, growx, wrap para' );
	panel.place( @xw-condition-common, 'span, growx, wrap' );
	panel.place( conditionTextArea, 'span, grow, wrap para' );
	panel.place( symbolsTagTip, '', headersTagTip, '', shipsTagTip, 'span, grow, wrap para' );
	panel.place( separator(), 'span, growx, wrap para' );
	panel.place( conditionPortrait, 'span, growx, wrap' );
	panel.place( portraitApply, 'span, growx, wrap' );
	panel.editorTabScrolling = true;
	panel.addToEditor( editor, @xw-info );

	bindings.bind();

	var frontPortrait = portraitPanel(diy, 1, @xw-condition-portrait-front);
	var backPortrait = portraitPanel(diy, 2, @xw-condition-portrait-back);
	var markerPortrait = portraitPanel(diy, 3, @xw-condition-portrait-marker);

	var imagesPanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	imagesPanel.place(frontPortrait, 'span, growx, wrap' );
	panel.place( separator(), 'span, growx, wrap para' );
	imagesPanel.place(backPortrait, 'span, growx, wrap' );
	panel.place( separator(), 'span, growx, wrap para' );
	imagesPanel.place(markerPortrait, 'span, growx, wrap' );
	imagesPanel.editorTabScrolling = true;
	imagesPanel.addToEditor( editor, @xw-condition-images );
}

var nameBox, textBox;

function createFrontPainter( diy, sheet ) {
	if (sheet.getSheetIndex() != 0) {
		return;
	}
	var stencils = [
		$condition-portrait-stencil,
		$condition-front-template,
		$condition-back-template,
		$condition-marker-template
	];
	for ( let i in stencils ) {
		if (portraits[i]) {
			portraits[i].setClipStencil(ImageUtils.get(stencils[i]));
		}
	}
	applyPortraits();
	nameBox = Xwing.headingBox( sheet, 11.5 );
	nameBox.defaultStyle.add( POSTURE, POSTURE_OBLIQUE );
	textBox = Xwing.abilityBox( sheet, 7 );
	textBox.alignment = textBox.LAYOUT_CENTER | textBox.LAYOUT_TOP;
}

function createBackPainter( diy, sheet ) {
}

function paintFront( g, diy, sheet ) {
	if (sheet.getSheetIndex() == 2) {
		paintMarker( g, diy, sheet );
		return;
	}
	//Draw portrait
	getPortrait(1).paint(g, sheet.getRenderTarget());

	//Draw template
	sheet.paintTemplateImage( g );
	
	nameBox.markupText = diy.name;
	if( $$UniqueCondition.yesNo ) {
		nameBox.markupText = '<uni>' + nameBox.markupText;
	}
	//nameBox.draw( g, makeRegion('name') );
	nameBox.draw( g, makeRegion('name') );

	textBox.markupText = $ConditionText;
	textBox.draw( g, makeRegion('text', 0, 0) );
	
	// Draw Legal text
	sheet.paintImage( g, 'condition-legal');
}

function paintBack( g, diy, sheet ) {
	//Draw portrait
	getPortrait(2).paint(g, sheet.getRenderTarget());
	//Draw template
	sheet.paintTemplateImage( g );
}

function paintMarker( g, diy, sheet ) {
	//Draw portrait
	getPortrait(3).paint(g, sheet.getRenderTarget());
	//Draw template
	sheet.paintTemplateImage( g );
}

function onClear() {
	$UniqueCondition = yes;
}

/**
 * Initialize all portraits
 */
function initPortraits( diy ) {
	portraits[0] = new DefaultPortrait(diy, 'condition');
	portraits[0].setScaleUsesMinimum(false);
	portraits[0].setFacesToUpdate([0, 1, 2]);
	portraits[0].setBackgroundFilled(true);
	portraits[0].setClipping(true);
	portraits[0].installDefault();

	portraits[1] = new DefaultPortrait(portraits[0], 'condition-front');
	portraits[1].setFacesToUpdate([0]);
	portraits[1].installDefault();

	portraits[2] = new DefaultPortrait(portraits[0], 'condition-back');
	portraits[2].setFacesToUpdate([1]);
	portraits[2].installDefault();

	portraits[3] = new DefaultPortrait(portraits[0], 'condition-marker');
	portraits[3].setFacesToUpdate([2]);
	portraits[3].installDefault();
}

/**
 * Apply shared portrait to all other portraits
 */
function applyPortraits() {
	setupPortrait(1, 197, 639, 88);
	setupPortrait(2, 82, 207, 317);
	setupPortrait(3, 0, 0, 270);
}

/**
 * Setup image in portrait based on shared image
 */
function setupPortrait(index, x, y, size) {
	var portrait = getPortrait(index);
	var origin = portrait.getParent();
	var dimension = portrait.getClipDimensions();
	var originSize = origin.getClipDimensions().width;
	var scale = size / originSize;
	var originOffset = origin.getPanX() * scale * origin.getScale();
	portrait.setScale(scale * origin.getScale());
	portrait.setPanX(x + (size - dimension.width) / 2 + origin.getPanX() * scale);
	portrait.setPanY(y + (size - dimension.height) / 2 + origin.getPanY() * scale);
}

/**
 * Returns a region for this component. The nametag is
 * the middle part of the region name, without the
 * 'char-' prefix or '-region' suffix.
 */
function makeRegion( nametag, xIncrement, yIncrement, wIncrement, hIncrement ) {
	var value = $('condition-' + nametag + '-region'),
		args = [];
	if( value == null ) {
		throw new Error( 'region not defined: ' + nametag );
	}
	args = value.split(',');
	for ( var i = 1; i < arguments.length; i++ ) {
		if (arguments[i] != 0) {
			args[i - 1] = parseInt(args[i - 1]) + parseInt(arguments[i]);
		}
	}
	return new Region( args.join(',') );
}

function onRead( diy, ois ) {
	for ( let i = 0; i < 4; i++ ) {
		portraits[i] = ois.readObject();
	}
}
function onWrite( diy, oos ) {
	for ( let i = 0; i < 4; i++ ) {
		oos.writeObject( portraits[i] );
	}
}

// This is part of the diy library; calling it from within a
// script that defines the needed functions for a DIY component
// will create the DIY from the script and add it as a new editor;
// however, saving and loading the new component won't work correctly.
// This means you can test your script directly by running it without
// having to create a plug-in (except to make any required resources
// available).
if( sourcefile == 'Quickscript' ) {
	testDIYScript();
}