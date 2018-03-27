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

portraits = [];

// Returns the number of portraits we will be using.
function getPortraitCount() {
	return portraits.length;
}

// Given an index from 0 to getPortraitCount()-1, this
// function must return the (index+1)th Portrait.
function getPortrait( index ) {
	if( index < 0 || index >= portraits.length ) {
		throw new Error( 'invalid portrait index: ' + index );
	}
	return portraits[ index ];
}

function create( diy ) {
	diy.version = 6;
	diy.extensionName = 'Xwing.seext';
	diy.faceStyle = FaceStyle.TWO_FACES;
	diy.transparentFaces = false;
	diy.variableSizedFaces = false;
	diy.customPortraitHandling = true;

	// Front Side Card Art
	portraits[0] = new DefaultPortrait( diy, 'upgrade-front' );
	portraits[0].setScaleUsesMinimum( false );
	portraits[0].facesToUpdate = [0];
	portraits[0].backgroundFilled = false;
	portraits[0].clipping = false;
	portraits[0].installDefault();

	// Back Side Card Art
	portraits[1] = new DefaultPortrait( diy, 'upgrade-back' );
	portraits[1].setScaleUsesMinimum( false );
	portraits[1].facesToUpdate = [1];
	portraits[1].backgroundFilled = false;
	portraits[1].clipping = false;
	portraits[1].installDefault();

	diy.frontTemplateKey = 'upgrade-front';
	diy.backTemplateKey = 'upgrade-back';

	// install the example pilot
	diy.name = #xw-upgrade-name;
	$UpgradeType = #xw-upgrade-type;
	$UniqueUpgrade = #xw-upgrade-unique;
	$DoubleIcon = #xw-upgrade-double;
	$Dual = #xw-upgrade-dual;
	$SubName = #xw-upgrade-sub;
	$Restriction = #xw-upgrade-restriction;
	$PointCost = #xw-upgrade-cost;

	$EnergyLimit = #xw-upgrade-energylimit;
	$SecondaryWeapon = #xw-upgrade-weapon;
	$Style = #xw-upgrade-style;
	$AttackValue = #xw-upgrade-attack;
	$Range = #xw-upgrade-range;
	$Text = #xw-upgrade-text;

	$DualSubName = #xw-upgrade-dual-sub;
	$DualEnergyLimit = #xw-upgrade-dual-energylimit;
	$DualSecondaryWeapon = #xw-upgrade-dual-weapon;
	$DualAttackValue = #xw-upgrade-dual-attack;
	$DualRange = #xw-upgrade-dual-range;
	$DualText = #xw-upgrade-dual-text;
}

