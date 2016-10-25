useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'imageutils' );
useLibrary( 'markup' );

importClass( java.awt.BasicStroke );
importClass( java.awt.Stroke );
importClass( java.awt.RenderingHints );
importClass( java.awt.Graphics2D );

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
	diy.version = 3;
	diy.extensionName = 'Xwing.seext';
	diy.faceStyle = FaceStyle.SIX_FACES;
	diy.transparentFaces = true;
	diy.variableSizedFaces = true;
	
	diy.customPortraitHandling = true;
	// Card Art
	portraits[0] = new DefaultPortrait( diy, 'huge-fore-front' );
	portraits[0].setScaleUsesMinimum( false );
	portraits[0].facesToUpdate = [0];
	portraits[0].backgroundFilled = true;
	portraits[0].clipping = true;
	portraits[0].installDefault();

	portraits[1] = new DefaultPortrait( diy, 'huge-fore-back' );
	portraits[1].setScaleUsesMinimum( false );
	portraits[1].facesToUpdate = [1];
	portraits[1].backgroundFilled = true;
	portraits[1].clipping = true;
	portraits[1].installDefault();
	
	portraits[2] = new DefaultPortrait( diy, 'huge-aft-front' );
	portraits[2].setScaleUsesMinimum( false );
	portraits[2].facesToUpdate = [2];
	portraits[2].backgroundFilled = true;
	portraits[2].clipping = true;
	portraits[2].installDefault();

	portraits[3] = new DefaultPortrait( diy, 'huge-aft-back' );
	portraits[3].setScaleUsesMinimum( false );
	portraits[3].facesToUpdate = [3];
	portraits[3].backgroundFilled = true;
	portraits[3].clipping = true;
	portraits[3].installDefault();

	// Ship Icon, Card
	portraits[4] = new DefaultPortrait( diy, 'huge-ship-card' );
	portraits[4].setScaleUsesMinimum( true );
	portraits[4].facesToUpdate = [0,1,2,3];
	portraits[4].backgroundFilled = false;
	portraits[4].clipping = true;
	portraits[4].installDefault();
	
	// Ship Icon, Token
	portraits[5] = new DefaultPortrait( portraits[4], 'huge-ship-token' );
	portraits[5].setScaleUsesMinimum( true );
	portraits[5].facesToUpdate = [4];
	portraits[5].backgroundFilled = false;
	portraits[5].clipping = true;
	portraits[5].installDefault();
	
	diy.setTemplateKey( 0, 'huge-rebel-fore' );
	diy.setTemplateKey( 1, 'huge-rebel-fore' );
	diy.setTemplateKey( 2, 'huge-rebel-aft' );
	diy.setTemplateKey( 3, 'huge-rebel-aft' );
	diy.setTemplateKey( 4, 'huge-double-token' );
	diy.setTemplateKey( 5, 'huge-double-token' );

	// install the example ship
	diy.name = #xw-huge-ship;
	$Affiliation = #xw-huge-affiliation;
	$PilotSkill = #xw-huge-ps;
	
	$ForeDesignation = #xw-huge-fore-designation;
	$ForeText = #xw-huge-fore-text;
	$ForeTextFlavor =  #xw-huge-fore-text-flavor;
	$ForeCrippledText = #xw-huge-fore-crippled-text;
	$ForeCrippledTextFlavor =  #xw-huge-fore-crippled-text-flavor;
	$ForePwv = #xw-huge-fore-pwv;
	$ForeCrippledPwv = #xw-huge-fore-crippled-pwv;
	$ForeRange = #xw-huge-fore-range;
	$ForeCrippledRange = #xw-huge-fore-crippled-range;
	$ForeArc = #xw-huge-fore-arc;
	$ForeTurret = #xw-huge-fore-turret;
	$ForeEnergy = #xw-huge-fore-energy;
	$ForeCrippledEnergy = #xw-huge-fore-crippled-energy;
	$ForeHull = #xw-huge-fore-hull;
	$ForeShield = #xw-huge-fore-shield;
	$ForeRecoverAction = #xw-huge-fore-recover;
	$ForeReinforceAction = #xw-huge-fore-reinforce;
	$ForeCoordinateAction = #xw-huge-fore-coordinate;
	$ForeJamAction = #xw-huge-fore-jam;
	$ForeLockAction = #xw-huge-fore-lock;
	$ForeUpgrade1 = #xw-huge-fore-upgrade-1;
	$ForeUpgrade2 = #xw-huge-fore-upgrade-2;
	$ForeUpgrade3 = #xw-huge-fore-upgrade-3;
	$ForeUpgrade4 = #xw-huge-fore-upgrade-4;
	$ForeUpgrade5 = #xw-huge-fore-upgrade-5;
	$ForeUpgrade6 = #xw-huge-fore-upgrade-6;
	$ForeUpgrade7 = #xw-huge-fore-upgrade-7;
	$ForeCrippledUpgrade1 = #xw-huge-fore-crippled-upgrade-1;
	$ForeCrippledUpgrade2 = #xw-huge-fore-crippled-upgrade-2;
	$ForeCrippledUpgrade3 = #xw-huge-fore-crippled-upgrade-3;
	$ForeCrippledUpgrade4 = #xw-huge-fore-crippled-upgrade-4;
	$ForeCrippledUpgrade5 = #xw-huge-fore-crippled-upgrade-5;
	$ForeCrippledUpgrade6 = #xw-huge-fore-crippled-upgrade-6;
	$ForeCrippledUpgrade7 = #xw-huge-fore-crippled-upgrade-7;
	$ForeCost = #xw-huge-fore-cost;
	
	$AftDesignation = #xw-huge-aft-designation;
	$AftText = #xw-huge-aft-text;
	$AftTextFlavor = #xw-huge-aft-text-flavor;
	$AftCrippledText = #xw-huge-aft-crippled-text;
	$AftCrippledTextFlavor = #xw-huge-aft-crippled-text-flavor;
	$AftPwv = #xw-huge-aft-pwv;
	$AftCrippledPwv = #xw-huge-aft-crippled-pwv;
	$AftRange = #xw-huge-aft-range;
	$AftCrippledRange = #xw-huge-aft-crippled-range;
	$AftArc = #xw-huge-aft-arc;
	$AftTurret = #xw-huge-aft-turret;
	$AftEnergy = #xw-huge-aft-energy;
	$AftCrippledEnergy = #xw-huge-aft-crippled-energy;
	$AftHull = #xw-huge-aft-hull;
	$AftShield = #xw-huge-aft-shield;
	$AftRecoverAction = #xw-huge-aft-recover;
	$AftReinforceAction = #xw-huge-aft-reinforce;
	$AftCoordinateAction = #xw-huge-aft-coordinate;
	$AftJamAction = #xw-huge-aft-jam;
	$AftLockAction = #xw-huge-aft-lock;
	$AftUpgrade1 = #xw-huge-aft-upgrade-1;
	$AftUpgrade2 = #xw-huge-aft-upgrade-2;
	$AftUpgrade3 = #xw-huge-aft-upgrade-3;
	$AftUpgrade4 = #xw-huge-aft-upgrade-4;
	$AftUpgrade5 = #xw-huge-aft-upgrade-5;
	$AftUpgrade6 = #xw-huge-aft-upgrade-6;
	$AftUpgrade7 = #xw-huge-aft-upgrade-7;
	$AftCrippledUpgrade1 = #xw-huge-aft-crippled-upgrade-1;
	$AftCrippledUpgrade2 = #xw-huge-aft-crippled-upgrade-2;
	$AftCrippledUpgrade3 = #xw-huge-aft-crippled-upgrade-3;
	$AftCrippledUpgrade4 = #xw-huge-aft-crippled-upgrade-4;
	$AftCrippledUpgrade5 = #xw-huge-aft-crippled-upgrade-5;
	$AftCrippledUpgrade6 = #xw-huge-aft-crippled-upgrade-6;
	$AftCrippledUpgrade7 = #xw-huge-aft-crippled-upgrade-7;
	$AftCost = #xw-huge-aft-cost;
	
	$Location = #xw-huge-location;
	$DoubleSection = #xw-huge-double;
}


