/**
 * Created by duongminhkhoa on 13/11/15.
 */
var fs 		= require('fs');
var path 	= require('path');
var parse 	= require('jsdoc-parse');

function Routes(){

}
module.exports = new Routes();

/**
 * Add function that has @uri and @mtype tag to express router
 * @param  {Object} app      Express Application
 * @param  {Object} comments list of comments in controller
 * @param  {Object} module   object controller
 */
function parseComentToRouter(app,comments,module){
        for (var i = 0; i < comments.length; i++) {
        	var comment = comments[i];
        	// if it is not function then return
            if (comment.kind && comment.kind == 'function') {
            	var method,uri,j;
            	for( j in comment.customTags){
            		var cTags = comment.customTags[j];
            		if(cTags.tag == 'uri'){
            			uri = cTags.value;
            		}
            		else if(cTags.tag == 'mtype'){
            			method = cTags.value;
            		}
            	}
            	
            	var func 	= comment.id && module.__proto__[comment.id.split('#')[1]];
                if (method && uri) {
                    app[method.toLowerCase()](uri, func);
                    console.log('[ URL Routing ] Add' + comment.id + 'method :' + method);
                } else {
                    console.log('[ URL Routing ] Failure' + comment.id);
                }
            }
        }

}


/**
 * Setup router by dir
 * @param  {Object} app Express application
 * @param  {String} dir Controller path
 */
Routes.prototype.setup = function(app,dir){
	// check each file from dir
	fs.readdirSync(dir)
    .filter(function(v) {
        if (v === 'index.js') {
            return false;
        }
        return v.slice(v.lastIndexOf('.')) === '.js';
    })
    .forEach(function(name) {
    	var module;
    	var path = dir + '/' + name;
	    try {
	        module = require(path);
	    } catch(e) {
	        console.log('[ URL Routing ] Failure can not load module');
	        return;
	    }

		var commentStream = parse({src: path});
		commentStream.on('data',function(data){
			
			var comments = JSON.parse(data.toString());
			parseComentToRouter(app,comments,module);
			// console.log(comments);
		});
    });
	
};