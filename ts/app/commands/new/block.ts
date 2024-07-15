import { NameData, implementConfig } from "../../utils.js";
import { Directories, File, copySourceFile, setFiles } from "../../file_manager.js";
import { ClientBlocks, ClientGeometry, ClientTerrainTexture, Identifier, ServerAnimation, ServerBlock, ServerLootTable } from "../../types/index.js";
import { LangFile } from "../../types/index.js";
import { CommandMap } from "../command_map.js";
import { Option } from "commander";

export interface NewBlockOptions {
    lang: boolean;
    emissive?: number;
    table: boolean;
    geo: boolean;
    override: boolean;
}

CommandMap.addCommand<string[], NewBlockOptions>("root.new.block", {
    parent: CommandMap.getCommandEntry("root.new")?.command,
    commandOptions(command) {
        command
        .name("block")
        .description("creates new bedrock blocks")
        .argument("<names...>", 'block names as "namespace:block"')
        .option("--no-lang", "do not add lang file")
        .addOption(new Option("-e, --emissive <emission>", "block emmission level [1-15]").argParser(parseInt))
        .option("-t, --table", "create a loot table")
        .option("-g, --geo", "create a custom geo")
        .option("-o, --override");
    },
    commandAction: triggerCreateNewBlock,
});

function triggerCreateNewBlock(names: string[], options: NewBlockOptions) { // TODO: Add template file creators to types files, add textures to item/terrain texture
    implementConfig();

    names.forEach((name) => {
        const nameData = new NameData(name);
        const files: File[] = []; 
        const block = ServerBlock.createFromTemplate(nameData);

        block.setDisplayData(nameData);
        block.setFriction()   

        if (options.emissive !== undefined) {
            block.setLightEmission(options.emissive);
        } 
        if (options.table) {
            block.setLootTable(`loot_tables/${Directories.ADDON_PATH}blocks/${nameData.directory}${nameData.shortname}.json`);
            files.push(ServerLootTable.createFromTemplate(nameData).toFile());
        } else {
            block.setLootTable();
        } 
        if (options.lang) {
            files.push(...LangFile.addToAllLangs('block names', `tile.${nameData.fullname}.name=${nameData.display}`).files);
        } 
        if (options.geo) {
            copySourceFile('images/uv_texture.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + nameData.directory + 'blocks/' + nameData.shortname + '.png');
            files.push(ClientGeometry.createFromTemplate(nameData).toFile());
        } else {
            copySourceFile('images/sprite.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + nameData.directory + 'blocks/' + nameData.shortname + '.png');
        } 

        files.push(block.toFile());
        files.push(ClientBlocks.fileWithAddedBlock(nameData.fullname as Identifier, {sound: "stone", textures: nameData.shortname}));
        files.push(ClientTerrainTexture.fileWithAddedTexture(nameData.shortname, 'textures/' + Directories.ADDON_PATH + nameData.directory + 'blocks/' + nameData.shortname));
        
        if (options.override) files.forEach(file => file.handleExisting = "overwrite");
        setFiles(files);
    });
}