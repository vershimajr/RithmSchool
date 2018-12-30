//This script will upon loading of the page:
//Wait for the clicking of the Add movie button
//If both input fields are full, it will create a row with this information and append it to the tbody
  //If not, it will alert that we must input data into the fields
//If the delete button in the row is clicked, then the row is removed from the DOM
//If the title or rating buttons are clicked then we will toggle sort the rows, ascending and descending, by title or rating respectively


var rowGenerator = function(title, rating){
  var row = $("<tr>");
  var titleCell = $("<td>",{text: title});
  var ratingCell = $("<td>",{text: rating});
  var buttonCell = $("<td>");
  var button = $("<button>",{text: "Delete"}).addClass("delete");
  buttonCell.append(button);
  return row.append(titleCell).append(ratingCell).append(buttonCell);
}

var sortByTitle = function(ascending,unsortedRows){
  //if 0, sort ascending
  if(unsortedRows.length === 0){
    return unsortedRows;
  }
  var rowsArray = unsortedRows.get();
  rowsArray.sort(function(a,b){
    var titleA = $(a).find("td:first-child").text();
    var titleB = $(b).find("td:first-child").text();
    if(!ascending){
      return (titleA < titleB) ? -1 : (titleB < titleA) ? 1 : 0;
    }else{
      return (titleA < titleB) ? 1 : (titleB < titleA) ? -1 : 0;
    }
  });
  return $(rowsArray);
}

var sortByRating = function(descending,unsortedRows){
  //if 0, sort descending
  if(unsortedRows.length === 0){
    return unsortedRows;
  }
  var rowsArray = unsortedRows.get();
  rowsArray.sort(function(a,b){
    var ratingA = $(a).find("td:nth-child(2)").text();
    var ratingB = $(b).find("td:nth-child(2)").text();
    if(!descending){
      return ratingB - ratingA;
    }else{
      return ratingA - ratingB;
    }
  });
  return $(rowsArray);
}


$(function(){
  var orderTitle = 0;
  var orderRating =0;

  //add event listener on add Movie button
  $("button#addMovie").on('click', function(){
    var $inputs =$("input");
    var $vals = $inputs.map(function(element){
      return this.value;
    });
    var vals = $vals.get();
    //if one of the input values is empty, alert an error
    if(vals.some(function(value){
      return value === "";
    })){
      alert("Please enter values for movie title and rating");
    }else{ //otherwise generate a new row
      var newRow = rowGenerator(vals[0],vals[1]);
      $("tbody").append(newRow);
    }
    $inputs.val("");
  });

  //add listener on all clicks of delete buttons
  $("tbody").on('click',"button.delete", function(){
    $(this).closest('tr').remove();
  });

  //add listern on clicks to control header cells
  $("th.control").on('click',function(){
    var sortVar = $(this).text().toLowerCase();
    var unsortedRows = $("tbody").children();
    var sortedRows;
    if(sortVar === "title"){
      sortedRows = sortByTitle(orderTitle, unsortedRows);
      orderTitle = +!orderTitle;
    }else{
      sortedRows = sortByRating(orderRating, unsortedRows);
      orderRating = +!orderRating;
    }
    $("tbody").empty().append(sortedRows);
  });

});
