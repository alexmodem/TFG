var polyOpts = ["box", "octahedron", "icosahedron", "cone", "cylinder"];
var figuresOpts = ["van", "spinosaurus"];


AFRAME.registerComponent('figure-generator', {
    schema:{},

    init: function () {
        let el = this.el;

        el.addEventListener('click', (e) => {

            let fig = document.createElement('a-entity');
            let figID = 0;
            fig.setAttribute('gltf-model', "#"+el.getAttribute('gltf-model').split("/")[1]); //Get model

            fig.setAttribute('class', 'figure');
            fig.setAttribute('scale', '0.01 0.01 0.01');
            fig.setAttribute('position', (figID-4)+" 1 -3");

            fig.setAttribute('grabbable',"");

            let selectorTok = document.createElement('a-entity');
            selectorTok.setAttribute('id', "tokenPoly");
            selectorTok.setAttribute('geometry', "primitive: octahedron");
            selectorTok.setAttribute('position', "0 50 0");
            selectorTok.setAttribute('scale', "10 10 10");
            selectorTok.setAttribute('material', "color:#47f41c");



            if (figID === 0) {
                fig.appendChild(selectorTok);
            } else {
                let token = document.querySelector('#tokenPoly');
                token.parentNode.removeChild(token);
                fig.appendChild(selectorTok);
            }

            el.sceneEl.appendChild(fig);

        });

    }
});



AFRAME.registerComponent('figure-changer', {
    schema: { },

    init: function () {
        let data = this.data;
        let el = this.el;

        el.addEventListener('click', (e) => {
            let choice = el.getElementsByTagName('a-text')[0].getAttribute('text').value;

            let figDisplayed = document.querySelector('#figureDisplayed');
            let figmodel = figDisplayed.getAttribute('gltf-model').split("/")[1];

            let figIndexDisp = figuresOpts.indexOf(figmodel);

            if ((choice === "<--") && (figIndexDisp === 0)){
                figIndexDisp = figuresOpts.length - 1;
            } else if (choice === "<--"){
                figIndexDisp--;
            } else if ((choice === "-->") && (figIndexDisp !== (figuresOpts.length - 1))){
                figIndexDisp++;
            } else{
                figIndexDisp = 0;
            }

            figDisplayed.parentNode.removeChild(figDisplayed);

            let optButton = document.createElement('a-entity');
            let camera = document.querySelector("#cameraUser");

            optButton.setAttribute('id', "figureDisplayed");
            optButton.setAttribute('gltf-model', "#"+figuresOpts[figIndexDisp]);
            optButton.setAttribute('position', "-1 -0.5 -1");
            optButton.setAttribute('figure-generator', "");
            optButton.setAttribute('scale', "0.003 0.003 0.003");
            optButton.setAttribute('animation', "property: rotation; to: 0 360 0; loop: true; dur: 3000; easing: linear");

            camera.appendChild(optButton);
        });

    }
});

AFRAME.registerComponent('poly-changer', {
    schema: { },

    init: function () {
        let data = this.data;
        let el = this.el;

        el.addEventListener('click', (e) => {
            let choice = el.getElementsByTagName('a-text')[0].getAttribute('text').value;

            let polyDisplayed = document.querySelector('#polyDisplayed');

            let polyIndexDisp = polyOpts.indexOf(polyDisplayed.getAttribute('geometry').primitive);

            if ((choice === "<--") && (polyIndexDisp === 0)){
                polyIndexDisp = polyOpts.length - 1;
            } else if (choice === "<--"){
                polyIndexDisp--;
            } else if ((choice === "-->") && (polyIndexDisp !== (polyOpts.length - 1))){
                polyIndexDisp++;
            } else{
                polyIndexDisp = 0;
            }

            polyDisplayed.parentNode.removeChild(polyDisplayed);

            let optButton = document.createElement('a-entity');
            let camera = document.querySelector("#cameraUser");
            optButton.setAttribute('geometry', "primitive: "+polyOpts[polyIndexDisp]);
            optButton.setAttribute('id', "polyDisplayed");
            optButton.setAttribute('polygenerator',"");
            optButton.setAttribute('position', "-1 -0.5 -1");
            optButton.setAttribute('rotation', "-45 15 0");
            optButton.setAttribute('scale', "0.1 0.1 0.1");
            optButton.setAttribute('material', "color: red");
            optButton.setAttribute('animation', "property: rotation; from: 90 90 0 ;to: 450 450 0; loop: true; dur: 3000; easing: linear");
            camera.appendChild(optButton);
        });

    }
});

