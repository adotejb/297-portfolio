var myMedicationList = []; // An array of texts of the drugs on the medication list

var add_button = document.querySelector("#add_button");
add_button.addEventListener("click", addDrugToMyList);

function keyupDemo(evt) {
  console.log(this);
  console.log(evt.keyCode);
  if (evt.keyCode==13) {
    addDrugToMyList();
  }
}
var new_drug = document.querySelector("#new_drug");
new_drug.addEventListener("keyup", keyupDemo);


function addDrugToMyList() {
  var drugInput = document.querySelector("#new_drug");
  let drug = drugInput.value.trim();
  if (drug!="") {
    drugPositionInMedicationList = myMedicationList.indexOf(drug);
    console.log("Drug Position in List:", drugPositionInMedicationList);
    if (drugPositionInMedicationList<0) {
      myMedicationList.push(drug);
    } else {
      console.log(drug, "is already on the list.");
    }
    console.log(myMedicationList);
  }

  drugInput.value = "";
  drugInput.focus();

  showMedicationList();

}



function showMedicationList() {

  var medication_list = document.querySelector("#medication_list");
  medication_list.innerHTML = "";

  for (var i = 0; i < myMedicationList.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = myMedicationList[i];
		medication_list.append(li);

		let a = document.createElement("a");
    a.innerText = "[X]";
    a.href = "javascript:;";	
    a.addEventListener("click", 
      removeDrugFromMedicationList.bind(li, myMedicationList[i], li)
    );
    li.append(a);

    let editButton = document.createElement("a");
    editButton.innerText = "[Edit]";
    editButton.href = "javascript:;";	
    editButton.addEventListener("click", 
      editDrugInMedicationList.bind(li, myMedicationList[i], li, i)
    );
    li.append(editButton);

	}
}


function removeDrugFromMedicationList(drug, li) {
	
  if (confirm("Did you really want to delete " + drug + "?")) {
    let index = myMedicationList.indexOf(drug);
    if (index > -1) {
      myMedicationList.splice(index, 1);
    }

    document.querySelector("#medication_list").removeChild(li);
  }

}

function editDrugInMedicationList(drug, li, index) {
    let newDrug = prompt("Edit Medication", drug);
    if (newDrug.trim()) {
      myMedicationList[index] = newDrug.trim();
      showMedicationList();
    }

}
