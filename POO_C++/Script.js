document.body.style.margin = 0;
document.body.style.overflowX = 'hidden';

var aux = "Miau!";

var menPrim = [
               ["Clase si obiecte","Clase_si_obiecte.rar"],
			   ["Controlul accesului","Controlul_accesului.rar"],
			   ["Operatorul de rezolutie","Operatorul_de_rezolutie.rar"],
			   ["Functii inline","Functii_inline.rar"],
			   ["Functii cu param. impliciti","Functii_cu_parametrii_impliciti.rar"],
               ["Supraincarcarea functiilor","Supraincarcarea_functiilor.rar"],
			   ["Constructor, destructor, constructor de copiere","Constructor_destructor_si_constructorul_de_copiere.rar"],
			   ["this","Pointerul_this.rar"],
			   ["Membri statici","Membrii_statici.rar"],
			   ["Specificatorul const","Specificatorul_const.rar"],
			   ["Functiile friend","Functiile_friend.rar"],
			   ["Clasele friend","Clasele_friend.rar"],
			   ["Supraincarcarea operatorilor","Supraincarcarea_operatorilor.rar"],
			   ["Erori","Elemente_de_tratare_a_erorilor.rar"],
			   ["Clasa string","Clasa_string.rar"],
			   ["Mostenirea","Mostenirea.rar"],
			   ["Includerea conditionata","Includerea_conditionata.rar"],
			   ["Polimorfismul","Polimorfismul.rar"]  
			  ];		  
			  
var lastMenuHit = 0;			  
var menuContainer = document.createElement("div");
menuContainer.style.position = "relative";
menuContainer.style.top = 0;
menuContainer.style.left = 0;
menuContainer.style.width = 25 + '%';/*
menuContainer.style.height = window.innerHeight + 'px';
menuContainer.style.overflowY = 'auto';
menuContainer.style.overflowX = 'hidden';*/
menuContainer.style.transition = 'left 0.4s';
menuContainer.onmouseenter = function(){this.style.left = 0 + 'px';document.body.style.overflow = '';contentContainer.style.left = 25 + '%'; contentContainer.style.width = 75 + '%'; }
menuContainer.onmouseleave = function(){this.style.left = -20 + '%';document.body.style.overflow = 'hidden'; contentContainer.style.left = 5 + '%'; contentContainer.style.width = 95 + '%';  console.log("Check");}
document.body.appendChild(menuContainer);

//.red::-webkit-scrollbar 					{ background:transparent;overflow:visible; width:15px; }

var menuItem;
for(var i=0;i<menPrim.length;i++){
	console.log(i);
	menuItem = document.createElement("div");
	menuItem.innerHTML = menPrim[i][0];
	menuItem.style.width = 100 + '%';
	menuItem.style.paddingTop = 15 + 'px';
	menuItem.style.paddingLeft = 15 + 'px';
	menuItem.style.paddingBottom = 15 + 'px';	
	//menuItem.style.height = 30 + 'px';
	menuItem.style.backgroundColor = 'rgb(100,250,130)';
	menuItem.style.fontSize = 20 + 'px';
    menuItem.style.fontFamily = 'Times New Roman';
	menuItem.style.overflow = 'hidden';
	menuItem.style.borderBottom = '1px dotted black';
	/*menuItem.style.whiteSpace = 'nowrap';
	menuItem.style.textOverflow = "ellipsis";*/
	menuItem.onmouseenter = function(){ this.style.backgroundColor = 'rgb(100,150,100)'; this.style.color = 'white';}
	menuItem.onmouseleave = function(){ this.style.backgroundColor = 'rgb(100,250,130)'; this.style.color = 'black';}
	menuItem.onmousedown = function() { 
	                                    elemDetails.innerHTML = 'Click pentru a descarca exemple/teorie  [' + this.innerHTML + ']';
	                                    this.style.backgroundColor = 'white'; 
	                                    this.style.color = 'black'; 
										for(var i=0;i < menPrim.length;i++){
											//console.log("Am comparat : "+menPrim[i][0],this.innerHTML);
										    if(menPrim[i][0] == this.innerHTML)
										    {   lastMenuHit = i;
										        downloadLink.href = menPrim[i][1];
											    actualContent.appendChild(downloadLink);
											    break;
									        }
										}
									  }
	menuItem.onmouseup = function() { this.style.backgroundColor = 'rgb(100,150,100)'; this.style.color = 'white'; }
	menuContainer.appendChild(menuItem);
}	

var contentContainer = document.createElement("div");
var tab1 = document.createElement("div"),tab2 = document.createElement("div"), actualContent = document.createElement("div"),downBtn;

contentContainer.style.position = 'fixed';
contentContainer.style.top = 0;
contentContainer.style.left = 25 + '%';
contentContainer.style.width = 75 + '%';
contentContainer.style.transition = 'left 0.4s,width 0.4s';
contentContainer.style.height = window.innerHeight + 'px';
contentContainer.style.backgroundColor = 'rgb(100,150,100)';
contentContainer.style.zIndex = 2;

