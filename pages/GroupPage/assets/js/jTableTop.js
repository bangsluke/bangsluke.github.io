// jTableTop.js JavaScript Functions

// TableTop Google Sheets Database scripts
// https://medium.com/@jaejohns/how-to-use-google-sheets-as-your-website-database-b0f2f13d0396
// https://github.com/jsoma/tabletop

//<script type='text/javascript'>    
  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1nMirJYChG8t2DC_C_esM7zeviuQ9YtIQLKDQ5LbuP-w/edit?usp=sharing';

  function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: showInfo,
                     simpleSheet: true } )
  }

  function showInfo(data, tabletop) {
    alert('Successfully processed!')
    console.log(data);
  }

  window.addEventListener('DOMContentLoaded', init)
//</script>



// function init() {
//     Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vRB4E_6RnpLP1wWMjqcwsUvotNATB8Np3OntlXb7066ULcAHI9oqqRhucltFifPTYNd7DRNRE56oTdt/pub?output=csv', {
//     download: true,
//     header: true,
//     complete: function(results) {
//       var data = results.data
//       console.log(data)
//     }
//   })
// window.addEventListener('DOMContentLoaded', init)



