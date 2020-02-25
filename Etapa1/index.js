AFRAME.registerComponent('polygenerator', {
    schema:{},

    init: function () {
        let data = this.data;
        let el = this.el;

        el.addEventListener('click', (e) => {
            let poly = document.createElement('a-entity');
            poly.setAttribute('geometry', "primitive: box");
            poly.setAttribute('position', "1 1.25 -3");
            poly.setAttribute('scale', "0.5 0.5 0.5");
            poly.setAttribute('material', "color: blue");
            el.sceneEl.appendChild(poly);
        });

    }
});