function TestController(){

}
module.exports = new TestController();

/**
 * [action1 description]
 * @param   req [description]
 * @param   res [description]
 * 
 */
function test(){

}
/**
 * [action1 description]
 * @param   req [description]
 * @param   res [description]
 * @uri /test/action1
 * @mtype Get
 */
TestController.prototype.action1 = function(req,res){
	var content = '<h1> hello action1</h1>';
	res.end(content);
}

/**
 * [action2 description]
 * @param   req [description]
 * @param   res [description]
 * @uri /test/action2
 * @mtype Get
 */
TestController.prototype.action2 = function(req,res){
	var content = '<h1> hello action2</h1>';
	res.end(content);
}