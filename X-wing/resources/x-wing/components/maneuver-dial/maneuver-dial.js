
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
	diy.faceStyle = FaceStyle.FOUR_FACES;
	diy.transparentFaces = true;
	diy.variableSizedFaces = false;
	
	diy.setTemplateKey( 0, 'maneuver-rebel-upper-front' );
	diy.setTemplateKey( 1, 'maneuver-rebel-upper-back' );
	diy.setTemplateKey( 2, 'maneuver-rebel-lower-front' );
	diy.setTemplateKey( 3, 'maneuver-rebel-lower-back' );

	diy.name = 'Pursuer-Class Ship';
	$Affiliation = 'scum';
	$Huge = 'no';
	$ManeuverS5 = 'na';
	$ManeuverK5 = 'na';
	$ManeuverS4 = 'white';
	$ManeuverK4 = 'na';
	$ManeuverS3 = 'white';
	$ManeuverLT3 = 'red';
	$ManeuverRT3 = 'white';
	$ManeuverLB3 = 'red';
	$ManeuverRB3 = 'white';
	$ManeuverLL3 = 'na';
	$ManeuverRL3 = 'na';
	$ManeuverLR3 = 'na';
	$ManeuverRR3 = 'na';
	$ManeuverK3 = 'na';
	$ManeuverS2 = 'green';
	$ManeuverLT2 = 'red';
	$ManeuverRT2 = 'white';
	$ManeuverLB2 = 'white';
	$ManeuverRB2 = 'green';
	$ManeuverLL2 = 'na';
	$ManeuverRL2 = 'na';
	$ManeuverLR2 = 'na';
	$ManeuverRR2 = 'na';
	$ManeuverK2 = 'na';
	$ManeuverS1 = 'green';
	$ManeuverLT1 = 'na';
	$ManeuverRT1 = 'na';
	$ManeuverLB1 = 'white';
	$ManeuverRB1 = 'green';
	$ManeuverLL1 = 'na';
	$ManeuverRL1 = 'na';
	$ManeuverLR1 = 'na';
	$ManeuverRR1 = 'na';
	$ManeuverK1 = 'na';
	$Maneuver0 = 'na';
	$HugeManeuverS4 = 'na';
	$HugeManeuverS3 = 'na';
	$HugeManeuverS2 = 'na';
	$HugeManeuverS1 = 'na';
	$HugeManeuverL2 = 'na';
	$HugeManeuverR2 = 'na';
	$HugeManeuverL1 = 'na';
	$HugeManeuverR1 = 'na';
	$HugeManeuver0 = 'na';
}

