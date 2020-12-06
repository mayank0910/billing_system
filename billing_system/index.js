const electron = require('electron');
const url = require('url');
const path = require('path');

const {app , BrowserWindow,Menu} = electron;

let mainWindow;
let addWindow;

//SET ENV
process.env.NODE_ENV = 'production';


//Listen for the app to be reADY
app.on('ready',function(){
	mainWindow = new BrowserWindow({});
	//var exec = require('child_process').exec, child;
/*child = exec('java -jar C:\\Users\\hp\\Documents\\billing_system\\demo.jar "Jar is invoked by Node js"',
  function (error, stdout, stderr){
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if(error !== null)
    {
      console.log('exec error: ' + error);
    }
		});*/

mainWindow.loadURL(url.format({
	pathname: path.join(__dirname,'index.html'),
	protocol:'file:',
	slashes:true
  }));
  
  //Quit app when closed
  mainWindow.on('closed',function(){
    app.quit();
  })
///Build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
//Insert the menu
Menu.setApplicationMenu(mainMenu);

});

//Handle create addWindow()
function createAddWindow(){
  addWindow = new BrowserWindow({
    width:300,
    height:200,
    title:'Add shopping list Item'
  });
addWindow.loadURL(url.format({
	pathname: path.join(__dirname,'addWindow.html'),
	protocol:'file:',
	slashes:true
  }));
  //Garbage collection handle
  addWindow.on('close',function(){
addWindow = null;
  });
}

//Create menu template
const mainMenuTemplate = [
  {
    label:'File',
    submenu:[
      {
        label: 'Add Item',
        click(){
          createAddWindow();
        }
      },
      {
        label: 'Clear items'
      },
      {
        label:'Quit',
        
        click(){
          app.quit();
        }
      }
    ]
  }
];

if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu :[
      {
        label: 'Toggle DevTools',
        click(item,focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}



