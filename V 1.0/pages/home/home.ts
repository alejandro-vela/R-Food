import { Component } from '@angular/core';

import * as Clarifai from 'clarifai';


import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  image: string = null;
   constructor(
    private camera: Camera ) {}

 identify(elem) {
	  const app = new Clarifai.App({
	    apiKey: 'b5b6fd66256541d29b6a22c6dfdd960e'
	});

    document.getElementById('results').innerHTML = "";

    app.models.predict(Clarifai.GENERAL_MODEL, elem).then(function (response) {
        var concepts = response.rawData.outputs[0].data.concepts;
        console.log(concepts)
        document.getElementById('results').innerHTML = concepts.map(
        function (concept) {
            return concept.name;
        }).join("<br>"); 
      }
    ); 
}
  consumirApi() {

    const app = new Clarifai.App({
      apiKey: 'b5b6fd66256541d29b6a22c6dfdd960e'
    });
    // @ts-ignore
    //console.log(document.getElementById('newimage').src);
    // @ts-ignore
    let _this = this;
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: document.getElementById
      // @ts-ignore
      ('newimage').src.replace('data:image/png;base64,', '')
        .replace('data:image/jpeg;base64,', '')}).then
    (function (response) {
      
        const concepts = response.rawData.outputs[0].data.concepts;
        console.log(concepts);
        document.getElementById('results').innerHTML = concepts.map(
          function (concept) {
            console.log(concept.name);
            console.log(concept.value);

            let resutlForClient= (concept.name+":   "+ concept.value+"<br>");
            return resutlForClient ;
          }).join("<br>");
      }
    );
  }

  nuevaImagen() {
    const input = document.getElementById('imagen');
    // @ts-ignore
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        // @ts-ignore
        console.log(e.target.result);

        // @ts-ignore
        document.getElementById('newimage').src = e.target.result;
      };
      // @ts-ignore
      reader.readAsDataURL(input.files[0]);
    }
  }
 getPicture(){

    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      correctOrientation: true
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }



}

