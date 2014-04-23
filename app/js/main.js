var pywarrior = {};

pywarrior.app = angular.module('pythonWarrior', []);

pywarrior.app.factory('Challenges', function() {
	var Challenges = [
		{
			expectedOutput: 'Hello Javi',
			tipTitle: "Exercise 1 - Strings",
			tipMessage: "Copy the following code, paste it into the editor and click on run:",
			tipCode: "name = 'Javi'\nprint 'Hello %s' % name"
		}, {
			expectedOutput: '120',
			tipTitle: "Exercise 2 - Math",
			tipMessage: "Show in the output the result of the following operation:",
			tipCode: "(20 + 10 - 5) * 4 + 20"
		}
	];

	return Challenges;
})

pywarrior.app.controller('MainCtrl', function($scope, Challenges) {

	var _currentChallenge = 0;

	$scope.nextChallenge = function() {
		var challenge = Challenges[_currentChallenge];

		$scope.tipTitle = challenge.tipTitle;
		$scope.tipMessage = challenge.tipMessage;
		$scope.tipCode = challenge.tipCode;

		$scope.showContinue = false;
	};

	var _checkCode = function() {
		var challenge = Challenges[_currentChallenge];

		if ($scope.output === challenge.expectedOutput) {
			_currentChallenge = _currentChallenge + 1;
			$scope.showContinue = true;
		} else {
			$scope.output = $scope.output + '\nNope.';
		}
	};

	// Editor stuff
	var editor = ace.edit('editor');
	editor.setTheme("ace/theme/ambiance");
	editor.getSession().setMode("ace/mode/python");

	var _outf = function(output) {
		if (output !== '' &&
				output !== '\n' &&
				angular.isUndefined(output) === false) {
			$scope.output = output;
			$scope.outputErr = null;
			_checkCode();
		}
	};

	$scope.runCode = function() {
		var editorValue = editor.getValue();

		Sk.configure({output: _outf});
		try {
			Sk.importMainWithBody("<stdin>", false, editorValue);
		} catch (e) {
			$scope.outputErr = e;
		}
	};

	$scope.nextChallenge();
});
