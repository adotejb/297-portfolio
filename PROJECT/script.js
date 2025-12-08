/// Assign each medication a variable where data will be stored 
var med1 = "";
var med2 = "";

var salesData = {
    med1: {},
    med2: {},
};

/// Fetch data from FHIR API
$.get("https://r3.smarthealthit.org/MedicationRequest?_format=json&_count=100", function(data) {
    console.log("API Response:", data);
    
    for (var i=0; i<data.entry.length; i++) {
            var medRequest = data.entry[i].resource;
            var medName = "";
        
            if(medRequest.medicationCodeableConcept) {
                medName = medRequest.medicationCodeableConcept.text;
            }
            
            if(medName === "Metformin XR 500mg") {
                med1 = medName;
            }
            if(medName === "Diovan 160mg") {
                med2 = medName;
            }
    }
    /// show what we found 
    console.log("Medication 1:", med1);
    console.log("Medication 2:", med2);

    /// Let's get them showing on the page 
    document.getElementById("med1-title").innerHTML = med1;
    document.getElementById("med2-title").innerHTML = med2;
});

/// Used AI to help me set this up for fluidity of the page
function toggleMed(medId) {
    var content = document.getElementById(medId + "-content");
    
    if(content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

function showTable(medId) {
    // Get values directly from input fields
    var data2020 = document.getElementById(medId + "-2020").value || 0;
    var data2021 = document.getElementById(medId + "-2021").value || 0;
    var data2022 = document.getElementById(medId + "-2022").value || 0;
    var data2023 = document.getElementById(medId + "-2023").value || 0;
    var data2024 = document.getElementById(medId + "-2024").value || 0;
    var data2025 = document.getElementById(medId + "-2025").value || 0;

    var tableHTML = "<h3>Sales Data Table:</h3>";
    tableHTML += "<table border='1'>";
    tableHTML += "<tr><th>Year</th><th>Units Sold</th></tr>";
    tableHTML += "<tr><td>2020</td><td>" + data2020 + "</td></tr>";
    tableHTML += "<tr><td>2021</td><td>" + data2021 + "</td></tr>";
    tableHTML += "<tr><td>2022</td><td>" + data2022 + "</td></tr>";
    tableHTML += "<tr><td>2023</td><td>" + data2023 + "</td></tr>";
    tableHTML += "<tr><td>2024</td><td>" + data2024 + "</td></tr>";
    tableHTML += "<tr><td>2025</td><td>" + data2025 + "</td></tr>";
    
    var total = parseInt(data2020) + parseInt(data2021) + parseInt(data2022) + 
                parseInt(data2023) + parseInt(data2024) + parseInt(data2025);
    
    tableHTML += "<tr><th>Total</th><th>" + total + "</th></tr>";
    tableHTML += "</table>";
    
    // Add button to show chart
    tableHTML += "<br><button onclick='showChart(\"" + medId + "\")'>View Chart</button>";
    
    // Display the table
    document.getElementById(medId + "-table").innerHTML = tableHTML;
}
  // Now, create line charts for each medication
function showChart(medId) {
    // Get values directly from input fields
    var data2020 = parseInt(document.getElementById(medId + "-2020").value) || 0;
    var data2021 = parseInt(document.getElementById(medId + "-2021").value) || 0;
    var data2022 = parseInt(document.getElementById(medId + "-2022").value) || 0;
    var data2023 = parseInt(document.getElementById(medId + "-2023").value) || 0;
    var data2024 = parseInt(document.getElementById(medId + "-2024").value) || 0;
    var data2025 = parseInt(document.getElementById(medId + "-2025").value) || 0;
  
  Highcharts.chart(medId + '-chart', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Sales Over Time'
    },
    xAxis: {
      categories: ['2020', '2021', '2022', '2023', '2024', '2025']
    },
    yAxis: {
      title: {
        text: 'Units Sold'
      }
    },
    // 2 dimensions: 
    series: [{
      name: 'Sales',
      data: [data2020, data2021, data2022, data2023, data2024, data2025]
    }]
  });
}
