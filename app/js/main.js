var pywarrior = {};

pywarrior.app = angular.module('pythonWarrior', []);

pywarrior.app.controller('MainCtrl', function($scope) {

	// Some demo stuff.
	$scope.output = 'This is the output';
	$scope.tipTitle = 'This is the section for tips';
	$scope.tipMessage = 'Copy the following code, paste it into the editor and click on run:';
	$scope.tipCode = "name = 'Javi'\nprint 'Hello %s' % name";
});

/**
 * Editor directive.
 *
 * TODO: make it more angular-ish
 */
pywarrior.app.directive('editor', function() {
	return {
		scope: {
			output: '='
		},

		template:
			'<button ng-click="runCode()" type="button">Run</button>' +
			'<div class="editor-wrapper">' +
				'<div id="editor"></div>' +
			'</div>',

		link: function(scope) {
			var editor = ace.edit('editor');
			editor.setTheme("ace/theme/ambiance");
			editor.getSession().setMode("ace/mode/python");

			var _outf = function(output) {
				scope.output = scope.output + output;
			}
			scope.runCode = function() {
				scope.output = '';

				Sk.configure({output: _outf});
				try {
					Sk.importMainWithBody("<stdin>", false, editor.getValue());
				} catch (e) {
					scope.output = e;
				}
			};
		}
	}
});
