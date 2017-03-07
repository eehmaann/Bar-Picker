var add = document.getElementsByClassName("add");
var hint = document.getElementsByClassName("hint");
var edit = document.getElementsByClassName("edit");
var doWhat;
var barList=[];

function Bar(barnum, barname, address, city){
        this.barnum=barnum;
        this.barname=barname;
        this.address=address;
        this.city=city;
  }

window.addEventListener("load", function() {
    document.getElementById("city").value = "Cambridge";
    var legal = document.getElementById("legalAge");
    var displayBarsButton = document.getElementById("displayBarsButton");
    var addBarButton = document.getElementById("addBarButton");
    var pickBarButton = document.getElementById("pickBarButton");
    var editBarButton = document.getElementById("editBarButton");
    var deleteBarButton = document.getElementById("deleteBarButton");
    var name = document.getElementById("name");
    var address = document.getElementById("address");
    var city = document.getElementById("city");
    var doIt = document.getElementById("doIt");
    var inform = document.getElementsByClassName("info infoHead");
    var isBarsDisplayed = false;
    var displayArea=document.getElementById("output");
    var list=document.getElementById("thelist");
    var randomBar=document.getElementById("randbar");
    var selectionNumber=document.getElementById("selectionNumber");
    var regName= /^[a-z]|[A-Z]/;
    var regNum= /^\d/;
    var regAddress =/^\d ?=[a-z]|[A-Z]/;
    var regCity=/^[a-z]|[A-Z]/;

        // when loading the check box will be unchecked
    legal.checked=false;

    if(legal) {
        legal.addEventListener("change", function() {
            if( legal.checked) {
            // if the user claims to be a legal age, show the buttons
                showButtons();
                createBarList();
            }

            else {
            // hide the functionality of the program
                hideButtons();
                hideBars();               
            }            
        }, false)
    }

// sets up iniitial values in the database and makes sure there is never less than 2 bars
	if (localStorage.getItem("barKey") === null) {
		setList();
	} 
   	
	
	// Create a bar list with three bars
	function setList() {
        var druid = new Bar(0, "The Druid", "1357 Cambridge St.", "Cambridge");
        var grendal = new Bar(1, "Grendal's Den", "89 Winthrop St.", "Cambridge");
        var charlie = new Bar (2, "Charlie's Kitchen", "10 Eliot St.", "Cambridge");
        barList.push(druid, grendal, charlie);
        window.localStorage.setItem("barKey", JSON.stringify(barList));
   }

   

    if(displayBarsButton) {
        displayBarsButton.addEventListener("click", function() {
            if(!isBarsDisplayed){
                displayBars();
            }
            else{
               hideBars();
           }
        }, false)
    }

    function displayBars(){
        clearDisplay();  
        addInformClassName();
        showBarList();
        isBarsDisplayed=true;
    }

    function addInformClassName(){
           for (var i in inform) {
                if (inform.hasOwnProperty(i)) {
                        inform[i].className = 'info infoHead show-class';
                }
            }
    }

    function createBarList(){
        if(window.localStorage.getItem("barKey")) {
            var barKey = JSON.parse(window.localStorage.getItem("barKey"));
            for(var i =0; i< barKey.length; i++){
                var savedBar= new Bar (i+1, barKey[i].barname, barKey[i].address, barKey[i].city, barKey[i].barstate);
                barList.push(savedBar);
                //showBarRow(savedBar, thelist);
            }
        }
    }
    function hideBars(){
        clearDisplay();
        isBarsDisplayed=false;
    }
    function clearDisplay() {
     while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
    }   


    function showBarList(){
        if(window.localStorage.getItem("barKey")) {
            var barKey = JSON.parse(window.localStorage.getItem("barKey"));
            for(var i =0; i< barKey.length; i++){
                var savedBar= new Bar (i+1, barKey[i].barname, barKey[i].address, barKey[i].city, barKey[i].barstate);
                showBarRow(savedBar, thelist);
            }
        }
    }

    // creates elements in the Dom to display information about the bars
    function showBarRow(dataObject, element) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "info");
        list.appendChild(newDiv);

        if (dataObject.barnum !== 'undefined') {
            showBarAttribute(dataObject.barnum);        
        }


        if (dataObject.barname !== 'undefined') {
             showBarAttribute(dataObject.barname);      
        }


        if (dataObject.address !== 'undefined') {
            showBarAttribute(dataObject.address); 
        }

        if (dataObject.city !== 'undefined') {
             showBarAttribute(dataObject.city);            
        }

        function showBarAttribute(attribute) {
            var attributeDiv = document.createElement("div");
            text =document.createTextNode(attribute);
            attributeDiv.appendChild(text);
            newDiv.appendChild(attributeDiv);    
        }
    }

    if(addBarButton) {
        addBarButton.addEventListener("click", function() {
            doWhat="addabar";
            showAdd();
            removeEdit();
        }, false)
    }

    if(editBarButton) {
        editBarButton.addEventListener("click", function() {
            doWhat="editabar";
            showNumberTextBox()
            showAdd();
        }, false)
    }

    if(deleteBarButton) {
        deleteBarButton.addEventListener("click", function() {
            doWhat="deleteabar";
            showNumberTextBox()
            removeAdd();
       
        }, false)
    }

    if(pickBarButton) {
        pickBarButton.addEventListener("click", function() {
            doWhat="pickBarButton"
            doPick();
            removeAdd();
            removeEdit();
        }, false)
    }

        // This function makes the text boxes change so that the user is editing the text directly, rather than writing anew
    selectionNumber.addEventListener('keyup', function() {
        barListNumber=selectionNumber.value-1;
         barKey = JSON.parse(window.localStorage.getItem("barKey"));
        if(barKey[barListNumber].barname){
        name.value=barKey[barListNumber].barname;
        address.value=barKey[barListNumber].address;
        city.value=barKey[barListNumber].city;
        }
    }, false );

    if(doIt) {
        doIt.addEventListener("click", function() {
                var barname = name.value;
                var baraddress = address.value;
                var barcity = city.value;
                var barListNumber=selectionNumber.value;    

            if(doWhat=="addabar") {
            // checks to make sure all the information is set
               if ( regName.test(barname) && regAddress.test(baraddress) && regCity.test(barcity)) {
                	var barnum = JSON.parse(window.localStorage.getItem("barKey")).length+1;
                    alert(barnum);
                	var pub = new Bar(barnum, barname, baraddress, barcity);
                	barList.push(pub);
                	showBarRow(pub, output);
                	window.localStorage.setItem("barKey", JSON.stringify(barList));
                }

                else {
                	alert("You have left some needed information out.  Please complete");
            	}
            }

            else if(doWhat=="editabar") {
            // check to make sure all fields have information before changing to avoid
            //empty or undefined areas
                if(regAddress.test(baraddress) && regCity.test(barcity) && regName.test(barname) && regNum.test(barListNumber)) {
                    if(window.localStorage.getItem("barKey")) {
                        clearDisplay();
                        var barKey = JSON.parse(window.localStorage.getItem("barKey"));
                        barList=[];
                        for(var i =0; i< barKey.length; i++) {
                            if(i!=barListNumber-1) {
                                var savedBar= new Bar (i+1, barKey[i].barname,barKey[i].address,barKey[i].city);                                
                            }
                            else {
                                savedBar= new Bar(barListNumber, barname, baraddress, barcity);
                            }
                        barList.push(savedBar);
                        showBarRow(savedBar, thelist);
                        window.localStorage.setItem("barKey", JSON.stringify(barList));
                        }
                    }
                }
            }

            else if(doWhat=="deleteabar") {
            // makes sure that the user typed a number
            	var didDelete = false;
            	if(regNum.test(barListNumber)) {
                 	if(window.localStorage.getItem("barKey")) {
                 		clearDisplay();
                     	var barKey = JSON.parse(window.localStorage.getItem("barKey"));
                      	barList=[];
                    	for(var i =0; i< barKey.length; i++) {
                        	if(i!=barListNumber-1) {
                        		if(didDelete == false) {
                            		var savedBar= new Bar (i+1, barKey[i].barname,barKey[i].address,barKey[i].city, barKey[i].barstate);
                            	}
                            
                            	else {
                            		savedBar= new Bar (i, barKey[i].barname,barKey[i].address,barKey[i].city, barKey[i].barstate);
                            	}

                            	barList.push(savedBar);
                            	showBarRow(savedBar, thelist);
                            	window.localStorage.setItem("barKey", JSON.stringify(barList));
                        	}
                        
                        	else {
                        		didDelete = true;
                        	}
                    	}
                	}
            	}
            	
            	else {
            		alert("You must type the number of the bar to be deleted in the box");
            	}
            }

            else {
                doPick();
            }
            // reset all textboxes
        	selectionNumber.value="";
            name.value="";
        	address.value="";
        	city.value="Cambridge";

        	if(JSON.parse(window.localStorage.getItem("barKey")).length==1) {
        		setList();
        		alert("You deleted too many bars.  That's ok.  I'll give you three to choose from.");
        	}
        }, false)
        // Displays a randomly chosen bar 
    function doPick() {
     // if a current bar was picked, it will delete that bar from the field
        if (randomBar.firstChild) {
            randomBar.removeChild(randomBar.firstChild);
        }   
        displayPick();
          
    }
    function displayPick() {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "info");
        var text=document.createTextNode(pickRandomBar());
        newDiv.appendChild(text);
        randomBar.appendChild(newDiv);         
    }

    function pickRandomBar() {
        barKey = JSON.parse(window.localStorage.getItem("barKey"));
        // pick a random number based on list of array
        var thepick= Math.floor(Math.random() * (barKey.length));
        var pickedName = barKey[thepick].barname;
        var pickedAddress = barKey[thepick].address;
        var pickedCity = barKey[thepick].city;
        return ("This is the bar you want:  "+ pickedName + " " +pickedAddress+ " " +pickedCity );
    }

    }
    function showButtons() {
        pickBarButton.style.display ="inline";
        displayBarsButton.style.display = "inline";
        addBarButton.style.display="inline";
        editBarButton.style.display="inline";
        deleteBarButton.style.display="inline";
        doIt.style.display="block";
    }

    function hideButtons() {
         pickBarButton.style.display = "none";
                displayBarsButton.style.display="none";
                addBarButton.style.display="none";
                editBarButton.style.display="none";
                deleteBarButton.style.display="none";
                doIt.style.display="none";
                removeEdit();
                removeAdd();
                clearDisplay();
    }
})
// add the elements that would be needed for adding
function showAdd() {
    for (var i in add) {
        if (add.hasOwnProperty(i)) {
            add[i].className = 'add show-textbox';
        }
    }
    for (var i in hint) {
        if (hint.hasOwnProperty(i)) {
            hint[i].className = 'hint show-textbox';
        }
    }
}
// add the elements that relate to just editing or deleting
function showNumberTextBox() {
    for (var i in edit) {
         if (edit.hasOwnProperty(i)) {
            edit[i].className = 'edit show-num';
        }
    }
}

// remove the elements a user would need to 
function removeAdd() {
    for (var i in add) {
        if (add.hasOwnProperty(i)) {
            add[i].className = 'add hidden';
        }
    }
    for (var i in hint) {
        if (hint.hasOwnProperty(i)) {
            hint[i].className = 'hint hidden';
        }
    }
}
//remove the elements that relate to editing and deleting
function removeEdit() {
    for (var i in edit) {
        if (edit.hasOwnProperty(i)) {
            edit[i].className= "edit hidden";
        }
    }          
}
