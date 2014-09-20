function app () {
    function getClickCoordinates(e){
        var x;
        var y;
        if (e.pageX || e.pageY) { 
          x = e.pageX;
          y = e.pageY;
        }
        else { 
          x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
          y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
        } 
        x -= e.target.offsetLeft;
        y -= e.target.offsetTop;

        return { x: x, y: y };
    };

    function drawTriangle(coordinates, color, context){
        context.fillStyle = color;
        context.strokeStyle = color;

        context.beginPath();
        var start = coordinates.pop();
        context.moveTo(start.x, start.y);

        var peak = coordinates.pop();
        context.lineTo(peak.x, peak.y);

        var peak2 = coordinates.pop();
        context.lineTo(peak2.x, peak2.y);

        context.closePath();
        context.stroke();
        context.fill();
    };

    function loadSavedCanvases(select) {
        var names = canvasStorage().getNames();
        for (var i = 0, l = names.length; i < l; i++) {
            var option = document.createElement("option");
            option.text = names[i];
            option.value = names[i];
            select.add(option);
        }
    };

    var clickCoordinates = [];

    var canvas = document.getElementById('tr-canvas');
    var context = canvas.getContext("2d");

    var colorPicker = document.getElementById('color-picker');
    var clearButton = document.getElementById('clear-btn');
    var saveButton = document.getElementById('save-btn');
    var loadButton = document.getElementById('load-btn');
    var canvasesSelect = document.getElementById('canvases');

    loadSavedCanvases(canvasesSelect);

    clearButton.onclick = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    canvas.onclick = function (event) {
        event = event || window.event;

        var coordinates = getClickCoordinates(event);
        clickCoordinates.push(coordinates);

        if (clickCoordinates.length === 3) {
            var color = colorPicker.value;
            drawTriangle(clickCoordinates, color, context);
        }
    };

    saveButton.onclick = function (event) {
        var name = prompt("Enter name for this canvas");
        canvasStorage().saveCanvas(name, canvas);

        var option = document.createElement("option");
        option.text = name;
        option.value = name;

        canvasesSelect.add(option);
    };

    loadButton.onclick = function (event) {
        var name = canvasesSelect.value;
        canvasStorage().loadCanvas(name, canvas);
    };
};