
var lays = app.activeDocument.layers;

for(var i=0; i<lays.length; i++)
{
    lays[i].adjustBrightnessContrast(5,0.1);
}