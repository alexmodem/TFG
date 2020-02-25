/*AFRAME.registerComponent('option-select', {
    schema:{ },

    init: function () {
        let data = this.data;
        let el = this.el;

        let addEventListener = el.addEventListener('click', (e) => {

        });

    }
}); */


AFRAME.registerComponent('menu-loader', {
    schema:{
        options: {default: ["box", "cone", "cylinder"]}
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        let addEventListener = el.addEventListener('click', (e) => {
            let menu = document.createElement('a-entity');
            menu.setAttribute('geometry', "primitive: plane");
            menu.setAttribute('position', "1 2.25 -3");
            menu.setAttribute('scale', "1.5 0.5 0.5");
            menu.setAttribute('material', "color: grey");

            //Including options in the menu
            let polyOpts = data.options;
            for (let option of polyOpts){
                console.log(polyOpts.indexOf(option)*0.2);
                let optButton = document.createElement('a-entity');
                optButton.setAttribute('geometry', "primitive: "+option);
                optButton.setAttribute('position', ((polyOpts.indexOf(option)*0.3)-0.3)+" 0 0.1");
                optButton.setAttribute('scale', "0.1 0.3 0.1");
                optButton.setAttribute('material', "color: red");
                menu.appendChild(optButton);
            }

            el.sceneEl.appendChild(menu);
        });

    }
});





AFRAME.registerComponent('polygenerator', {
    schema:{},

    init: function () {
        let data = this.data;
        let el = this.el;

        el.addEventListener('click', (e) => {
            let poly = document.createElement('a-entity');
            poly.setAttribute('geometry', "primitive: cone");
            poly.setAttribute('position', "1 1.25 -3");
            poly.setAttribute('scale', "0.5 0.5 0.5");
            poly.setAttribute('material', "color: blue");
            el.sceneEl.appendChild(poly);
        });

    }
});