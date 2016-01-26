useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'imageutils' );
useLibrary( 'markup' );

importClass( arkham.diy.ListItem );
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
	diy.version = 2;
	diy.extensionName = 'Xwing.seext';
	diy.faceStyle = FaceStyle.TWO_FACES;
	diy.transparentFaces = false;
	diy.variableSizedFaces = false;
	diy.customPortraitHandling = false;
	
	diy.frontTemplateKey = 'upgrade-front';
	diy.backTemplateKey = 'upgrade-back';

	diy.portraitKey = 'upgrade';
	diy.portraitBackgroundFilled = false;
	diy.portraitScaleUsesMinimum = false;
	diy.portraitClipping = false;

	// install the example pilot
	diy.name = #xw-upgrade-name;
	$UpgradeType = #xw-upgrade-type;
	$UniqueUpgrade = #xw-upgrade-unique;
	$DoubleIcon = #xw-upgrade-double;
	$EnergyLimit = #xw-upgrade-energylimit;
	$SecondaryWeapon = #xw-upgrade-weapon;
	$AttackValue = #xw-upgrade-attack;
	$Range = #xw-upgrade-range;
	$FocusRequired = #xw-upgrade-focus;
	$LockRequired = #xw-upgrade-lock;
	$Restriction = #xw-upgrade-restriction;
	$Action = #xw-upgrade-action;
	$Energy = #xw-upgrade-energy;
	$Text = #xw-upgrade-text;
	$PointCost = #xw-upgrade-cost;
}