function createInterface( diy, editor ) {
	bindings = new Bindings( editor, diy );

	// Main Panel
	affiliationItems = [];
	affiliationItems[0] = ListItem( 'alliance', @xw-affiliation-alliance );
	affiliationItems[1] = ListItem( 'resistance', @xw-affiliation-resistance );
	affiliationItems[2] = ListItem( 'empire', @xw-affiliation-empire );
	affiliationItems[3] = ListItem( 'firstorder', @xw-affiliation-firstorder );
	affiliationItems[4] = ListItem( 'scum', @xw-affiliation-scum );
	affiliationBox = comboBox( affiliationItems );
	bindings.add( 'Affiliation', affiliationBox, [0,1,2,3] );

	nameField = textField( 'X', 30 );
	
	maneuverTip = tipButton( @xw-maneuver-tooltip );

	hugeCheckbox = checkBox( @xw-huge );
	bindings.add( 'Huge', hugeCheckbox, [2] );

	straightItems = [];
	straightItems[0] = ListItem( 'na', '-' );
	straightItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-straight.png' ), 18 ) );
	straightItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-straight.png' ), 18 ) );
	straightItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-straight.png' ), 18 ) );

	kTurnItems = [];
	kTurnItems[0] = ListItem( 'na', '-' );
	kTurnItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-k-turn.png' ), 18 ) );
	kTurnItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-k-turn.png' ), 18 ) );
	kTurnItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-k-turn.png' ), 18 ) );

	leftTurnItems = [];
	leftTurnItems[0] = ListItem( 'na', '-' );
	leftTurnItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-left-turn.png' ), 18 ) );
	leftTurnItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-left-turn.png' ), 18 ) );
	leftTurnItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-left-turn.png' ), 18 ) );

	rightTurnItems = [];
	rightTurnItems[0] = ListItem( 'na', '-' );
	rightTurnItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-right-turn.png' ), 18 ) );
	rightTurnItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-right-turn.png' ), 18 ) );
	rightTurnItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-right-turn.png' ), 18 ) );

	leftBankItems = [];
	leftBankItems[0] = ListItem( 'na', '-' );
	leftBankItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-left-bank.png' ), 18 ) );
	leftBankItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-left-bank.png' ), 18 ) );
	leftBankItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-left-bank.png' ), 18 ) );

	rightBankItems = [];
	rightBankItems[0] = ListItem( 'na', '-' );
	rightBankItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-right-bank.png' ), 18 ) );
	rightBankItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-right-bank.png' ), 18 ) );
	rightBankItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-right-bank.png' ), 18 ) );

	leftLoopItems = [];
	leftLoopItems[0] = ListItem( 'na', '-' );
	leftLoopItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-left-loop.png' ), 18 ) );
	leftLoopItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-left-loop.png' ), 18 ) );
	leftLoopItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-left-loop.png' ), 18 ) );

	rightLoopItems = [];
	rightLoopItems[0] = ListItem( 'na', '-' );
	rightLoopItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-right-loop.png' ), 18 ) );
	rightLoopItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-right-loop.png' ), 18 ) );
	rightLoopItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-right-loop.png' ), 18 ) );

	leftRollItems = [];
	leftRollItems[0] = ListItem( 'na', '-' );
	leftRollItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-left-roll.png' ), 18 ) );
	leftRollItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-left-roll.png' ), 18 ) );
	leftRollItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-left-roll.png' ), 18 ) );

	rightRollItems = [];
	rightRollItems[0] = ListItem( 'na', '-' );
	rightRollItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-right-roll.png' ), 18 ) );
	rightRollItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-right-roll.png' ), 18 ) );
	rightRollItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-right-roll.png' ), 18 ) );

	stationaryItems = [];
	stationaryItems[0] = ListItem( 'na', '-' );
	stationaryItems[1] = ListItem( 'green', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/green-stationary.png' ), 18 ) );
	stationaryItems[2] = ListItem( 'white', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-stationary.png' ), 18 ) );
	stationaryItems[3] = ListItem( 'red', '', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/red-stationary.png' ), 18 ) );

	maneuverBoxS5 = comboBox( straightItems );
	bindings.add( 'ManeuverS5', maneuverBoxS5, [2] );
	
	maneuverBoxK5 = comboBox( kTurnItems );
	bindings.add( 'ManeuverK5', maneuverBoxK5, [2] );
			
	maneuverBoxS4 = comboBox( straightItems );
	bindings.add( 'ManeuverS4', maneuverBoxS4, [2] );

	maneuverBoxK4 = comboBox( kTurnItems );
	bindings.add( 'ManeuverK4', maneuverBoxK4, [2] );
	
	maneuverBoxS3 = comboBox( straightItems );
	bindings.add( 'ManeuverS3', maneuverBoxS3, [2] );
	
	maneuverBoxLT3 = comboBox( leftTurnItems );
	bindings.add( 'ManeuverLT3', maneuverBoxLT3, [2] );
	
	maneuverBoxRT3 = comboBox( rightTurnItems );
	bindings.add( 'ManeuverRT3', maneuverBoxRT3, [2] );
	
	maneuverBoxLB3 = comboBox( leftBankItems );
	bindings.add( 'ManeuverLB3', maneuverBoxLB3, [2] );
	
	maneuverBoxRB3 = comboBox( rightBankItems );
	bindings.add( 'ManeuverRB3', maneuverBoxRB3, [2] );
	
	maneuverBoxLL3 = comboBox( leftLoopItems );
	bindings.add( 'ManeuverLL3', maneuverBoxLL3, [2] );
	
	maneuverBoxRL3 = comboBox( rightLoopItems );
	bindings.add( 'ManeuverRL3', maneuverBoxRL3, [2] );

	maneuverBoxLR3 = comboBox( leftRollItems );
	bindings.add( 'ManeuverLR3', maneuverBoxLR3, [2] );
	
	maneuverBoxRR3 = comboBox( rightRollItems );
	bindings.add( 'ManeuverRR3', maneuverBoxRR3, [2] );
	
	maneuverBoxK3 = comboBox( kTurnItems );
	bindings.add( 'ManeuverK3', maneuverBoxK3, [2] );
	
	maneuverBoxS2 = comboBox( straightItems );
	bindings.add( 'ManeuverS2', maneuverBoxS2, [2] );
	
	maneuverBoxLT2 = comboBox( leftTurnItems );
	bindings.add( 'ManeuverLT2', maneuverBoxLT2, [2] );
	
	maneuverBoxRT2 = comboBox( rightTurnItems );
	bindings.add( 'ManeuverRT2', maneuverBoxRT2, [2] );
	
	maneuverBoxLB2 = comboBox( leftBankItems );
	bindings.add( 'ManeuverLB2', maneuverBoxLB2, [2] );
	
	maneuverBoxRB2 = comboBox( rightBankItems );
	bindings.add( 'ManeuverRB2', maneuverBoxRB2, [2] );
	
	maneuverBoxLL2 = comboBox( leftLoopItems );
	bindings.add( 'ManeuverLL2', maneuverBoxLL2, [2] );
	
	maneuverBoxRL2 = comboBox( rightLoopItems );
	bindings.add( 'ManeuverRL2', maneuverBoxRL2, [2] );

	maneuverBoxLR2 = comboBox( leftRollItems );
	bindings.add( 'ManeuverLR2', maneuverBoxLR2, [2] );
	
	maneuverBoxRR2 = comboBox( rightRollItems );
	bindings.add( 'ManeuverRR2', maneuverBoxRR2, [2] );

	maneuverBoxK2 = comboBox( kTurnItems );
	bindings.add( 'ManeuverK2', maneuverBoxK2, [2] );
	
	maneuverBoxS1 = comboBox( straightItems );
	bindings.add( 'ManeuverS1', maneuverBoxS1, [2] );
	
	maneuverBoxLT1 = comboBox( leftTurnItems );
	bindings.add( 'ManeuverLT1', maneuverBoxLT1, [2] );
	
	maneuverBoxRT1 = comboBox( rightTurnItems );
	bindings.add( 'ManeuverRT1', maneuverBoxRT1, [2] );
	
	maneuverBoxLB1 = comboBox( leftBankItems );
	bindings.add( 'ManeuverLB1', maneuverBoxLB1, [2] );
	
	maneuverBoxRB1 = comboBox( rightBankItems );
	bindings.add( 'ManeuverRB1', maneuverBoxRB1, [2] );
	
	maneuverBoxLL1 = comboBox( leftLoopItems );
	bindings.add( 'ManeuverLL1', maneuverBoxLL1, [2] );
	
	maneuverBoxRL1 = comboBox( rightLoopItems );
	bindings.add( 'ManeuverRL1', maneuverBoxRL1, [2] );
	
	maneuverBoxLR1 = comboBox( leftRollItems );
	bindings.add( 'ManeuverLR1', maneuverBoxLR1, [2] );
	
	maneuverBoxRR1 = comboBox( rightRollItems );
	bindings.add( 'ManeuverRR1', maneuverBoxRR1, [2] );

	maneuverBoxK1 = comboBox( kTurnItems );
	bindings.add( 'ManeuverK1', maneuverBoxK1, [2] );

	maneuverBox0 = comboBox( stationaryItems );
	bindings.add( 'Maneuver0', maneuverBox0, [2] );
	
	hugeStraightItems = [];
	hugeStraightItems[0] = ListItem( 'na', '-' );
	hugeStraightItems[1] = ListItem( '0', '0', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-straight.png' ), 18 ) );
	hugeStraightItems[2] = ListItem( '1', '1', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-straight.png' ), 18 ) );
	hugeStraightItems[3] = ListItem( '2', '2', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-straight.png' ), 18 ) );
	hugeStraightItems[4] = ListItem( '3', '3', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-straight.png' ), 18 ) );
	hugeStraightItems[5] = ListItem( '4', '4', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-straight.png' ), 18 ) );
	hugeStraightItems[6] = ListItem( '5', '5', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-straight.png' ), 18 ) );

	hugeLeftItems = [];
	hugeLeftItems[0] = ListItem( 'na', '-' );
	hugeLeftItems[1] = ListItem( '0', '0', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-left-bank.png' ), 18 ) );
	hugeLeftItems[2] = ListItem( '1', '1', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-left-bank.png' ), 18 ) );
	hugeLeftItems[3] = ListItem( '2', '2', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-left-bank.png' ), 18 ) );
	hugeLeftItems[4] = ListItem( '3', '3', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-left-bank.png' ), 18 ) );
	hugeLeftItems[5] = ListItem( '4', '4', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-left-bank.png' ), 18 ) );
	hugeLeftItems[6] = ListItem( '5', '5', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-left-bank.png' ), 18 ) );

	hugeRightItems = [];
	hugeRightItems[0] = ListItem( 'na', '-' );
	hugeRightItems[1] = ListItem( '0', '0', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-right-bank.png' ), 18 ) );
	hugeRightItems[2] = ListItem( '1', '1', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-right-bank.png' ), 18 ) );
	hugeRightItems[3] = ListItem( '2', '2', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-right-bank.png' ), 18 ) );
	hugeRightItems[4] = ListItem( '3', '3', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-right-bank.png' ), 18 ) );
	hugeRightItems[5] = ListItem( '4', '4', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-right-bank.png' ), 18 ) );
	hugeRightItems[6] = ListItem( '5', '5', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-right-bank.png' ), 18 ) );
	
	hugeStationaryItems = [];
	hugeStationaryItems[0] = ListItem( 'na', '-' );
	hugeStationaryItems[1] = ListItem( '0', '0', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-stationary.png' ), 18 ) );
	hugeStationaryItems[2] = ListItem( '1', '1', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-stationary.png' ), 18 ) );
	hugeStationaryItems[3] = ListItem( '2', '2', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-stationary.png' ), 18 ) );
	hugeStationaryItems[4] = ListItem( '3', '3', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-stationary.png' ), 18 ) );
	hugeStationaryItems[5] = ListItem( '4', '4', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-stationary.png' ), 18 ) );
	hugeStationaryItems[6] = ListItem( '5', '5', ImageUtils.createIcon( ImageUtils.get( 'x-wing/components/maneuver-dial/images/white-stationary.png' ), 18 ) );
	
	hugeManeuverBox0 = comboBox( hugeStationaryItems );
	bindings.add( 'HugeManeuver0', hugeManeuverBox0, [2] );

	hugeManeuverBoxS1 = comboBox( hugeStraightItems );
	bindings.add( 'HugeManeuverS1', hugeManeuverBoxS1, [2] );

	hugeManeuverBoxS2 = comboBox( hugeStraightItems );
	bindings.add( 'HugeManeuverS2', hugeManeuverBoxS2, [2] );

	hugeManeuverBoxS3 = comboBox( hugeStraightItems );
	bindings.add( 'HugeManeuverS3', hugeManeuverBoxS3, [2] );

	hugeManeuverBoxS4 = comboBox( hugeStraightItems );
	bindings.add( 'HugeManeuverS4', hugeManeuverBoxS4, [2] );

	hugeManeuverBoxL1 = comboBox( hugeLeftItems );
	bindings.add( 'HugeManeuverL1', hugeManeuverBoxL1, [2] );
	
	hugeManeuverBoxR1 = comboBox( hugeRightItems );
	bindings.add( 'HugeManeuverR1', hugeManeuverBoxR1, [2] );

	hugeManeuverBoxL2 = comboBox( hugeLeftItems );
	bindings.add( 'HugeManeuverL2', hugeManeuverBoxL2, [2] );
	
	hugeManeuverBoxR2 = comboBox( hugeRightItems );
	bindings.add( 'HugeManeuverR2', hugeManeuverBoxR2, [2] );

	var mainPanel = new Grid( '', '[min:pref][min:pref][min:pref][min:pref][min:pref][min:pref][min:pref][min:pref][min:pref][min:pref][min:pref]', '');
	mainPanel.setTitle( @xw-info );
	mainPanel.place( @xw-affiliation, '', affiliationBox, 'span, growx, wrap' );	
	mainPanel.place( @xw-ship, '', nameField, 'span, growx, wrap' );
	mainPanel.place( hugeCheckbox, 'span, wrap para' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( @xw-maneuvers, 'span 3', maneuverTip, 'wrap' );
	mainPanel.place( @xw-maneuver-speed-5, '', '', '', '', '', '', '', '', '', maneuverBoxS5, '', '', '', '', '', '', '', '', '', maneuverBoxK5, 'wrap' );
	mainPanel.place( @xw-maneuver-speed-4, '', '', '', '', '', '', '', '', '', maneuverBoxS4, '', '', '', '', '', '', '', '', '', maneuverBoxK4, 'wrap' );
	mainPanel.place( @xw-maneuver-speed-3, '', maneuverBoxLR3, '', maneuverBoxLL3, '', maneuverBoxLT3, '', maneuverBoxLB3, '', maneuverBoxS3, '', maneuverBoxRB3, '', maneuverBoxRT3, '', maneuverBoxRL3, '', maneuverBoxRR3, '', maneuverBoxK3, 'wrap' );
	mainPanel.place( @xw-maneuver-speed-2, '', maneuverBoxLR2, '', maneuverBoxLL2, '', maneuverBoxLT2, '', maneuverBoxLB2, '', maneuverBoxS2, '', maneuverBoxRB2, '', maneuverBoxRT2, '', maneuverBoxRL2, '', maneuverBoxRR2, '', maneuverBoxK2, 'wrap' );
	mainPanel.place( @xw-maneuver-speed-1, '', maneuverBoxLR1, '', maneuverBoxLL1, '', maneuverBoxLT1, '', maneuverBoxLB1, '', maneuverBoxS1, '', maneuverBoxRB1, '', maneuverBoxRT1, '', maneuverBoxRL1, '', maneuverBoxRR1, '', maneuverBoxK1, 'wrap' );
	mainPanel.place( @xw-maneuver-speed-0, '', '', '', '', '', '', '', '', '', maneuverBox0, '', '', '', '', '', '', '', '', 'wrap para' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( @xw-huge-maneuvers, 'span 4, wrap' );
	mainPanel.place( @xw-maneuver-speed-4, '', '', 'span 2', hugeManeuverBoxS4, 'span 2, wmin 80, wrap' );
	mainPanel.place( @xw-maneuver-speed-3, '', '', 'span 2', hugeManeuverBoxS3, 'span 2, wmin 80, wrap' );
	mainPanel.place( @xw-maneuver-speed-2, '', hugeManeuverBoxL2, 'span 2, wmin 80', hugeManeuverBoxS2, 'span 2, wmin 80', hugeManeuverBoxR2, 'span 2, wmin 80, wrap' );
	mainPanel.place( @xw-maneuver-speed-1, '', hugeManeuverBoxL1, 'span 2, wmin 80', hugeManeuverBoxS1, 'span 2, wmin 80', hugeManeuverBoxR1, 'span 2, wmin 80, wrap' );	
	mainPanel.place( @xw-maneuver-speed-0, '', '', 'span 2', hugeManeuverBox0, 'span 2, wmin 80', '', 'wrap' );	
	
	function actionFunction( actionEvent )
	{
		try {
			if( hugeCheckbox.selected ) {
				maneuverBoxS5.setEnabled(false);
				maneuverBoxS4.setEnabled(false);
				maneuverBoxS3.setEnabled(false);
				maneuverBoxS2.setEnabled(false);
				maneuverBoxS1.setEnabled(false);
				maneuverBoxK5.setEnabled(false);
				maneuverBoxK4.setEnabled(false);
				maneuverBoxK3.setEnabled(false);
				maneuverBoxK2.setEnabled(false);
				maneuverBoxK1.setEnabled(false);
				maneuverBox0.setEnabled(false);
				maneuverBoxLB1.setEnabled(false);
				maneuverBoxRB1.setEnabled(false);
				maneuverBoxLB2.setEnabled(false);
				maneuverBoxRB2.setEnabled(false);
				maneuverBoxLB3.setEnabled(false);
				maneuverBoxRB3.setEnabled(false);
				maneuverBoxLT1.setEnabled(false);
				maneuverBoxRT1.setEnabled(false);
				maneuverBoxLT2.setEnabled(false);
				maneuverBoxRT2.setEnabled(false);
				maneuverBoxLT3.setEnabled(false);
				maneuverBoxRT3.setEnabled(false);
				maneuverBoxLL1.setEnabled(false);
				maneuverBoxRL1.setEnabled(false);
				maneuverBoxLL2.setEnabled(false);
				maneuverBoxRL2.setEnabled(false);
				maneuverBoxLL3.setEnabled(false);
				maneuverBoxRL3.setEnabled(false);
				maneuverBoxLR1.setEnabled(false);
				maneuverBoxRR1.setEnabled(false);
				maneuverBoxLR2.setEnabled(false);
				maneuverBoxRR2.setEnabled(false);
				maneuverBoxLR3.setEnabled(false);
				maneuverBoxRR3.setEnabled(false);
				hugeManeuverBoxS4.setEnabled(true);
				hugeManeuverBoxS3.setEnabled(true);
				hugeManeuverBoxS2.setEnabled(true);
				hugeManeuverBoxS1.setEnabled(true);
				hugeManeuverBox0.setEnabled(true);
				hugeManeuverBoxL2.setEnabled(true);
				hugeManeuverBoxL1.setEnabled(true);
				hugeManeuverBoxR2.setEnabled(true);
				hugeManeuverBoxR1.setEnabled(true);
			} else {
				maneuverBoxS5.setEnabled(true);
				maneuverBoxS4.setEnabled(true);
				maneuverBoxS3.setEnabled(true);
				maneuverBoxS2.setEnabled(true);
				maneuverBoxS1.setEnabled(true);
				maneuverBoxK5.setEnabled(true);
				maneuverBoxK4.setEnabled(true);
				maneuverBoxK3.setEnabled(true);
				maneuverBoxK2.setEnabled(true);
				maneuverBoxK1.setEnabled(true);
				maneuverBox0.setEnabled(true);
				maneuverBoxLB1.setEnabled(true);
				maneuverBoxRB1.setEnabled(true);
				maneuverBoxLB2.setEnabled(true);
				maneuverBoxRB2.setEnabled(true);
				maneuverBoxLB3.setEnabled(true);
				maneuverBoxRB3.setEnabled(true);
				maneuverBoxLT1.setEnabled(true);
				maneuverBoxRT1.setEnabled(true);
				maneuverBoxLT2.setEnabled(true);
				maneuverBoxRT2.setEnabled(true);
				maneuverBoxLT3.setEnabled(true);
				maneuverBoxRT3.setEnabled(true);
				maneuverBoxLL1.setEnabled(true);
				maneuverBoxRL1.setEnabled(true);
				maneuverBoxLL2.setEnabled(true);
				maneuverBoxRL2.setEnabled(true);
				maneuverBoxLL3.setEnabled(true);
				maneuverBoxRL3.setEnabled(true);
				maneuverBoxLR1.setEnabled(true);
				maneuverBoxRR1.setEnabled(true);
				maneuverBoxLR2.setEnabled(true);
				maneuverBoxRR2.setEnabled(true);
				maneuverBoxLR3.setEnabled(true);
				maneuverBoxRR3.setEnabled(true);
				hugeManeuverBoxS4.setEnabled(false);
				hugeManeuverBoxS3.setEnabled(false);
				hugeManeuverBoxS2.setEnabled(false);
				hugeManeuverBoxS1.setEnabled(false);
				hugeManeuverBox0.setEnabled(false);
				hugeManeuverBoxL2.setEnabled(false);
				hugeManeuverBoxL1.setEnabled(false);
				hugeManeuverBoxR2.setEnabled(false);
				hugeManeuverBoxR1.setEnabled(false);				
			}
		} catch( ex ) {
			Error.handleUncaught( ex );
		}
	}
	
	diy.setNameField( nameField );
	mainPanel.addToEditor( editor, @xw_info, null, null, 0 );
	editor.addFieldPopulationListener( actionFunction );
	bindings.bind();
	
	// Add action listeners
	hugeCheckbox.addActionListener( actionFunction );
}

function createFrontPainter( diy, sheet ) {
	if( sheet.sheetIndex == 0 ) {
		shiptypeBox = Xwing.headingBox( sheet, 12.5 );
	}
}

function createBackPainter( diy, sheet ) {}

function paintFront( g, diy, sheet ) {
	if( sheet.sheetIndex == 0 ) {
		//============== Upper Front ==============
		imageTemplate =  'maneuver-' + Xwing.getPrimaryFaction( $Affiliation ) + '-upper-front-template';
		sheet.paintImage( g, imageTemplate, 0, 0);

		if( $Affiliation == 'resistance' || $Affiliation == 'firstorder' ) {
			imageTemplate =  'maneuver-' +  $Affiliation  + '-overlay-template';
			sheet.paintImage( g, imageTemplate, 50, 108);
		}
				
		shiptypeBox.markupText = diy.name;
		shiptypeBox.draw( g, R('shiptype') );
		
	} else {
		//============== Lower Front ==============
		imageTemplate =  'maneuver-' + Xwing.getPrimaryFaction( $Affiliation ) + '-lower-front-template';
		sheet.paintImage( g, imageTemplate, 0, 0);
		
		maneuverArray = [];
		if( $$Huge.yesNo ) {
			if( $HugeManeuverS4 != 'na' ) { maneuverArray.push( 'white-straight,speed-4,' + $HugeManeuverS4 + '-energy' ); }
			if( $HugeManeuverS3 != 'na' ) { maneuverArray.push( 'white-straight,speed-3,' + $HugeManeuverS3 + '-energy' ); }
			if( $HugeManeuverS2 != 'na' ) { maneuverArray.push( 'white-straight,speed-2,' + $HugeManeuverS2 + '-energy' ); }
			if( $HugeManeuverS1 != 'na' ) { maneuverArray.push( 'white-straight,speed-1,' + $HugeManeuverS1 + '-energy' ); }
			if( $HugeManeuverL2 != 'na' ) { maneuverArray.push( 'white-left-bank,speed-2,' + $HugeManeuverL2 + '-energy' ); }
			if( $HugeManeuverR2 != 'na' ) { maneuverArray.push( 'white-right-bank,speed-2,' + $HugeManeuverR2 + '-energy' ); }
			if( $HugeManeuverL1 != 'na' ) { maneuverArray.push( 'white-left-bank,speed-1,' + $HugeManeuverL1 + '-energy' ); }
			if( $HugeManeuverR1 != 'na' ) { maneuverArray.push( 'white-right-bank,speed-1,' + $HugeManeuverR1 + '-energy' ); }
			if( $HugeManeuver0 != 'na' ) { maneuverArray.push( 'white-stationary,speed-0,' + $HugeManeuver0 + '-energy' ); }
		} else {
			if( $Maneuver0 != 'na' ) { maneuverArray.push( $Maneuver0 + '-stationary,speed-0' ); }
			if( $ManeuverLR1 != 'na' ) { maneuverArray.push( $ManeuverLR1 + '-left-roll,speed-1' ); }
			if( $ManeuverLL1 != 'na' ) { maneuverArray.push( $ManeuverLL1 + '-left-loop,speed-1' ); }
			if( $ManeuverLT1 != 'na' ) { maneuverArray.push( $ManeuverLT1 + '-left-turn,speed-1' ); }
			if( $ManeuverLB1 != 'na' ) { maneuverArray.push( $ManeuverLB1 + '-left-bank,speed-1'); }
			if( $ManeuverS1 != 'na' ) { maneuverArray.push( $ManeuverS1 + '-straight,speed-1' ); }
			if( $ManeuverRB1 != 'na' ) { maneuverArray.push( $ManeuverRB1 + '-right-bank,speed-1' ); }
			if( $ManeuverRT1 != 'na' ) { maneuverArray.push( $ManeuverRT1 + '-right-turn,speed-1' ); }
			if( $ManeuverRL1 != 'na' ) { maneuverArray.push( $ManeuverRL1 + '-right-loop,speed-1' ); }
			if( $ManeuverRR1 != 'na' ) { maneuverArray.push( $ManeuverRR1 + '-right-roll,speed-1' ); }
			if( $ManeuverK1 != 'na' ) { maneuverArray.push( $ManeuverK1 + '-k-turn,speed-1' ); }
			if( $ManeuverLR2 != 'na' ) { maneuverArray.push( $ManeuverLR2 + '-left-roll,speed-2' ); }
			if( $ManeuverLL2 != 'na' ) { maneuverArray.push( $ManeuverLL2 + '-left-loop,speed-2' ); }
			if( $ManeuverLT2 != 'na' ) { maneuverArray.push( $ManeuverLT2 + '-left-turn,speed-2' ); }
			if( $ManeuverLB2 != 'na' ) { maneuverArray.push( $ManeuverLB2 + '-left-bank,speed-2' ); }
			if( $ManeuverS2 != 'na' ) { maneuverArray.push( $ManeuverS2 + '-straight,speed-2' ); }
			if( $ManeuverRB2 != 'na' ) { maneuverArray.push( $ManeuverRB2 + '-right-bank,speed-2' ); }
			if( $ManeuverRT2 != 'na' ) { maneuverArray.push( $ManeuverRT2 + '-right-turn,speed-2' ); }
			if( $ManeuverRL2 != 'na' ) { maneuverArray.push( $ManeuverRL2 + '-right-loop,speed-2' ); }
			if( $ManeuverRR2 != 'na' ) { maneuverArray.push( $ManeuverRR2 + '-right-roll,speed-2' ); }
			if( $ManeuverK2 != 'na' ) { maneuverArray.push( $ManeuverK2 + '-k-turn,speed-2' ); }
			if( $ManeuverLR3 != 'na' ) { maneuverArray.push( $ManeuverLR3 + '-left-roll,speed-3' ); }
			if( $ManeuverLL3 != 'na' ) { maneuverArray.push( $ManeuverLL3 + '-left-loop,speed-3' ); }
			if( $ManeuverLT3 != 'na' ) { maneuverArray.push( $ManeuverLT3 + '-left-turn,speed-3' ); }
			if( $ManeuverLB3 != 'na' ) { maneuverArray.push( $ManeuverLB3 + '-left-bank,speed-3' ); }
			if( $ManeuverS3 != 'na' ) { maneuverArray.push( $ManeuverS3 + '-straight,speed-3' ); }
			if( $ManeuverRB3 != 'na' ) { maneuverArray.push( $ManeuverRB3 + '-right-bank,speed-3' ); }
			if( $ManeuverRT3 != 'na' ) { maneuverArray.push( $ManeuverRT3 + '-right-turn,speed-3' ); }
			if( $ManeuverRL3 != 'na' ) { maneuverArray.push( $ManeuverRL3 + '-right-loop,speed-3' ); }
			if( $ManeuverRR3 != 'na' ) { maneuverArray.push( $ManeuverRR3 + '-right-roll,speed-3' ); }
			if( $ManeuverK3 != 'na' ) { maneuverArray.push( $ManeuverK3 + '-k-turn,speed-3' ); }
			if( $ManeuverS4 != 'na' ) { maneuverArray.push( $ManeuverS4 + '-straight,speed-4' ); }
			if( $ManeuverK4 != 'na' ) { maneuverArray.push( $ManeuverK4 + '-k-turn,speed-4' ); }
			if( $ManeuverS5 != 'na' ) { maneuverArray.push( $ManeuverS5 + '-straight,speed-5' ); }
			if( $ManeuverK5 != 'na' ) { maneuverArray.push( $ManeuverK5 + '-k-turn,speed-5' ); }
		}
		for( let i=0; i<maneuverArray.length; ++i ) {
			temp = maneuverArray[i].split( ',' );
			bearingImage = ImageUtils.get( 'x-wing/components/maneuver-dial/images/' + temp[0] + '.png' );
			speedImage = ImageUtils.get( 'x-wing/components/maneuver-dial/images/' + temp[1] + '.png' );
			if( $$Huge.yesNo ) {
				energyImage = ImageUtils.get( 'x-wing/components/maneuver-dial/images/' + temp[2] + '.png' );
				bearingScale = 0.26;
				speedScale = 0.24;
				energyScale = 0.5;
			} else {
				bearingScale = 0.28;
				speedScale = 0.28;
			}
			var AT = java.awt.geom.AffineTransform;

			var bearingTransform = AT.getTranslateInstance(
				(sheet.templateImage.width - bearingImage.width*bearingScale)/2 + 225*Math.sin( 2*Math.PI*i/maneuverArray.length ),
				(sheet.templateImage.height - bearingImage.height*bearingScale)/2 - 225*Math.cos( 2*Math.PI*i/maneuverArray.length )
			);
			bearingTransform.concatenate( AT.getRotateInstance( 2*Math.PI*i/maneuverArray.length, bearingImage.width*bearingScale/2, bearingImage.height*bearingScale/2 ) );		
			bearingTransform.concatenate( AT.getScaleInstance( bearingScale, bearingScale ) );

			speedTransform = AT.getTranslateInstance(
				(sheet.templateImage.width - speedImage.width*speedScale)/2 + 185*Math.sin( 2*Math.PI*i/maneuverArray.length ),
				(sheet.templateImage.height - speedImage.height*speedScale)/2 - 185*Math.cos( 2*Math.PI*i/maneuverArray.length )
			);
			speedTransform.concatenate( AT.getRotateInstance( 2*Math.PI*i/maneuverArray.length, speedImage.width*speedScale/2, speedImage.height*speedScale/2 ) );		
			speedTransform.concatenate( AT.getScaleInstance( speedScale, speedScale ) );

			if( $$Huge.yesNo ) {
				energyTransform = AT.getTranslateInstance(
					(sheet.templateImage.width - energyImage.width/2)/2 + 145*Math.sin( 2*Math.PI*i/maneuverArray.length ),
					(sheet.templateImage.height - energyImage.height/2)/2 - 145*Math.cos( 2*Math.PI*i/maneuverArray.length )
				);
				energyTransform.concatenate( AT.getRotateInstance( 2*Math.PI*i/maneuverArray.length, energyImage.width/4, energyImage.height/4 ) );		
				energyTransform.concatenate( AT.getScaleInstance( 0.5, 0.5 ) );
				g.drawImage( energyImage, energyTransform, null );
			}
			g.drawImage( bearingImage, bearingTransform, null );
			g.drawImage( speedImage, speedTransform, null );
		}
	}
}

function paintBack( g, diy, sheet ) {
	if( sheet.sheetIndex == 1 ) {
		//============== Upper Back ==============
		imageTemplate =  'maneuver-' + Xwing.getPrimaryFaction( $Affiliation ) + '-upper-back-template';
		sheet.paintImage( g, imageTemplate, 0, 0);
	} else {
		//============== Lower Back ==============
		imageTemplate =  'maneuver-' + Xwing.getPrimaryFaction( $Affiliation ) + '-lower-back-template';
		sheet.paintImage( g, imageTemplate, 0, 0);
	}
}

function onClear() {
	$Affiliation = 'resistance';
	$Huge = 'no';
	$ManeuverS5 = 'na';
	$ManeuverK5 = 'na';
	$ManeuverS4 = 'na';
	$ManeuverK4 = 'na';
	$ManeuverS3 = 'na';
	$ManeuverLT3 = 'na';
	$ManeuverRT3 = 'na';
	$ManeuverLB3 = 'na';
	$ManeuverRB3 = 'na';
	$ManeuverLL3 = 'na';
	$ManeuverRL3 = 'na';
	$ManeuverLR3 = 'na';
	$ManeuverRR3 = 'na';
	$ManeuverK3 = 'na';
	$ManeuverS2 = 'na';
	$ManeuverLT2 = 'na';
	$ManeuverRT2 = 'na';
	$ManeuverLB2 = 'na';
	$ManeuverRB2 = 'na';
	$ManeuverLL2 = 'na';
	$ManeuverRL2 = 'na';
	$ManeuverLR2 = 'na';
	$ManeuverRR2 = 'na';
	$ManeuverK2 = 'na';
	$ManeuverS1 = 'na';
	$ManeuverLT1 = 'na';
	$ManeuverRT1 = 'na';
	$ManeuverLB1 = 'na';
	$ManeuverRB1 = 'na';
	$ManeuverLL1 = 'na';
	$ManeuverRL1 = 'na';
	$ManeuverLR1 = 'na';
	$ManeuverRR1 = 'na';
	$ManeuverK1 = 'na';
	$Maneuver0 = 'na';
}

function onRead( diy, ois ) {
	if( diy.version < 2 ) {
		$ManeuverLR3 = 'na';
		$ManeuverRR3 = 'na';
		$ManeuverLR2 = 'na';
		$ManeuverRR2 = 'na';
		$ManeuverLR1 = 'na';
		$ManeuverRR1 = 'na';
		$ManeuverK1 = 'na';
		if( typeof $ManeuverLL1 === 'undefined' ) {
			$ManeuverLL3 = 'na';
			$ManeuverRL3 = 'na';
			$ManeuverLL2 = 'na';
			$ManeuverRL2 = 'na';
			$ManeuverLL1 = 'na';
			$ManeuverRL1 = 'na';
		}
		if( $Affiliation == 'rebel' ) {
			$Affiliation = 'alliance';
		} else if( $Affiliation == 'imperial' ) {
			$Affiliation = 'empire';
		}
		diy.version = 2;
	}
}

function onWrite( diy, oos ) {}

/**
 * Returns a region for this component. The nametag is
 * the middle part of the region name, without the
 * 'char-' prefix or '-region' suffix.
 */
function R( nametag ) {
	var value = $('maneuver-' + nametag + '-region');
	if( value == null ) {
		throw new Error( 'region not defined: ' + nametag );
	}
	return new Region( value );
}

// This will cause a test component to be created when you run the script
// from a script editor. It doesn't do anything when the script is run
// other ways (e.g., when you choose to create the component by selecting
// it in the New Game Component dialog).
testDIYScript( 'XW' );