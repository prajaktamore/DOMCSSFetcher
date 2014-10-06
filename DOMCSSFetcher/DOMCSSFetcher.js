(function() {
DOMCSSFetcher = function()
{
if (!document.getElementById("DOMCSSFetcherStyle"))
{
	this.message = "Ctrl + click an element on the page to generate a selector";
	this.pConfigOptions = ["Ignore all config"];
	this.config = this.pConfigOptions;
	this.ignoreClasses = "hover, mouseOver";
	this.ignoreIdPrefixes = "generated, generic_";
	this.ignoreTags = "br, td";
	this.prevElement = null;
	this.prevElementBorder = null;
	this.initialize(this);
}
};
DOMCSSFetcher.prototype.handleClick = function(oEvent)
{
	if(oEvent.ctrlKey || oEvent.metaKey)
	{
	/* Update current values */
	this.message = document.getElementById("DOMCSSFetcherStyle_generated").innerHTML;
	this.pConfigOptions = "";
	this.ignoreClasses = document.getElementById("ignoreClasses").value;
	this.ignoreIdPrefixes = document.getElementById("ignoreIdPrefixes").value;
	this.ignoreTags = document.getElementById("ignoreTags").value;
	var genConfig = new DOMCSSFetcher.Config(this.ignoreClasses, this.ignoreIdPrefixes,this.ignoreTags, this.configOptionIsSelected("ignoreAllConfig"));
	var elementTarget = new DOMCSSFetcher.Target(oEvent.target, genConfig);
	document.getElementById("DOMCSSFetcherStyle_generated").innerHTML = (elementTarget.calculateSelector());
	this.highlight(oEvent.target);
	this.setActive('DOMCSSFetcherStyle_generatortab', 'DOMCSSFetcherStyle_generator')
	}
};
DOMCSSFetcher.prototype.highlight = function(target)
{
	if (this.prevElement != null)
	{
		this.prevElement.style.outline = this.prevElementBorder;
	}
	this.prevElement = target;
	this.prevElementBorder = target.style.outline;
	target.style.outline = "2px black dotted";
};
DOMCSSFetcher.prototype.configOptionIsSelected = function(sConfigId)
{
	if(document.getElementById(sConfigId).checked == true)
	{
		return true;
	}
	return false;
};
DOMCSSFetcher.prototype.setActive = function(tabIdToSetActive, tabContentIdToDisplay)
{
	var tabContainer = document.getElementById("DOMCSSFetcherStyle_tabs");
	var pTabs = tabContainer.getElementsByTagName("li");
	this.setArrayElementClasses(pTabs, "");
	document.getElementById(tabIdToSetActive).setAttribute("class", "DOMCSSFetcherStyle_activetab");
	var pageContainer = document.getElementById("DOMCSSFetcherStyle_tabcontent");
	var pPages = pageContainer.children;
	this.setArrayElementClasses(pPages, "DOMCSSFetcherStyle_hidden");
	document.getElementById(tabContentIdToDisplay).setAttribute("class", "");
};
DOMCSSFetcher.prototype.setArrayElementClasses = function(pArray, sClass)
{
	for (var i = 0; i < pArray.length; i++)
	{
		pArray[i].setAttribute("class", sClass);
	}
};
DOMCSSFetcher.prototype.slide = function(hide)
{
	var display = document.getElementById("DOMCSSFetcherStyle");
	if(hide)
	{
		display.setAttribute("class", "DOMCSSFetcherStyle DOMCSSFetcherStyle_hidden");
	}
	else	
	{
		display.setAttribute("class", "DOMCSSFetcherStyle DOMCSSFetcherStyle_dockright");
	}
};
/* END OF MODEL */
/* CONFIG */
DOMCSSFetcher.Config = function(ignoreClasses, ignoreIdPrefixes, ignoreTags, disableConfig)
{
	this.disableConfig = disableConfig;
	this.ignoreClasses = ignoreClasses.replace(/\s+/g, '').split(/\s*,\s*/);
	this.ignoreIdPrefixes = ignoreIdPrefixes.replace(/\s+/g, '').split(/\s*,\s*/);
	this.ignoreTags = ignoreTags.replace(/\s+/g, '').split(/\s*,\s*/);
};
/* END OF CONFIG */
/* TARGET */
DOMCSSFetcher.Target = function(eElement, oConfig)
{
	this.targetElement = eElement;
	this.currentElement = eElement;
	this.completed = false;
	this.selectors = [];
	this.disableConfig = oConfig.disableConfig;
	this.ignoreIdPrefixes = oConfig.ignoreIdPrefixes;
	this.ignoreClasses = oConfig.ignoreClasses;
	this.ignoreTags = oConfig.ignoreTags;
};
DOMCSSFetcher.Target.prototype.calculateSelector = function()
{

var sTagName = this.targetElement.tagName;

			if(sTagName != null && this.isAllowedTagName(sTagName)){
				var prefix = '$$("';
				var suffix = '");';
				this.traverseAndCalc(this.targetElement);

				var txt = prefix + this.generateSelectorString() + suffix + "<br>";
	

				var eleChild = this.targetElement.childNodes;
				for(var i = 0 , j = eleChild.length; i < j ; i++ ){
					sTagName = eleChild[i].tagName;
					if (eleChild[i].nodeType == 1 && this.isAllowedTagName(sTagName)){
						this.completed = false;
						this.currentElement = eleChild[i];
						this.selectors = [];
						this.traverseAndCalc(eleChild[i]);
						txt = txt + prefix + this.generateSelectorString() + suffix + "<br>";
						}
				}

				return txt;
			}
 return "";
};
DOMCSSFetcher.Target.prototype.generateSelectorString = function()
{
	var selectorString = "";
	for (var i = this.selectors.length-1; i >= 0 ; i--)
	{
		selectorString += this.selectors[i];
		if (i != 0) { selectorString += " "; }
	}
	return selectorString;
};
DOMCSSFetcher.Target.prototype.traverseAndCalc = function(eElement)
{
	var sId = eElement.getAttribute("id");
	var sClass = eElement.getAttribute("class");
	while (this.completed == false && this.currentElement != null)
	{
	sId = this.currentElement.getAttribute("id");
	sClass = this.currentElement.getAttribute("class");
			if(sId != null && this.isAllowedId(sId))	/* ID CODE PATH */
			{
				this.calculateIdSelector(sId);
			}
			else if (sClass != null && sClass != "")	/* CLASS CODE PATH */
			{
					this.calculateClassSelector(sClass);
			}
			else
			{
				this.calculateTagSelector(); /* TAGNAME CODE PATH */
			}
		this.currentElement = this.currentElement.parentElement;
	}
	this._appendEqSuffixIfNeeded();
	return this.selectors;
};
DOMCSSFetcher.Target.prototype.calculateIdSelector = function (sElementId)
{
	if(document.getElementById(sElementId) != null)
	{
		this.selectors.push("#" + sElementId);
		this.completed = true;
	}
};
DOMCSSFetcher.Target.prototype.calculateClassSelector = function(sClass)
{
	var selectorForClass = this._generateSelectorClassesString(sClass);	/* remove dupe */
	if(selectorForClass != "")
	{
		this.selectors.push("." + selectorForClass);
		var foundElementsInDom = document.getElementsByClassName(selectorForClass);
		if (foundElementsInDom.length == 1)
		{
		this.completed = true;
		}
	}
	else
	{
		this.calculateTagSelector();
	}
};
DOMCSSFetcher.Target.prototype.calculateTagSelector = function()
{
	var sTagName = this.currentElement.tagName;
	var eParent = this.currentElement.parentElement;
	var pChildElementsToConsider = (eParent == null ? [] : eParent.children);
	var pTagElementsToConsider = (eParent == null ? [] : eParent.getElementsByTagName(sTagName));
		if(sTagName.toLowerCase() == "body")
		{
		this.selectors.push(sTagName.toLowerCase());
		}
		else if(pTagElementsToConsider.length == 1)
		{
		this.selectors.push(sTagName.toLowerCase());
		}
		else
		{
			for (var i = 0; i < pChildElementsToConsider.length; i++)
			{
			if (pChildElementsToConsider[i] == this.currentElement)
			{
			this.selectors.push(sTagName.toLowerCase() + ":nth-child(" + (i+1) + ")");
			}
			}
		}
};
DOMCSSFetcher.Target.prototype.isAllowedId = function(sIdName)
{
	if (this.disableConfig)
	{
	return true;
	}
		for (var i = 0; i < this.ignoreIdPrefixes.length; i++)
		{
		if (sIdName.toLowerCase().indexOf(this.ignoreIdPrefixes[i].toLowerCase()) == 0 &&
		this.ignoreIdPrefixes[i] != "")
		{
			return false;
		}
		}
	return true;
};

DOMCSSFetcher.Target.prototype.isAllowedTagName = function(sTagName)
{
	if (this.disableConfig)
	{
	return true;
	}
		for (var i = 0; i < this.ignoreTags.length; i++)
		{
		if (sTagName.toLowerCase().indexOf(this.ignoreTags[i].toLowerCase()) == 0 &&
		this.ignoreTags[i] != "")
		{
			return false;
		}
		}
	return true;
};

DOMCSSFetcher.Target.prototype.isAllowedClass = function(sName)
{
	if (this.disableConfig)
	{
		return true;
	}
	for (var i = 0; i < this.ignoreClasses.length; i++)
	{
		if (this.ignoreClasses[i].toLowerCase() == sName.toLowerCase())
		{
			return false;
		}
	}
	return true;
};
/*
* Private
*/
DOMCSSFetcher.Target.prototype._appendEqSuffixIfNeeded = function()
{
};
DOMCSSFetcher.Target.prototype._generateSelectorClassesString = function(sClassName)
{
	var pValidClasses = this._returnValidClasses(sClassName);
	var eParent = this.currentElement.parentElement;
	/* See if we can get a class selector within the current element's parent which is unique */
	for (var i = 0; i < pValidClasses.length; i++)
	{
		if (eParent.getElementsByClassName(pValidClasses[i]).length == 1 &&
		eParent.getElementsByClassName(pValidClasses[i])[0] == this.currentElement)
		{
		return pValidClasses[i];
		}
	}
	/* See if we can get a class + eq(X) selector inside the current element's parent */
	var className = pValidClasses[0];
	var foundElements = eParent.getElementsByClassName(className);
	for (var i = 0; i < foundElements.length; i ++)
	{
		if (foundElements[i] == this.currentElement)
		{
		return className + ":nth-child(" + (i+1) + ")";
		}
	}
	return pValidClasses.join(", ");
};
/* Filter classes against the ignore classes list */
DOMCSSFetcher.Target.prototype._returnValidClasses = function(className)
{
	var classes = className.split(" ");
	var pClassesToReturn = [];
	for (var i = 0; i < classes.length; i++)
	{
		if(this.isAllowedClass(classes[i]))
		{
		if(this._classDoesNotAlreadyExistInArray(classes[i], pClassesToReturn))
		{
			pClassesToReturn.push(classes[i]);
		}
		}
	}
	return pClassesToReturn;
};
/* Assert that sClass does not exist in pClassArray */
DOMCSSFetcher.Target.prototype._classDoesNotAlreadyExistInArray = function(sClass, pClassArray)
{
for (var x = 0; x < pClassArray.length; x++)
{
	if(sClass.toLowerCase() == pClassArray[x].toLowerCase())
	{
		return false;
	}
	}
	return true;
};
/* END OF TARGET */
/* INITIALIZE */
DOMCSSFetcher.prototype.initialize = function(oSS)
{
	var css = document.createElement('link');
	css.href = "http://github.com/prajaktamore/DOMCSSFetcher/tree/master/DOMCSSFetcher/style.css";
	css.type = 'text/css';
	css.rel = 'stylesheet';
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(css);
	var DOMCSSFetcherHtml =
	"<div id='DOMCSSFetcherStyle' class='DOMCSSFetcherStyle DOMCSSFetcherStyle_dockright'>" +
	"<div id='DOMCSSFetcherStyle_tabs'>" +
	"<ul>" +
	"<li id='DOMCSSFetcherStyle_generatortab' class='DOMCSSFetcherStyle_activetab' onclick=\"DOMCSSFetcher.prototype.setActive('DOMCSSFetcherStyle_generatortab', 'DOMCSSFetcherStyle_generator')\">Generator</li>" +
	"<li id='DOMCSSFetcherStyle_configtab1' onclick=\"DOMCSSFetcher.prototype.setActive('DOMCSSFetcherStyle_configtab1', 'DOMCSSFetcherStyle_config1')\">Config Classes</li>" +
	"<li id='DOMCSSFetcherStyle_configtab2' onclick=\"DOMCSSFetcher.prototype.setActive('DOMCSSFetcherStyle_configtab2', 'DOMCSSFetcherStyle_config2')\">Config Ids</li>" +
	"<li id='DOMCSSFetcherStyle_configtab3' onclick=\"DOMCSSFetcher.prototype.setActive('DOMCSSFetcherStyle_configtab3', 'DOMCSSFetcherStyle_config3')\">Config Tags</li>" +
	"</ul>" +
	"</div>" +
	"<div id='DOMCSSFetcherStyle_tabcontent'>" +
	"<div id='DOMCSSFetcherStyle_generator'>" +
	"<div id='DOMCSSFetcherStyle_generated'></div>" +
	"<div class='DOMCSSFetcherStyle_genoptions'>" +
	"<input id='ignoreAllConfig' type='checkbox' value='Ignore all config' name=''>" +
	"<span>Ignore all config</span>" +
	"</div>" +
	"</div>" +
	"<div id='DOMCSSFetcherStyle_config1' class='DOMCSSFetcherStyle_hidden'>" +
	"<div>Comma-delimiter list of classes to ignore (E.g 'hover, mouseOver')</div>" +
	"<textarea id='ignoreClasses' class='config_area' name='ignoreClasses'></textarea>" +
	"</div>" +
	"<div id='DOMCSSFetcherStyle_config2' class='DOMCSSFetcherStyle_hidden'>" +
	"<div>Comma-delimiter list of ID prefixes to ignore (E.g 'generated, generic_')</div>" +
	"<textarea id='ignoreIdPrefixes' class='config_area' name='ignoreIdPrefixes'></textarea>" +
	"</div>" +
	"<div id='DOMCSSFetcherStyle_config3' class='DOMCSSFetcherStyle_hidden'>" +
	"<div>Comma-delimiter list of TAGS to ignore (E.g 'BR, TD, TH')</div>" +
	"<textarea id='ignoreTags' class='config_area' name='ignoreTags'></textarea>" +
	"</div>" +
	"</div>";
	var eElement = document.createElement("div");
	eElement.innerHTML = DOMCSSFetcherHtml;
	document.body.appendChild(eElement);
	document.getElementById("DOMCSSFetcherStyle_generated").innerHTML = oSS.message;
	document.getElementById("ignoreClasses").value = oSS.ignoreClasses;
	document.getElementById("ignoreIdPrefixes").value = oSS.ignoreIdPrefixes;
	document.getElementById("ignoreTags").value = oSS.ignoreTags;
	document.body.addEventListener("click", oSS.handleClick.bind(oSS), false);
};
new DOMCSSFetcher();
return undefined;
})();
