AFRAME.registerComponent('option-select', {
    schema:{ },

    multiple: true,

    init: function () {
        let el = this.el;

        let addEventListener = el.addEventListener('click', (e) => {

            let optDisplay = document.querySelector("#opt");
            optDisplay.setAttribute('geometry', "primitive: "+e.target.id);
            optDisplay.setAttribute('material', e.target.getAttribute('material'));
            optDisplay.setAttribute('scale', "0.3 0.3 0.3");
            optDisplay.setAttribute('animation', "property: rotation; from: 0 90 0 ;to: 360 450 0; loop: true; dur: 3000;");

            //Removing the menu
            el.parentNode.parentNode.removeChild(el.parentNode);
        });

    }
});


AFRAME.registerComponent('menu-loader', {
    schema:{
        options: {default: ["box", "octahedron", "icosahedron"]}
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        let addEventListener = el.addEventListener('click', (e) => {

            //Delete if polygon displayed
            let polyDisplayed = document.querySelector("#polygon");
            if (polyDisplayed){
                polyDisplayed.parentNode.removeChild(polyDisplayed);
            }

            let menu = document.createElement('a-entity');
            menu.setAttribute('geometry', "primitive: plane");
            menu.setAttribute('position', "1 2.25 -3");
            menu.setAttribute('scale', "1.5 0.5 0.5");
            menu.setAttribute('material', "color: grey");

            //Including options in the menu
            let polyOpts = data.options;
            for (let option of polyOpts){
                let optButton = document.createElement('a-entity');
                optButton.setAttribute('geometry', "primitive: "+option);
                optButton.setAttribute('id', option);
                optButton.setAttribute('option-select',option);
                optButton.setAttribute('position', ((polyOpts.indexOf(option)*0.3)-0.3)+" 0 0.1");
                optButton.setAttribute('scale', "0.1 0.3 0.1");
                optButton.setAttribute('material', "color: red");
                optButton.setAttribute('animation', "property: rotation; from: 90 90 0 ;to: 450 450 0; loop: true; dur: 3000;");
                menu.appendChild(optButton);
            }

            el.sceneEl.appendChild(menu);
        });

    }
});


AFRAME.registerComponent('polygenerator', {
    schema:{},

    init: function () {
        let el = this.el;

        el.addEventListener('click', (e) => {
            let selection = document.querySelector("#opt");
            let poly = document.createElement('a-entity');
            poly.setAttribute('id', "polygon");
            poly.setAttribute('geometry', selection.getAttribute('geometry'));
            poly.setAttribute('position', "1 1.25 -3");
            poly.setAttribute('material', selection.getAttribute('material'));
            el.sceneEl.appendChild(poly);
        });

    }
});

AFRAME.registerComponent('color-changer', {
    schema:{},

    multiple: true,

    init: function () {
        let el = this.el;
        let addEventListener = el.addEventListener('click', (e) => {
            let poly = document.querySelector("#polygon");
            poly.setAttribute('material', e.target.getAttribute('material'));
        });
    }
});