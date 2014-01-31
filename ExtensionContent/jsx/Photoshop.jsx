// ------------------------------------------------------------------------------------ ICONS
$._ext_exportIconsIOS={
    run : function() {
            #target Photoshop

            //Initialize Photoshop & choose what file is processed via openDialog
            app.bringToFront();
            var filepath = File.openDialog ();
            var fileRef = File(filepath);
            var docRef = app.open(fileRef);


            //required Variables
            var i=0;
            var sampledColors = new Array();
            var layerCompStack = new Array();
            var compNames = new Array();
            var activeDoc = app.activeDocument;

            var docHeight = app.activeDocument.height;
            var docWidth = app.activeDocument.width;


            //define a function that takes care of exporting found colors automatically;
            var getIconsIOS = function(){
                
                    //initialize layercomps
                    var index=0;
                    var comps = app.activeDocument.layerComps.length;
                    var layerCompRef;
                    var layerSetRef = activeDoc.layerSets.getByName("icons");
                    
                    
                    //create the export folders
                    var exportIOSIconsFolder = new Folder(Folder.desktop + "/export/iOS/icons/");
                    if(!exportIOSIconsFolder.exists) exportIOSIconsFolder.create();
                    
                    // add all comps you found into an array to be used as indexes later.
                    for(i=0;i<comps;i++){
                        layerCompStack[i] = i;
                    };
                
                    //use the indexes found to get all layercomp names and store them in a new array.
                    for(index = 0;index <layerCompStack.length;index++){
                       compNames[layerCompStack[index]] = app.activeDocument.layerComps[layerCompStack[index]].name;
                    };
                    
                    // do the magic & start exporting stuff
                    for (var key in compNames){
                        
                        var val = compNames[key];
                        var layerCompRef = app.activeDocument.layerComps.getByName(val);
                        var normalizedReference = layerCompRef.toString();
                        var child  = layerSetRef.layers.getByName(val);
                        

                        //apply the layer comp
                        layerCompRef.apply();
                        
                        //after applying the layercomp, copy all layers merged
                        
                        child.copy(true);
                        
                        //create a new document with the same size as the source and paste the copied information into it.
                        var newDoc = app.documents.add(docWidth,docHeight,72,normalizedReference.substring(11,normalizedReference.length-1),NewDocumentMode.RGB,DocumentFill.TRANSPARENT);
                        
                        //paste the previously copied-merged layer into the new file.
                        newDoc.paste();
                        
                        //save each file into the appropriate folder, then close the tempfile.
                        app.activeDocument.exportDocument(Folder("C:/Users/sjurcut/Desktop/export/iOS/icons/"),ExportType.SAVEFORWEB);
                        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                        
                        //rinse & repeat.
                    };
                    
                    //Save the document and close it. We're being tidy.
                    app.activeDocument.save();
                    app.activeDocument.close();
                    
                    //alert the user that the export process is completed!
                    return alert ("Exported all "+layerCompStack.length+" files! Give yourself a pat on the back for a job well done!", "Export");
                };
            getIconsIOS ();
    },
};
// ------------------------------------------------------------------------------------ BACKGROUNDS
$._ext_exportBackgroundsIOS={
    run : function() {
            #target Photoshop

            //Initialize Photoshop & choose what file is processed via openDialog
            app.bringToFront();
            var filepath = File.openDialog ();
            var fileRef = File(filepath);
            var docRef = app.open(fileRef);

            //required Variables
            var i=0;
            var sampledColors = new Array();
            var layerCompStack = new Array();
            var compNames = new Array();

            var strokeColorSampler = app.activeDocument.colorSamplers[0];
            var fillColorSampler = app.activeDocument.colorSamplers[1];

            //define a function that takes care of exporting found colors automatically;
            var getBackgroundsIOS = function(){
                
                    //initialize layercomps
                    var index=0;
                    var comps = app.activeDocument.layerComps.length;
                    var layerCompRef;
                    
                    //create the export folders
                    var exportiOSFolder = new Folder(Folder.desktop + "/export/iOS/");
                    if(!exportiOSFolder.exists) exportiOSFolder.create();
                    
                    // add all comps you found into an array to be used as indexes later.
                    for(i=0;i<comps;i++){
                        layerCompStack[i] = i;
                    };
                
                    //use the indexes found to get all layercomp names and store them in a new array.
                    for(index = 0;index <layerCompStack.length;index++){
                       compNames[layerCompStack[index]] = app.activeDocument.layerComps[layerCompStack[index]].name;
                    };
                
                    //iterate through all layercomps and for each apply the the comp, create a new object with set properties and assign some color values to those properties
                    //then, export the layercomps into a text file that has a css-similar structure, based on nodes/trees.
                    
                    //create the export file.
                    var exportiOS = new File(Folder.desktop + "/export/iOS/" + "backgrounds" + ".node");
                    
                    //clear the UI node file each time before writing to it.
                    exportiOS.open("w", "TEXT");
                    exportiOS. write("");
                    exportiOS.close();
                    
                    // do the magic & start exporting stuff
                    for (var key in compNames){
                        
                        var val = compNames[key];
                        var layerCompRef = app.activeDocument.layerComps.getByName(val);
                        
                        //apply the layer comp
                        layerCompRef.apply();
                        
                        // _________________________________STROKE COLOR STUFF______________________________________________
                        // Each channel is saved separately for easy access.
                        var getStrokeColorR = function(){
                            strokeColorR = strokeColorSampler.color.rgb.red;
                            return Math.ceil(strokeColorR);
                        };
                    
                        var getStrokeColorG = function(){
                            strokeColorG = strokeColorSampler.color.rgb.green;
                            return Math.ceil(strokeColorG);
                        };
                    
                        var getStrokeColorB = function(){
                           strokeColorB = strokeColorSampler.color.rgb.blue;
                           return Math.ceil(strokeColorB);
                        };
                        
                        //Same function, but this one returns the color in #hexa form. 
                        var getStrokeColorHex = function(){
                            strokeColor = strokeColorSampler.color.rgb.hexValue;
                            return "#"+strokeColor;
                        };
                    
                        // Utility function that stores all the colors in a nice and tidy array that can the be used.
                        var stroke_makeRGB = function(red,green,blue){
                            var strokeRGBArray = new Array();
                            strokeRGBArray[0] = red;
                            strokeRGBArray[1] = green;
                            strokeRGBArray[2] = blue;
                            return strokeRGBArray;
                        };
                    
                        // _________________________________FILL COLOR STUFF______________________________________________
                        // Each channel is saved separately for easy access.
                        var getFillColorR = function(){
                            fillColorR = fillColorSampler.color.rgb.red;
                            return Math.ceil(fillColorR);
                        };
                    
                        var getFillColorG = function(){
                            fillColorG = fillColorSampler.color.rgb.green;
                            return Math.ceil(fillColorG);
                        };
                    
                        var getFillColorB = function(){
                            fillColorB = fillColorSampler.color.rgb.blue;
                            return Math.ceil(fillColorB);
                        };
                    
                        //Same function, but this one returns the color in #hexa form.
                         var getFillColorHex = function(){
                            fillColor = fillColorSampler.color.rgb.hexValue;
                            return "#"+fillColor;
                        };
                    
                        // Utility function that stores all the colors in a nice and tidy array that can the be used.
                         var fill_makeRGB = function(red,green,blue){
                            var fillRGBArray = new Array();
                            fillRGBArray[0] = red;
                            fillRGBArray[1] = green;
                            fillRGBArray[2] = blue;
                            return fillRGBArray;
                        };
                    
                        // _________________________________GENERAL STUFF______________________________________________
                        //create an object based on the properties found that uses the names stored in the compNames array
                        val = {
                           name: val,
                           stroke_color: stroke_makeRGB(getStrokeColorR(),getStrokeColorG(),getStrokeColorB()),
                           fill_color: fill_makeRGB(getFillColorR(), getFillColorG(), getFillColorB())
                        };

                        //export all the information into a file called ui.node
                        exportiOS.open("a", "TEXT");
                        exportiOS.writeln("<nodeName: "+val.name+"; "+"strokeColor: "+val.stroke_color+"; "+"fillColor: "+val.fill_color+";"+">");
                        exportiOS.writeln("");
                        exportiOS.close();
                        
                    };
                    
                    //Save the document and close it. We're being tidy.
                    app.activeDocument.save();
                    app.activeDocument.close();
                    
                    //alert the user that the export process is completed!
                    return alert ("Exported all "+layerCompStack.length+" resources! Give yourself a pat on the back for a job well done!", "Export");
                };
            getBackgroundsIOS();
    },
};
// ------------------------------------------------------------------------------------ BACKGROUNDS
$._ext_exportButtonsIOS={
    run : function() {
            #target Photoshop

            //Initialize Photoshop & choose what file is processed via openDialog
            app.bringToFront();
            var filepath = File.openDialog ();
            var fileRef = File(filepath);
            var docRef = app.open(fileRef);

            //required Variables
            var i=0;
            var sampledColors = new Array();
            var layerCompStack = new Array();
            var compNames = new Array();

            var strokeColorSampler = app.activeDocument.colorSamplers[0];
            var fillColorSampler = app.activeDocument.colorSamplers[1];

            //define a function that takes care of exporting found colors automatically;
            var getButtonsIOS = function(){
                
                    //initialize layercomps
                    var index=0;
                    var comps = app.activeDocument.layerComps.length;
                    var layerCompRef;
                    
                    //create the export folders
                    var exportiOSFolder = new Folder(Folder.desktop + "/export/iOS/");
                    if(!exportiOSFolder.exists) exportiOSFolder.create();
                    
                    // add all comps you found into an array to be used as indexes later.
                    for(i=0;i<comps;i++){
                        layerCompStack[i] = i;
                    };
                
                    //use the indexes found to get all layercomp names and store them in a new array.
                    for(index = 0;index <layerCompStack.length;index++){
                       compNames[layerCompStack[index]] = app.activeDocument.layerComps[layerCompStack[index]].name;
                    };
                
                    //iterate through all layercomps and for each apply the the comp, create a new object with set properties and assign some color values to those properties
                    //then, export the layercomps into a text file that has a css-similar structure, based on nodes/trees.
                    
                    //create the export file.
                    var exportiOS = new File(Folder.desktop + "/export/iOS/" + "backgrounds" + ".node");
                    
                    //clear the UI node file each time before writing to it.
                    exportiOS.open("w", "TEXT");
                    exportiOS. write("");
                    exportiOS.close();
                    
                    // do the magic & start exporting stuff
                    for (var key in compNames){
                        
                        var val = compNames[key];
                        var layerCompRef = app.activeDocument.layerComps.getByName(val);
                        
                        //apply the layer comp
                        layerCompRef.apply();
                        
                        // _________________________________STROKE COLOR STUFF______________________________________________
                        // Each channel is saved separately for easy access.
                        var getStrokeColorR = function(){
                            strokeColorR = strokeColorSampler.color.rgb.red;
                            return Math.ceil(strokeColorR);
                        };
                    
                        var getStrokeColorG = function(){
                            strokeColorG = strokeColorSampler.color.rgb.green;
                            return Math.ceil(strokeColorG);
                        };
                    
                        var getStrokeColorB = function(){
                           strokeColorB = strokeColorSampler.color.rgb.blue;
                           return Math.ceil(strokeColorB);
                        };
                        
                        //Same function, but this one returns the color in #hexa form. 
                        var getStrokeColorHex = function(){
                            strokeColor = strokeColorSampler.color.rgb.hexValue;
                            return "#"+strokeColor;
                        };
                    
                        // Utility function that stores all the colors in a nice and tidy array that can the be used.
                        var stroke_makeRGB = function(red,green,blue){
                            var strokeRGBArray = new Array();
                            strokeRGBArray[0] = red;
                            strokeRGBArray[1] = green;
                            strokeRGBArray[2] = blue;
                            return strokeRGBArray;
                        };
                    
                        // _________________________________FILL COLOR STUFF______________________________________________
                        // Each channel is saved separately for easy access.
                        var getFillColorR = function(){
                            fillColorR = fillColorSampler.color.rgb.red;
                            return Math.ceil(fillColorR);
                        };
                    
                        var getFillColorG = function(){
                            fillColorG = fillColorSampler.color.rgb.green;
                            return Math.ceil(fillColorG);
                        };
                    
                        var getFillColorB = function(){
                            fillColorB = fillColorSampler.color.rgb.blue;
                            return Math.ceil(fillColorB);
                        };
                    
                        //Same function, but this one returns the color in #hexa form.
                         var getFillColorHex = function(){
                            fillColor = fillColorSampler.color.rgb.hexValue;
                            return "#"+fillColor;
                        };
                    
                        // Utility function that stores all the colors in a nice and tidy array that can the be used.
                         var fill_makeRGB = function(red,green,blue){
                            var fillRGBArray = new Array();
                            fillRGBArray[0] = red;
                            fillRGBArray[1] = green;
                            fillRGBArray[2] = blue;
                            return fillRGBArray;
                        };
                    
                        // _________________________________GENERAL STUFF______________________________________________
                        //create an object based on the properties found that uses the names stored in the compNames array
                        val = {
                           name: val,
                           stroke_color: stroke_makeRGB(getStrokeColorR(),getStrokeColorG(),getStrokeColorB()),
                           fill_color: fill_makeRGB(getFillColorR(), getFillColorG(), getFillColorB())
                        };

                        //export all the information into a file called ui.node
                        exportiOS.open("a", "TEXT");
                        exportiOS.writeln("<nodeName: "+val.name+"; "+"strokeColor: "+val.stroke_color+"; "+"fillColor: "+val.fill_color+";"+">");
                        exportiOS.writeln("");
                        exportiOS.close();
                        
                    };
                    
                    //Save the document and close it. We're being tidy.
                    app.activeDocument.save();
                    app.activeDocument.close();
                    
                    //alert the user that the export process is completed!
                    return alert ("Exported all "+layerCompStack.length+" resources! Give yourself a pat on the back for a job well done!", "Export");
                };
            getButtonsIOS();
    },
};

