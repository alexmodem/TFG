AFRAME.registerComponent('rotator', {
    schema: {},

    init: function () {
        let el = this.el;
        let rotating = false;
        let offsetX = 0;
        let offsetY = 0;

        el.addEventListener('dragstart', (e) => {
            offsetX= document.querySelector('#cameraUser').getAttribute('raycaster').direction.x;
            offsetY= document.querySelector('#cameraUser').getAttribute('raycaster').direction.y;
            rotating=true;
            document.addEventListener('mousemove', (e) =>{
            if (rotating){
                    let mouseX = document.querySelector('#cameraUser').getAttribute('raycaster').direction.x;
                    let mouseY = document.querySelector('#cameraUser').getAttribute('raycaster').direction.y;

                    let aux_X = mouseX - offsetX;
                    let aux_Y = mouseY - offsetY;

                    el.parentNode.object3D.rotateX(aux_Y*10);
                    el.parentNode.object3D.rotateY(aux_X*10);
                    offsetX = mouseX;
                    offsetY = mouseY;

                }
            })

        });

        el.addEventListener('dragend', (e) => {
            rotating=false;
        });

    }
});


AFRAME.registerComponent('set-move', {
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
            let parent = token.parentNode;
            parent.setAttribute('grabbable',"");
            parent.removeChild(token);

            console.log("ES GRABB");
            parent.appendChild(selectorTok);
        });

    }
});

AFRAME.registerComponent('set-rotate', {
    init: function () {
        let el = this.el;

        el.addEventListener('click', (e) => {
            let selectorTok = document.createElement('a-entity');
            selectorTok.setAttribute('id', "tokenPoly");
            selectorTok.setAttribute('geometry', "primitive: sphere");
            selectorTok.setAttribute('position', "0 1.2 0");
            selectorTok.setAttribute('scale', "0.1 0.1 0.1");
            selectorTok.setAttribute('material', "color:#47f41c");
            selectorTok.setAttribute('rotator', "");


            let token = document.querySelector('#tokenPoly');
            let parent = token.parentNode;
            token.parentNode.removeChild(token);
            parent.appendChild(selectorTok);

            //parent.removeAttribute('grabbable');

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
            let polyListLen =  document.querySelectorAll('.polygon').length;
            let polyID = 0;

            if (polyListLen === 0) {
                poly.setAttribute('id', "polygon0");

                //EDITOR MENU
                let menu = document.createElement('a-box');
                menu.setAttribute("id", "remoteMaterials");
                menu.setAttribute("scale", "0.3 0.5 0.05");
                menu.setAttribute("position", "0.5 -0.5 -1");
                menu.setAttribute("rotation", "-45 -15 0");
                menu.setAttribute("color", "yellow");
                menu.setAttribute("opacity", "0.3");

                let colorsButton = document.createElement('a-box');
                colorsButton.setAttribute("id", "menuColors");
                colorsButton.setAttribute("scale", "0.7 0.15 0.15");
                colorsButton.setAttribute("position", "0 0.3 0.6");
                colorsButton.setAttribute("menu-colors", "");
                colorsButton.setAttribute("color", "red");
                colorsButton.setAttribute("opacity", "0.5");
                let textColors = document.createElement('a-text');
                textColors.setAttribute('value', "Colors");
                textColors.setAttribute('align', "center");
                textColors.setAttribute('position', "0 0 0.61");
                colorsButton.appendChild(textColors);

                let texturesButton = document.createElement('a-box');
                texturesButton.setAttribute("id", "menuTextures");
                texturesButton.setAttribute("scale", "0.7 0.15 0.15");
                texturesButton.setAttribute("position", "0 0.1 0.6");
                texturesButton.setAttribute("menu-textures", "");
                texturesButton.setAttribute("color", "red");
                texturesButton.setAttribute("opacity", "0.5");
                let textTextures = document.createElement('a-text');
                textTextures.setAttribute('value', "Textures");
                textTextures.setAttribute('align', "center");
                textTextures.setAttribute('position', "0 0 0.61");
                texturesButton.appendChild(textTextures);

                //Move button
                let moveButton = document.createElement('a-box');
                moveButton.setAttribute("id", "moveButton");
                moveButton.setAttribute("scale", "0.7 0.15 0.15");
                moveButton.setAttribute("position", "0 -0.1 0.6");
                moveButton.setAttribute("color", "grey");
                moveButton.setAttribute('set-move', "");
                moveButton.setAttribute("opacity", "0.5");
                let textMove = document.createElement('a-text');
                textMove.setAttribute('value', "Move");
                textMove.setAttribute('align', "center");
                textMove.setAttribute('position', "0 0 0.61");
                moveButton.appendChild(textMove);

                //Rotate button
                let rotateButton = document.createElement('a-box');
                rotateButton.setAttribute("id", "rotateButton");
                rotateButton.setAttribute("scale", "0.7 0.15 0.15");
                rotateButton.setAttribute("position", "0 -0.3 0.6");
                rotateButton.setAttribute("color", "grey");
                rotateButton.setAttribute("set-rotate", "");
                rotateButton.setAttribute("opacity", "0.5");
                let textRotate = document.createElement('a-text');
                textRotate.setAttribute('value', "Rotate");
                textRotate.setAttribute('align', "center");
                textRotate.setAttribute('position', "0 0 0.61");
                rotateButton.appendChild(textRotate);

                let camera = document.querySelector("#cameraUser");
                menu.appendChild(colorsButton);
                menu.appendChild(texturesButton);
                menu.appendChild(moveButton);
                menu.appendChild(rotateButton);
                camera.appendChild(menu);



            } else {

                polyID = polyListLen;
                poly.setAttribute('id', "polygon"+polyID);
            }


            //Create poly depending on the last index
            //Print depending of position
            poly.setAttribute('geometry', el.getAttribute('geometry'));
            poly.setAttribute('class', 'polygon');
            poly.setAttribute('scale', '0.5 0.5 0.5');
            poly.setAttribute('position', (polyID-4)+" 1 -3");
            poly.setAttribute('material', el.getAttribute('material'));
            poly.setAttribute('grabbable',"");
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

        });

    }
});
