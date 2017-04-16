function readReactions(){window.XMLHttpRequest&&(xmlhttp=new XMLHttpRequest),xmlhttp.open("GET","xml/reactions.xml",!1),xmlhttp.send(),xmlDoc=xmlhttp.responseXML;var e,t=xmlDoc.getElementsByTagName("REACTION");for(e=0;t.length>e;e++){var n=t[e].getElementsByTagName("ELEMENTS")[0].childNodes[0].nodeValue,i=t[e].getElementsByTagName("MOLECULE")[0].childNodes[0].nodeValue,o=new Reaction(i);n=""+n;var r=[];r=n.split(","),o.eArray=r,reactions.push(o)}}function readElements(){window.XMLHttpRequest&&(xmlhttp=new XMLHttpRequest),xmlhttp.open("GET","xml/periodic.xml",!1),xmlhttp.send(""),xmlDoc=xmlhttp.responseXML,elements=[];var e,t=xmlDoc.getElementsByTagName("ATOM");for(e=0;t.length>e;e++){var n=t[e].getElementsByTagName("XPOS")[0].childNodes[0].nodeValue,i=t[e].getElementsByTagName("YPOS")[0].childNodes[0].nodeValue,o=t[e].getElementsByTagName("SYMBOL")[0].childNodes[0].nodeValue,r=t[e].getElementsByTagName("NAME")[0].childNodes[0].nodeValue,a=t[e].getElementsByTagName("ATOMIC_NUMBER")[0].childNodes[0].nodeValue,s=t[e].getElementsByTagName("RED")[0].childNodes[0].nodeValue,l=t[e].getElementsByTagName("GREEN")[0].childNodes[0].nodeValue,c=t[e].getElementsByTagName("BLUE")[0].childNodes[0].nodeValue,u=1*t[e].getElementsByTagName("ARED")[0].childNodes[0].nodeValue,d=1*t[e].getElementsByTagName("AGREEN")[0].childNodes[0].nodeValue,p=1*t[e].getElementsByTagName("ABLUE")[0].childNodes[0].nodeValue,f=t[e].getElementsByTagName("ION_RED")[0].childNodes[0].nodeValue,h=t[e].getElementsByTagName("ION_GREEN")[0].childNodes[0].nodeValue,m=t[e].getElementsByTagName("ION_BLUE")[0].childNodes[0].nodeValue,g=t[e].getElementsByTagName("OTHER_RED")[0].childNodes[0].nodeValue,v=t[e].getElementsByTagName("OTHER_GREEN")[0].childNodes[0].nodeValue,y=t[e].getElementsByTagName("OTHER_BLUE")[0].childNodes[0].nodeValue,b=t[e].getElementsByTagName("ATOMIC_RADIUS")[0].childNodes[0].nodeValue,x=t[e].getElementsByTagName("LEWIS_DOTS")[0].childNodes[0].nodeValue,w=new Element(n,i,s,l,c,f,h,m,g,v,y,r,o,a,b,u,d,p,x);w.dragok=!1,elements.push(w)}return elements}function readMenus(){var e=function(e){for(var t=0;menuList.length>t;t++)if(menuList[t].name==e)return menuList[t];var n=new MenuCategory(e);return menuList.push(n),n},t=new MenuEntry(20,"It's Personal",0,0,"Recipes",224,224,224);t.setCallback(addRecipesPersonal),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(21,"Around the House",0,0,"Recipes",224,224,224);t.setCallback(addRecipesHouse),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(22,"Vroom!",0,0,"Recipes",224,224,224);t.setCallback(addRecipesVroom),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(23,"Mother Nature",0,0,"Recipes",215,215,215);t.setCallback(addRecipesMotherNature),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(24,"Get Technical",0,0,"Recipes",215,215,215);if(t.setCallback(addRecipesTechnical),e(t.cat).addEntry(t),t.setParent(e(t.cat)),!mobile){var t=new MenuEntry(25,"Isn't that Attractive?",0,0,"Recipes",224,224,224);t.setCallback(addRecipesAttractive),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(26,"Connect the Dots",0,0,"Recipes",224,224,224);t.setCallback(addRecipesDots),e(t.cat).addEntry(t),t.setParent(e(t.cat))}var n;for(n=0;e(t.cat).entries.length>n;n++);if(mobile){var t=new MenuEntry(0,"Standard",0,0,"Menu",215,215,215);t.setCallback(addStandard),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(1,"Atomic",0,0,"Menu",224,224,224);t.setCallback(addAtomic),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(2,"Featured",0,0,"Menu",215,215,215);t.setCallback(addFeatured),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(3,"Learn",0,0,"Menu",215,215,215);learn=new learnMore,t.setCallback(addLearn),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(10,"Standard",1,1,"Recipes",215,215,215);t.setCallback(addStandard),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(11,"Atomic",1,2,"Recipes",224,224,224);t.setCallback(addAtomic),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(12,"Featured",1,3,"Recipes",215,215,215);t.setCallback(addFeatured),e(t.cat).addEntry(t),t.setParent(e(t.cat));var t=new MenuEntry(13,"Learn",1,4,"Recipes",215,215,215);learn=new learnMore,t.setCallback(addLearn),e(t.cat).addEntry(t),t.setParent(e(t.cat))}return menuList}