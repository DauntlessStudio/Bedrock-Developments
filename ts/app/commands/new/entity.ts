import { Directories, File, copySourceFile, setFiles } from "../../file_manager.js";
import { NameData, implementConfig } from "../../utils.js";
import { ClientEntity, ClientGeometry, ServerEntity } from "../../types/index.js";
import { LangFile } from "../../types/index.js";
import { CommandMap } from "../command_map.js";

export interface NewEntityOptions {
    lang: boolean;
    client: boolean;
    geo: boolean;
    texture: boolean;
    override: boolean;
}

CommandMap.addCommand<string[], NewEntityOptions>("root.new.entity", {
    parent: CommandMap.getCommandEntry("root.new")?.command,
    commandOptions(command) {
        command
        .name("entity")
        .description("creates new bedrock entities")
        .argument("<names...>", 'entity names as "namespace:entity"')
        .option("--no-lang", "do not add lang file")
        .option("-c, --client", "create client entity in the resource path. Will also create a default geo and texture for the entity")
        .option("--no-geo", "do not add geo file")
        .option("--no-texture", "do not add texture file")
        .option("-o, --override");
    },
    commandAction: triggerCreateNewEntity
});

function triggerCreateNewEntity(names: string[], options: NewEntityOptions) {
    implementConfig();

    names.forEach((name) => {
        const nameData = new NameData(name);
        const files: File[] = [];

        const serverEntity = ServerEntity.createFromTemplate(nameData);
        files.push(serverEntity.toFile());
        
        if (options.client) {
            files.push(ClientEntity.createFromTemplate(nameData).toFile());
        }

        if (options.client && options.geo) {
            files.push(ClientGeometry.createFromTemplate(new NameData(`entity/${nameData.directory}${nameData.shortname}`)).toFile());
        }

        if (options.client && options.texture) {
            copySourceFile('images/uv_texture.png', Directories.RESOURCE_PATH + 'textures/' + Directories.ADDON_PATH + 'entity/' + nameData.directory + nameData.shortname + '/default.png');
        }

        if (options.lang) {
            files.push(...LangFile.addToAllLangs('entity names', `entity.${nameData.fullname}.name=${nameData.display}`).files);
        }

        if (options.override) files.forEach(file => file.handleExisting = "overwrite");
        setFiles(files);
    });
}