tab1.onmouseenter = function(){this.style.backgroundColor = 'rgba(100,250,130,0.5)'; this.style.color = 'black';}
tab1.onmouseleave = function(){this.style.backgroundColor = ''; this.style.color = 'white';}
tab1.onclick = function(){actualContent.innerHTML = menPrim[lastMenuHit][1]; elemDetails.innerHTML = 'Click pentru a descarca exemple/teorie [' + menPrim[lastMenuHit][0] + ']';actualContent.appendChild(elemDetails); actualContent.appendChild(downloadLink);};
tab1.style.position = 'absolute';
tab1.style.top = 10 + '%';
tab1.style.left = 5 + '%';
tab1.style.width = 45 + '%';
tab1.style.paddingTop = 5 + 'px';
tab1.style.paddingBottom = 5 + 'px';
tab1.style.borderTop = '2px dotted rgb(100,250,130)';
tab1.style.borderRight = '2px dotted rgb(100,250,130)';
tab1.style.borderBottom = '2px dotted rgb(100,250,130)';
tab1.style.textAlign = 'center';
tab1.style.fontSize = 20 + 'px';
tab1.style.color = 'white';
tab1.innerHTML = 'Teorie';

contentContainer.appendChild(tab1);

tab2.onmouseenter = function(){this.style.backgroundColor = 'rgba(100,250,130,0.5)'; this.style.color = 'black';}
tab2.onmouseleave = function(){this.style.backgroundColor = ''; this.style.color = 'white';}
tab2.onclick = function(){actualContent.innerHTML = menPrim[lastMenuHit][2]; elemDetails.innerHTML = 'Click pentru a descarca exemple/teorie [' + menPrim[lastMenuHit][0] + ']';actualContent.appendChild(elemDetails); actualContent.appendChild(downloadLink);};
tab2.style.position = 'absolute';
tab2.style.top = 10 + '%';
tab2.style.left = 50 + '%';
tab2.style.width = 45 + '%';
tab2.style.paddingTop = 5 + 'px';
tab2.style.paddingBottom = 5 + 'px';
tab2.style.borderTop = '2px dotted rgb(100,250,130)';
tab2.style.borderBottom = '2px dotted rgb(100,250,130)';
tab2.style.textAlign = 'center';
tab2.style.fontSize = 20 + 'px';
tab2.style.color = 'white';
tab2.innerHTML = 'Exemple';

contentContainer.appendChild(tab2);

var downloadLink = document.createElement("a");
var elemDetails = document.createElement("div");

elemDetails.style.position = 'absolute';
elemDetails.style.top = 14 + '%';
elemDetails.style.right = 4 + '%';
elemDetails.style.width = 113 + 'px';
elemDetails.style.textAlign = 'center';
elemDetails.innerHTML = '';
elemDetails.style.fontSize = 15 + 'px';
elemDetails.style.paddingTop = '5px';
elemDetails.style.paddingBottom = '5px';
elemDetails.style.paddingLeft = '2px';
elemDetails.style.paddingRight = '5px';
elemDetails.style.backgroundColor = 'rgba(150,250,170,0.8)';
elemDetails.style.borderRadius = '5px';
elemDetails.style.cursor = 'pointer';
elemDetails.style.height = 'auto';
elemDetails.style.display = 'none';
actualContent.appendChild(elemDetails);

downloadLink.href = 'Clase_si_obiecte.txt';
downloadLink.download = '';
downloadLink.style.position = 'absolute';
downloadLink.style.top = 5 + '%';
downloadLink.style.right = 5 + '%';
downloadLink.style.width = '100px';
downloadLink.style.height = 'auto';
downloadLink.style.textAlign = 'center';
downloadLink.style.textDecoration = 'none';
downloadLink.style.color = 'white';

downBtn = document.createElement("div");
downBtn.innerHTML = 'Descarca';
downBtn.style.fontSize = 20 + 'px';
downBtn.style.paddingTop = '10px';
downBtn.style.paddingBottom = '5px';
downBtn.style.paddingLeft = '5px';
downBtn.style.paddingRight = '5px';
downBtn.style.backgroundColor = 'rgba(50,150,100,0.8)';
downBtn.style.borderRadius = '5px';
downBtn.style.cursor = 'pointer';
downBtn.onmouseenter = function(){ elemDetails.style.display = 'block';this.style.backgroundColor = 'white';this.style.color = 'rgba(50,150,100,0.8)'; }
downBtn.onmouseleave = function(){ elemDetails.style.display = 'none';this.style.backgroundColor = 'rgba(50,150,100,0.8)';this.style.color = 'white'; }
downBtn.style.height = '30px';

downloadLink.appendChild(downBtn);

actualContent.style.position = 'absolute';
actualContent.style.top = 20 + '%';
actualContent.style.left = 5 + '%';
actualContent.style.width = 90 + '%';
actualContent.style.height = 80 + '%';
actualContent.style.backgroundColor = 'rgba(100,250,130,0.5)';
actualContent.style.overflowY = 'auto';
actualContent.style.overflowX = 'hidden';

actualContent.appendChild(downloadLink);
contentContainer.appendChild(actualContent);

document.body.appendChild(contentContainer);


