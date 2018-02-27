var trainInfo = {
    Nr: [42, 42, 42],
    Avgår: ['09:25', '10:25', '11:25'],
    Ankommer: ['10:45', '11:35', '12:55']
}

var searchButton = document.getElementById("sok-knapp");

if (searchButton){
    searchButton.addEventListener("click", function(){
        
        var test = document.getElementById("fran-dest");
        var going = document.getElementById("aker-fran");
        going.innerHTML = "Åker från " + test.value;
        
        var tbody = document.getElementById("tag-table");
        
        if (tbody.childElementCount != 0){
            tbody.innerHTML = "";
        }
        
        for (let index = 0; index < 3; index++){
            var row = tbody.insertRow(index);
            var c1 = row.insertCell(0);
            var c2 = row.insertCell(1);
            var c3 = row.insertCell(2);
            
            c1.innerHTML = trainInfo.Nr[index];
            c2.innerHTML = trainInfo.Avgår[index];
            c3.innerHTML = trainInfo.Ankommer[index];
        }
     });
    
}