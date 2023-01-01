// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
import { ChatGPTAPIBrowser } from 'chatgpt'
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


async function gptCall(context, text) {
	// use puppeteer to bypass cloudflare (headful because of captchas)
	const api = new ChatGPTAPIBrowser({
		email: '',
		password: '',
		isGoogleLogin: true
	})
	await api.initSession()
	const result = await api.sendMessage('Write a snippet to do this : ' + text +'use the following context to help understand what we are triying to do . Context: ' + context)
	console.log(result.response)
	return result.response;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('GPTAutocomplete a été activé avec succès ! Ceci est une version de test, merci de signaler les bugs sur le github du projet.');

	let disposable = vscode.commands.registerCommand('gptautocomplete.complete', function () {

		// Display a message box to the user
		vscode.window.showInformationMessage('GPTAutocomplete a été activé avec succès ! Ceci est une version de test, merci de signaler les bugs sur le github du projet.');

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
