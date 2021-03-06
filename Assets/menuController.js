var currentPosition : int = 0;
var menuItems = new Array ();
var moveBallCounter = 100;
static var Winner : String;
var player1Name : String = "Player1";
var player2Name : String = "Player2";

static var configuration = new MainConfiguration();

function getConfiguration () {
	return configuration;
}

function Start() {
	menuItems.push(GameObject.Find("SelectGameMode"));
	menuItems.push(GameObject.Find("SelectRounds"));
	menuItems.push(GameObject.Find("Player1NameObject"));
	menuItems.push(GameObject.Find("Player2NameObject"));
	menuItems.push(GameObject.Find("PlayGame"));
	configuration.setRounds(21);
	GameObject.Find("CurrentNumberOfRounds").GetComponent(TextMesh).text = "<" + configuration.getRounds() + ">";
	GameObject.Find("CurrentGameMode").GetComponent(TextMesh).text = "<" + configuration.getCurrentGameMode() + ">";
	configuration.addGameMode("Classic");
	
}

function movePosition(movement : boolean) {
	if(!movement) {
		if(currentPosition != 0) {
			currentPosition--;
		} else {
			currentPosition = menuItems.length-1;
		}
	} else {
		if(currentPosition == menuItems.length-1) {
			currentPosition = 0;
		} else {
			currentPosition++;
		}
	}
	moveForwardMenuItem();
}
function moveForwardMenuItem() {
	for(var i = 0; i < menuItems.length; i++) {
		menuItems[i].GetComponent(TextMesh).offsetZ = 0;
	}
	menuItems[currentPosition].GetComponent(TextMesh).offsetZ = -3;	
}
function checkIfGameCanStart() {
	if(currentPosition == 4) {
		Application.LoadLevel("MainGame");
	}
}
function toggleProperty(movement : boolean) {
	if (currentPosition == 0) {
	}
	if (currentPosition == 1) {
		var rounds : int = configuration.getRounds();
		if(!movement) {
			rounds++;
			configuration.setRounds(rounds);

		} else {
			if(rounds == 1) {}
			else {
				rounds--;
				configuration.setRounds(rounds);
			}
		}
		GameObject.Find("CurrentNumberOfRounds").GetComponent(TextMesh).text = "<" + configuration.getRounds() + ">";
	}
}
function toggleText(type : String, playername : String, key : String) {
	switch(type) {
		case "Backspace" :
			return playername.Substring(0,(playername.Length-1));
		break;
		case "Key" :
			return playername + key;
		default:
		break;
	}
}

function Update () {
GameObject.Find("BackgroundRoom").transform.rotation.x -= 0.001;
GameObject.Find("BackgroundRoom").transform.rotation.y -= 0.003;
//GameObject.Find("player1NameObject").GetComponent(TextMesh).text = configuration.getPlayer1Name();
//GameObject.Find("player2NameObject").GetComponent(TextMesh).text = configuration.getPlayer2Name();

if(moveBallCounter == 10) {
	GameObject.Find("BackgroundRoomBall").rigidbody.AddForce(Vector3(-400.0,-100.0,-100.0));
	moveBallCounter = 0;
	GameObject.Find("Player1").rigidbody.AddForce(Vector3(0.0,0.0,-100.0));
	GameObject.Find("Player2").rigidbody.AddForce(Vector3(0.0,0.0,-100.0));
}
moveBallCounter++;

if(Input.anyKeyDown) {
		if(Input.GetKeyDown(KeyCode.UpArrow)) {
			movePosition(false); //move key backwards
		}
		if(Input.GetKeyDown(KeyCode.DownArrow)) {
			movePosition(true); //move key backwards
		}		
		if(Input.GetKeyDown(KeyCode.Return)) {
			checkIfGameCanStart();
		}
		if(Input.GetKeyDown(KeyCode.LeftArrow)) {
			toggleProperty(true);
		}
		if(Input.GetKeyDown(KeyCode.RightArrow)) {
			toggleProperty(false);
		}
		if(currentPosition == 2 || currentPosition == 3) {
			if(currentPosition == 2) {
				if(Input.GetKey(KeyCode.Backspace)) {
					configuration.setPlayer1Name(toggleText("Backspace", configuration.getPlayer1Name(), ""));
				} else {
					if(Input.inputString != "") {
						configuration.setPlayer1Name(toggleText("Key", configuration.getPlayer1Name(),Input.inputString));
					}
				}
			} else {
				if(Input.GetKeyDown(KeyCode.Backspace)) {
					configuration.setPlayer2Name(toggleText("Backspace", configuration.getPlayer2Name(), ""));
				} else {
					if(Input.inputString != "") {
						configuration.setPlayer2Name(toggleText("Key", configuration.getPlayer2Name(),Input.inputString));
					}
				}				
			}
		}			
	}
	GameObject.Find("Player1NameObject").GetComponent(TextMesh).text = configuration.getPlayer1Name();
	GameObject.Find("Player2NameObject").GetComponent(TextMesh).text = configuration.getPlayer2Name();
	
}