function createInterface( diy, editor ) {
	bindings = new Bindings( editor, diy );

	// Main Panel	
	nameField = textField( 'X', 30 );
	
	upgradeItems = [];
	upgradeItems[0] = ListItem( 'elite', @xw-upgrade-elite );
	upgradeItems[1] = ListItem( 'system', @xw-upgrade-system );
	upgradeItems[2] = ListItem( 'cannon', @xw-upgrade-cannon );
	upgradeItems[3] = ListItem( 'turret', @xw-upgrade-turret );
	upgradeItems[4] = ListItem( 'torpedo', @xw-upgrade-torpedo );
	upgradeItems[5] = ListItem( 'missile', @xw-upgrade-missile );
	upgradeItems[6] = ListItem( 'bomb', @xw-upgrade-bomb );
	upgradeItems[7] = ListItem( 'astromech', @xw-upgrade-astromech );
	upgradeItems[8] = ListItem( 'salvaged', @xw-upgrade-salvaged );
	upgradeItems[9] = ListItem( 'crew', @xw-upgrade-crew );
	upgradeItems[10] = ListItem( 'illicit', @xw-upgrade-illicit );
	upgradeItems[11] = ListItem( 'tech', @xw-upgrade-tech );
	upgradeItems[12] = ListItem( 'hardpoint', @xw-upgrade-hardpoint );
	upgradeItems[13] = ListItem( 'team', @xw-upgrade-team );
	upgradeItems[14] = ListItem( 'cargo', @xw-upgrade-cargo );
	upgradeItems[15] = ListItem( 'modification', @xw-upgrade-modification );
	upgradeItems[16] = ListItem( 'title', @xw-upgrade-title );
	typeBox = comboBox( upgradeItems );
	bindings.add( 'UpgradeType', typeBox, [0,1] );

	uniqueCheckbox = checkBox( @xw-unique );
	bindings.add( 'UniqueUpgrade', uniqueCheckbox, [0] );
		
	doubleCheckbox = checkBox( @xw-double );
	bindings.add( 'DoubleIcon', doubleCheckbox, [0] );

	energyItems = [ '-', '1', '2', '3', '4', '5', '6', '7', '8' , '9', '10', '+1', '+2', '+3', '+4', '+5'];
	energyLimitBox = comboBox( energyItems );
	bindings.add( 'EnergyLimit', energyLimitBox, [0] );

	weaponCheckbox = checkBox( @xw-weapon );
	bindings.add( 'SecondaryWeapon', weaponCheckbox, [0] );
	
	attackItems = [ '0', '1', '2', '3', '4', '5', '6', '7', '8' ];
	attackValueBox = comboBox( attackItems );
	bindings.add( 'AttackValue', attackValueBox, [0] );

	rangeItems = [];
	rangeItems[0] = ListItem( '-', '-' );
	rangeItems[1] = ListItem( '1', '1' );
	rangeItems[2] = ListItem( '1-2', '1-2' );
	rangeItems[3] = ListItem( '1-3', '1-3' );
	rangeItems[4] = ListItem( '1-4', '1-4' );
	rangeItems[5] = ListItem( '1-5', '1-5' );
	rangeItems[6] = ListItem( '2', '2' );
	rangeItems[7] = ListItem( '2-3', '2-3' );
	rangeItems[8] = ListItem( '2-4', '2-4' );
	rangeItems[9] = ListItem( '2-5', '2-5' );
	rangeItems[10] = ListItem( '3', '3' );
	rangeItems[11] = ListItem( '3-4', '3-4' );
	rangeItems[12] = ListItem( '3-5', '3-5' );
	rangeItems[13] = ListItem( '4', '4' );
	rangeItems[14] = ListItem( '4-5', '4-5' );
	rangeItems[15] = ListItem( '5', '5' );
			
	rangeBox = comboBox( rangeItems );
	bindings.add( 'Range', rangeBox, [0] );
	
	requiredFocusCheckbox = checkBox( @xw-required-focus );
	bindings.add( 'FocusRequired', requiredFocusCheckbox, [0] );
	
	requiredLockCheckbox = checkBox( @xw-required-lock );
	bindings.add( 'LockRequired', requiredLockCheckbox, [0] );
	
	restrictionItems = [ #xw-restriction-limited, #xw-restriction-rebel, #xw-restriction-imperial, #xw-restriction-scum, #xw-restriction-small, #xw-restriction-large, #xw-restriction-huge ];
	upgradeRestrictionField = autocompletionField( restrictionItems );
	bindings.add( 'Restriction', upgradeRestrictionField, [0] );
	
	actionCheckbox = checkBox( @xw-action );
	bindings.add( 'Action', actionCheckbox, [0] );

	energyCheckbox = checkBox( @xw-energy-action );
	bindings.add( 'Energy', energyCheckbox, [0] );
		
	upgradeTextArea = textArea( '', 6, 15, true );
	bindings.add( 'Text', upgradeTextArea, [0] );	
	specialSymbolsTip = tipButton( @xw-text-tooltip );

	pointCostSpinner = spinner( -10, 30, 1, 1 );
	bindings.add( 'PointCost', pointCostSpinner, [0] );
	

	mainPanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	mainPanel.setTitle( @xw-info );
	mainPanel.place( @xw-upgradename, '', nameField, 'span, growx, wrap' );
	mainPanel.place( uniqueCheckbox, 'wrap para' );
	mainPanel.place( @xw-upgradetype, '', typeBox, 'span, growx, wrap para' );
	mainPanel.place( doubleCheckbox, 'wrap para' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( @xw-energylimit, '', energyLimitBox, 'wmin 70, span 2, wrap para' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( weaponCheckbox, 'wrap para' );
	mainPanel.place( requiredFocusCheckbox, '', requiredLockCheckbox, 'wrap para' );
	mainPanel.place( @xw-attackvalue, '', attackValueBox, 'wmin 70, span 2, wrap' );
	mainPanel.place( @xw-range, '', rangeBox, 'wmin 70, span 2, wrap para' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( @xw-upgraderestriction, '', upgradeRestrictionField, 'span, growx, wrap' );
	mainPanel.place( @xw-upgradetext, '', actionCheckbox, '', energyCheckbox, 'span, growx, wrap' );
	mainPanel.place( upgradeTextArea, 'span, grow, wrap para' );
	mainPanel.place( specialSymbolsTip, 'span, grow, wrap para' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( @xw-pointcost, 'span 2', pointCostSpinner, 'wrap para');
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.editorTabScrolling = true;
	
	diy.setNameField( nameField );
	
	function actionFunction( actionEvent )
	{
		try {
			if( weaponCheckbox.selected ) {
				attackValueBox.setEnabled(true);
				rangeBox.setEnabled(true);
				requiredFocusCheckbox.setEnabled(true);
				requiredLockCheckbox.setEnabled(true);
				actionCheckbox.setEnabled(false);
				energyCheckbox.setEnabled(false);
			} else {
				if( actionCheckbox.selected ) {
					actionCheckbox.setEnabled(true);
					energyCheckbox.setEnabled(false);
				} else if( energyCheckbox.selected ) {
					actionCheckbox.setEnabled(false);
					energyCheckbox.setEnabled(true);
				} else {
					actionCheckbox.setEnabled(true);
					energyCheckbox.setEnabled(true);
				}
				attackValueBox.setEnabled(false);
				rangeBox.setEnabled(false);
				requiredFocusCheckbox.setEnabled(false);
				requiredLockCheckbox.setEnabled(false);
			}
		} catch( ex ) {
			Error.handleUncaught( ex );
		}
	}

	
	mainPanel.addToEditor( editor, @xw_info, null, null, 0 );
	editor.addFieldPopulationListener( actionFunction );
	bindings.bind();
		
	// Add action listeners
	weaponCheckbox.addActionListener( actionFunction );
	actionCheckbox.addActionListener( actionFunction );
	energyCheckbox.addActionListener( actionFunction );
}


function createFrontPainter( diy, sheet ) {
	nameBox = Xwing.headingBox( sheet, 12 );
	
	upgradeTextBox = Xwing.abilityBox( sheet, 7 );
	
	upgradeIconBox = Xwing.abilityBox( sheet, 14 );
}

function createBackPainter( diy, sheet ) {
}

function paintFront( g, diy, sheet ) {
	sheet.paintPortrait( g );
	sheet.paintTemplateImage( g );
	
	// Draw overlays, name, energy, attack and range 
	if( $$UniqueUpgrade.yesNo ) {
		nameBox.markupText = '<uni>' + diy.name;
	} else {
		nameBox.markupText = diy.name;
	}
	if( $$SecondaryWeapon.yesNo ) {
		if ( $EnergyLimit == '-' ) {
			sheet.paintImage( g, 'upgrade-attack-template', 0, 0 );
			sheet.drawOutlinedTitle( g, $AttackValue, R( 'upper-attribute' ), Xwing.numberFont, 14, 1, Xwing.getColor('attack'), Color.BLACK, sheet.ALIGN_CENTER, true);
			sheet.drawOutlinedTitle( g, $Range, R('upper-range'), Xwing.numberFont, 8, 1, Color.WHITE, Color.BLACK, sheet.ALIGN_CENTER, true);
			nameBox.draw( g, R('short-name') );
		} else {
			sheet.paintImage( g, 'upgrade-energy-attack-template', 0, 0 );
			sheet.drawOutlinedTitle( g, $EnergyLimit, R( 'upper-attribute' ), Xwing.numberFont, 14, 1, Xwing.getColor('energy'), Color.BLACK, sheet.ALIGN_CENTER, true);
			sheet.drawOutlinedTitle( g, $AttackValue, R( 'lower-attribute' ), Xwing.numberFont, 14, 1, Xwing.getColor('attack'), Color.BLACK, sheet.ALIGN_CENTER, true);
			sheet.drawOutlinedTitle( g, $Range, R('lower-range'), Xwing.numberFont, 8, 1, Color.WHITE, Color.BLACK, sheet.ALIGN_CENTER, true);
			nameBox.draw( g, R('short-name') );
		}
	} else {
		if ( $EnergyLimit == '-' ) {
			sheet.paintImage( g, 'upgrade-normal-template', 0, 0 );
			nameBox.draw( g, R('name') );
		} else {
			sheet.paintImage( g, 'upgrade-energy-template', 0, 0 );
			sheet.drawOutlinedTitle( g, $EnergyLimit, R( 'upper-attribute' ), Xwing.numberFont, 14, 1, Xwing.getColor('energy'), Color.BLACK, sheet.ALIGN_CENTER, true);
			nameBox.draw( g, R('short-name') );
		}
	}
		
	// Determine Text Area
	a = 0;
	b = 0;
	c = 0;
	d = 0;
	e = 45;
	if( $$SecondaryWeapon.yesNo ) {
		if( $EnergyLimit == '-' ) {
			a = 62;
			b = 481;
			c = 0;
		} else {
			a = 79;
			b = 493;
			c = 62;			
		}
	}
	if( $UpgradeType != 'modification' && $UpgradeType != 'title' ) {
		if(  $$DoubleIcon.yesNo ) {
			d = 110;
			e = 125;
		} else {
			d = 30;
		}
	}
	upgradeTextBox.setPageShape( PageShape.CompoundShape(
		PageShape.CompoundShape(
			PageShape.CupShape( 0, a, b, 0, 0 ),
			b,
			PageShape.CupShape( 0, c, 596, 0, 0 ) ),
		642,
		PageShape.CupShape( d, 0, 655, e, 97 ) ) );
		
	// Determine Text content
	var restriction = $Restriction;
	if( $UpgradeType == 'modification' ) {
		if( restriction ) {
			restriction = restriction + ' ' + @xw-upgrade-modification + '.';
		} else {
			restriction = @xw-upgrade-modification + '.';
		}
	} else if( $UpgradeType == 'title' ) {
		if( restriction ) {
			restriction = restriction + ' ' + @xw-upgrade-title + '.';
		} else {
			restriction = @xw-upgrade-title + '.';
		}
	}
	if( restriction ) {
		restriction = smallCaps( restriction );
		restriction = '<i>' + restriction + '</i>\n\n';
	}	
	var header = '';
	if( $$SecondaryWeapon.yesNo ) {
		if( $$FocusRequired.yesNo ) { header = #xw-cardtext-focus; }
		if( $$LockRequired.yesNo ) { if( header ) { header = header + ', ' + #xw-cardtext-lock; } else { header = #xw-cardtext-lock; } }
		if( header ) { header = #xw-cardtext-attack + ' (' + header + '): '; } else { header = #xw-cardtext-attack + ': '; }
	} else if( $$Action.yesNo ) {
		header = #xw-cardtext-action + ': ';
	} else if( $$Energy.yesNo ) {
		header = #xw-cardtext-energy + ': ';
	}
	if( header ) {
		header = smallCaps( header );
		header = '<width regular><b>' + header + '</b></width>';
	}	
	upgradeTextBox.markupText = '<top>' + restriction + header + $Text;
	// Draw the Upgrade Text
	upgradeTextBox.draw( g, R('text') );
	
	// Draw the Upgrade Icon
	if( $UpgradeType != 'modification' && $UpgradeType != 'title' ) {
		sheet.paintImage( g, 'upgrade-icon-overlay', 'upgrade-icon-overlay-region');
		upgradeIconBox.markupText = '<' + $UpgradeType + '>';
		upgradeIconBox.draw( g, R('icon') );
		if( $$DoubleIcon.yesNo ) {
			sheet.paintImage( g, 'upgrade-icon-overlay', 'upgrade-icon2-overlay-region');
			upgradeIconBox.draw( g, R('icon2') );
		}	
	}

	// Draw the Point Cost
	sheet.drawOutlinedTitle( g, $PointCost, R('cost'), Xwing.numberFont, 8, 0.5, Color.BLACK, Color.WHITE, sheet.ALIGN_CENTER, true);

	// Draw Legal text
	sheet.paintImage( g, 'upgrade-legal', 'upgrade-legal-region');
	
	//println( 'Test string' );
}

function paintBack( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
	
	// Draw the Upgrade Icon
	sheet.paintImage( g, 'upgrade-back-' + $UpgradeType, 'upgrade-back-symbol-region');
}

function onClear() {
	$UpgradeType = 'elite';
	$UniqueUpgrade = 'no';
	$DoubleIcon = 'no';
	$EnergyLimit = '-';
	$SecondaryWeapon = 'no';
	$AttackValue = '0';
	$Range = '1';
	$FocusRequired = 'no';
	$LockRequired = 'no';
	$Restriction = '';
	$Action = 'no';
	$Energy = 'no';
	$Text = '';
	$PointCost = '0';
}

// These can be used to perform special processing during open/save.
// For example, you can seamlessly upgrade from a previous version
// of the script.
function onRead( diy, ois ) {
	if( diy.version < 2 ) {
		$EnergyLimit = '-';
		diy.version = 2;
	}
}

function onWrite( diy, oos ) {

}

function smallCaps( text ) {
	smallCapsedText = '';
	for( let i = 0; i < text.length; ++i ) {
		if( text[i] == text[i].toUpperCase() ) {
			smallCapsedText = smallCapsedText + text[i];
		} else {
			smallCapsedText = smallCapsedText + '<size 70%>' + text[i].toUpperCase() + '</size>';
		}
	}		
	return smallCapsedText;
}

/**
 * createTexturedImage( source, texture )
 * Create a new image whose shape (based on translucency) comes
 * from <tt>source</tt>, and whose surface is painted using a
 * texture. The value of <tt>texture</tt> can be an image, a
 * <tt>Color</tt> (in which case the texture is a solid colour),
 * or a <tt>Paint</tt>.
 */
function createTexturedImage( source, texture ) {
	g = null;
	// if texture is a kind of Paint or colour, create a texture image
	// using the paint
	if( texture instanceof java.awt.Paint ) {
		solidTexture = ImageUtils.create( source.width, source.height, true );
		try {
			g = solidTexture.createGraphics();
			g.setPaint( texture );
			g.fillRect( 0, 0, source.width, source.height );
			texture = solidTexture;
		} finally {
			if( g ) g.dispose();
			g = null;
		}
	}
	dest = ImageUtils.create( source.width, source.height, true );
	try {
		g = dest.createGraphics();
		g.drawImage( source, 0, 0, null );
		g.setComposite( java.awt.AlphaComposite.SrcIn );
		g.drawImage( texture, 0, 0, null );
	} finally {
		if( g ) g.dispose();
	}
	return dest;
}

/**
 * Returns a region for this component. The nametag is
 * the middle part of the region name, without the
 * 'char-' prefix or '-region' suffix.
 */
function R( nametag, x, y ) {
	value = $('upgrade-' + nametag + '-region');
	if( value == null ) {
		throw new Error( 'region not defined: ' + nametag );
	}
	if( x == null ) {
		x = 0;
	}
	if( y == null ) {
		y = 0;
	}
	temp = [];
	temp = value.split(',');
	temp[0] = parseInt(temp[0]) + parseInt(x);
	temp[1] = parseInt(temp[1]) + parseInt(y);
	temp[0] = temp[0].toString();
	temp[1] = temp[1].toString();
	value = temp[0] + ',' + temp[1]	+ ',' + temp[2]	+ ',' + temp[3];
	//return value;
	return new Region( value );
}

// This will cause a test component to be created when you run the script
// from a script editor. It doesn't do anything when the script is run
// other ways (e.g., when you choose to create the component by selecting
// it in the New Game Component dialog).
testDIYScript( 'XW' );