function createInterface( diy, editor ) {
	bindings = new Bindings( editor, diy );

	// Common Panel
	affiliationItems = [];
	affiliationItems[0] = ListItem( 'alliance', @xw-affiliation-alliance );
	affiliationItems[1] = ListItem( 'resistance', @xw-affiliation-resistance );
	affiliationItems[2] = ListItem( 'empire', @xw-affiliation-empire );
	affiliationItems[3] = ListItem( 'firstorder', @xw-affiliation-firstorder );
	affiliationItems[4] = ListItem( 'scum', @xw-affiliation-scum );
	affiliationBox = comboBox( affiliationItems );
	bindings.add( 'Affiliation', affiliationBox, [0,1,2,3,4] );	

	nameField = textField( 'X', 30 );
	
	doubleCheckbox = checkBox( @xw-double-sections );
	bindings.add( 'DoubleSection', doubleCheckbox, [0,1,2,3,4,5] );

	locationItems = [];
	locationItems[0] = ListItem( 'attack-energy', @xw-location-attack-energy );
	locationItems[1] = ListItem( 'energy-attack', @xw-location-energy-attack );
	locationItems[2] = ListItem( 'none-energy', @xw-location-none-energy );
	locationItems[3] = ListItem( 'energy-none', @xw-location-energy-none );
	locationBox = comboBox( locationItems );
	bindings.add( 'Location', locationBox, [0,1,2,3,4] );

	psItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	psBox = comboBox( psItems );
	bindings.add( 'PilotSkill', psBox, [0,1,2,3,4] );

	iconCardPanel = portraitPanel( diy, 4 );
	iconCardPanel.panelTitle = @xw-icon-card;	
	
	iconTokenPanel = portraitPanel( diy, 5 );
	iconTokenPanel.setParentPanel( iconCardPanel );		
	iconTokenPanel.panelTitle = @xw-icon-token;

	commonPanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	commonPanel.setTitle( @xw-info );
	commonPanel.place( @xw-affiliation, '', affiliationBox, 'growx, wrap' );	
	commonPanel.place( @xw-ship, '', nameField, 'span, growx, wrap' );
	commonPanel.place( doubleCheckbox, 'span, wrap para' );
	commonPanel.place( @xw-location, '', locationBox, 'growx, wrap' );	
	commonPanel.place( @xw-ps, '', psBox, 'wmin 52, wrap' );
	commonPanel.place( iconCardPanel, 'span, growx, wrap' );
	commonPanel.place( iconTokenPanel, 'span, growx, wrap' );
	commonPanel.editorTabScrolling = true;

	// Fore Panel
	foreSectionDesignationItems = [ #xw-fore-designation ];
	foreSectionDesignationField = autocompletionField( foreSectionDesignationItems );
	bindings.add( 'ForeDesignation', foreSectionDesignationField, [0,1,4] );
	
	foreTextArea = textArea( '', 6, 15, true );
	bindings.add( 'ForeText', foreTextArea, [0] );

	foreTextFlavor = checkBox( @xw-text-flavor );
	bindings.add( 'ForeTextFlavor', foreTextFlavor, [0] );

	foreCrippledTextArea = textArea( '', 6, 15, true );
	bindings.add( 'ForeCrippledText', foreCrippledTextArea, [1] );

	foreCrippledTextFlavor = checkBox( @xw-text-flavor );
	bindings.add( 'ForeCrippledTextFlavor', foreCrippledTextFlavor, [1] );
	
	symbolsTagTip = tipButton( @xw-symbol-tooltip );
	headersTagTip = tipButton( @xw-header-tooltip );
	shipsTagTip = tipButton( @xw-ship-tooltip );
	
	foreArcItems = [];
	foreArcItems[0] = ListItem( '-', '-' );
	foreArcItems[1] = ListItem( 'broadside', @xw-arc-broadside );
	foreArcItems[2] = ListItem( 'extendedBroadside', @xw-arc-extended-broadside );
	foreArcItems[3] = ListItem( 'front', @xw-arc-front );
	foreArcItems[4] = ListItem( 'extendedFront', @xw-arc-extended-front );
	foreArcItems[5] = ListItem( 'fullArc', @xw-arc-full );
	foreArcBox = comboBox( foreArcItems );
	bindings.add( 'ForeArc', foreArcBox, [4] );

	foreTurret = checkBox( @xw-turret );
	bindings.add( 'ForeTurret', foreTurret, [0,1,4] );

	rangeItems = [];
	rangeItems[0] = ListItem( '1', '1' );
	rangeItems[1] = ListItem( '1-2', '1-2' );
	rangeItems[2] = ListItem( '1-3', '1-3' );
	rangeItems[3] = ListItem( '1-4', '1-4' );
	rangeItems[4] = ListItem( '1-5', '1-5' );
	rangeItems[5] = ListItem( '2', '2' );
	rangeItems[6] = ListItem( '2-3', '2-3' );
	rangeItems[7] = ListItem( '2-4', '2-4' );
	rangeItems[8] = ListItem( '2-5', '2-5' );
	rangeItems[9] = ListItem( '3', '3' );
	rangeItems[10] = ListItem( '3-4', '3-4' );
	rangeItems[11] = ListItem( '3-5', '3-5' );
	rangeItems[12] = ListItem( '4', '4' );
	rangeItems[13] = ListItem( '4-5', '4-5' );
	rangeItems[14] = ListItem( '5', '5' );
	foreRangeBox = comboBox( rangeItems );
	bindings.add( 'ForeRange', foreRangeBox, [0] );

	foreCrippledRangeBox = comboBox( rangeItems );
	bindings.add( 'ForeCrippledRange', foreCrippledRangeBox, [1] );

	pwvItems = ['1', '2', '3', '4', '5', '6', '7', '8'];
	forePwvBox = comboBox( pwvItems );
	bindings.add( 'ForePwv', forePwvBox, [0,4] );
	
	foreCrippledPwvBox = comboBox( pwvItems );
	bindings.add( 'ForeCrippledPwv', foreCrippledPwvBox, [1] );

	energyItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
	foreEnergyBox = comboBox( energyItems );
	bindings.add( 'ForeEnergy', foreEnergyBox, [0,4] );
	
	foreCrippledEnergyBox = comboBox( energyItems );
	bindings.add( 'ForeCrippledEnergy', foreCrippledEnergyBox, [1] );

	hullItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
	foreHullBox = comboBox( hullItems );
	bindings.add( 'ForeHull', foreHullBox, [0,4] );	

	shieldItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
	foreShieldBox = comboBox( shieldItems );
	bindings.add( 'ForeShield', foreShieldBox, [0,4] );

	foreRecoverCheckbox = checkBox( @xw-action-recover );
	bindings.add( 'ForeRecoverAction', foreRecoverCheckbox, [0,4] );
	foreReinforceCheckbox = checkBox( @xw-action-reinforce );
	bindings.add( 'ForeReinforceAction', foreReinforceCheckbox, [0,4] );
	foreCoordinateCheckbox = checkBox( @xw-action-coordinate );
	bindings.add( 'ForeCoordinateAction', foreCoordinateCheckbox, [0,4] );
	foreJamCheckbox = checkBox( @xw-action-jam );
	bindings.add( 'ForeJamAction', foreJamCheckbox, [0,4] );
	foreLockCheckbox = checkBox( @xw-action-lock );
	bindings.add( 'ForeLockAction', foreLockCheckbox, [0,4] );
	
	upgradeItems = [];
	upgradeItems[0] = ListItem( '-', '-' );
	upgradeItems[1] = ListItem( 'system', @xw-upgrade-system );
	upgradeItems[2] = ListItem( 'cannon', @xw-upgrade-cannon );
	upgradeItems[3] = ListItem( 'turret', @xw-upgrade-turret );
	upgradeItems[4] = ListItem( 'torpedo', @xw-upgrade-torpedo );
	upgradeItems[5] = ListItem( 'missile', @xw-upgrade-missile );
	upgradeItems[6] = ListItem( 'illicit', @xw-upgrade-illicit );
	upgradeItems[7] = ListItem( 'bomb', @xw-upgrade-bomb );
	upgradeItems[8] = ListItem( 'crew', @xw-upgrade-crew );
	upgradeItems[9] = ListItem( 'hardpoint', @xw-upgrade-hardpoint );
	upgradeItems[10] = ListItem( 'team', @xw-upgrade-team );
	upgradeItems[11] = ListItem( 'cargo', @xw-upgrade-cargo );
	
	foreUpgradeBox1 = comboBox( upgradeItems );
	bindings.add( 'ForeUpgrade1', foreUpgradeBox1, [0,1] );
	foreCrippledUpgradeBox1 = checkBox( '' );
	bindings.add( 'ForeCrippledUpgrade1', foreCrippledUpgradeBox1, [1] );

	foreUpgradeBox2 = comboBox( upgradeItems );
	bindings.add( 'ForeUpgrade2', foreUpgradeBox2, [0,1] );
	foreCrippledUpgradeBox2 = checkBox( '' );
	bindings.add( 'ForeCrippledUpgrade2', foreCrippledUpgradeBox2, [1] );

	foreUpgradeBox3 = comboBox( upgradeItems );
	bindings.add( 'ForeUpgrade3', foreUpgradeBox3, [0,1] );
	foreCrippledUpgradeBox3 = checkBox( '' );
	bindings.add( 'ForeCrippledUpgrade3', foreCrippledUpgradeBox3, [1] );

	foreUpgradeBox4 = comboBox( upgradeItems );
	bindings.add( 'ForeUpgrade4', foreUpgradeBox4, [0,1] );
	foreCrippledUpgradeBox4 = checkBox( '' );
	bindings.add( 'ForeCrippledUpgrade4', foreCrippledUpgradeBox4, [1] );

	foreUpgradeBox5 = comboBox( upgradeItems );
	bindings.add( 'ForeUpgrade5', foreUpgradeBox5, [0,1] );
	foreCrippledUpgradeBox5 = checkBox( '' );
	bindings.add( 'ForeCrippledUpgrade5', foreCrippledUpgradeBox5, [1] );

	foreUpgradeBox6 = comboBox( upgradeItems );
	bindings.add( 'ForeUpgrade6', foreUpgradeBox6, [0,1] );
	foreCrippledUpgradeBox6 = checkBox( '' );
	bindings.add( 'ForeCrippledUpgrade6', foreCrippledUpgradeBox6, [1] );
	
	foreUpgradeBox7 = comboBox( upgradeItems );
	bindings.add( 'ForeUpgrade7', foreUpgradeBox7, [0,1] );
	foreCrippledUpgradeBox7 = checkBox( '' );
	bindings.add( 'ForeCrippledUpgrade7', foreCrippledUpgradeBox7, [1] );

	foreCostBox = spinner( 1, 200, 1, 20 );
	bindings.add( 'ForeCost', foreCostBox, [0] );

	forePortrait = portraitPanel( diy, 0 );
	forePortrait.panelTitle = 'Healthy Side Fore Section Portrait';

	foreCrippledPortrait = portraitPanel( diy, 1 );
	foreCrippledPortrait.panelTitle = 'Crippled Side Fore Section Portrait';

	forePanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	forePanel.setTitle( @xw-info );
	forePanel.place( @xw-designation, '', foreSectionDesignationField, 'span, growx, wrap' );
	forePanel.place( @xw-text, 'span 2', foreTextFlavor, 'wrap' );
	forePanel.place( foreTextArea, 'span, grow, wrap para' );
	forePanel.place( @xw-crippledtext, 'span 2', foreCrippledTextFlavor, 'wrap');
	forePanel.place( foreCrippledTextArea, 'span, grow, wrap para' );
	forePanel.place( symbolsTagTip, '', headersTagTip, '', shipsTagTip, 'span, grow, wrap para' );
	forePanel.place( separator(), 'span, growx, wrap para' );
	forePanel.place( @xw-arc, '', foreArcBox, 'wmin 100, span 2, wrap' );
	forePanel.place( foreTurret, 'wrap' );
	forePanel.place( @xw-pwv, '', forePwvBox, 'wmin 52', @xw-range, '', foreRangeBox, 'wmin 70, wrap' );
	forePanel.place( @xw-crippledpwv, '', foreCrippledPwvBox, 'wmin 52', @xw-range, '', foreCrippledRangeBox, 'wmin 70, wrap' );
	forePanel.place( @xw-energy, '', foreEnergyBox, 'wmin 52, wrap' );
	forePanel.place( @xw-crippledenergy, '', foreCrippledEnergyBox, 'wmin 52, wrap' );
	forePanel.place( @xw-hull, '', foreHullBox, 'wmin 52, wrap' );
	forePanel.place( @xw-shield, '', foreShieldBox, 'wmin 52, wrap para' );
	forePanel.place( separator(), 'span, growx, wrap para' );
	forePanel.place( @xw-actions, 'wrap' );
	forePanel.place( foreRecoverCheckbox, '', foreReinforceCheckbox, '', foreCoordinateCheckbox, 'wrap' );
	forePanel.place( foreJamCheckbox, '', foreLockCheckbox, 'wrap para' );
	forePanel.place( separator(), 'span, growx, wrap para' );
	forePanel.place( @xw-upgrades, 'wmin 100',  @xw-upgrades-crippled, 'wrap' );
	forePanel.place( foreUpgradeBox1, 'wmin 100', foreCrippledUpgradeBox1, 'wrap' );
	forePanel.place( foreUpgradeBox2, 'wmin 100', foreCrippledUpgradeBox2, 'wrap' );
	forePanel.place( foreUpgradeBox3, 'wmin 100', foreCrippledUpgradeBox3, 'wrap' );
	forePanel.place( foreUpgradeBox4, 'wmin 100', foreCrippledUpgradeBox4, 'wrap' );
	forePanel.place( foreUpgradeBox5, 'wmin 100', foreCrippledUpgradeBox5, 'wrap' );
	forePanel.place( foreUpgradeBox6, 'wmin 100', foreCrippledUpgradeBox6, 'wrap' );
	forePanel.place( foreUpgradeBox7, 'wmin 100', foreCrippledUpgradeBox7, 'wrap para' );
	forePanel.place( separator(), 'span, growx, wrap para' );
	forePanel.place( @xw-cost, 'span 2', foreCostBox, 'wmin 100, wrap para' );
	forePanel.place( separator(), 'span, growx, wrap para' );
	forePanel.place( forePortrait, 'span, growx, wrap' );
	forePanel.place( foreCrippledPortrait, 'span, growx, wrap' );
	
	forePanel.editorTabScrolling = true;

	// Aft Panel
	aftSectionDesignationItems = [ #xw-aft-designation ];
	aftSectionDesignationField = autocompletionField( aftSectionDesignationItems );
	bindings.add( 'AftDesignation', aftSectionDesignationField, [2,3,4] );
	
	aftTextArea = textArea( '', 6, 15, true );
	bindings.add( 'AftText', aftTextArea, [2] );

	aftTextFlavor = checkBox( @xw-text-flavor );
	bindings.add( 'AftTextFlavor', aftTextFlavor, [2] );

	aftCrippledTextArea = textArea( '', 6, 15, true );
	bindings.add( 'AftCrippledText', aftCrippledTextArea, [3] );

	aftCrippledTextFlavor = checkBox( @xw-text-flavor );
	bindings.add( 'AftCrippledTextFlavor', aftCrippledTextFlavor, [3] );
	
	symbolsTagTip2 = tipButton( @xw-symbol-tooltip );
	headersTagTip2 = tipButton( @xw-header-tooltip );
	shipsTagTip2 = tipButton( @xw-ship-tooltip );
	
	aftArcItems = [];
	aftArcItems[0] = ListItem( '-', '-' );
	aftArcItems[1] = ListItem( 'broadside', @xw-arc-broadside );
	aftArcItems[2] = ListItem( 'extendedBroadside', @xw-arc-extended-broadside );
	aftArcItems[3] = ListItem( 'rear', @xw-arc-rear );
	aftArcItems[4] = ListItem( 'extendedRear', @xw-arc-extended-rear );
	aftArcItems[5] = ListItem( 'fullArc', @xw-arc-full );
	aftArcBox = comboBox( aftArcItems );
	bindings.add( 'AftArc', aftArcBox, [4] );

	aftTurret = checkBox( @xw-turret );
	bindings.add( 'AftTurret', aftTurret, [2,3,4] );

	aftRangeBox = comboBox( rangeItems );
	bindings.add( 'AftRange', aftRangeBox, [2] );

	aftCrippledRangeBox = comboBox( rangeItems );
	bindings.add( 'AftCrippledRange', aftCrippledRangeBox, [3] );

	aftPwvBox = comboBox( pwvItems );
	bindings.add( 'AftPwv', aftPwvBox, [2,4] );
	
	aftCrippledPwvBox = comboBox( pwvItems );
	bindings.add( 'AftCrippledPwv', aftCrippledPwvBox, [3] );
				
	aftEnergyBox = comboBox( energyItems );
	bindings.add( 'AftEnergy', aftEnergyBox, [2,4] );
	
	aftCrippledEnergyBox = comboBox( energyItems );
	bindings.add( 'AftCrippledEnergy', aftCrippledEnergyBox, [3] );

	aftHullBox = comboBox( hullItems );
	bindings.add( 'AftHull', aftHullBox, [2,4] );	

	aftShieldBox = comboBox( shieldItems );
	bindings.add( 'AftShield', aftShieldBox, [2,4] );

	aftRecoverCheckbox = checkBox( @xw-action-recover );
	bindings.add( 'AftRecoverAction', aftRecoverCheckbox, [2,4] );
	aftReinforceCheckbox = checkBox( @xw-action-reinforce );
	bindings.add( 'AftReinforceAction', aftReinforceCheckbox, [2,4] );
	aftCoordinateCheckbox = checkBox( @xw-action-coordinate );
	bindings.add( 'AftCoordinateAction', aftCoordinateCheckbox, [2,4] );
	aftJamCheckbox = checkBox( @xw-action-jam );
	bindings.add( 'AftJamAction', aftJamCheckbox, [2,4] );
	aftLockCheckbox = checkBox( @xw-action-lock );
	bindings.add( 'AftLockAction', aftLockCheckbox, [2,4] );
	
	aftUpgradeBox1 = comboBox( upgradeItems );
	bindings.add( 'AftUpgrade1', aftUpgradeBox1, [2,3] );
	aftCrippledUpgradeBox1 = checkBox( '' );
	bindings.add( 'AftCrippledUpgrade1', aftCrippledUpgradeBox1, [3] );

	aftUpgradeBox2 = comboBox( upgradeItems );
	bindings.add( 'AftUpgrade2', aftUpgradeBox2, [2,3] );
	aftCrippledUpgradeBox2 = checkBox( '' );
	bindings.add( 'AftCrippledUpgrade2', aftCrippledUpgradeBox2, [3] );

	aftUpgradeBox3 = comboBox( upgradeItems );
	bindings.add( 'AftUpgrade3', aftUpgradeBox3, [2,3] );
	aftCrippledUpgradeBox3 = checkBox( '' );
	bindings.add( 'AftCrippledUpgrade3', aftCrippledUpgradeBox3, [3] );

	aftUpgradeBox4 = comboBox( upgradeItems );
	bindings.add( 'AftUpgrade4', aftUpgradeBox4, [2,3] );
	aftCrippledUpgradeBox4 = checkBox( '' );
	bindings.add( 'AftCrippledUpgrade4', aftCrippledUpgradeBox4, [3] );

	aftUpgradeBox5 = comboBox( upgradeItems );
	bindings.add( 'AftUpgrade5', aftUpgradeBox5, [2,3] );
	aftCrippledUpgradeBox5 = checkBox( '' );
	bindings.add( 'AftCrippledUpgrade5', aftCrippledUpgradeBox5, [3] );

	aftUpgradeBox6 = comboBox( upgradeItems );
	bindings.add( 'AftUpgrade6', aftUpgradeBox6, [2,3] );
	aftCrippledUpgradeBox6 = checkBox( '' );
	bindings.add( 'AftCrippledUpgrade6', aftCrippledUpgradeBox6, [3] );
	
	aftUpgradeBox7 = comboBox( upgradeItems );
	bindings.add( 'AftUpgrade7', aftUpgradeBox7, [2,3] );
	aftCrippledUpgradeBox7 = checkBox( '' );
	bindings.add( 'AftCrippledUpgrade7', aftCrippledUpgradeBox7, [3] );

	aftCostBox = spinner( 1, 200, 1, 20 );
	bindings.add( 'AftCost', aftCostBox, [2] );

	aftPortrait = portraitPanel( diy, 2 );
	aftPortrait.panelTitle = 'Healthy Side Aft Section Portrait';

	aftCrippledPortrait = portraitPanel( diy, 3 );
	aftCrippledPortrait.panelTitle = 'Crippled Side Aft Section Portrait';

	aftPanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	aftPanel.setTitle( @xw-info );
	aftPanel.place( @xw-designation, '', aftSectionDesignationField, 'span, growx, wrap' );
	aftPanel.place( @xw-text, 'span 2', aftTextFlavor, 'wrap' );
	aftPanel.place( aftTextArea, 'span, grow, wrap para' );
	aftPanel.place( @xw-crippledtext, 'span 2', aftCrippledTextFlavor, 'wrap');
	aftPanel.place( aftCrippledTextArea, 'span, grow, wrap para' );
	aftPanel.place( symbolsTagTip2, '', headersTagTip2, '', shipsTagTip2, 'span, grow, wrap para' );
	aftPanel.place( separator(), 'span, growx, wrap para' );
	aftPanel.place( @xw-arc, '', aftArcBox, 'wmin 100, span 2, wrap' );
	aftPanel.place( aftTurret, 'wrap' );
	aftPanel.place( @xw-pwv, '', aftPwvBox, 'wmin 52', @xw-range, '', aftRangeBox, 'wmin 70, wrap' );
	aftPanel.place( @xw-crippledpwv, '', aftCrippledPwvBox, 'wmin 52', @xw-range, '', aftCrippledRangeBox, 'wmin 70, wrap' );
	aftPanel.place( @xw-energy, '', aftEnergyBox, 'wmin 52, wrap' );
	aftPanel.place( @xw-crippledenergy, '', aftCrippledEnergyBox, 'wmin 52, wrap' );
	aftPanel.place( @xw-hull, '', aftHullBox, 'wmin 52, wrap' );
	aftPanel.place( @xw-shield, '', aftShieldBox, 'wmin 52, wrap para' );
	aftPanel.place( separator(), 'span, growx, wrap para' );
	aftPanel.place( @xw-actions, 'wrap' );
	aftPanel.place( aftRecoverCheckbox, '', aftReinforceCheckbox, '', aftCoordinateCheckbox, 'wrap' );
	aftPanel.place( aftJamCheckbox, '', aftLockCheckbox, 'wrap para' );
	aftPanel.place( separator(), 'span, growx, wrap para' );
	aftPanel.place( @xw-upgrades, 'wmin 100',  @xw-upgrades-crippled, 'wrap' );
	aftPanel.place( aftUpgradeBox1, 'wmin 100', aftCrippledUpgradeBox1, 'wrap' );
	aftPanel.place( aftUpgradeBox2, 'wmin 100', aftCrippledUpgradeBox2, 'wrap' );
	aftPanel.place( aftUpgradeBox3, 'wmin 100', aftCrippledUpgradeBox3, 'wrap' );
	aftPanel.place( aftUpgradeBox4, 'wmin 100', aftCrippledUpgradeBox4, 'wrap' );
	aftPanel.place( aftUpgradeBox5, 'wmin 100', aftCrippledUpgradeBox5, 'wrap' );
	aftPanel.place( aftUpgradeBox6, 'wmin 100', aftCrippledUpgradeBox6, 'wrap' );
	aftPanel.place( aftUpgradeBox7, 'wmin 100', aftCrippledUpgradeBox7, 'wrap para' );
	aftPanel.place( separator(), 'span, growx, wrap para' );
	aftPanel.place( @xw-cost, 'span 2', aftCostBox, 'wmin 100, wrap para' );
	aftPanel.place( separator(), 'span, growx, wrap para' );
	aftPanel.place( aftPortrait, 'span, growx, wrap' );
	aftPanel.place( aftCrippledPortrait, 'span, growx, wrap' );

	aftPanel.editorTabScrolling = true;
	
	function actionFunction( actionEvent )
	{
		try {
			if( doubleCheckbox.selected ) {
				locationBox.setEnabled(true);
				foreCrippledTextFlavor.setEnabled(true);
				foreCrippledTextArea.setVisible(true);
				foreCrippledUpgradeBox1.setEnabled(true);
				foreCrippledUpgradeBox2.setEnabled(true);
				foreCrippledUpgradeBox3.setEnabled(true);
				foreCrippledUpgradeBox4.setEnabled(true);
				foreCrippledUpgradeBox5.setEnabled(true);
				foreCrippledUpgradeBox6.setEnabled(true);
				foreCrippledUpgradeBox7.setEnabled(true);
				foreCrippledPortrait.setVisible(true);
				aftTextFlavor.setEnabled(true);
				aftTextArea.setVisible(true);
				aftCrippledTextFlavor.setEnabled(true);
				aftCrippledTextArea.setVisible(true);
				aftHullBox.setEnabled(true);
				aftShieldBox.setEnabled(true);
				aftRecoverCheckbox.setEnabled(true);
				aftReinforceCheckbox.setEnabled(true);
				aftCoordinateCheckbox.setEnabled(true);
				aftJamCheckbox.setEnabled(true);
				aftLockCheckbox.setEnabled(true);
				aftUpgradeBox1.setEnabled(true);
				aftUpgradeBox2.setEnabled(true);
				aftUpgradeBox3.setEnabled(true);
				aftUpgradeBox4.setEnabled(true);
				aftUpgradeBox5.setEnabled(true);
				aftUpgradeBox6.setEnabled(true);
				aftUpgradeBox7.setEnabled(true);
				aftCrippledUpgradeBox1.setEnabled(true);
				aftCrippledUpgradeBox2.setEnabled(true);
				aftCrippledUpgradeBox3.setEnabled(true);
				aftCrippledUpgradeBox4.setEnabled(true);
				aftCrippledUpgradeBox5.setEnabled(true);
				aftCrippledUpgradeBox6.setEnabled(true);
				aftCrippledUpgradeBox7.setEnabled(true);
				aftCostBox.setEnabled(true);
				aftPortrait.setVisible(true);
				aftCrippledPortrait.setVisible(true);
				if( locationBox.getSelectedItem() == 'attack-energy' ) {
					foreTurret.setEnabled(true);
					forePwvBox.setEnabled(true);
					foreRangeBox.setEnabled(true);
					foreCrippledPwvBox.setEnabled(true);
					foreCrippledRangeBox.setEnabled(true);
					foreEnergyBox.setEnabled(false);
					foreCrippledEnergyBox.setEnabled(false);
					aftTurret.setEnabled(false);
					aftPwvBox.setEnabled(false);
					aftRangeBox.setEnabled(false);
					aftCrippledPwvBox.setEnabled(false);
					aftCrippledRangeBox.setEnabled(false);
					aftEnergyBox.setEnabled(true);
					aftCrippledEnergyBox.setEnabled(true);
				} else if ( locationBox.getSelectedItem() == 'energy-attack' ) {
					foreTurret.setEnabled(false);
					forePwvBox.setEnabled(false);
					foreRangeBox.setEnabled(false);
					foreCrippledPwvBox.setEnabled(false);
					foreCrippledRangeBox.setEnabled(false);
					foreEnergyBox.setEnabled(true);
					foreCrippledEnergyBox.setEnabled(true);
					aftTurret.setEnabled(true);
					aftPwvBox.setEnabled(true);
					aftRangeBox.setEnabled(true);
					aftCrippledPwvBox.setEnabled(true);
					aftCrippledRangeBox.setEnabled(true);
					aftEnergyBox.setEnabled(false);
					aftCrippledEnergyBox.setEnabled(false);
				} else if ( locationBox.getSelectedItem() == 'energy-none' ) {
					foreTurret.setEnabled(false);
					forePwvBox.setEnabled(false);
					foreRangeBox.setEnabled(false);
					foreCrippledPwvBox.setEnabled(false);
					foreCrippledRangeBox.setEnabled(false);
					foreEnergyBox.setEnabled(true);
					foreCrippledEnergyBox.setEnabled(true);
					aftTurret.setEnabled(false);
					aftPwvBox.setEnabled(false);
					aftRangeBox.setEnabled(false);
					aftCrippledPwvBox.setEnabled(false);
					aftCrippledRangeBox.setEnabled(false);
					aftEnergyBox.setEnabled(false);
					aftCrippledEnergyBox.setEnabled(false);
				} else if ( locationBox.getSelectedItem() == 'none-energy' ) {
					foreTurret.setEnabled(false);
					forePwvBox.setEnabled(false);
					foreRangeBox.setEnabled(false);
					foreCrippledPwvBox.setEnabled(false);
					foreCrippledRangeBox.setEnabled(false);
					foreEnergyBox.setEnabled(false);
					foreCrippledEnergyBox.setEnabled(false);
					aftTurret.setEnabled(false);
					aftPwvBox.setEnabled(false);
					aftRangeBox.setEnabled(false);
					aftCrippledPwvBox.setEnabled(false);
					aftCrippledRangeBox.setEnabled(false);
					aftEnergyBox.setEnabled(true);
					aftCrippledEnergyBox.setEnabled(true);
				}
			} else {
				locationBox.setEnabled(false);
				foreCrippledTextFlavor.setEnabled(false);
				foreCrippledTextArea.setVisible(false);
				foreTurret.setEnabled(false);
				forePwvBox.setEnabled(false);
				foreRangeBox.setEnabled(false);
				foreCrippledPwvBox.setEnabled(false);
				foreCrippledRangeBox.setEnabled(false);
				foreEnergyBox.setEnabled(true);
				foreCrippledEnergyBox.setEnabled(false);
				foreCrippledUpgradeBox1.setEnabled(false);
				foreCrippledUpgradeBox2.setEnabled(false);
				foreCrippledUpgradeBox3.setEnabled(false);
				foreCrippledUpgradeBox4.setEnabled(false);
				foreCrippledUpgradeBox5.setEnabled(false);
				foreCrippledUpgradeBox6.setEnabled(false);
				foreCrippledUpgradeBox7.setEnabled(false);
				foreCrippledPortrait.setVisible(false);
				aftTextFlavor.setEnabled(false);
				aftTextArea.setVisible(false);
				aftCrippledTextFlavor.setEnabled(false);
				aftCrippledTextArea.setVisible(false);
				aftTurret.setEnabled(false);
				aftPwvBox.setEnabled(false);
				aftRangeBox.setEnabled(false);
				aftCrippledPwvBox.setEnabled(false);
				aftCrippledRangeBox.setEnabled(false);
				aftEnergyBox.setEnabled(false);
				aftCrippledEnergyBox.setEnabled(false);
				aftHullBox.setEnabled(false);
				aftShieldBox.setEnabled(false);
				aftRecoverCheckbox.setEnabled(false);
				aftReinforceCheckbox.setEnabled(false);
				aftCoordinateCheckbox.setEnabled(false);
				aftJamCheckbox.setEnabled(false);
				aftLockCheckbox.setEnabled(false);
				aftUpgradeBox1.setEnabled(false);
				aftUpgradeBox2.setEnabled(false);
				aftUpgradeBox3.setEnabled(false);
				aftUpgradeBox4.setEnabled(false);
				aftUpgradeBox5.setEnabled(false);
				aftUpgradeBox6.setEnabled(false);
				aftUpgradeBox7.setEnabled(false);
				aftCrippledUpgradeBox1.setEnabled(false);
				aftCrippledUpgradeBox2.setEnabled(false);
				aftCrippledUpgradeBox3.setEnabled(false);
				aftCrippledUpgradeBox4.setEnabled(false);
				aftCrippledUpgradeBox5.setEnabled(false);
				aftCrippledUpgradeBox6.setEnabled(false);
				aftCrippledUpgradeBox7.setEnabled(false);
				aftCostBox.setEnabled(false);
				aftPortrait.setVisible(false);
				aftCrippledPortrait.setVisible(false);	
			}
		} catch( ex ) {
			Error.handleUncaught( ex );
		}
	}
	
	commonPanel.addToEditor( editor, @xw-common, null, null, 0 );
	forePanel.addToEditor( editor, @xw-fore, null, null, 1 );
	aftPanel.addToEditor( editor, @xw-aft, null, null, 2 );
	editor.addFieldPopulationListener( actionFunction );
	diy.setNameField( nameField );
	bindings.bind();
	
	// Add action listeners
	locationBox.addActionListener( actionFunction );
	doubleCheckbox.addActionListener( actionFunction );
}


function createFrontPainter( diy, sheet ) {
	//============== Ship Token ==============
	if( sheet.sheetIndex == 4 ) {
		tokenNameBox = Xwing.headingBox( sheet, 6.8 );
		return;
	}
	
	//============== Front Sheet ==============
	if( sheet.sheetIndex != 4 ) {
		nameBox = Xwing.headingBox( sheet, 12.5 );
		epicBox = Xwing.headingBox( sheet, 12.5 );
		
		abilityTextBox = Xwing.abilityBox( sheet, 8 );
		flavorTextBox = Xwing.flavorBox( sheet, 8 );
			
		legalBox = markupBox( sheet );
		legalBox.defaultStyle = new TextStyle(
				FAMILY, 'Arial',
				COLOR, Color(151/255,151/255,151/255),
				SIZE,   4
			);
		legalBox.markupText = '\u00a9LFL \u00a9FFG';
		return;
	}
}


function createBackPainter( diy, sheet ) {
	//============== Ship Token ==============
	if( sheet.sheetIndex == 5 ) {
		tokenNameBox = Xwing.headingBox( sheet, 6.8 );
		return;
	}
	
	//============== Front Sheet ==============
	if( sheet.sheetIndex != 5 ) {
		nameBox = Xwing.headingBox( sheet, 12.5 );
		epicBox = Xwing.headingBox( sheet, 12.5 );
		
		abilityTextBox = Xwing.abilityBox( sheet, 8 );
		flavorTextBox = Xwing.flavorBox( sheet, 8 );
			
		legalBox = markupBox( sheet );
		legalBox.defaultStyle = new TextStyle(
				FAMILY, 'Arial',
				COLOR, Color(151/255,151/255,151/255),
				SIZE,   4
			);
		legalBox.markupText = '\u00a9LFL \u00a9FFG';
		return;
	}
}


function paintFront( g, diy, sheet ) {
	if( sheet.sheetIndex == 0 ) {
	// Fore Card Front Face
		if( $$DoubleSection.yesNo ) {
			paintCardFaceComponents( g, diy, sheet, 'fore', 'front');
		} else {
			paintCardFaceComponents( g, diy, sheet, 'single', 'front');
		}
	} else if( sheet.sheetIndex == 2 ) {
	// Aft Card Front Face
		if( $$DoubleSection.yesNo ) {
			paintCardFaceComponents( g, diy, sheet, 'aft', 'front');
		} else {
			// Draw nothing
		}
	} else {
	// Ship Token 
		paintTokenComponents( g, diy, sheet);
	}
}


function paintBack( g, diy, sheet ) {
	if( sheet.sheetIndex == 1 ) {
	// Fore Card Back Face
		if( $$DoubleSection.yesNo ) {
			paintCardFaceComponents( g, diy, sheet, 'fore', 'back');
		} else {
			imageTemplate = 'huge-' + Xwing.getPrimaryFaction( $Affiliation ) + '-back-template';
			sheet.paintImage( g, imageTemplate, 0, 0);
			if( $Affiliation == 'resistance' || $Affiliation == 'firstorder' ) {
				imageTemplate = 'huge-' + $Affiliation + '-back-template';
				sheet.paintImage( g, imageTemplate, 0, 0);	
			}
		}
	} else if( sheet.sheetIndex == 3 ) {
	// Aft Card Back Face
		if( $$DoubleSection.yesNo ) {
			paintCardFaceComponents( g, diy, sheet, 'aft', 'back');
		} else {
			// Draw nothing
		}
	} else {
	// Ship Token Backside
		if( $$DoubleSection.yesNo ) {
			imageTemplate = 'huge-double-token-template';
		} else {
			imageTemplate = 'huge-single-token-template';
		}
		sheet.paintImage( g, imageTemplate, 0, 0);
	}
}
	

function paintCardFaceComponents( g, diy, sheet, section, side) {
	//Draw portrait
	target = sheet.getRenderTarget();
	portraits[sheet.sheetIndex].paint( g, target );
	
	//Draw template
	imageTemplate = 'huge-' + Xwing.getPrimaryFaction( $Affiliation ) + '-' + section + '-template';
	sheet.paintImage( g, imageTemplate, 0, 0);
	if( $Affiliation == 'resistance' || $Affiliation == 'empire' || $Affiliation == 'firstorder' ) {
		imageTemplate = 'huge-' + $Affiliation + '-front-template';
		sheet.paintImage( g, imageTemplate, 0, 0);	
	}
		
	// Draw the name
	appendTextToName = '';
	if( side == 'back') {
		appendTextToName = 'crippled ';
	}
	if( section == 'fore' ) {
		nameBox.markupText = diy.name + ' (' + appendTextToName + $ForeDesignation + ')';
	} else if( section == 'aft' ) {
		nameBox.markupText = diy.name + ' (' + appendTextToName + $AftDesignation + ')';
	} else {
		nameBox.markupText = diy.name;
	}
	nameBox.draw( g, R( section, 'shiptype') );
	
	// Draw the epic icon
	epicBox.markupText = '<epic>';
	
	epicBox.draw( g, R( section, 'epic') );
	
	// Draw the ship icon
	portraits[4].paint( g, target );
	
 	// Draw the Pilot Skill
	sheet.drawOutlinedTitle( g, $PilotSkill, R( section, 'ps' ), Xwing.numberFont, 18, 2, Xwing.getColor( 'skill' ), Color.BLACK, sheet.ALIGN_CENTER, true);
 		
	// Draw the Primary Weapon/Energy Symbol, Value and Range
	if(	section == 'single' ) {
		symbolTemplate = 'huge-attribute-symbol-energy-template';
		symbolRegion = 'huge-fore-attribute-symbol-region';
		if( side == 'front' ) {
			attributeValue = $ForeEnergy;
		} else {
			attributeValue = $ForeCrippledEnergy;
		}
		range = 'no';
		attributeColor = Xwing.getColor( 'energy' );
		attributeRegion = R( 'fore', 'attribute' );
	} else if( section == 'fore' && ( $Location == 'energy-attack' || $Location == 'energy-none' ) ) {
		symbolTemplate = 'huge-attribute-symbol-energy-template';
		symbolRegion = 'huge-fore-attribute-symbol-region';
		if( side == 'front' ) {
			attributeValue = $ForeEnergy;
		} else {
			attributeValue = $ForeCrippledEnergy;
		}
		range = 'no';
		attributeColor = Xwing.getColor( 'energy' );
		attributeRegion = R( 'fore', 'attribute' );
 	} else if( section == 'aft' && ( $Location == 'attack-energy' || $Location == 'none-energy' ) ) {
		symbolTemplate = 'huge-attribute-symbol-energy-template';
		symbolRegion = 'huge-aft-attribute-symbol-region';
		if( side == 'front' ) {
			attributeValue = $AftEnergy;
		} else {
			attributeValue = $AftCrippledEnergy;
		}
		range = 'no';
		attributeColor = Xwing.getColor( 'energy' );
		attributeRegion = R( 'aft', 'attribute' );
	} else if( section == 'fore' && $Location == 'attack-energy' ) {
		if( $$ForeTurret.yesNo ) {
			symbolTemplate = 'huge-attribute-symbol-attack-turret-template';
		} else {
			symbolTemplate = 'huge-attribute-symbol-attack-front-template';
		}
		symbolRegion = 'huge-fore-attribute-symbol-region';
		if( side == 'front' ) {
			attributeValue = $ForePwv;
			range = $ForeRange;
		} else {
			attributeValue = $ForeCrippledPwv;
			range = $ForeCrippledRange;
		}
		attributeColor = Xwing.getColor( 'attack' );
		attributeRegion = R( 'fore', 'attribute' );
		rangeRegion = R( 'fore', 'range' );
		rangeBoxTemplate = 'huge-' + Xwing.getPrimaryFaction( $Affiliation ) + '-fore-range-box';
		rangeBoxRegion = 'huge-fore-range-box-region';
	} else if( section == 'aft' && $Location == 'energy-attack' ) {
		if( $$AftTurret.yesNo ) {
			symbolTemplate = 'huge-attribute-symbol-attack-turret-template';
		} else {
			symbolTemplate = 'huge-attribute-symbol-attack-front-template';
		}
		symbolRegion = 'huge-aft-attribute-symbol-region';
		if( side == 'front' ) {
			attributeValue = $AftPwv;
			range = $AftRange;
		} else {
			attributeValue = $AftCrippledPwv;
			range = $AftCrippledRange;
		}
		attributeColor = Xwing.getColor( 'attack' );
		attributeRegion = R( 'aft', 'attribute');
		rangeRegion = R( 'aft', 'range' );
		rangeBoxTemplate = 'huge-' + Xwing.getPrimaryFaction( $Affiliation ) + '-aft-range-box';
		rangeBoxRegion = 'huge-aft-range-box-region';
	} else if( section == 'fore' && $Location == 'none-energy' ) {
		symbolTemplate = 'huge-attribute-symbol-attack-front-template';
 		symbolRegion = 'huge-fore-attribute-symbol-region';
 		attributeValue = '-';
		range = 'no';
 		attributeColor = Xwing.getColor( 'attack' );
 		attributeRegion = R( 'fore', 'attribute' );		
	} else if( section == 'aft' && $Location == 'energy-none' ) {
		symbolTemplate = 'huge-attribute-symbol-attack-front-template';
 		symbolRegion = 'huge-aft-attribute-symbol-region';
 		attributeValue = '-';
		range = 'no';
 		attributeColor = Xwing.getColor( 'attack' );
 		attributeRegion = R( 'aft', 'attribute' );		
	}
	if( range != 'no' ) {
		sheet.paintImage( g, rangeBoxTemplate, rangeBoxRegion);
		sheet.drawOutlinedTitle( g, range, rangeRegion, Xwing.numberFont, 8, 1, Color.WHITE, Color.BLACK, sheet.ALIGN_CENTER, true);
	}
	sheet.paintImage( g, symbolTemplate, symbolRegion );
	sheet.drawOutlinedTitle( g, attributeValue, attributeRegion, Xwing.numberFont, 14, 1, attributeColor, Color.BLACK, sheet.ALIGN_CENTER, true);
	
	// Draw the Agility Value
	if( ( section == 'fore' || section == 'single' ) && side == 'back' ) {
		agility = '-';
		agilityRegion = R( 'fore', 'agi' );
	} else if( section == 'aft' && side == 'back' ) {
		agility = '-';
		agilityRegion = R( 'aft', 'agi' );
	} else if( ( section == 'fore' || section == 'single' ) && side == 'front' ) {
		agility = '0';
		agilityRegion = R( 'fore', 'agi' );		
	} else {
		agility = '0';
		agilityRegion = R( 'aft', 'agi' );		
	}
	sheet.drawOutlinedTitle( g, agility, agilityRegion, Xwing.numberFont, 14, 1, Xwing.getColor( 'agility' ), Color.BLACK, sheet.ALIGN_CENTER, true);

	// Draw the Hull Value
	if( ( section == 'fore' || section == 'single' ) && side == 'back' ) {
		hull = '-';
		hullRegion = R( 'fore', 'hull' );
	} else if( section == 'aft' && side == 'back' ) {
		hull = '-';
		hullRegion = R( 'aft', 'hull' );
	} else if( ( section == 'fore' || section == 'single' ) && side == 'front' ) {
		hull = $ForeHull;
		hullRegion = R( 'fore', 'hull' );		
	} else {
		hull = $AftHull;
		hullRegion = R( 'aft', 'hull' );		
	}
	sheet.drawOutlinedTitle( g, hull, hullRegion, Xwing.numberFont, 14, 1, Xwing.getColor( 'hull' ), Color.BLACK, sheet.ALIGN_CENTER, true);

	// Draw the Shield Value
	if( ( section == 'fore' || section == 'single' ) && side == 'back' ) {
		shield = '-';
		shieldRegion = R( 'fore', 'shield' );
	} else if( section == 'aft' && side == 'back' ) {
		shield = '-';
		shieldRegion = R( 'aft', 'shield' );
	} else if( ( section == 'fore' || section == 'single' ) && side == 'front' ) {
		shield = $ForeShield;
		shieldRegion = R( 'fore', 'shield' );		
	} else {
		shield = $AftShield;
		shieldRegion = R( 'aft', 'shield' );		
	}
	sheet.drawOutlinedTitle( g, shield, shieldRegion, Xwing.numberFont, 14, 1, Xwing.getColor( 'shield' ), Color.BLACK, sheet.ALIGN_CENTER, true);
	
	// Draw the Squad Point Cost
	if( side == 'back' ) {
		cost = '-';
	} else if( section == 'fore' || section == 'single' ) {
		cost = $ForeCost;
	} else {
		cost = $AftCost;
	}
	sheet.drawOutlinedTitle( g, cost, R( 'fore', 'cost' ), Xwing.numberFont, 10, 0.5, Color.BLACK, Color.WHITE, sheet.ALIGN_CENTER, true);
	
	// Draw Action Bar
	if( side == 'front' ) {
		actions = [];
		if( section == 'fore' || section == 'single' ) {
			if( $$ForeRecoverAction.yesNo ) { actions.push( 'recover' ); }
			if( $$ForeReinforceAction.yesNo ) { actions.push( 'reinforce' ); }
			if( $$ForeCoordinateAction.yesNo ) { actions.push( 'coordinate' ); }
			if( $$ForeJamAction.yesNo ) { actions.push( 'jam' ); }
			if( $$ForeLockAction.yesNo ) { actions.push( 'lock' ); }
			xbias = 202;
		} else if( section == 'aft' ) {
			if( $$AftRecoverAction.yesNo ) { actions.push( 'recover' ); }
			if( $$AftReinforceAction.yesNo ) { actions.push( 'reinforce' ); }
			if( $$AftCoordinateAction.yesNo ) { actions.push( 'coordinate' ); }
			if( $$AftJamAction.yesNo ) { actions.push( 'jam' ); }
			if( $$AftLockAction.yesNo ) { actions.push( 'lock' ); }
			xbias = -28;
		}
		for( let i = 0; i < actions.length; ++i ) {
			// Get a nice distribution of the actions
			x = xbias + Math.round( 472 / (actions.length + 1) * ( i + 1 ) );
			y = 780;
			g.setPaint( Color.BLACK );
			sheet.drawTitle(g, Xwing.textToIconChar( actions[i] ), Region( x.toString() + ',' + y.toString() + ',100,100'), Xwing.iconFont, 15, sheet.ALIGN_CENTER);
		}
	}
	
	// Draw Upgrade Bar
	var upgrades = [];
	if( section == 'fore' || section == 'single'  ) {
		if( $ForeUpgrade7 != '-' && ( side != 'back' || $$ForeCrippledUpgrade7.yesNo ) ) { upgrades.push( $ForeUpgrade7 ); }
		if( $ForeUpgrade6 != '-' && ( side != 'back' || $$ForeCrippledUpgrade6.yesNo ) ) { upgrades.push( $ForeUpgrade6 ); }
		if( $ForeUpgrade5 != '-' && ( side != 'back' || $$ForeCrippledUpgrade5.yesNo ) ) { upgrades.push( $ForeUpgrade5 ); }
		if( $ForeUpgrade4 != '-' && ( side != 'back' || $$ForeCrippledUpgrade4.yesNo ) ) { upgrades.push( $ForeUpgrade4 ); }
		if( $ForeUpgrade3 != '-' && ( side != 'back' || $$ForeCrippledUpgrade3.yesNo ) ) { upgrades.push( $ForeUpgrade3 ); }
		if( $ForeUpgrade2 != '-' && ( side != 'back' || $$ForeCrippledUpgrade2.yesNo ) ) { upgrades.push( $ForeUpgrade2 ); }
		if( $ForeUpgrade1 != '-' && ( side != 'back' || $$ForeCrippledUpgrade1.yesNo ) ) { upgrades.push( $ForeUpgrade1 ); }
	} else if( section == 'aft' ) {
		if( $AftUpgrade7 != '-' && ( side != 'back' || $$AftCrippledUpgrade7.yesNo ) ) { upgrades.push( $AftUpgrade7 ); }
		if( $AftUpgrade6 != '-' && ( side != 'back' || $$AftCrippledUpgrade6.yesNo ) ) { upgrades.push( $AftUpgrade6 ); }
		if( $AftUpgrade5 != '-' && ( side != 'back' || $$AftCrippledUpgrade5.yesNo ) ) { upgrades.push( $AftUpgrade5 ); }
		if( $AftUpgrade4 != '-' && ( side != 'back' || $$AftCrippledUpgrade4.yesNo ) ) { upgrades.push( $AftUpgrade4 ); }
		if( $AftUpgrade3 != '-' && ( side != 'back' || $$AftCrippledUpgrade3.yesNo ) ) { upgrades.push( $AftUpgrade3 ); }
		if( $AftUpgrade2 != '-' && ( side != 'back' || $$AftCrippledUpgrade2.yesNo ) ) { upgrades.push( $AftUpgrade2 ); }
		if( $AftUpgrade1 != '-' && ( side != 'back' || $$AftCrippledUpgrade1.yesNo ) ) { upgrades.push( $AftUpgrade1 ); }
	}	
	for( let i=0; i<upgrades.length; ++i ) {
		// Get a nice distribution of the upgrades
		if( upgrades.length == 7) {
			x = 450 - 51 * ( i );
		} else {
			x = 450 - 55 * ( i );
		}
		y = 951;
		g.setPaint( Color.BLACK );
		g.fillOval( x+2, y+2, 45, 45 );
		sheet.drawOutlinedTitle( g, Xwing.textToIconChar( upgrades[i] ), Region( x.toString() + ',' + y.toString() + ',50,50'), Xwing.iconFont, 15, 1, Color.WHITE, Color.BLACK, sheet.ALIGN_CENTER, true);
	}

	// Draw Legal text
	legalBox.drawAsSingleLine( g, R( section, 'legal' ) );
	
	// Draw Crippled Overlay
	if( side == 'back' ) {
		imageTemplate = 'huge-' + Xwing.getPrimaryFaction( $Affiliation ) + '-' + section + '-action-overlay-template';
		sheet.paintImage( g, imageTemplate, 0, 0);
		imageTemplate = 'huge-overlay-' + section + '-template';
		sheet.paintImage( g, imageTemplate, 0, 0);
	}	
	
	// Draw the Section Ability/Flavour Text
	if( section == 'single' ) {
		if( $$ForeTextFlavor.yesNo ) {
			flavorTextBox.setPageShape( PageShape.RECTANGLE_SHAPE );
			flavorTextBox.markupText = $ForeText;
			flavorTextBox.draw( g, R( 'fore', 'text' ) );
		} else {
			abilityTextBox.setPageShape( PageShape.RECTANGLE_SHAPE );
			abilityTextBox.markupText = $ForeText;
			abilityTextBox.draw( g, R( 'fore', 'text' ) );
		}		
	} else if( side == 'front' && section == 'fore' ) {
		if( $$ForeTextFlavor.yesNo ) {
			if( $Location == 'attack-energy' ) {
				flavorTextBox.setPageShape( PageShape.CupShape( 98, 0, 597, 0, 0 ) );
			} else {
				flavorTextBox.setPageShape( PageShape.RECTANGLE_SHAPE );
			}
			flavorTextBox.markupText = $ForeText;
			flavorTextBox.draw( g, R( 'fore', 'text' ) );
		} else {
			if( $Location == 'attack-energy' ) {
				abilityTextBox.setPageShape( PageShape.CupShape( 98, 0, 597, 0, 0 ) );
			} else {
				abilityTextBox.setPageShape( PageShape.RECTANGLE_SHAPE );
			}
			abilityTextBox.markupText = $ForeText;
			abilityTextBox.draw( g, R( 'fore', 'text' ) );
		}
	} else if ( side == 'back' && section == 'fore' ) {
		if( $$ForeCrippledTextFlavor.yesNo ) {
			if( $Location == 'attack-energy' ) {
				flavorTextBox.setPageShape( PageShape.CupShape( 98, 0, 597, 0, 0 ) );
			} else {
				flavorTextBox.setPageShape( PageShape.RECTANGLE_SHAPE );
			}
			flavorTextBox.markupText = $ForeCrippledText;
			flavorTextBox.draw( g, R( 'fore', 'text' ) );
		} else {
			if( $Location == 'attack-energy' ) {
				abilityTextBox.setPageShape( PageShape.CupShape( 98, 0, 597, 0, 0 ) );
			} else {
				abilityTextBox.setPageShape( PageShape.RECTANGLE_SHAPE );
			}
			abilityTextBox.markupText = $ForeCrippledText;
			abilityTextBox.draw( g, R( 'fore', 'text' ) );
		}
	} else if( side == 'front' && section == 'aft' ) {
		if( $$AftTextFlavor.yesNo ) {
			if( $Location == 'energy-attack' ) {
				flavorTextBox.setPageShape( PageShape.CupShape( 0, 98, 597, 0, 0 ) );
			} else {
				flavorTextBox.setPageShape( PageShape.RECTANGLE_SHAPE );
			}
			flavorTextBox.markupText = $AftText;
			flavorTextBox.draw( g, R( 'aft', 'text' ) );
		} else {
			if( $Location == 'energy-attack' ) {
				abilityTextBox.setPageShape( PageShape.CupShape( 0, 98, 597, 0, 0 ) );
			} else {
				abilityTextBox.setPageShape( PageShape.RECTANGLE_SHAPE );
			}
			abilityTextBox.markupText = $AftText;
			abilityTextBox.draw( g, R( 'aft', 'text' ) );
		}
	} else if ( side == 'back' && section == 'aft' ) {
		if( $$AftCrippledTextFlavor.yesNo ) {
			if( $Location == 'energy-attack' ) {
				flavorTextBox.setPageShape( PageShape.CupShape( 0, 98, 597, 0, 0 ) );
			} else {
				flavorTextBox.setPageShape( PageShape.RECTANGLE_SHAPE );
			}
			flavorTextBox.markupText = $AftCrippledText;
			flavorTextBox.draw( g, R( 'aft', 'text' ) );
		} else {
			if( $Location == 'energy-attack' ) {
				abilityTextBox.setPageShape( PageShape.CupShape( 0, 98, 597, 0, 0 ) );
			} else {
				abilityTextBox.setPageShape( PageShape.RECTANGLE_SHAPE );
			}
			abilityTextBox.markupText = $AftCrippledText;
			abilityTextBox.draw( g, R( 'aft', 'text' ) );
		}
	}
	
	return;
}


function paintTokenComponents( 	g, diy, sheet) {
	if( $$DoubleSection.yesNo ) {
		tokenSize = 'double';
		tokenHeight = 2646;
		tokenBasicUnit = 472.5;
		tokenWidth = 945;
		tokenUpperWaistYCoord = 963;
		tokenLowerWaistYCoord = 1683;
	} else {
		tokenSize = 'single';
		tokenHeight = 2291;
		tokenBasicUnit = 472.5;
		tokenWidth = 945;
		tokenUpperWaistYCoord = 963;
		tokenLowerWaistYCoord = 1328;
	}

	thickStroke = BasicStroke(7);
	normalStroke = BasicStroke(5);
	thinStroke = BasicStroke(4);
	g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
	
	// Draw star-field background
	imageTemplate = 'huge-' + tokenSize + '-token-template';
	sheet.paintImage( g, imageTemplate, 0, 0);
	
	// Draw fore shaded fire arc area
	fireArcArea = ImageUtils.create( tokenWidth, tokenHeight, true );
	gTemp = fireArcArea.createGraphics();
	gTemp.setPaint( Xwing.getColor( Xwing.getPrimaryFaction( $Affiliation ) ) );
	if( $ForeArc == 'broadside' ) {
		gTemp.fillPolygon( [0, Math.round(tokenWidth/2), 0], [0, Math.round(tokenBasicUnit), Math.round(tokenBasicUnit*2)], 3 );
		gTemp.fillPolygon( [tokenWidth, Math.round(tokenWidth/2), tokenWidth], [0, Math.round(tokenBasicUnit), Math.round(tokenBasicUnit*2)], 3 );
	} else if ( $ForeArc == 'extendedBroadside' ) {
		gTemp.fillPolygon( [0, Math.round(tokenWidth/2), 0], [0, Math.round(tokenBasicUnit), Math.round(tokenHeight/2)], 3 );
		gTemp.fillPolygon( [tokenWidth, Math.round(tokenWidth/2), tokenWidth], [0, Math.round(tokenBasicUnit), Math.round(tokenHeight/2)], 3 );
	} else if ( $ForeArc == 'front' ) {
		gTemp.fillPolygon( [0, Math.round(tokenWidth/2), tokenWidth], [0, Math.round(tokenBasicUnit), 0], 3 );
	} else if ( $ForeArc == 'extendedFront' ) {
		gTemp.fillPolygon( [0, 0, Math.round(tokenWidth/2), tokenWidth, tokenWidth], [0, tokenUpperWaistYCoord, Math.round(tokenHeight/2), tokenUpperWaistYCoord, 0], 5 );
	} else if ( $ForeArc == 'fullArc' ) {
		gTemp.fillPolygon( [0, 0, Math.round(tokenWidth/2), tokenWidth, tokenWidth], [0, Math.round(tokenHeight/2), Math.round(tokenBasicUnit), Math.round(tokenHeight/2), 0], 5 );
	}	
	if( $AftArc == 'broadside' ) {
		gTemp.fillPolygon( [0, Math.round(tokenWidth/2), 0], [tokenHeight, Math.round(tokenHeight-tokenBasicUnit), Math.round(tokenHeight-tokenBasicUnit*2)], 3 );
		gTemp.fillPolygon( [tokenWidth, Math.round(tokenWidth/2), tokenWidth], [tokenHeight, Math.round(tokenHeight-tokenBasicUnit), Math.round(tokenHeight-tokenBasicUnit*2)], 3 );
	} else if ( $AftArc == 'extendedBroadside' ) {
		gTemp.fillPolygon( [0, Math.round(tokenWidth/2), 0], [tokenHeight, Math.round(tokenHeight-tokenBasicUnit),  Math.round(tokenHeight/2)], 3 );
		gTemp.fillPolygon( [tokenWidth, Math.round(tokenWidth/2), tokenWidth], [tokenHeight, Math.round(tokenHeight-tokenBasicUnit),  Math.round(tokenHeight/2)], 3 );	
	} else if ( $AftArc == 'rear' ) {
		gTemp.fillPolygon( [0, Math.round(tokenWidth/2), tokenWidth], [tokenHeight, Math.round(tokenHeight-tokenBasicUnit), tokenHeight], 3 );
	} else if ( $AftArc == 'extendedRear' ) {
		gTemp.fillPolygon( [0, 0, Math.round(tokenWidth/2), tokenWidth, tokenWidth], [tokenHeight, tokenLowerWaistYCoord, Math.round(tokenHeight/2), tokenLowerWaistYCoord, tokenHeight], 5 );
	} else if ( $AftArc == 'fullArc' ) {
		gTemp.fillPolygon( [0, 0, Math.round(tokenWidth/2), tokenWidth, tokenWidth], [tokenHeight, Math.round(tokenHeight/2), Math.round(tokenHeight-tokenBasicUnit), Math.round(tokenHeight/2), tokenHeight], 5 );
	}
	fireArcArea = createTranslucentImage( fireArcArea, 0.10);
	g.drawImage( fireArcArea, 0, 0, null );
	
	// Draw turret circle
	if( ( tokenSize == 'double' && $Location == 'attack-energy' && $$ForeTurret.yesNo ) ) {
		g.setPaint( Xwing.getColor( Xwing.getPrimaryFaction( $Affiliation ) ) );
		g.setStroke(thinStroke);
		diameter = 370;
		g.drawArc( Math.round( (tokenWidth-diameter) /2 ), Math.round( tokenBasicUnit-diameter/2 ), diameter, diameter, 7, 322 );
		diameter = 316;
		g.drawArc( Math.round( (tokenWidth-diameter) /2 ), Math.round( tokenBasicUnit-diameter/2 ), diameter, diameter, 8, 325 );
		g.drawPolyline( [ 629, 592, 643, 694, 657 ], [ 452, 452, 531, 452, 452 ], 5 );
		g.drawPolyline( [ 613.5, 616, 633, 631 ], [ 546, 541, 565, 568 ], 4 );
	} else if ( ( tokenSize == 'double' && $Location == 'energy-attack'&& $$AftTurret.yesNo ) ) {
		g.setPaint( Xwing.getColor( Xwing.getPrimaryFaction( $Affiliation ) ) );
		g.setStroke(thinStroke);
		diameter = 370;
		g.drawArc( Math.round( (tokenWidth-diameter) /2 ), Math.round(tokenHeight-tokenBasicUnit-diameter/2), diameter, diameter, 7, 322 );
		diameter = 316;
		g.drawArc( Math.round( (tokenWidth-diameter) /2 ), Math.round(tokenHeight-tokenBasicUnit-diameter/2), diameter, diameter, 8, 325 );
		g.drawPolyline( [ 629, 592, 643, 694, 657 ], [ 2153, 2153, 2232, 2153, 2153 ], 5 );
		g.drawPolyline( [ 613.5, 616, 633, 631 ], [ 2247, 2242, 2266, 2269 ], 4 );
	}
	
	// Draw stat panel
	if( tokenSize == 'double' ) {
		sheet.paintImage( g, 'huge-' + Xwing.getPrimaryFaction( $Affiliation ) + '-fore-panel-template', 47, 0);
	}
	sheet.paintImage( g, 'huge-' + Xwing.getPrimaryFaction( $Affiliation ) + '-aft-panel-template', 47, tokenHeight-230);

	// Draw the name	
	if( tokenSize == 'double' ) {
		tokenNameBox.markupText = diy.name + ' (' + $ForeDesignation + ')';
		tokenNameBox.draw( g, R( 'fore', 'token-shiptype') );
		tokenNameBox.markupText = diy.name + ' (' + $AftDesignation + ')';
		tokenNameBox.draw( g, R( 'aft', 'token-shiptype') );
	} else {
		tokenNameBox.markupText = diy.name;
		tokenNameBox.draw( g, R( 'single', 'token-shiptype') );
	}
	
	// Draw the ship icon
	target = sheet.getRenderTarget();
	if( tokenSize == 'double' ) {
		portraits[5].paint( g, target );
	} else {
		iconImage = portraits[5].getImage();
		iconScale = portraits[5].getScale();
		AT = java.awt.geom.AffineTransform;
		tokenTransform = AT.getTranslateInstance(
			190 - (iconImage.width*iconScale)/2 + portraits[5].getPanX(),
			1809 - (iconImage.height*iconScale)/2 + portraits[5].getPanY() );
		tokenTransform.concatenate( AT.getScaleInstance( iconScale, iconScale ) );
		g.drawImage( iconImage, tokenTransform, null );
	}

	// Draw the Pilot Skill
	if( tokenSize == 'double' ) {
		sheet.drawOutlinedTitle( g, $PilotSkill, R( 'fore' , 'token-ps'), Xwing.numberFont, 18, 2, Xwing.getColor('skill'), Color.BLACK, sheet.ALIGN_CENTER, true);
		sheet.drawOutlinedTitle( g, $PilotSkill, R( 'aft', 'token-ps'), Xwing.numberFont, 18, 2, Xwing.getColor('skill'), Color.BLACK, sheet.ALIGN_CENTER, true);
	} else {
		sheet.drawOutlinedTitle( g, $PilotSkill, R( 'single', 'token-ps'), Xwing.numberFont, 18, 2, Xwing.getColor('skill'), Color.BLACK, sheet.ALIGN_CENTER, true);
	}
	
	// Draw the Primary Weapon/Energy Value
	if( tokenSize == 'double' ) {
		if(	$Location == 'attack-energy' ) {
			attributeForeValue = $ForePwv;
			attributeForeColor = Xwing.getColor( 'attack' );
			attributeAftValue = $AftEnergy;
			attributeAftColor = Xwing.getColor( 'energy' );
		} else if ( $Location == 'energy-attack' ) {
			attributeForeValue = $ForeEnergy;
			attributeForeColor = Xwing.getColor( 'energy' );
			attributeAftValue = $AftPwv;
			attributeAftColor = Xwing.getColor( 'attack' );
		} else if ( $Location == 'energy-none' ) {
			attributeForeValue = $ForeEnergy;
			attributeForeColor = Xwing.getColor( 'energy' );
			attributeAftValue = '-';
			attributeAftColor = Xwing.getColor( 'attack' );
		} else if ( $Location == 'none-energy' ) {
			attributeForeValue = '-';
			attributeForeColor = Xwing.getColor( 'attack' );
			attributeAftValue = $AftEnergy;
			attributeAftColor = Xwing.getColor( 'energy' );
		}
		sheet.drawOutlinedTitle( g, attributeForeValue, R( 'fore', 'token-attribute'), Xwing.numberFont, 14, 1, attributeForeColor, Color.BLACK, sheet.ALIGN_CENTER, true);
		sheet.drawOutlinedTitle( g, attributeAftValue, R( 'aft', 'token-attribute'), Xwing.numberFont, 14, 1, attributeAftColor, Color.BLACK, sheet.ALIGN_CENTER, true);
	} else {
		attributeValue = $ForeEnergy;
		attributeColor = Xwing.getColor( 'energy' );
		sheet.drawOutlinedTitle( g, attributeValue, R( 'single', 'token-attribute'), Xwing.numberFont, 14, 1, attributeColor, Color.BLACK, sheet.ALIGN_CENTER, true);
	}

	// Draw the Agility Value
	if( tokenSize == 'double' ) {
		sheet.drawOutlinedTitle( g, '0', R( 'fore', 'token-agi'), Xwing.numberFont, 14, 1, Xwing.getColor( 'agility' ), Color.BLACK, sheet.ALIGN_CENTER, true);
		sheet.drawOutlinedTitle( g, '0', R( 'aft', 'token-agi'), Xwing.numberFont, 14, 1, Xwing.getColor( 'agility' ), Color.BLACK, sheet.ALIGN_CENTER, true);
	} else {
		sheet.drawOutlinedTitle( g, '0', R( 'single', 'token-agi'), Xwing.numberFont, 14, 1, Xwing.getColor( 'agility' ), Color.BLACK, sheet.ALIGN_CENTER, true);
	}

	// Draw the Hull Value
	if( tokenSize == 'double' ) {
		sheet.drawOutlinedTitle( g, $ForeHull, R( 'fore', 'token-hull'), Xwing.numberFont, 14, 1, Xwing.getColor( 'hull' ), Color.BLACK, sheet.ALIGN_CENTER, true);
		sheet.drawOutlinedTitle( g, $AftHull, R( 'aft', 'token-hull'), Xwing.numberFont, 14, 1, Xwing.getColor( 'hull' ), Color.BLACK, sheet.ALIGN_CENTER, true);
	} else {
		sheet.drawOutlinedTitle( g, $ForeHull, R( 'single', 'token-hull'), Xwing.numberFont, 14, 1, Xwing.getColor( 'hull' ), Color.BLACK, sheet.ALIGN_CENTER, true);
	}

	// Draw the Shield Value
	if( tokenSize == 'double' ) {
		sheet.drawOutlinedTitle( g, $ForeShield, R( 'fore', 'token-shield'), Xwing.numberFont, 14, 1, Xwing.getColor( 'shield' ), Color.BLACK, sheet.ALIGN_CENTER, true);
		sheet.drawOutlinedTitle( g, $AftShield, R( 'aft', 'token-shield'), Xwing.numberFont, 14, 1, Xwing.getColor( 'shield' ), Color.BLACK, sheet.ALIGN_CENTER, true);
	} else {
		sheet.drawOutlinedTitle( g, $ForeShield, R( 'single', 'token-shield'), Xwing.numberFont, 14, 1, Xwing.getColor( 'shield' ), Color.BLACK, sheet.ALIGN_CENTER, true);
	}
	
	// Draw center line
	g.setPaint( Color(50/255,90/255,190/255 ) );
	g.setStroke(thickStroke);
	g.drawPolyline( [0, tokenWidth], [Math.round(tokenHeight/2), Math.round(tokenHeight/2)], 2 );

	// Draw fire arc lines
	g.setPaint( Xwing.getColor( Xwing.getPrimaryFaction( $Affiliation ) ) );
	g.setStroke(normalStroke);
	if( $ForeArc == 'broadside' ) {
		g.drawPolyline( [0, Math.round(tokenWidth/2), 0], [0, Math.round(tokenBasicUnit), Math.round(tokenBasicUnit*2)], 3 );
		g.drawPolyline( [tokenWidth, Math.round(tokenWidth/2), tokenWidth], [0, Math.round(tokenBasicUnit), Math.round(tokenBasicUnit*2)], 3 );
	} else if ( $ForeArc == 'extendedBroadside' ) {
		g.drawPolyline( [0, Math.round(tokenWidth/2), 0], [0, Math.round(tokenBasicUnit), Math.round(tokenHeight/2)], 3 );
		g.drawPolyline( [tokenWidth, Math.round(tokenWidth/2), tokenWidth], [0, Math.round(tokenBasicUnit), Math.round(tokenHeight/2)], 3 );
	} else if ( $ForeArc == 'front' ) {
		g.drawPolyline( [0, Math.round(tokenWidth/2), tokenWidth], [0, Math.round(tokenBasicUnit), 0], 3 );
	} else if ( $ForeArc == 'extendedFront' ) {
		g.drawPolyline( [0, Math.round(tokenWidth/2), tokenWidth], [tokenUpperWaistYCoord, Math.round(tokenHeight/2), tokenUpperWaistYCoord], 3 );
	} else if ( $ForeArc == 'fullArc' ) {
		g.drawPolyline( [0, Math.round(tokenWidth/2), tokenWidth], [Math.round(tokenHeight/2), Math.round(tokenBasicUnit), Math.round(tokenHeight/2)], 3 );
	}	
	if( $AftArc == 'broadside' ) {
		g.drawPolyline( [0, Math.round(tokenWidth/2), 0], [tokenHeight, Math.round(tokenHeight-tokenBasicUnit), Math.round(tokenHeight-tokenBasicUnit*2)], 3 );
		g.drawPolyline( [tokenWidth, Math.round(tokenWidth/2), tokenWidth], [tokenHeight, Math.round(tokenHeight-tokenBasicUnit), Math.round(tokenHeight-tokenBasicUnit*2)], 3 );
	} else if ( $AftArc == 'extendedBroadside' ) {
		g.drawPolyline( [0, Math.round(tokenWidth/2), 0], [tokenHeight, Math.round(tokenHeight-tokenBasicUnit),  Math.round(tokenHeight/2)], 3 );
		g.drawPolyline( [tokenWidth, Math.round(tokenWidth/2), tokenWidth], [tokenHeight, Math.round(tokenHeight-tokenBasicUnit),  Math.round(tokenHeight/2)], 3 );	
	} else if ( $AftArc == 'rear' ) {
		g.drawPolyline( [0, Math.round(tokenWidth/2), tokenWidth], [tokenHeight, Math.round(tokenHeight-tokenBasicUnit), tokenHeight], 3 );
	} else if ( $AftArc == 'extendedRear' ) {
		g.drawPolyline( [0, Math.round(tokenWidth/2), tokenWidth], [tokenLowerWaistYCoord, Math.round(tokenHeight/2), tokenLowerWaistYCoord], 3 );
	} else if ( $AftArc == 'fullArc' ) {
		g.drawPolyline( [0, Math.round(tokenWidth/2), tokenWidth], [Math.round(tokenHeight/2), Math.round(tokenHeight-tokenBasicUnit), Math.round(tokenHeight/2)], 3 );
	}

	// Draw Action Bar
	actions = [];
	if( $$ForeRecoverAction.yesNo ) { actions.push( 'recover' ); }
	if( $$ForeReinforceAction.yesNo ) { actions.push( 'reinforce' ); }
	if( $$ForeCoordinateAction.yesNo ) { actions.push( 'coordinate' ); }
	if( $$ForeJamAction.yesNo ) { actions.push( 'jam' ); }
	if( $$ForeLockAction.yesNo ) { actions.push( 'lock' ); }
	x = 771;
	for( let i = 0; i < actions.length; ++i ) {
		// Get a nice distribution of the actions
		if( tokenSize == 'double' ) {
			y = Math.round( ( 353 - 25 * actions.length ) + ( 140 + 50 * actions.length ) / (actions.length + 1) * ( actions.length - i ) );
		} else {
			y = Math.round( ( 1699 - 25 * actions.length ) + ( 140 + 50 * actions.length ) / (actions.length + 1) * ( actions.length - i ) );
		}
		sheet.drawOutlinedTitle( g, Xwing.textToIconChar( actions[i] ),  Region( x.toString() + ',' + y.toString() + ',100,100'), Xwing.iconFont, 15, 1, Xwing.getColor('imperial'), Color.BLACK, sheet.ALIGN_CENTER, true);
	}
	if( tokenSize == 'double' ) {
		actions = [];
		if( $$AftRecoverAction.yesNo ) { actions.push( 'recover' ); }
		if( $$AftReinforceAction.yesNo ) { actions.push( 'reinforce' ); }
		if( $$AftCoordinateAction.yesNo ) { actions.push( 'coordinate' ); }
		if( $$AftJamAction.yesNo ) { actions.push( 'jam' ); }
		if( $$AftLockAction.yesNo ) { actions.push( 'lock' ); }
		for( let i = 0; i < actions.length; ++i ) {
			// Get a nice distribution of the actions
			y = Math.round( ( 2054 - 25 * actions.length ) + ( 140 + 50 * actions.length ) / (actions.length + 1) * ( actions.length - i ) );
			sheet.drawOutlinedTitle( g, Xwing.textToIconChar( actions[i] ),  Region( x.toString() + ',' + y.toString() + ',100,100'), Xwing.iconFont, 15, 1, Xwing.getColor('imperial'), Color.BLACK, sheet.ALIGN_CENTER, true);
		}
	}

	//Draw central cutout circle and ship base cutout rectangles
	g.setPaint( Color.WHITE );
	cutoutSize = 190;
	g.fillOval( Math.round( tokenBasicUnit - cutoutSize/2 ), Math.round( tokenBasicUnit - cutoutSize/2 ), cutoutSize, cutoutSize );
	g.fillOval( Math.round( tokenBasicUnit - cutoutSize/2 ), Math.round( tokenHeight - tokenBasicUnit - cutoutSize/2 ), cutoutSize, cutoutSize );
	g.fillRect( 0, 0, 47, 963 );
	g.fillRect( 0, tokenLowerWaistYCoord, 47, 963 );
	g.fillRect( 898, 0, 47, 963 );
	g.fillRect( 898, tokenLowerWaistYCoord, 47, 963 );
	
	return;
}


function onClear() {
	$Affiliation = 'alliance';
	$PilotSkill = '0';
	$DoubleSection = 'no';
	$Location = 'attack-energy';
	
	$ForeDesignation = 'fore';
	$ForeText = '';
	$ForeTextFlavor =  '';
	$ForeCrippledText = '';
	$ForeCrippledTextFlavor =  '';
	$ForePwv = '1';
	$ForeCrippledPwv = '1';
	$ForeTurret = 'no';
	$ForeEnergy = '1';
	$ForeCrippledEnergy = '1';
	$ForeHull = '1';
	$ForeShield = '0';
	$ForeArc = '-';
	$ForeRange = '1';
	$ForeCrippledRange = '1';
	$ForeRecoverAction = 'no';
	$ForeReinforceAction = 'no';
	$ForeCoordinateAction = 'no';
	$ForeJamAction = 'no';
	$ForeLockAction = 'no';
	$ForeUpgrade1 = '-';
	$ForeUpgrade2 = '-';
	$ForeUpgrade3 = '-';
	$ForeUpgrade4 = '-';
	$ForeUpgrade5 = '-';
	$ForeUpgrade6 = '-';
	$ForeUpgrade7 = '-';
	$ForeCrippledUpgrade1 = 'no';
	$ForeCrippledUpgrade2 = 'no';
	$ForeCrippledUpgrade3 = 'no';
	$ForeCrippledUpgrade4 = 'no';
	$ForeCrippledUpgrade5 = 'no';
	$ForeCrippledUpgrade6 = 'no';
	$ForeCrippledUpgrade7 = 'no';
	$ForeCost = '1';
	
	$AftDesignation = 'aft';
	$AftText = '';
	$AftTextFlavor = '';
	$AftCrippledText = '';
	$AftCrippledTextFlavor = '';
	$AftPwv = '1';
	$AftCrippledPwv = '1';
	$AftTurret = 'no';
	$AftEnergy = '1';
	$AftCrippledEnergy = '1';
	$AftHull = '1';
	$AftShield = '0';
	$AftArc = '-';
	$AftRange = '1';
	$AftCrippledRange = '1';
	$AftRecoverAction = 'no';
	$AftReinforceAction = 'no';
	$AftCoordinateAction = 'no';
	$AftJamAction = 'no';
	$AftLockAction = 'no';
	$AftUpgrade1 = '-';
	$AftUpgrade2 = '-';
	$AftUpgrade3 = '-';
	$AftUpgrade4 = '-';
	$AftUpgrade5 = '-';
	$AftUpgrade6 = '-';
	$AftUpgrade7 = '-';
	$AftCrippledUpgrade1 = 'no';
	$AftCrippledUpgrade2 = 'no';
	$AftCrippledUpgrade3 = 'no';
	$AftCrippledUpgrade4 = 'no';
	$AftCrippledUpgrade5 = 'no';
	$AftCrippledUpgrade6 = 'no';
	$AftCrippledUpgrade7 = 'no';
	$AftCost = '1';
}


// These can be used to perform special processing during open/save.
// For example, you can seamlessly upgrade from a previous version
// of the script.
function onRead( diy, ois ) {
	if( diy.version < 2 ) {
		if( $Affiliation == 'rebel' ) {
			$Affiliation = 'alliance';
		} else if( $Affiliation == 'imperial' ) {
			$Affiliation = 'empire';
		}
		if( $ForeUpgrade1 == 'none' ) { $ForeUpgrade1 = '-'; }
		if( $ForeUpgrade2 == 'none' ) { $ForeUpgrade2 = '-'; }
		if( $ForeUpgrade3 == 'none' ) { $ForeUpgrade3 = '-'; }
		if( $ForeUpgrade4 == 'none' ) { $ForeUpgrade4 = '-'; }
		if( $ForeUpgrade5 == 'none' ) { $ForeUpgrade5 = '-'; }
		if( $ForeUpgrade6 == 'none' ) { $ForeUpgrade6 = '-'; }
		if( $ForeUpgrade7 == 'none' ) { $ForeUpgrade7 = '-'; }
		if( $AftUpgrade1 == 'none' ) { $AftUpgrade1 = '-'; }
		if( $AftUpgrade2 == 'none' ) { $AftUpgrade2 = '-'; }
		if( $AftUpgrade3 == 'none' ) { $AftUpgrade3 = '-'; }
		if( $AftUpgrade4 == 'none' ) { $AftUpgrade4 = '-'; }
		if( $AftUpgrade5 == 'none' ) { $AftUpgrade5 = '-'; }
		if( $AftUpgrade6 == 'none' ) { $AftUpgrade6 = '-'; }
		if( $AftUpgrade7 == 'none' ) { $AftUpgrade7 = '-'; }
		if( $ForeArc == 'none' ) { $ForeArc = '-'; }
		if( $AftArc == 'none' ) { $AftArc = '-'; }
		diy.version = 2;
	}
	if( diy.version < 3 ) {
		$ForeDesignation = 'fore';
		$AftDesignation = 'aft';
		diy.version = 3;
	}
	
	portraits[0] = ois.readObject();
	portraits[1] = ois.readObject();
	portraits[2] = ois.readObject();
	portraits[3] = ois.readObject();
	portraits[4] = ois.readObject();
	portraits[5] = ois.readObject();
}

function onWrite( diy, oos ) {
	oos.writeObject( portraits[0] );
	oos.writeObject( portraits[1] );
	oos.writeObject( portraits[2] );
	oos.writeObject( portraits[3] );
	oos.writeObject( portraits[4] );
	oos.writeObject( portraits[5] );
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
 * createTranslucentImage( source, opacity )
 * Create a copy of the source image with an opacity change.
 * This is similar to setting the layer opacity in software
 * like Photoshop.
 */
function createTranslucentImage( source, opacity ) {
	if( opacity >= 1 ) return source;
	im = ImageUtils.create( source.width, source.height, true );
	if( opacity <= 0 ) return im;

	g = im.createGraphics();
	try {
		g.composite = java.awt.AlphaComposite.SrcOver.derive( opacity );
		g.drawImage( source, 0, 0, null );
	} finally {
		g.dispose();
	}
	return im;
}


function getShipStat( shipId, stat ) {
	key = 'xw-ship-' + shipId + '-' + stat;
	if( !Language.getGame().isKeyDefined( key ) ) {
		throw new Error( 'shiptype or stat not defined: ' + shipId + stat );
	}
	return Language.game.get( key );
}


/**
 * Returns a region for this component. The nametag is
 * the middle part of the region name, without the
 * 'char-' prefix or '-region' suffix.
 */
function R( section, nametag, x, y ) {
	var value = $('huge-' + section + '-' + nametag + '-region');
	if( value == null ) {
		throw new Error( 'region not defined: ' + nametag );
	}
	if( x == null ) {
		x = 0;
	}
	if( y == null ) {
		y = 0;
	}
	var temp = [];
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