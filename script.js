document.addEventListener("DOMContentLoaded", function(){

    var sampleIncome = document.getElementById("sampleIncome");
    var sales = document.getElementById("sales");
    var expenses = document.getElementById("expenses");
    var total = document.getElementById("totalIncomeResult")
    var namePerson = document.getElementById("namePerson");
    // Creates a list with the content from the local storage, so there aren't any problems of type null. If it's empty I initialize it as an empty array. 
    var listAmount=JSON.parse(localStorage.getItem("listUsers")) || [];


    document.getElementById("totalIncome").addEventListener("click", function(event){
        event.preventDefault();
        var personName=namePerson.value;
        var valueSampleIncome = parseFloat(sampleIncome.value); 
        var valueSales = parseFloat(sales.value);
        var valueExpenses = parseFloat(expenses.value);

        var valueTotalIncome = valueSampleIncome + valueSales - valueExpenses;
        console.log("value: " + valueTotalIncome) //check it real time
        total.innerHTML = valueTotalIncome

        var object={};
        object[personName]=valueTotalIncome;
        listAmount.push(object);

        //Local storage only recieves in JSON format, so thats why I used stringify. 
        localStorage.setItem("listUsers", JSON.stringify(listAmount));
        console.log(localStorage.getItem("listUsers"));

        personName.value="";
        valueSampleIncome.value="";
        valueSales.value="";
        valueExpenses="";

        updateTable();
    })

    function updateTable(){
        //Same thing from above 
        var list=JSON.parse(localStorage.getItem("listUsers")) || [];
        var tblBody=document.getElementById("tblBody");

        tblBody.innerHTML="";

        //Takes each element from the list, and it assigns it to the cellKey and cellValue to create the table
        list.forEach(element=>{
            var row=document.createElement('tr');
            var cellKey=document.createElement('td');
            var cellValue=document.createElement('td');

            cellKey.textContent=Object.keys(element)[0];
            cellValue.textContent=element[Object.keys(element)[0]];

            row.appendChild(cellKey);
            row.appendChild(cellValue);
            tblBody.appendChild(row);
        })

    }

    updateTable();
})