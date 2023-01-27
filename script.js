// Select the file input element and patient data table body
const fileUpload = document.getElementById("file-upload");
const patientData = document.getElementById("patient-data");

// Listen for changes on the file input element
fileUpload.addEventListener("change", event => {
  // Get the first selected file
  const file = event.target.files[0];

  // Check if a file was selected
  if (file) {
    // Create a new FileReader object
    const reader = new FileReader();

    // Listen for the load event on the FileReader
    reader.onload = event => {
      // Get the contents of the file as a string
      const csv = event.target.result;

      // Use PapaParse library to parse the CSV string
      const data = Papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        complete: results => {
          // Iterate over the parsed data and create a new table row for each patient
          results.data.forEach(patient => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${patient.Name}</td>
              <td>${patient.Age}</td>
              <td>${patient.Gender}</td>
              <td>${patient.Medical_Conditions}</td>
            `;
            patientData.appendChild(row);
          });
        }
      });
    }

    // Read the contents of the file as a text string
    reader.readAsText(file);
  }
});

// Select the export button
const exportButton = document.getElementById("export-pdf");

// Listen for clicks on the export button
exportButton.addEventListener("click", () => {
  // Create a new jsPDF object
  const pdf = new jsPDF();

  // Set the font size and color for the PDF
  pdf.setFont("helvetica");
  pdf.setTextColor(0, 0, 255);
  //if you want to set background color of pdf
  pdf.setFillColor(255, 255, 255);
  // Add a logo image to the top left corner of the PDF
  pdf.addImage(logoImg, "png", 15, 15, 50, 50);

  // Add the patient data table to the PDF
  pdf.autoTable({
    head: [['Name', 'Age', 'Gender', 'Medical Conditions']],
    body: patientData.innerHTML,
    startY: 70,
    styles: {
      theme: 'striped',
      font: 'helvetica',
      cellPadding: 2,
      overflow: 'linebreak',
      fontSize: 8,
      halign: 'center',
      valign: 'middle',
      tableWidth: 'auto',
      columnWidth: 'auto',
      lineColor: [0, 0, 255],
      lineWidth: 0.1,
      fontStyle: 'normal',
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fillStyle: 'F',
      rowHeight: 20,
      columnStyles: {
        0: { columnWidth: 'auto' },
        1: { columnWidth: 'auto' },
        2: { columnWidth: 'auto' },
        3: { columnWidth: 'auto' },
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        halign: 'center'
      },
    }
  });

  // Save the PDF to the user's device
  pdf.save("patient-data.pdf");
});