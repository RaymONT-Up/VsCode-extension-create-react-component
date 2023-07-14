const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

// Function called when the extension is activated
function activate(context) {
  console.log('Congratulations, your extension "crc" is now active!');

  // Register the command to create a component
  let disposable = vscode.commands.registerCommand(
    "crc.createComponent",
    async () => {
      // Prompt the user to enter the component name
      const componentName = await vscode.window.showInputBox({
        placeHolder: "Enter the component name",
      });
      // Prompt the user to enter the component name
      const componentType = await vscode.window.showInputBox({
        placeHolder: "js,ts,tsx, jsx",
      });

      console.log(componentType);

      if (componentName) {
        // Get the folder path of the currently opened workspace
        const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

        if (folderPath) {
          try {
            // Create the component folder
            const componentFolderPath = path.join(folderPath, componentName);
            fs.mkdirSync(componentFolderPath);

            // Create the Component.module.scss file
            const scssFilePath = path.join(
              componentFolderPath,
              `${componentName}.module.scss`
            );
            fs.writeFileSync(scssFilePath, "", "utf8");

            // Create the Component.tsx file with the component code
            const tsxFilePath = path.join(
              componentFolderPath,
              `${componentName}.tsx`
            );
            const tsxFileContent = `
						import cls from "./${componentName}.module.scss";

						const ${componentName} = () => {
							return <div></div>;
						};

						export default ${componentName};
						`;

            fs.writeFileSync(tsxFilePath, tsxFileContent, "utf8");

            vscode.window.showInformationMessage(
              "Component created successfully!"
            );
          } catch (error) {
            vscode.window.showErrorMessage(
              "An error occurred while creating the component: " + error.message
            );
          }
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// Function called when the extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