$._ext_exportIconsAndroid={
    run : function() {
            #target Photoshop

            //Initialize Photoshop & choose what file is processed via openDialog
            app.bringToFront();
            var filepath = File.openDialog ();
            var fileRef = File(filepath);
            var docRef = app.open(fileRef);


            //required Variables
            var i=0;
            var sampledColors = new Array();
            var layerCompStack = new Array();
            var compNames = new Array();
            var activeDoc = app.activeDocument;

            var docHeight = app.activeDocument.height;
            var docWidth = app.activeDocument.width;


            //define a function that takes care of exporting found colors automatically;
            var getIconsAndroid = function(){
                
                    //initialize layercomps
                    var index=0;
                    var comps = app.activeDocument.layerComps.length;
                    var layerCompRef;
                    var layerSetRef = activeDoc.layerSets.getByName("icons");
                    
                    
                    //create the export folders
                    var exportAndroidIconsFolder = new Folder(Folder.desktop + "/export/Android/icons/");
                    if(!exportAndroidIconsFolder.exists) exportAndroidIconsFolder.create();
                    
                    // add all comps you found into an array to be used as indexes later.
                    for(i=0;i<comps;i++){
                        layerCompStack[i] = i;
                    };
                
                    //use the indexes found to get all layercomp names and store them in a new array.
                    for(index = 0;index <layerCompStack.length;index++){
                       compNames[layerCompStack[index]] = app.activeDocument.layerComps[layerCompStack[index]].name;
                    };
                    
                    // do the magic & start exporting stuff
                    for (var key in compNames){
                        
                        var val = compNames[key];
                        var layerCompRef = app.activeDocument.layerComps.getByName(val);
                        var normalizedReference = layerCompRef.toString();
                        var child  = layerSetRef.layers.getByName(val);
                        

                        //apply the layer comp
                        layerCompRef.apply();
                        
                        //after applying the layercomp, copy all layers merged
                        
                        child.copy(true);
                        
                        //create a new document with the same size as the source and paste the copied information into it.
                        var newDoc = app.documents.add(docWidth,docHeight,72,normalizedReference.substring(11,normalizedReference.length-1),NewDocumentMode.RGB,DocumentFill.TRANSPARENT);
                        
                        //paste the previously copied-merged layer into the new file.
                        newDoc.paste();
                        
                        //save each file into the appropriate folder, then close the tempfile.
                        app.activeDocument.exportDocument(Folder("C:/Users/sjurcut/Desktop/export/Android/icons/"),ExportType.SAVEFORWEB);
                        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                        
                        //rinse & repeat.
                    };
                    
                    //Save the document and close it. We're being tidy.
                    app.activeDocument.save();
                    app.activeDocument.close();
                    
                    //alert the user that the export process is completed!
                    return alert ("Exported all "+layerCompStack.length+" files! Give yourself a pat on the back for a job well done!", "Export");
                };
            getIconsAndroid ();
    },
};

