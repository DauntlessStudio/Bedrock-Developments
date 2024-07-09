import { Argument } from "commander";
import { Directories, File, copySourceFile, setFiles } from "../../file_manager.js";
import { v4 } from "uuid";
import axios from "axios";
import { CommandMap } from "../command_map.js";

export interface NewProjectOptions {
    display: string;
    author: string;
}

CommandMap.addCommand<string, NewProjectOptions>("root.new.project", {
    parent: CommandMap.getCommandEntry("root.new")?.command,
    commandOptions(command) {
        command
        .name("project")
        .description("creates a minecraft development project")
        .addArgument(new Argument("<name>", 'the project name, folders will be output as "behavior_packs/<name>_bp" and "behavior_packs/<name>_rp"'))
        .option("-d, --display <display name>", "A display name to be used in your lang file, if different from your folder names")
        .option("-a, --author <author name>", "The credits name as a team or an individual");
    },
    commandAction: triggerCreateNewProject,
});

async function triggerCreateNewProject(name: string, options: NewProjectOptions) {
    const bpFiles: File[] = [];
    const rpFiles: File[] = [];
    const rootFiles: File[] = [];

    const bpUUID = v4();
    const rpUUID = v4();

    Directories.BEHAVIOR_PATH = `Content/world_template/behavior_packs/${name}_bp`;
    Directories.RESOURCE_PATH = `Content/world_template/resource_packs/${name}_rp`;

    const displayName: string = options.display ?? name;
    const author: string = options.author;

    // Create Default Behavior Pack Files
    const bpManifest = {
        format_version: 2,
        header: {
            name: "pack.name",
            description: "pack.description",
            uuid: bpUUID,
            pack_scope: "world",
            version: [1, 0, 0],
            min_engine_version: [1, 20, 71]
        },
        modules: [
            {
                type: "data",
                uuid: v4(),
                version: [1, 0, 0]
            },
            {
                language: "javascript",
                type: "script",
                uuid: v4(),
                version: [1, 0, 0],
                entry: "scripts/main.js"
            }
        ],
        dependencies: [
            {
                module_name: "@minecraft/server",
                version: await getnpmLatestVersion("@minecraft/server")
            },
            {
                module_name: "@minecraft/server-ui",
                version: await getnpmLatestVersion("@minecraft/server-ui")
            },
            {
                uuid: rpUUID,
                version: [1, 0, 0]
            }
        ]
    };

    bpFiles.push(
        {filePath: `${Directories.BEHAVIOR_PATH}manifest.json`, fileContents: JSON.stringify(bpManifest, null, '\t')},
        {filePath: `${Directories.BEHAVIOR_PATH}texts/languages.json`, fileContents: JSON.stringify(["en_US"], null, '\t')},
        {filePath: `${Directories.BEHAVIOR_PATH}texts/en_US.lang`, fileContents: `${`## BEHAVIOR PACK MANIFEST `.padEnd(118, '=')}\npack.name=${displayName}\npack.description=This behavior pack is required for ${displayName} to run properly.`}
    );
    setFiles(bpFiles);
    copySourceFile('images/pack_icon.png', Directories.BEHAVIOR_PATH + 'pack_icon.png');

    // Create Default Resource Pack Files
    const rpManifest = {
        format_version: 2,
        header: {
            name: "pack.name",
            description: "pack.description",
            uuid: rpUUID,
            pack_scope: "world",
            version: [1, 0, 0],
            min_engine_version: [1, 20, 71]
        },
        modules: [
            {
                type: "resources",
                uuid: v4(),
                version: [1, 0, 0]
            }
        ],
        dependencies: [
            {
                uuid: bpUUID,
                version: [1, 0, 0]
            }
        ]
    };

    rpFiles.push(
        {filePath: `${Directories.RESOURCE_PATH}manifest.json`, fileContents: JSON.stringify(rpManifest, null, '\t')},
        {filePath: `${Directories.RESOURCE_PATH}texts/languages.json`, fileContents: JSON.stringify(["en_US"], null, '\t')},
        {filePath: `${Directories.RESOURCE_PATH}texts/en_US.lang`, fileContents: `${`## RESOURCE PACK MANIFEST `.padEnd(118, '=')}\npack.name=${displayName}\npack.description=This resource pack is required for ${displayName} to run properly.`}
    );
    setFiles(rpFiles);
    copySourceFile('images/pack_icon.png', Directories.RESOURCE_PATH + 'pack_icon.png');

    // Create General Files
    const rootManifest = {
        format_version: 2,
        header: {
            name: "pack.name",
            description: "pack.description",
            uuid: v4(),
            lock_template_options: true,
            version: [1, 0, 0],
            base_game_version: [1, 20, 71]
        },
        modules: [
            {
                type: "world_template",
                uuid: v4(),
                version: [1, 0, 0]
            }
        ],
        metadata: {
            authors: [
                author
            ]
        }
    };

    rootFiles.push(
        {filePath: `Content/world_template/manifest.json`, fileContents: JSON.stringify(rootManifest, null, '\t')},
        {filePath: `Content/world_template/world_behavior_packs.json`, fileContents: JSON.stringify([{pack_id: bpUUID, version: [1, 0, 0]}], null, '\t')},
        {filePath: `Content/world_template/world_resource_packs.json`, fileContents: JSON.stringify([{pack_id: rpUUID, version: [1, 0, 0]}], null, '\t')},
        {filePath: `Content/world_template/texts/languages.json`, fileContents: JSON.stringify(["en_US"], null, '\t')},
        {filePath: `Content/world_template/texts/en_US.lang`, fileContents: `pack.name=${displayName}\npack.description=By ${author}`},
    );
    setFiles(rootFiles);
}

async function getnpmLatestVersion(pack: string) {
    const result = await axios.get(`https://registry.npmjs.org/${pack}/latest`);
    return result.data.version;
}