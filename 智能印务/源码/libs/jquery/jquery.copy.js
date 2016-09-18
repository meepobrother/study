(function(){
	var arr = [],
		slice = arr.slice,
		concat = arr.concat,
		push = arr.push,
		indexOf = arr.indexOf,
		class2type = {},
		toString = class2type.toString,
		hasOwn = class2type.hasOwnProperty,
		support = {};

	var document = window.document,
		version = "2.1.4",
		jQuery = function(selector,context){
			return new jQuery.fn.init(selector,context);
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function(all,letter){
			return letter.toUpperCase();
		}

	jQuery.fn = jQuery.prototype = {}

	jQuery.extend = jQuery.fn.extend = function(){}

	jQuery.extend({});

	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(i,name){

	});

	function isArraylike(obj){

	}

	var Sizzle = (function(){
		return {};
	});

	jQuery.find = Sizzle;

	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;

	var rneedsContext = jQuery.expr.match.needsContext;
	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
	var risSimple = /^.[^:#\[\.,]*$/;

	function winnow(elements,qualifier,not){}
});