AFRAME.registerComponent('menu-textures', {
    schema:{
        options: {default: ["gold", "bricks", "metal"]}
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        el.addEventListener('click', (e) => {

            let menu = document.createElement('a-entity');
            menu.setAttribute('geometry', "primitive: plane");
            menu.setAttribute('id', "textureSelector");
            menu.setAttribute('position', "1 -0.5 -1");
            menu.setAttribute('material', "color: grey");

            let options = data.options;

            let optsLen = options.length;
            let scaleX = 1/options.length;
            menu.setAttribute('scale', (optsLen*0.1)+" 0.1 0");

            for (let option of options){
                let textureOpt = document.querySelector("#"+option).src;
                let optButton = document.createElement('a-entity');
                optButton.setAttribute('geometry', "primitive: plane");
                optButton.setAttribute('id', "pickTexture"+option);
                optButton.setAttribute('position', ((options.indexOf(option)/optsLen) - (0.5-(scaleX/2)))+" 0 1");
                optButton.setAttribute('scale', (scaleX-0.02)+" 0.8 0.1");
                optButton.setAttribute('material', 'src:'+textureOpt);
                optButton.setAttribute('texture-changer', "");
                menu.appendChild(optButton);

            }

            let camera = document.querySelector("#cameraUser");
            camera.appendChild(menu);
        });

    }
});

AFRAME.registerComponent('menu-polygons', {
    schema: { },

    init: function () {
        let data = this.data;
        let el = this.el;

        el.addEventListener('click', (e) => {

            //MENU
            let camera = document.querySelector("#cameraUser");
            let menuLeft = document.createElement('a-entity');
            menuLeft.setAttribute('geometry', "primitive: plane");
            menuLeft.setAttribute('position', "-1.25 -0.5 -1");
            menuLeft.setAttribute('scale', "0.1 0.1 0");
            menuLeft.setAttribute('material', "color: grey");
            menuLeft.setAttribute('poly-changer',"");
            menuLeft.setAttribute('rotation', "-45 15 0");

            let textLeft = document.createElement('a-text');
            textLeft.setAttribute('value', "<--");
            textLeft.setAttribute('align', "center");
            menuLeft.appendChild(textLeft);

            camera.appendChild(menuLeft);

            let menuRight = document.createElement('a-entity');
            menuRight.setAttribute('geometry', "primitive: plane");
            menuRight.setAttribute('position', "-0.75 -0.5 -1");
            menuRight.setAttribute('scale', "0.1 0.1 0");
            menuRight.setAttribute('material', "color: grey");
            menuRight.setAttribute('poly-changer',"");
            menuRight.setAttribute('rotation', "-45 15 0");

            let textRight = document.createElement('a-text');
            textRight.setAttribute('value', "-->");
            textRight.setAttribute('align', "center");
            menuRight.appendChild(textRight);

            camera.appendChild(menuRight);

            let optButton = document.createElement('a-entity');
            optButton.setAttribute('geometry', "primitive: "+polyOpts[0]);
            optButton.setAttribute('id', "polyDisplayed");
            optButton.setAttribute('polygenerator',"");
            optButton.setAttribute('position', "-1 -0.5 -1");
            optButton.setAttribute('scale', "0.1 0.1 0.1");
            optButton.setAttribute('material', "color: red");
            optButton.setAttribute('animation', "property: rotation; from: 90 90 0 ;to: 450 450 0; loop: true; dur: 3000; easing: linear");
            camera.appendChild(optButton);
        });

    }
});