function createInterface( diy, editor ) {

	bindings = new Bindings( editor, diy );

	// Common Panel	
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
	bindings.add( 'UniqueUpgrade', uniqueCheckbox, [0,1] );
		
	doubleCheckbox = checkBox( @xw-double );
	bindings.add( 'DoubleIcon', doubleCheckbox, [0,1] );

	dualCheckbox = checkBox( @xw-dual );
	bindings.add( 'Dual', dualCheckbox, [0,1] );

	styleItems = [];
	styleItems[0] = ListItem( 'regular', @xw-style-regular );
	styleItems[1] = ListItem( 'full', @xw-style-full );
	styleBox = comboBox( styleItems );
	bindings.add( 'Style', styleBox, [0,1] );

	restrictionItems = [ #xw-restriction-limited, #xw-restriction-rebel, #xw-restriction-imperial, #xw-restriction-scum, #xw-restriction-small, #xw-restriction-large, #xw-restriction-huge ];
	upgradeRestrictionField = autocompletionField( restrictionItems );
	bindings.add( 'Restriction', upgradeRestrictionField, [0,1] );

	pointCostSpinner = spinner( -10, 30, 1, 1 );
	bindings.add( 'PointCost', pointCostSpinner, [0,1] );

	commonPanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	commonPanel.place( @xw-upgradename, '', nameField, 'span, growx, wrap' );
	commonPanel.place( uniqueCheckbox, 'wrap para' );
	commonPanel.place( dualCheckbox, 'wrap para' );
	commonPanel.place( separator(), 'span, growx, wrap para' );
	commonPanel.place( @xw-style, '', styleBox, 'span, growx, wrap para' );	
	commonPanel.place( separator(), 'span, growx, wrap para' );
	commonPanel.place( @xw-upgradetype, '', typeBox, 'span, growx, wrap para' );
	commonPanel.place( doubleCheckbox, 'wrap para' );
	commonPanel.place( @xw-upgraderestriction, '', upgradeRestrictionField, 'span, growx, wrap' );
	commonPanel.place( separator(), 'span, growx, wrap para' );
	commonPanel.place( @xw-pointcost, 'span 2', pointCostSpinner, 'wrap para');
	commonPanel.place( separator(), 'span, growx, wrap para' );
	commonPanel.editorTabScrolling = true;

	//Front Panel
	subNameField = textField( '', 30 );
	bindings.add( 'SubName', subNameField, [0] );

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
		
	upgradeTextArea = textArea( '', 6, 15, true );
	bindings.add( 'Text', upgradeTextArea, [0] );

	symbolsTagTip = tipButton( @xw-symbol-tooltip );
	headersTagTip = tipButton( @xw-header-tooltip );
	shipsTagTip = tipButton( @xw-ship-tooltip );
	
	upgradePanel = portraitPanel( diy, 0 );
	upgradePanel.panelTitle = @xw-portrait-upgrade;

	frontPanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	frontPanel.place( @xw-subname, '', subNameField, 'span, growx, wrap' );
	frontPanel.place( separator(), 'span, growx, wrap para' );
	frontPanel.place( @xw-energylimit, '', energyLimitBox, 'wmin 70, span 2, wrap para' );
	frontPanel.place( separator(), 'span, growx, wrap para' );
	frontPanel.place( weaponCheckbox, 'wrap para' );
	frontPanel.place( @xw-attackvalue, '', attackValueBox, 'wmin 70, span 2, wrap' );
	frontPanel.place( @xw-range, '', rangeBox, 'wmin 70, span 2, wrap para' );
	frontPanel.place( separator(), 'span, growx, wrap para' );
	frontPanel.place( @xw-upgradetext, 'span, growx, wrap' );
	frontPanel.place( upgradeTextArea, 'span, grow, wrap para' );
	frontPanel.place( symbolsTagTip, '', headersTagTip, '', shipsTagTip, 'span, grow, wrap para' );
	frontPanel.place( separator(), 'span, growx, wrap para' );
	frontPanel.place( upgradePanel, 'span, growx, wrap' );
	frontPanel.place( separator(), 'span, growx, wrap para' );
	frontPanel.editorTabScrolling = true;
	
	//Dual Panel
	dualSubNameField = textField( '', 30 );
	bindings.add( 'DualSubName', dualSubNameField, [0] );
			
	dualEnergyLimitBox = comboBox( energyItems );
	bindings.add( 'DualEnergyLimit', dualEnergyLimitBox, [1] );

	dualWeaponCheckbox = checkBox( @xw-weapon );
	bindings.add( 'DualSecondaryWeapon', dualWeaponCheckbox, [1] );

	dualAttackValueBox = comboBox( attackItems );
	bindings.add( 'DualAttackValue', dualAttackValueBox, [1] );

	dualRangeBox = comboBox( rangeItems );
	bindings.add( 'DualRange', dualRangeBox, [1] );

	dualUpgradeTextArea = textArea( '', 6, 15, true );
	bindings.add( 'DualText', dualUpgradeTextArea, [1] );	
	dualSymbolsTagTip = tipButton( @xw-symbol-tooltip );
	dualHeadersTagTip = tipButton( @xw-header-tooltip );
	dualShipsTagTip = tipButton( @xw-ship-tooltip );

	dualUpgradePanel = portraitPanel( diy, 1 );
	dualUpgradePanel.panelTitle = @xw-portrait-upgrade;

	backPanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	backPanel.place( @xw-subname, '', dualSubNameField, 'span, growx, wrap' );
	backPanel.place( separator(), 'span, growx, wrap para' );
	backPanel.place( @xw-energylimit, '', dualEnergyLimitBox, 'wmin 70, span 2, wrap para' );
	backPanel.place( separator(), 'span, growx, wrap para' );
	backPanel.place( dualWeaponCheckbox, 'wrap para' );
	backPanel.place( @xw-attackvalue, '', dualAttackValueBox, 'wmin 70, span 2, wrap' );
	backPanel.place( @xw-range, '', dualRangeBox, 'wmin 70, span 2, wrap para' );
	backPanel.place( separator(), 'span, growx, wrap para' );
	backPanel.place( @xw-upgradetext, 'span, growx, wrap' );
	backPanel.place( dualUpgradeTextArea, 'span, grow, wrap para' );
	backPanel.place( dualSymbolsTagTip, '', dualHeadersTagTip, '', dualShipsTagTip, 'span, grow, wrap para' );
	backPanel.place( separator(), 'span, growx, wrap para' );
	backPanel.place( dualUpgradePanel, 'span, growx, wrap' );
	backPanel.place( separator(), 'span, growx, wrap para' );
	backPanel.editorTabScrolling = true;

	diy.setNameField( nameField );
	
	function actionFunction( actionEvent )
	{
		try {
			// art style should determine if secondary weapon can be used
			if( styleBox.getSelectedIndex() == 1){
				// common panel
				doubleCheckbox.setEnabled(false);  // dual upgrade
				//front panel
				energyLimitBox.setEnabled(false);  // energy limit
				weaponCheckbox.setSelected(false);  // secondary weapon
				weaponCheckbox.setEnabled(false);
				attackValueBox.setEnabled(false);
				rangeBox.setEnabled(false);
				// dual panel
				dualWeaponCheckbox.setSelected(false);
				dualEnergyLimitBox.setEnabled(false);
				dualWeaponCheckbox.setEnabled(false);
				dualAttackValueBox.setEnabled(false);
				dualRangeBox.setEnabled(false);
				return;
			} else {
				// common panel
				doubleCheckbox.setEnabled(true);  // dual upgrade
				//front panel
				energyLimitBox.setEnabled(true);
				weaponCheckbox.setEnabled(true);
				// attackValueBox and rangeBox managed after
				// dual panel
				dualEnergyLimitBox.setEnabled(true);
				dualWeaponCheckbox.setEnabled(true);
				// dualAttackValueBox and dualRangeBox managed after
			}
			if( weaponCheckbox.selected ) {
				attackValueBox.setEnabled(true);
				rangeBox.setEnabled(true);
			} else {
				attackValueBox.setEnabled(false);
				rangeBox.setEnabled(false);
			}
			if( dualCheckbox.selected ) {
				subNameField.setEnabled(true);
				dualWeaponCheckbox.setEnabled(true);
				dualSubNameField.setEnabled(true);
				dualEnergyLimitBox.setEnabled(true);
				dualUpgradeTextArea.setEnabled(true);
				dualUpgradePanel.setVisible(true);
				if( dualWeaponCheckbox.selected ) {
					dualAttackValueBox.setEnabled(true);
					dualRangeBox.setEnabled(true);
				} else {
					dualAttackValueBox.setEnabled(false);
					dualRangeBox.setEnabled(false);
				}
			} else {
				subNameField.setEnabled(false);
				dualWeaponCheckbox.setEnabled(false);
				dualSubNameField.setEnabled(false);
				dualEnergyLimitBox.setEnabled(false);
				dualUpgradeTextArea.setEnabled(false);
				dualUpgradePanel.setVisible(false);
				dualWeaponCheckbox.setEnabled(false);
				dualAttackValueBox.setEnabled(false);
				dualRangeBox.setEnabled(false);
			}
		} catch( ex ) {
			Error.handleUncaught( ex );
		}
	}

	commonPanel.addToEditor( editor, @xw_common_side, null, null, 0 );
	frontPanel.addToEditor( editor, @xw_front_side, null, null, 1 );
	backPanel.addToEditor( editor, @xw_back_side, null, null, 2 );
	editor.addFieldPopulationListener( actionFunction );
	bindings.bind();
		
	// Add action listeners
	weaponCheckbox.addActionListener( actionFunction );
	styleBox.addActionListener( actionFunction );
	dualWeaponCheckbox.addActionListener( actionFunction );
	dualCheckbox.addActionListener( actionFunction );
}


function createFrontPainter( diy, sheet ) {
	nameBox = Xwing.headingBox( sheet, 12 );
	
	upgradeTextBox = Xwing.abilityBox( sheet, 7 );
	
	upgradeIconBox = Xwing.abilityBox( sheet, 14 );
}

function createBackPainter( diy, sheet ) {
	nameBox = Xwing.headingBox( sheet, 12 );
	
	upgradeTextBox = Xwing.abilityBox( sheet, 7 );
	
	upgradeIconBox = Xwing.abilityBox( sheet, 14 );
}

function paintFront( g, diy, sheet ) {
	paintCardFaceComponents( g, diy, sheet, 'front');
}

function paintBack( g, diy, sheet ) {
	if( $$Dual.yesNo ) {	
		paintCardFaceComponents( g, diy, sheet, 'back');
	} else {
		//Draw template
		imageTemplate =  'upgrade-back-template';
		sheet.paintImage( g, imageTemplate, 0, 0);
		
		// Draw the Upgrade Icon
		sheet.paintImage( g, 'upgrade-back-' + $UpgradeType, 'upgrade-back-symbol-region');
	}
}

function paintCardFaceComponents( g, diy, sheet, side) {
	// common vars
	style = $Style;
	if( side == 'front') {
		subName = $SubName;
		secondaryWeapon = $$SecondaryWeapon.yesNo;
		energyLimit = $EnergyLimit;
		attackValue = $AttackValue;
		range = $Range;
		text = $Text;
	} else if( side == 'back') {
		subName = $DualSubName;
		secondaryWeapon = $$DualSecondaryWeapon.yesNo;
		energyLimit = $DualEnergyLimit;
		attackValue = $DualAttackValue;
		range = $DualRange;
		text = $DualText;
	}

	// to avoid reminiscence redraw a black image
	sheet.paintImage( g, 'upgrade-blank-template', 0, 0);
	
	if( style == 'full' ) { // full art: custom template and regions
		imageTemplate =  'upgrade-front-alt-template';
		$upgrade-front-portrait-clip-region = $upgrade-portrait-alt-region;
		$upgrade-front-portrait-true-clip-region = $upgrade-portrait-alt-region;
		$upgrade-back-portrait-clip-region = $upgrade-portrait-alt-region;
		$upgrade-back-portrait-true-clip-region = $upgrade-portrait-alt-region;
	} else { // regular art: set default region
		imageTemplate =  'upgrade-front-template';
		$upgrade-front-portrait-clip-region = $upgrade-portrait-default-region;
		$upgrade-front-portrait-true-clip-region = $upgrade-portrait-default-region;
		$upgrade-back-portrait-clip-region = $upgrade-portrait-default-region;
		$upgrade-back-portrait-true-clip-region = $upgrade-portrait-default-region;
	}

	//Draw portrait
	target = sheet.getRenderTarget();
	if( side == 'front') {
		portraits[0].paint( g, target );
	} else {
		portraits[1].paint( g, target );
	}

	//Draw template
	sheet.paintImage( g, imageTemplate, 0, 0);

	// Draw overlays, name, energy, attack and range 
	if( $$UniqueUpgrade.yesNo ) {
		if( subName && $$Dual.yesNo ) {
			nameBox.markupText = '<uni>' + diy.name + ' (' + subName + ')';
		} else {
			nameBox.markupText = '<uni>' + diy.name;
		}
	} else {
		if( subName && $$Dual.yesNo ) {
			nameBox.markupText = diy.name + ' (' + subName + ')';
		} else {
			nameBox.markupText = diy.name;
		}
	}

	if( secondaryWeapon ) { // secondary weapon
		if ( energyLimit == '-' ) {
			sheet.paintImage( g, 'upgrade-attack-template', 0, 0 );
			sheet.drawOutlinedTitle( g, attackValue, R( 'upper-attribute' ), Xwing.numberFont, 14, 1, Xwing.getColor('attack'), Color.BLACK, sheet.ALIGN_CENTER, true);
			sheet.drawOutlinedTitle( g, range, R('upper-range'), Xwing.numberFont, 8, 1, Color.WHITE, Color.BLACK, sheet.ALIGN_CENTER, true);
			nameBox.draw( g, R('short-name') );
		} else {
			sheet.paintImage( g, 'upgrade-energy-attack-template', 0, 0 );
			sheet.drawOutlinedTitle( g, energyLimit, R( 'upper-attribute' ), Xwing.numberFont, 14, 1, Xwing.getColor('energy'), Color.BLACK, sheet.ALIGN_CENTER, true);
			sheet.drawOutlinedTitle( g, attackValue, R( 'lower-attribute' ), Xwing.numberFont, 14, 1, Xwing.getColor('attack'), Color.BLACK, sheet.ALIGN_CENTER, true);
			sheet.drawOutlinedTitle( g, range, R('lower-range'), Xwing.numberFont, 8, 1, Color.WHITE, Color.BLACK, sheet.ALIGN_CENTER, true);
			nameBox.draw( g, R('short-name') );
		}
	} else { // not secondary weapon
		if ( energyLimit == '-'){ // not an epic card ( w/ energy)
			if (style == 'full' ) { // full art: no overlay but alt region
				nameBox.draw( g, R('name-alt') ); // moved region
			} else { // regular style
				sheet.paintImage( g, 'upgrade-normal-template', 0, 0 );
				nameBox.draw( g, R('name') );
			}
		} else if (energyLimit != '-') { // energy
			sheet.paintImage( g, 'upgrade-energy-template', 0, 0 );
			sheet.drawOutlinedTitle( g, energyLimit, R( 'upper-attribute' ), Xwing.numberFont, 14, 1, Xwing.getColor('energy'), Color.BLACK, sheet.ALIGN_CENTER, true);
			nameBox.draw( g, R('short-name') );
		}
	}

	// Determine Text Area
	if ( style == 'regular' ){
		a = 0;
		b = 0;
		c = 0;
		d = 0;
		e = 45;
		if( secondaryWeapon ) {
			if( energyLimit == '-' ) { // no ernergy
				a = 62;
				b = 481;
				c = 0;
			} else {
				a = 79;
				b = 493;
				c = 62;
			}
		}

		if( $UpgradeType != 'modification' && $UpgradeType != 'title' && style != 'full' ) {
			if(  $$DoubleIcon.yesNo ) {
				d = 110;
				e = 125;
			} else {
				d = 30;
			}
		}

		upgradeTextBox.setPageShape(PageShape.CompoundShape(
										PageShape.CompoundShape(PageShape.CupShape( 0, a, b, 0, 0 ),
																b,
																PageShape.CupShape( 0, c, 596, 0, 0 ) ),
																642,
																PageShape.CupShape( d, 0, 655, e, 97 )
																)
									);
	}else {
		upgradeTextBox.setPageShape(PageShape.RECTANGLE_SHAPE);
	}

	// Determine Text content
	var restriction = $Restriction;
	if( $UpgradeType == 'modification' ) {
		if( restriction ) {
			restriction = restriction + ' ' + #xw-restriction-modification;
		} else {
			restriction = #xw-restriction-modification;
		}
	} else if( $UpgradeType == 'title' ) {
		if( restriction ) {
			restriction = restriction + ' ' + #xw-restriction-title;
		} else {
			restriction = #xw-restriction-title;
		}
	}
	if( $$Dual.yesNo ) {
		if( restriction ) {
			restriction = restriction + ' ' + #xw-restriction-dual;
		} else {
			restriction = #xw-restriction-dual;
		}
	}
	
	if( restriction ) {
		restriction = Xwing.smallCaps( restriction );
		restriction = '<i>' + restriction + '</i>\n\n';
	}
	
	upgradeTextBox.markupText = '<top>' + restriction + text;
	

	// Draw the Upgrade Text
	if (style == 'full' ){ // full art: alt region
		upgradeTextBox.draw( g, R('text-alt') );
	} else { // regular style
		upgradeTextBox.draw( g, R('text') );
	}

	// Draw the Upgrade Icon
	if (style == 'full' ){  // full art: always overlay but alt region
		upgradeIconBox.markupText = '<' + $UpgradeType + '>';
		upgradeIconBox.draw( g, R('icon-alt') );
	} else { // regular art
		if( $UpgradeType != 'modification' && $UpgradeType != 'title' ) { // no icon for modification or title
			sheet.paintImage( g, 'upgrade-icon-overlay', 'upgrade-icon-overlay-region');
			upgradeIconBox.markupText = '<' + $UpgradeType + '>';
			upgradeIconBox.draw( g, R('icon') );
		}

		if( $$DoubleIcon.yesNo  && style != 'full') {  // full art does not support double icons yet
			sheet.paintImage( g, 'upgrade-icon-overlay', 'upgrade-icon2-overlay-region');
			upgradeIconBox.draw( g, R('icon2') );
		}	
	}

	// Draw the Point Cost
	if (style == 'full' ){ // full art: different region
		sheet.drawOutlinedTitle( g, $PointCost, R('cost-alt'), Xwing.numberFont, 8, 0.5, Color.BLACK, Color.WHITE, sheet.ALIGN_CENTER, true);
	} else { // regular art
		sheet.drawOutlinedTitle( g, $PointCost, R('cost'), Xwing.numberFont, 8, 0.5, Color.BLACK, Color.WHITE, sheet.ALIGN_CENTER, true);
	}
	
	// Draw Legal text
	if ( style == 'full' ){ // if full legal is on bottom, in black
		sheet.paintImage( g, 'upgrade-legal-alt', 'upgrade-legal-alt-region');
	} else {
		sheet.paintImage( g, 'upgrade-legal', 'upgrade-legal-region');
	}
}

function onClear() {
	$UpgradeType = 'elite';
	$UniqueUpgrade = 'no';
	$DoubleIcon = 'no';
	$Restriction = '';
	$PointCost = '0';

	$SubName = '';
	$EnergyLimit = '-';
	$SecondaryWeapon = 'no';
	$Style = 'regular';
	$AttackValue = '0';
	$Range = '1';
	$Text = '';
	
	$DualSubName = '';
	$DualEnergyLimit = '-';
	$DualSecondaryWeapon = 'no';
	$DualAttackValue = '0';
	$DualRange = '1';
	$DualText = '';
}

// These can be used to perform special processing during open/save.
// For example, you can seamlessly upgrade from a previous version
// of the script.
function onRead( diy, ois ) {
	if( diy.version >= 5){
		portraits[0] = ois.readObject();
		portraits[1] = ois.readObject();
	}
	if( diy.version < 2 ) {
		$EnergyLimit = '-';
		diy.version = 2;
	}
	if( diy.version < 4 ) {
		replacementText = '';
		if( $$LockRequired.yesNo && $$SecondaryWeapon.yesNo ) {
			replacementText = '<attack-lock> ';
		} else if( $$FocusRequired.yesNo && $$SecondaryWeapon.yesNo ) {
			replacementText = '<attack-focus> ';
		} else if( $$EnergyRequired.yesNo && $$SecondaryWeapon.yesNo ) {
			replacementText = '<attack-energy> ';
		} else if( $$SecondaryWeapon.yesNo ) {
			replacementText = '<attacks> ';
		} else if( $$Action.yesNo ) {
			replacementText = '<action> ';
		} else if( $$Energy.yesNo ) {
			replacementText = '<energy> ';
		}		
		$Text = replacementText + $Text;
		diy.version = 4;
	}
	if( diy.version < 5 ) {
		$Dual = 'no';	
		$SubName = '';	
		$DualSubName = '';
		$DualEnergyLimit = '-';
		$DualSecondaryWeapon = 'no';
		$DualAttackValue = '0';
		$DualRange = '1';
		$DualText = '';
		
		oldPortrait = diy.getPortrait(0);

		diy.portraitKey = null;
		diy.customPortraitHandling = true;

		// Front Side Card Art
		portraits[0] = new DefaultPortrait( diy, 'upgrade-front' );
		portraits[0].setScaleUsesMinimum( false );
		portraits[0].facesToUpdate = [0];
		portraits[0].backgroundFilled = true;
		portraits[0].clipping = true;
		portraits[0].installDefault();

		portraits[0].setSource( oldPortrait.getSource() );
		portraits[0].setPanX( oldPortrait.getPanX() );
		portraits[0].setPanY( oldPortrait.getPanY() );
		portraits[0].setScale( oldPortrait.getScale() );

		// Back Side Card Art
		portraits[1] = new DefaultPortrait( diy, 'upgrade-back' );
		portraits[1].setScaleUsesMinimum( false );
		portraits[1].facesToUpdate = [1];
		portraits[1].backgroundFilled = true;
		portraits[1].clipping = true;
		portraits[1].installDefault();

		diy.version = 5;
	}
	if( diy.version < 6 ) {
		$Style = 'regular';
		diy.version = 6;
	}
}

function onWrite( diy, oos ) {
	oos.writeObject( portraits[0] );
	oos.writeObject( portraits[1] );
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