$._ext_exportBackgroundsAndroid={
    run : function() {
            #target Photoshop

            //Initialize Photoshop & choose what file is processed via openDialog
            app.bringToFront();
            var filepath = File.openDialog ();
            var fileRef = File(filepath);
            var docRef = app.open(fileRef);


            //required Variables
            var i=0;
            var sampledColors = new Array();
            var layerCompStack = new Array();
            var compNames = new Array();
            var activeDoc = app.activeDocument;

            var docHeight = app.activeDocument.height;
            var docWidth = app.activeDocument.width;


            //define a function that takes care of exporting found colors automatically;
            var getBackgroundsAndroid = function(){
                
                    //initialize layercomps
                    var index=0;
                    var comps = app.activeDocument.layerComps.length;
                    var layerCompRef;
                    var layerSetRef = activeDoc.layerSets.getByName("base");
                    var childSet  = layerSetRef.layers.getByName("base");
                    
                    //create the export folders
                    var exportAndroidFolder = new Folder(Folder.desktop + "/export/Android/");
                    if(!exportAndroidFolder.exists) exportAndroidFolder.create();
                    
                    // add all comps you found into an array to be used as indexes later.
                    for(i=0;i<comps;i++){
                        layerCompStack[i] = i;
                    };
                
                    //use the indexes found to get all layercomp names and store them in a new array.
                    for(index = 0;index <layerCompStack.length;index++){
                       compNames[layerCompStack[index]] = app.activeDocument.layerComps[layerCompStack[index]].name;
                    };
                    
                    // do the magic & start exporting stuff
                    for (var key in compNames){
                        
                        var val = compNames[key];
                        var layerCompRef = app.activeDocument.layerComps.getByName(val);
                        var normalizedReference = layerCompRef.toString();
                        

                        //apply the layer comp
                        layerCompRef.apply();
                        
                        //after applying the layercomp, copy all layers merged
                        childSet.copy(true);
                        
                        //create a new document with the same size as the source and paste the copied information into it.
                        var newDoc = app.documents.add(docWidth,docHeight,72,normalizedReference.substring(11,normalizedReference.length-1),NewDocumentMode.RGB,DocumentFill.TRANSPARENT);
                        
                        //paste the previously copied-merged layer into the new file.
                        newDoc.paste();
                        
                        //save each file into the appropriate folder, then close the tempfile.
                        app.activeDocument.exportDocument(Folder("C:/Users/sjurcut/Desktop/export/Android/"),ExportType.SAVEFORWEB);
                        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                        
                        //rinse & repeat.
                    };
                    
                    //Save the document and close it. We're being tidy.
                    app.activeDocument.save();
                    app.activeDocument.close();
                    
                    //alert the user that the export process is completed!
                    return alert ("Exported all "+layerCompStack.length+" files! Give yourself a pat on the back for a job well done!", "Export");
                };
            getBackgroundsAndroid ();
    },
};