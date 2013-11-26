
// This is just a test.

var editor = ace.edit("editor");
editor.setTheme("ace/theme/ambiance");
editor.getSession().setMode("ace/mode/python");
function outf(text)
{
	var output = document.getElementById("output");
	text = text.replace(/</g, '&lt;');
	output.innerHTML = output.innerHTML + text;
}
function runit()
{
	var prog = editor.getValue();
	// var prog = document.getElementById("code").value;
	var output = document.getElementById("output");
	output.innerHTML = '';
	Sk.configure({output:outf});
	try {
		var module = Sk.importMainWithBody("<stdin>", false, prog);
		// var obj = module.tp$getattr('a');
		// var runMethod = obj.tp$getattr('run');
		// var ret = Sk.misceval.callsim(runMethod, 10);
		// alert(ret.v);
	} catch (e) {
		alert(e);
	}
}