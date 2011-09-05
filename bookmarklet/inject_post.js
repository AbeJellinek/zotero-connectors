/*
    ***** BEGIN LICENSE BLOCK *****
    
    Copyright © 2011 Center for History and New Media
                     George Mason University, Fairfax, Virginia, USA
                     http://zotero.org
    
    This file is part of Zotero.
    
    Zotero is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    Zotero is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    
    You should have received a copy of the GNU Affero General Public License
    along with Zotero.  If not, see <http://www.gnu.org/licenses/>.
    
    ***** END LICENSE BLOCK *****
*/

if(document.getElementById("zotero-iframe")) {
	alert("A previous translation process is still in progress. Please wait for it to complete, "+
		"or refresh the page.");
} else {
	zoteroShowProgressWindow();
	window.zoteroIFrame = document.createElement("iframe");
	zoteroIFrame.id = "zotero-iframe";
	zoteroIFrame.src = zoteroBookmarkletURL+"iframe"+(navigator.appName === "Microsoft Internet Explorer" ? "_ie" : "")+".html";
	zoteroIFrame.style.display = "none";
	(document.body ? document.body : document.documentElement).appendChild(zoteroIFrame);
}