AFRAME.registerComponent('menu-figures', {
    schema: {
            options: {default: ["van", "spinosaurus"]}
     },

    init: function () {
        let data = this.data;
        let el = this.el;

        el.addEventListener('click', (e) => {

            //MENU
            let camera = document.querySelector("#cameraUser");
            let menuLeft = document.createElement('a-entity');
            menuLeft.setAttribute('geometry', "primitive: plane");
            menuLeft.setAttribute('position', "-1.25 -0.5 -1");
            menuLeft.setAttribute('scale', "0.1 0.1 0");
            menuLeft.setAttribute('material', "color: grey");
            menuLeft.setAttribute('figure-changer',"");
            menuLeft.setAttribute('rotation', "-45 15 0");

            let textLeft = document.createElement('a-text');
            textLeft.setAttribute('value', "<--");
            textLeft.setAttribute('align', "center");
            menuLeft.appendChild(textLeft);

            camera.appendChild(menuLeft);

            let menuRight = document.createElement('a-entity');
            menuRight.setAttribute('geometry', "primitive: plane");
            menuRight.setAttribute('position', "-0.75 -0.5 -1");
            menuRight.setAttribute('scale', "0.1 0.1 0");
            menuRight.setAttribute('material', "color: grey");
            menuRight.setAttribute('figure-changer',"");
            menuRight.setAttribute('rotation', "-45 15 0");

            let textRight = document.createElement('a-text');
            textRight.setAttribute('value', "-->");
            textRight.setAttribute('align', "center");
            menuRight.appendChild(textRight);

            camera.appendChild(menuRight);

            let optButton = document.createElement('a-entity');
            optButton.setAttribute('id', "figureDisplayed");
            optButton.setAttribute('gltf-model', "#"+figuresOpts[0]);
            optButton.setAttribute('position', "-1 -0.5 -1");
            optButton.setAttribute('scale', "0.003 0.003 0.003");
            optButton.setAttribute('figure-generator', "");
            optButton.setAttribute('animation', "property: rotation; to: 0 360 0; loop: true; dur: 3000; easing: linear");
            camera.appendChild(optButton);
        });

    }
});

AFRAME.registerComponent('menu-colors', {
    schema:{
        //options: {default: ["blue", "purple", "orange", "black", "green", "yellow", "white", "red"]}
        //options: {default: ["blue", "purple"]}
        options: {default: ["blue", "purple", "orange", "black", "green"]}
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        el.addEventListener('click', (e) => {

            let menu = document.createElement('a-entity');
            menu.setAttribute('geometry', "primitive: plane");
            menu.setAttribute('id', "colorSelector");
            menu.setAttribute('position', "1 -0.35 -1");
            menu.setAttribute('material', "color: grey");

            let options = data.options;

            let optsLen = options.length;
            let scaleX = 1/options.length;
            menu.setAttribute('scale', (optsLen*0.1)+" 0.1 0");

            for (let option of options){
                let optButton = document.createElement('a-entity');
                optButton.setAttribute('geometry', "primitive: plane");
                optButton.setAttribute('id', "pick"+option);
                optButton.setAttribute('position', ((options.indexOf(option)/optsLen) - (0.5-(scaleX/2)))+" 0 1");
                optButton.setAttribute('scale', (scaleX-0.02)+" 0.8 0.1");
                optButton.setAttribute('material', "color:"+option);
                optButton.setAttribute('texture-changer', "");
                menu.appendChild(optButton);

            }

            let camera = document.querySelector("#cameraUser");
            camera.appendChild(menu);
        });

    }
});

AFRAME.registerComponent('texture-changer', {
    schema:{    },

    multiple: true,

    init: function () {
        let el = this.el;
        el.addEventListener('click', (e) => {
            let poly = document.querySelector("#tokenPoly").parentNode;
            poly.setAttribute('material', e.target.getAttribute('material'));
        });
    }
});
