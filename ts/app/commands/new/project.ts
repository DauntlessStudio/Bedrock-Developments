import { Argument } from "commander";
import { Directories, File, copySourceFile, setFiles } from "../../file_manager.js";
import { v4 } from "uuid";
import { CommandMap } from "../command_map.js";
import { BehaviorManifest, ResourceManifest, SkinsManifest, WorldManifest } from "../../types/manifest.js";

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
    const skinFiles: File[] = [];

    const bpUUID = v4();
    const rpUUID = v4();

    Directories.BEHAVIOR_PATH = `Content/world_template/behavior_packs/${name}_bp`;
    Directories.RESOURCE_PATH = `Content/world_template/resource_packs/${name}_rp`;

    const displayName: string = options.display ?? name;

    // Create Default Behavior Pack Files
    const bpManifest = BehaviorManifest.createFromTemplate();
    bpManifest.header.uuid = bpUUID;
    bpManifest.addDependencies([rpUUID], ["@minecraft/server", "@minecraft/server-ui"]);

    bpFiles.push(
        bpManifest.toFile(),
        {filePath: `${Directories.BEHAVIOR_PATH}texts/languages.json`, fileContents: JSON.stringify(["en_US"], null, '\t')},
        {filePath: `${Directories.BEHAVIOR_PATH}texts/en_US.lang`, fileContents: `${`## BEHAVIOR PACK MANIFEST `.padEnd(118, '=')}\npack.name=${displayName}\npack.description=This behavior pack is required for ${displayName} to run properly.`}
    );
    copySourceFile('images/pack_icon.png', Directories.BEHAVIOR_PATH + 'pack_icon.png');
    setFiles(bpFiles);

    // Create Default Resource Pack Files
    const rpManifest = ResourceManifest.createFromTemplate();
    rpManifest.header.uuid = rpUUID;
    rpManifest.addDependencies([bpUUID]);

    rpFiles.push(
        rpManifest.toFile(),
        {filePath: `${Directories.RESOURCE_PATH}texts/languages.json`, fileContents: JSON.stringify(["en_US"], null, '\t')},
        {filePath: `${Directories.RESOURCE_PATH}texts/en_US.lang`, fileContents: `${`## RESOURCE PACK MANIFEST `.padEnd(118, '=')}\npack.name=${displayName}\npack.description=This resource pack is required for ${displayName} to run properly.`}
    );
    copySourceFile('images/pack_icon.png', Directories.RESOURCE_PATH + 'pack_icon.png');
    setFiles(rpFiles);

    // Create General Files
    const rootManifest = WorldManifest.createFromTemplate();
    rootManifest.addAuthors([options.author]);

    rootFiles.push(
        rootManifest.toFile(),
        {filePath: `Content/world_template/world_behavior_packs.json`, fileContents: JSON.stringify([{pack_id: bpUUID, version: [1, 0, 0]}], null, '\t')},
        {filePath: `Content/world_template/world_resource_packs.json`, fileContents: JSON.stringify([{pack_id: rpUUID, version: [1, 0, 0]}], null, '\t')},
        {filePath: `Content/world_template/texts/languages.json`, fileContents: JSON.stringify(["en_US"], null, '\t')},
        {filePath: `Content/world_template/texts/en_US.lang`, fileContents: `pack.name=${displayName}\npack.description=By ${options.author}`},
        {filePath: `.vscode/launch.json`, fileContents: JSON.stringify({
            version: "0.3.0",
            configurations: [
                {
                  type: "minecraft-js",
                  request: "attach",
                  name: "Debug with Minecraft",
                  mode: "listen",
                  targetModuleUuid: bpUUID,
                  localRoot: `\${workspaceFolder}/Content/world_template/behavior_packs/${name}_bp/scripts/`,
                  port: 19144
                }
            ]
        }, null, '\t')},
    );
    setFiles(rootFiles);

    // Create Skin Pack Files
    const skinsManifest = SkinsManifest.createFromTemplate();
    skinFiles.push(
        skinsManifest.toFile(),
        {filePath: `Content/skin_pack/skins.json`, fileContents: JSON.stringify({serialize_name: options.author, localization_name: options.author, skins: [
            {
                localization_name: "template",
                geometry: "geometry.humanoid.custom",
                texture: "template.png",
                type: "paid"
            }
        ]}, null, '\t')},
        {filePath: `Content/skin_pack/texts/languages.json`, fileContents: JSON.stringify(["en_US"], null, '\t')},
        {filePath: `Content/skin_pack/texts/en_US.lang`, fileContents: `skin.${options.author}.template=Template\nskinpack.${options.author}=${options.display}`},
    );
    copySourceFile('images/skin.png', 'Content/skin_pack/template.png');
    setFiles(skinFiles);
}