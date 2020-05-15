AFRAME.registerComponent('menu-figures', {
    schema: {
        options: {default: ["box", "octahedron", "icosahedron"]}
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        let addEventListener = el.addEventListener('click', (e) => {

            let menu = document.createElement('a-entity');
            menu.setAttribute('geometry', "primitive: plane");
            menu.setAttribute('position', "-2 2 -3");
            menu.setAttribute('scale', "1.5 0.5 0.5");
            menu.setAttribute('material', "color: grey");

            //Including options in the menu
            let polyOpts = data.options;
            for (let option of polyOpts){
                let optButton = document.createElement('a-entity');
                optButton.setAttribute('geometry', "primitive: "+option);
                optButton.setAttribute('id', option);
                optButton.setAttribute('polygenerator',"");
                optButton.setAttribute('position', ((polyOpts.indexOf(option)*0.3)-0.3)+" 0 0.1");
                optButton.setAttribute('scale', "0.1 0.3 0.1");
                optButton.setAttribute('material', "color: red");
                optButton.setAttribute('animation', "property: rotation; from: 90 90 0 ;to: 450 450 0; loop: true; dur: 3000; easing: linear");
                menu.appendChild(optButton);
            }

            el.sceneEl.appendChild(menu);
        });

    }
});

AFRAME.registerComponent('menu-colors', {
    schema:{
        options: {default: ["blue", "purple", "orange", "black"]}
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        let addEventListener = el.addEventListener('click', (e) => {

            let menu = document.createElement('a-entity');
            menu.setAttribute('geometry', "primitive: plane");
            menu.setAttribute('id', "colorSelector");
            menu.setAttribute('position', "2 2 -3");
            menu.setAttribute('scale', "1.5 0.5 0.5");
            menu.setAttribute('material', "color: grey");

            //Including options in the menu
            let options = data.options;
            for (let option of options){
                let optButton = document.createElement('a-entity');
                optButton.setAttribute('geometry', "primitive: plane");
                optButton.setAttribute('id', "pick"+option);
                optButton.setAttribute('position', ((options.indexOf(option)*0.2)-0.3)+" 0 0.01");
                optButton.setAttribute('scale', "0.1 0.3 0.1");
                optButton.setAttribute('material', "color:"+option);
                optButton.setAttribute('texture-changer', "");
                menu.appendChild(optButton);
            }

            el.sceneEl.appendChild(menu);
        });

    }
});

AFRAME.registerComponent('poly-selectable', {
    init: function () {
        let el = this.el;

        el.addEventListener('click', (e) => {
            let selectorTok = document.createElement('a-entity');
            selectorTok.setAttribute('id', "tokenPoly");
            selectorTok.setAttribute('geometry', "primitive: octahedron");
            selectorTok.setAttribute('position', "0 1.2 0");
            selectorTok.setAttribute('scale', "0.1 0.1 0.1");
            selectorTok.setAttribute('material', "color:#47f41c");

            let token = document.querySelector('#tokenPoly');
            token.parentNode.removeChild(token);

            el.appendChild(selectorTok);
        });

    }
});

AFRAME.registerComponent('polygenerator', {
    schema:{},

    init: function () {
        let el = this.el;

        el.addEventListener('click', (e) => {

            let poly = document.createElement('a-entity');
            let polyList =  document.querySelectorAll('.polygon');
            let polyID = 0;

            //Temporary solution. It should take care of gaps
            if (polyList === null) {
                poly.setAttribute('id', "polygon0");
            } else {
                polyID = polyList.length;
                poly.setAttribute('id', "polygon"+polyID);
            }


            //Create poly depending on the last index
            //Print depending of position
            poly.setAttribute('geometry', el.getAttribute('geometry'));
            poly.setAttribute('class', 'polygon');
            poly.setAttribute('scale', '0.5 0.5 0.5');
            poly.setAttribute('position', (polyID-4)+" 1 -3"); //Temporary. Idea:Build a 6x6 grid
            poly.setAttribute('material', el.getAttribute('material'));
            poly.setAttribute('poly-selectable',"");

            //Creating selector
            //Selector is child of polygon
            let selectorTok = document.createElement('a-entity');
            selectorTok.setAttribute('id', "tokenPoly");
            selectorTok.setAttribute('geometry', "primitive: octahedron");
            selectorTok.setAttribute('position', "0 1.2 0");
            selectorTok.setAttribute('scale', "0.1 0.1 0.1");
            selectorTok.setAttribute('material', "color:#47f41c");



            if (polyID === 0) {
                poly.appendChild(selectorTok);
            } else {
                let token = document.querySelector('#tokenPoly');
                token.parentNode.removeChild(token);

                poly.appendChild(selectorTok);


            }

            el.sceneEl.appendChild(poly);
            //Removing the menu - Temporary: menuButton should change to close menu
            el.parentNode.parentNode.removeChild(el.parentNode);

        });

    }
});

AFRAME.registerComponent('texture-changer', {
    schema:{    },

    multiple: true,

    init: function () {
        let el = this.el;
        let addEventListener = el.addEventListener('click', (e) => {
            let poly = document.querySelector("#tokenPoly").parentNode;
            poly.setAttribute('material', e.target.getAttribute('material'));
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

        let addEventListener = el.addEventListener('click', (e) => {

            let menu = document.createElement('a-entity');
            menu.setAttribute('geometry', "primitive: plane");
            menu.setAttribute('id', "textureSelector");
            menu.setAttribute('position', "0 3 -3");
            menu.setAttribute('scale', "2.5 1 0.5");
            menu.setAttribute('material', "color: grey");

            //Including options in the menu
            let options = data.options;
            for (let option of options){
                            
                let textureOpt = document.querySelector("#"+option).src;
                let optButton = document.createElement('a-entity');
                console.log(textureOpt);
                optButton.setAttribute('geometry', "primitive: plane");
                optButton.setAttribute('id', "pickTexture"+option);
                optButton.setAttribute('position', ((options.indexOf(option)*0.3)-0.3)+" 0 0.01");
                optButton.setAttribute('scale', "0.2 0.3 0.1");
                optButton.setAttribute('material', 'src:'+textureOpt);
                optButton.setAttribute('texture-changer', "");
                menu.appendChild(optButton);
            }

            el.sceneEl.appendChild(menu);
        });

    }
});