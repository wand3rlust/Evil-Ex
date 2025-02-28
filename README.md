# Evil-Ex

Evil-Ex is a tool (extension really) to demonstrate the dangers posed by malicious IDE extensions. The idea came when I was doing some research on supply chain compromise & looking for initial access vectors in that context.

For obvious reasons this extension is not published on marketplace and thus shared here.

# Features

As of now Evil-Ex supports only Linux systems with two features as follows :-

1. Exfiltration of **Docker** & **GitHub** credentials via `evil-ex.007` command.
2. Reverse shell via `evil-ex.1337` command.

# Usage

## Pre-requisites

1. VS Code/VSCodium >= 1.95.0
2. NodeJS >= v22.14.0
3. NPM >= v10.9.2

## Install

```sh
git clone https://github.com/wand3rlust/Evil-Ex.git
cd Evil-Ex
npm install
```

## Attacks

### 1. Data Exfiltration

1. Open the extension directory as a folder in VS Code.
2. Add webhook URL in line 20 of `extension.js` file.
3. In top-menu bar, click on **Run** and then select **Run Without Debugging (`Ctrl+F5`)**.
4. A new VC Code window will pop-up, click on **View** in top-menu bar and then select **Command Palette** option.
5. Type `Data Exfil!` and press **Enter**.
6. The contents of `~/.docker/config.json` & `~/.config/gh/hosts.yml` will be exfiltrated.

### 2. Reverse Shell

1. Open the extension directory as a folder in VS Code.
2. Add C2 URL in line 52 of `extension.js` file.
3. In top-menu bar, click on **Run** and then select **Run Without Debugging (`Ctrl+F5`)**.
4. A new VC Code window will pop-up, click on **View** in top-menu bar and then select **Command Palette** option.
5. Type `Reverse Shell!` and press **Enter**.
6. A command execution access callback will be received on the C2.

# Future Roadmap

- [ ] Support for macOS & Windows
- [ ] Add more features
- [ ] Extend to other IDEs

# Contributing

To contribute, simply fork this repo, make changes and create a pull request.
 
# Support

If you like this tool please consider giving a ⭐.
