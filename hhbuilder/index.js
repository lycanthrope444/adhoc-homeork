(function(){
"use strict";

// HH member constructor
function Member(age, relation, smoker){
  this.age = age;
  this.relationship = relation;
  this.smoker = smoker;
}

// Household object
var house = {
  //list for HH members, exported as JSON
  list:[],
  // Adds a member from the form data and then clears that data
  addMember:function(){
    var age = document.getElementsByName("age")[0].value;
    var relation = document.getElementsByName("rel")[0].value;
    var smoker = false;

    if (document.getElementsByName("smoker")[0].checked){
      smoker = true;
    }

    // Validation for Age and Relationship
    if (age > 0 && relation){
      var member = new Member(age, relation, smoker);
      house.list.push(member);
      house.display();
      console.log("house.add clicked", member,house);
    } else {
      alert("Please enter a valid age and relationship");
    }

    // Clears Form Data
    document.getElementsByName("age")[0].value = "";
    document.getElementsByName("rel")[0].value = "";
    document.getElementsByName("smoker")[0].checked = false;
  },
  delMember:function(num){
    house.list.splice(num, 1);
    house.display();
  },
  display: function(){
    houseHoldList.innerHTML = "";

    var listItems = house.list.map(function(val, i){
      var memberLi = document.createElement("li");
      var delBtn = document.createElement("button");

      // Creating display information
      var age = "Age: " + house.list[i].age;
      var rel = " Relationship: " + house.list[i].relationship;
      var smoker = " Smoker: " + house.list[i].smoker;

      delBtn.innerHTML = "Delete this";
      delBtn.name = "delBtn";
      delBtn.id = i;
      delBtn.addEventListener("click", function(){
        house.delMember(i);
      });

      memberLi.innerHTML = age + rel + smoker;
      memberLi.appendChild(delBtn);

      houseHoldList.appendChild(memberLi);
    });
    console.log(house.list);
  }
};

/******
 HTML Elements
*******/

// selects entire form
var formControl = document.querySelector("form");
formControl.addEventListener('submit', submitSimulation);

// add button
var addBtn = document.querySelector(".add");
// used to keep this button from submitting the form
addBtn.type = "button";
addBtn.addEventListener("click", house.addMember);
//quality of life to help prevent accidental pressing of submit button
addBtn.style = "margin: 25px";

// House Hold List
var houseHoldList = document.querySelector(".household");

// Pre Class
var pre = document.querySelector('.debug');

// Simulate Form Submission
function submitSimulation(e){
  //the event would not be prevented in an actual app
  e.preventDefault();

  //JSON Data to be sent to server
  var houseInfo = JSON.stringify(house.list);

  pre.innerHTML = houseInfo;
  console.log("Form submitted", houseInfo, pre);
}


}());
