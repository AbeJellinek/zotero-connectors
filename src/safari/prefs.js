/*
	***** BEGIN LICENSE BLOCK *****
	
	Copyright © 2017 Center for History and New Media
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

/**
 * Safari uses localStorage
 */
Zotero.Prefs = Object.assign(Zotero.Prefs, {
	init: Zotero.Promise.method(function() {
		let prefs = Object.assign({}, localStorage);
		for (let k of Object.keys(prefs)) {
			if (k.substr(0, 'pref-'.length) == 'pref-') {
				prefs[k.substr('pref-'.length)] = JSON.parse(prefs[k]);
			}
			delete prefs[k];
		}
		this.syncStorage = Object.assign({}, prefs);
		if ('translatorMetadata' in localStorage) {
			this.set('translatorMetadata', localStorage['translatorMetadata']);
			delete localStorage['translatorMetadata'];
		}
	}),

	getAsync: function(pref) {
		return new Zotero.Promise(function(resolve, reject) {
			if (typeof pref === "object") {
				var prefData = {};
				for(var i=0; i<pref.length; i++) {
					prefData[pref[i]] = Zotero.Prefs.getAsync(pref[i]);
				}
				resolve(prefData);
			} else {
				resolve(localStorage[`pref-${pref}`]);
			}	
		});
	},
	
	set: Zotero.Promise.method(function(pref, value) {
		Zotero.debug("Setting "+pref+" to "+JSON.stringify(value).substr(0, 100));
		this.syncStorage[pref] = value;
		localStorage["pref-"+pref] = JSON.stringify(value);
	}),

	clear: Zotero.Promise.method(function(pref) {
		if (Array.isArray(pref)) return pref.forEach((p) => this.clear(p));
		delete this.syncStorage[pref];
		delete localStorage[`pref-${pref}`];
	})
});
