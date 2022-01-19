var countries = ["All"]
var group = [{"Group": "All", "Amount": 4303}];

for (var i in geoNotJson){
  countries.push(geoNotJson[i].properties.country_txt);

//  var numAtt = geoNotJson[i]['Number of attacks by terror group'];
//  var groupA = geoNotJson[i].gname;
//  obj["Group"] = groupA;
//  obj["Amount"] = numAtt;
//  group.push(obj);

};


countries=countries.sort()
countries = countries.filter( function( item, index, inputArray ) {
         return inputArray.indexOf(item) == index;
  });


var parent = document.getElementById("searchBox");

for (i=0;i<countries.length;i++){
  var textCountry = document.createTextNode(countries[i]);
  var opt = document.createElement("option");
  opt.setAttribute("value", countries[i]);
  opt.appendChild(textCountry);
  parent.appendChild(opt);
};


/////////////////////////////////////////////////

//        CHECKBOXES FOR TERROR GROUP (include number by that group too!)

/////////////////////////////////////////////////

/*
for (var persons in geoNotJson{
  console.log(geoNotRegion[persons])
};
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
group = sortByKey(group, 'Group');  // NOTES: Can change this to 'Amount' to organise groups by number of attacks
console.log(group.length);
for (var i=0;i<group.length-2;i++){
  var one = group[i].Group;
  var p = i+1
  var two = group[p].Group;
  if (one === two){
    group[i+1].Amount = group[i+1].Amount + group[i].Amount;
    group[i].Group = "delete";
  };
};
for (var i=0; i<group.length;i++){
  if (group[i].Group === "delete"){
    group.splice(i,1);
  };
  //console.log(group[i].Group)
};
//console.log(group);
//console.log(group.length);
/*
console.log(group);
group= group.sort()
group = group.filter( function( item, index, inputArray ) {
         return inputArray.indexOf(item) == index;
  });
var parent = document.getElementById("groupBox");
for (i=0;i<group.length;i++){
  var textCountry = document.createTextNode(group[i].Group + " " + group[i].Amount);
  var opt = document.createElement("option");
  opt.setAttribute("value", group[i]);
  opt.appendChild(textCountry);
  parent.appendChild(opt);
};
*/
