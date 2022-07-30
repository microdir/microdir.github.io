/* VERSÃO 1.0.0 */
/* LOAD PAGE STYLES AND SCRIPTS AND VERSION - DEVELOPMENT MODE */

const development = true;
const version = "1.0";

function tempo(){
    var d = new Date();
    return d.getTime();
}

function addcss(css){
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('link');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('href', css+'?v='+(development ? tempo() : version));
    head.appendChild(s);
} 

function addjs(js, sync=true, index=0){
    var head = document.getElementsByTagName('head')[0];
    js = js.split(",");
    if(sync){
        js.forEach((file)=>{
            var s = document.createElement('script');
            s.setAttribute('src', file+'?v='+(development ? tempo() : version));
        });
    } else {
        var s = document.createElement('script');
        s.setAttribute('src', js[index]+'?v='+(development ? tempo() : version));
        
        if(index < js.length-1){
            s.setAttribute('onload', "addjs('"+js+"',false,"+(++index)+")");
        }
        head.appendChild(s);
    }
}

addcss('./src/css/style.css');
addcss('./src/css/style-responsive.css');

addjs('./src/js/characteres.js,./src/js/pagecontrollers.js,./src/js/init.js',false);