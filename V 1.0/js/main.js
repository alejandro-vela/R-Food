const app = new Clarifai.App({
    apiKey: 'b5b6fd66256541d29b6a22c6dfdd960e'
});

const identify = (elem) => {
    document.getElementById('results').innerHTML = "";
    app.models.predict(Clarifai.GENERAL_MODEL, elem.src).then(function (response) {
        var concepts = response.rawData.outputs[0].data.concepts;
        console.log(concepts)
        document.getElementById('results').innerHTML = concepts.map(function (concept) {
            return concept.name;
        }).join(', ');
      }
    );

}