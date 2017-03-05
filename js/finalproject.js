var add = document.getElementsByClassName("add");
var hint = document.getElementsByClassName("hint");
var edit = document.getElementsByClassName("edit");
var dowhat;
var barlist=[];

function Bar(barnum, barname, address, city) {
        this.barnum=barnum;
        this.barname=barname;
        this.address=address;
        this.city=city;
  }

window.addEventListener("load", function() {
    document.getElementById("city").value = "Cambridge";
    var legal = document.getElementById("legalAge");
    var fullList = document.getElementById("fullList");
    var addBar = document.getElementById("addBar");
    var pickBar = document.getElementById("pickBar");
    var editBar = document.getElementById("editBar");
    var deleteBar = document.getElementById("deleteBar");
    var name = document.getElementById("name");
    var address = document.getElementById("address");
    var city = document.getElementById("city");
    var doit = document.getElementById("doit");
    var inform = document.getElementsByClassName("info infoHead");
    var displist=document.getElementById("output");
    var list=document.getElementById("thelist");
    var ranbar=document.getElementById("randbar");
    var num=document.getElementById("num");
    var regname= /^[a-z]|[A-Z]/;
    var regnum= /^\d/;
    var regaddress =/^\d ?=[a-z]|[A-Z]/;
    var regcity=/^[a-z]|[A-Z]/;

// sets up iniitial values in the database and makes sure there is never less than 2 bars
	if (localStorage.getItem("barKey") === null) {
		setlist();
	} 
   	
    // This function makes the text boxes change so that the user is editing the text directly, rather than writing anew
    num.addEventListener('keyup', function() {
        delnum=num.value-1;
         barKey = JSON.parse(window.localStorage.getItem("barKey"));
        if(barKey[delnum].barname) {
        name.value=barKey[delnum].barname;
        address.value=barKey[delnum].address;
        city.value=barKey[delnum].city;
        }
    }, false );
    
    //clear the display section
    function cleardisplay(){
	 while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
    }   

	// Displays a randomly chosen bar 
	function dopick() {
	 // if a current bar was picked, it will delete that bar from the field
                if (ranbar.firstChild) {
                ranbar.removeChild(ranbar.firstChild);
                }       
                barKey = JSON.parse(window.localStorage.getItem("barKey"));
                // pick a random number based on list of array
                 var thepick= Math.floor(Math.random() * (barKey.length));
                 // create Dom element fo random bar to be placed in
                 var newDiv = document.createElement("div");
                newDiv.setAttribute("class", "info");
                var text=document.createTextNode("This is the bar you want:  "+barKey[thepick].barname+ " " + barKey[thepick].address + " " + barKey[thepick].city);
                // place text
                newDiv.appendChild(text);
                //place div
                ranbar.appendChild(newDiv);            
        }
	// Create a bar list with three bars
	function setlist() {
        var druid = new Bar(0, "The Druid", "1357 Cambridge St.", "Cambridge");
        barlist.push(druid);
        var grendal = new Bar(1, "Grendal's Den", "89 Winthrop St.", "Cambridge");
        barlist.push(grendal)
        var charlie = new Bar (2, "Charlie's Kitchen", "10 Eliot St.", "Cambridge");
        barlist.push(charlie);
        window.localStorage.setItem("barKey", JSON.stringify(barlist));
   }
	// creates elements in the Dom to display information about the bars
    function showBarRow(dataObject, element) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "info");
        list.appendChild(newDiv);
        
        if (dataObject.barnum !== 'undefined') {
            var numDiv = document.createElement("div");
            text =document.createTextNode(dataObject.barnum);
            numDiv.appendChild(text);
            newDiv.appendChild(numDiv);            
        }

        if (dataObject.barname !== 'undefined') {
            var nameDiv = document.createElement("div");
            text =document.createTextNode(dataObject.barname);
            nameDiv.appendChild(text);
            newDiv.appendChild(nameDiv);            
        }


        if (dataObject.address !== 'undefined') {
            var addressDiv = document.createElement("div");
            text =document.createTextNode(dataObject.address);
            addressDiv.appendChild(text);
            newDiv.appendChild(addressDiv);            
        }

         if (dataObject.city !== 'undefined') {
            var cityDiv = document.createElement("div");
            text =document.createTextNode(dataObject.city);
            cityDiv.appendChild(text);
            newDiv.appendChild(cityDiv);            
        }
    }        
    
      // when loading the check box will be unchecked
    legal.checked=false;

    if(legal) {
        legal.addEventListener("change", function() {
            if( legal.checked) {
            // if the user claims to be a legal age, show the buttons
        		pickBar.style.display ="inline";
                fullList.style.display = "inline";
                addBar.style.display="inline";
                editBar.style.display="inline";
                deleteBar.style.display="inline";
                doit.style.display="block";


            }
            else {
            // hide the functionality of the program
                pickBar.style.display = "none";
                fullList.style.display="none";
                addBar.style.display="none";
                editBar.style.display="none";
                deleteBar.style.display="none";
                removeedit();
                removeadd();
                cleardisplay();
            }
        }, false)
    }
    if(fullList) {
        fullList.addEventListener("click", function() {
         	cleardisplay();  
            for (var i in inform) {
                if (inform.hasOwnProperty(i)) {
                        inform[i].className = 'info infoHead show-class';
                }
            }
             if(window.localStorage.getItem("barKey")) {
            	var barKey = JSON.parse(window.localStorage.getItem("barKey"));
            	for(var i =0; i< barKey.length; i++){
                	var savedBar= new Bar (i+1, barKey[i].barname,barKey[i].address,barKey[i].city, barKey[i].barstate);
                	barlist.push(savedBar);
                	showBarRow(savedBar, thelist);
            	}
        	}
        }, false)
    }

    if(addBar) {
        addBar.addEventListener("click", function() {
            dowhat="addabar";
            showadd();
            removeedit();
        }, false)
    }

    if(editBar) {
        editBar.addEventListener("click", function() {
            dowhat="editabar";
            editordelete()
            showadd();
        }, false)
    }
    if(deleteBar){
        deleteBar.addEventListener("click", function() {
            dowhat="deleteabar";
            editordelete()
            removeadd();
       
        }, false)
    }
    if(pickBar) {
        pickBar.addEventListener("click", function() {
            dowhat="pickBar"
            dopick();
            removeadd();
            removeedit();
        }, false)
    }
    if(doit) {
        doit.addEventListener("click", function() {
                var barname = name.value;
                var baraddress = address.value;
                var barcity = city.value;
                var delnum=num.value;    

            if(dowhat=="addabar") {
            // checks to make sure all the information is set
               if ( regname.test(barname) && regaddress.test(baraddress) && regcity.test(barcity)) {
                	var barnum = JSON.parse(window.localStorage.getItem("barKey")).length+1;
                	var pub = new Bar(barnum, barname, baraddress, barcity);
                	barlist.push(pub);
                	showBarRow(pub, output);
                	window.localStorage.setItem("barKey", JSON.stringify(barlist));
                }
                else {
                	alert("You have left some needed information out.  Please complete");
            	}
            }

            else if(dowhat=="pickBar"){
            	dopick();
            }

            else if(dowhat=="deleteabar"){
            // makes sure that the user typed a number
            	var didDelete = false;
            	if(regnum.test(delnum)){
                	if(window.localStorage.getItem("barKey")){
                 		cleardisplay();
                    	var barKey = JSON.parse(window.localStorage.getItem("barKey"));
                    	barlist=[];
                    	for(var i =0; i< barKey.length; i++) {
                        	if(i!=delnum-1) {
                        		if(didDelete == false) {
                            		var savedBar= new Bar (i+1, barKey[i].barname,barKey[i].address,barKey[i].city, barKey[i].barstate);
                            	}
                            	else {
                            		savedBar= new Bar (i, barKey[i].barname,barKey[i].address,barKey[i].city, barKey[i].barstate);
                            	}
                            	barlist.push(savedBar);
                            	showBarRow(savedBar, thelist);
                            	window.localStorage.setItem("barKey", JSON.stringify(barlist));
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
            
            else if(dowhat=="editabar") {
            // check to make sure all fields have information before changing to avoid
            //empty or undefined areas
            	if(regaddress.test(baraddress) && regcity.test(barcity) && regname.test(barname) && regnum.test(delnum)) {
                 	if(window.localStorage.getItem("barKey")) {
                 		cleardisplay();
                     	var barKey = JSON.parse(window.localStorage.getItem("barKey"));
                      	barlist=[];
                    	for(var i =0; i< barKey.length; i++) {
                        	if(i!=delnum-1) {
                            	var savedBar= new Bar (i+1, barKey[i].barname,barKey[i].address,barKey[i].city);                                
                        	}
                        	else {
                            	savedBar= new Bar(delnum, barname, baraddress, barcity);
                        	}
                        	barlist.push(savedBar);
                        	showBarRow(savedBar, thelist);
                        	window.localStorage.setItem("barKey", JSON.stringify(barlist));
                    	}
                    }
                }
            }
            // reset all textboxes
            num.value="";
            name.value="";
        	address.value="";
        	city.value="Cambridge";
        	if(JSON.parse(window.localStorage.getItem("barKey")).length==1) {
        		setlist();
        		alert("You deleted too many bars.  That's ok.  I'll give you three to choose from.");
        	}
        }, false)

    }
})

// add the elements that would be needed for adding
function showadd() {
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
function editordelete() {
    for (var i in edit) {
         if (edit.hasOwnProperty(i)) {
            edit[i].className = 'edit show-num';
        }
    }
}

// remove the elements a user would need to 
function removeadd() {
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
function removeedit() {
    for (var i in edit) {
        if (edit.hasOwnProperty(i)) {
            edit[i].className= "edit hidden";
        }
    }          
}
