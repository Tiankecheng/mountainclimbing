const fs = require('fs')
const path = require('path')
const crypto = require('crypto');


const nodeModulesDirectoryName = "node_modules";
const destUIDirectoryName = "UI";

const moduleUIDirNames = ["ui"]

const UIDescriptorFileExtName = ".meta";
const UIFileExtName = ".ui";

const CopyModes = {
    "Override": 1,
    "Skip": 2
}

const UIDescriptorTemplate = {
    "Version": "1",
    "Guid": null,
    "Name": null,
    "Type": "",
    "Icon": "",
    "Size": 0,
    "URL": "",
    "Sha1": "",
    "SortId": 0,
    "Timestamp": 0
}


class Module {
    constructor(modulePath, uiFiles) {
        this.modulePath = modulePath;
        this.uiFiles = uiFiles || [];
    }
}

class UIFile {
    constructor(ownModule, ownUIDirectory, uiFilePath, uiDescriptorFilePath) {
        this.ownModule = ownModule;
        this.ownUIDirectory = ownUIDirectory;
        this.uiFilePath = uiFilePath;
        this.uiDescriptorFilePath = uiDescriptorFilePath;
    }

    relativeUIPath() {
        let index = this.uiFilePath.indexOf(this.ownUIDirectory);
        if (index !== -1) {
            return this.uiFilePath.substring(this.ownUIDirectory.length);
        }
        return null;
    }

    relativeUIDescriptorPath() {
        if (this.uiDescriptorFilePath) {
            let index = this.uiDescriptorFilePath.indexOf(this.ownUIDirectory);
            if (index !== -1) {
                return this.uiDescriptorFilePath.substring(this.ownUIDirectory.length);
            }
        }
        return null;
    }
}

class UICopyHelper {

    constructor(copyMode, generateUIFileDescriptor) {
        this.copyMode = copyMode || CopyModes.Override;
        this.destUIDir = path.resolve(destUIDirectoryName)
        this.generateUIFileDescriptor = generateUIFileDescriptor
    }

    walkFilesRecursively(fileName, walker) {
        let queue = [];
        queue.push(fileName);

        while (queue.length > 0) {
            let front = queue.shift();
            let fStat = fs.statSync(front);

            if (fStat.isFile()) {
                if (walker) {
                    walker(front)
                }
            } else if (fStat.isDirectory()) {
                fs.readdirSync(front).forEach(file => {
                    let childFilePath = path.resolve(path.join(front, file));
                    fStat = fs.statSync(childFilePath);
                    if (fStat.isFile()) {
                        if (walker) {
                            walker(childFilePath)
                        }
                    } else if (fStat.isDirectory()) {
                        queue.push(childFilePath)
                    }
                })
            }
        }
    }

    collectUIModules() {
        let modules = [];

        let exists = fs.existsSync(nodeModulesDirectoryName);

        if (!exists) {
            return modules;
        }

        fs.readdirSync(nodeModulesDirectoryName).forEach(file => {
            let modulePath = path.resolve(path.join(nodeModulesDirectoryName, file))
            let stat = fs.statSync(modulePath);
            if (stat.isDirectory()) {
                let module = new Module(modulePath);

                let uiFiles = []
                moduleUIDirNames.forEach(name => {
                    let absUIDirName = path.resolve(path.join(modulePath, name));
                    if (fs.existsSync(absUIDirName)) {
                        this.walkFilesRecursively(absUIDirName, (child) => {
                            if (path.extname(child) === UIFileExtName) {
                                let descriptorFile = fs.existsSync(child + UIDescriptorFileExtName) ? child + UIDescriptorFileExtName : null
                                uiFiles.push(new UIFile(module, absUIDirName, child, descriptorFile))
                            }
                        })
                    }
                })

                if (uiFiles.length > 0) {
                    module.uiFiles = uiFiles;
                    modules.push(module);
                }
            }
        });

        return modules;
    }

    isDestUIFileExists(uiFile) {
        let relativeUIPath = uiFile.relativeUIPath();
        return relativeUIPath && fs.existsSync(path.join(this.destUIDir, relativeUIPath))
    }

    isDestUIDescriptorFileExists(uiFile) {
        let relativeUIDescriptorPath = uiFile.relativeUIDescriptorPath();
        return relativeUIDescriptorPath && fs.existsSync(path.join(this.destUIDir, relativeUIDescriptorPath))
    }

    copyUIFileToDestUIDirectory(uiFile) {
        let destUIFilePath = path.join(this.destUIDir, uiFile.relativeUIPath());
        if (!fs.existsSync(path.dirname(destUIFilePath))) {
            fs.mkdirSync(path.dirname(destUIFilePath), {recursive: true})
        }

        fs.copyFileSync(uiFile.uiFilePath, destUIFilePath)
    }

    copyUIDescriptorFileToDestUIDirectory(uiFile) {
        let destUIDescriptorFilePath = path.join(this.destUIDir, uiFile.relativeUIDescriptorPath());
        if (!fs.existsSync(path.dirname(destUIDescriptorFilePath))) {
            fs.mkdirSync(path.dirname(destUIDescriptorFilePath), {recursive: true})
        }

        fs.copyFileSync(uiFile.uiDescriptorFilePath, destUIDescriptorFilePath)
    }

    generateGuidForUIFile(uiFile) {
        return crypto.createHash('md5').update(uiFile.relativeUIPath()).digest('hex').toUpperCase();
    }

    generateUIDescriptorFileIfNeeded(uiFile) {
        let expectedDescriptorFile = path.join(this.destUIDir, uiFile.relativeUIPath() + UIDescriptorFileExtName);

        if (fs.existsSync(expectedDescriptorFile)) {
            return
        }

        let descriptor = Object.assign({}, UIDescriptorTemplate);

        descriptor.Guid = this.generateGuidForUIFile(uiFile);
        descriptor.Name = path.basename(uiFile.uiFilePath);

        let fd = fs.openSync(expectedDescriptorFile, "w+");
        fs.writeSync(fd, JSON.stringify(descriptor, null, 4));
        fs.closeSync(fd)
    }

    copyUIFileToDestUIDirectoryIfNeeded(uiFile) {
        let uiFileExists = this.isDestUIFileExists(uiFile);

        if (uiFileExists && this.copyMode === CopyModes.Override) {
            this.copyUIFileToDestUIDirectory(uiFile)
        } else if (!uiFileExists) {
            this.copyUIFileToDestUIDirectory(uiFile)
        }

        if (uiFile.uiDescriptorFilePath) {
            let destUIDescriptorFileExists = this.isDestUIDescriptorFileExists(uiFile);
            if (destUIDescriptorFileExists && this.copyMode === CopyModes.Override) {
                this.copyUIDescriptorFileToDestUIDirectory(uiFile)
            } else if (!destUIDescriptorFileExists) {
                this.copyUIDescriptorFileToDestUIDirectory(uiFile)
            }
        } else if (this.generateUIFileDescriptor) {
            this.generateUIDescriptorFileIfNeeded(uiFile)
        }
    }

    copyUIFiles(modules) {
        modules.forEach((module) => {
            let uiFiles = module.uiFiles
            uiFiles.forEach((uiFile) => {
                this.copyUIFileToDestUIDirectoryIfNeeded(uiFile)
            })
        })
    }
}


let copyHelper = new UICopyHelper(CopyModes.Skip, true);
copyHelper.copyUIFiles(copyHelper.collectUIModules())
