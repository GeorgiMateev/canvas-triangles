function canvasStorage() {
    var storageKey = 'canvases';

    function serialize(canvas) {
        return canvas.toDataURL();
    };

    function deserialize(data, canvas) {
        var img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d").drawImage(img, 0, 0);
        };

        img.src = data;
    };

    function getCanvases() {
        return JSON.parse(localStorage.getItem(storageKey));
    };

    function setCanvases(canvases) {
        localStorage.setItem(storageKey, JSON.stringify(canvases));
    };

    function getCanvas(name) {
        return getCanvases()[name];
    };

    function saveCanvas(key, canvas) {
        var canvases = getCanvases();

        if (!canvases) {
            canvases = {};
        }

        var old = canvases[key];
        if(old){
            alert('There is already a canvas with name ' + key);
            return;
        }

        var data = serialize(canvas);
        canvases[key] = data;

        setCanvases(canvases);
    };

    function loadCanvas(name, canvas){
        var source = getCanvas(name);
        deserialize(source, canvas);
    };

    function getNames() {
        var canvases = getCanvases();
        var names = [];
        for (var prop in canvases) {
            if (canvases.hasOwnProperty(prop)) {
                names.push(prop);
            }
        }

        return names;
    };

    //Public interface
    return {
        saveCanvas: saveCanvas,
        loadCanvas: loadCanvas,
        getNames: getNames
    };
};