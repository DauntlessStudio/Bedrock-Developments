#! /usr/bin/env node
import { runProgram } from './app/commands';

// // #region Entity Commands
// entity.command('anim')
//   .description('adds an animation or animation controller reference to entities')
//   .argument('<names...>', 'animation names as "entity.anim"')
//   .option('-t, --type <family type...>', 'filter entities by family type')
//   .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
//   .option('-s, --script', 'should these animations be added to script')
//   .addOption(new Option('-c, --create [anim type]', 'create the animation as well').choices(['ctrl', 'anim']).preset('ctrl'))
//   .action(triggerEntityAddAnim)
//   .hook('postAction', printVersion);

// entity.command('group')
//   .description('adds a component group to entities')
//   .argument('<group>', 'the component group as a json object {group_name:{minecraft:is_baby:{}}}')
//   .option('-t, --type <family type...>', 'filter entities by family type')
//   .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
//   .option('-o, --overwrite', 'should the new component group overwrite the old one rather than merge with it')
//   .option('--no-add', 'do not add an "add" event')
//   .option('--no-remove', 'do not add an "remove" event')
//   .action(triggerEntityAddGroup)
//   .hook('postAction', printVersion);

// entity.command('component')
//   .description('adds a component to entities')
//   .argument('<component>', 'the component as a json object {minecraft:is_baby:{}}')
//   .option('-t, --type <family type...>', 'filter entities by family type')
//   .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
//   .option('-o, --overwrite', 'should the new component overwrite the old one rather than merge with it')
//   .action(triggerEntityAddComponent)
//   .hook('postAction', printVersion);

// entity.command('sensor')
//   .description('adds a damage sensor to entities')
//   .argument('<sensor>', 'the damage sensor as a json object {cause: \\"all\\", deals_damage: false}')
//   .option('-t, --type <family type...>', 'filter entities by family type')
//   .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
//   .option('-s, --start', 'adds the new sensor to the start of the array, rather than the end')
//   .action(triggerEntityAddDamageSensor)
//   .hook('postAction', printVersion);

// let property = entity.command('property')
//   .description('adds property or property events to entities');

// property.command('add')
//   .description('adds a property to entities')
//   .argument('<names...>', 'property names as "namespace:property"')
//   .option('-t, --type <family type...>', 'filter entities by family type')
//   .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
//   .addOption(new Option('-p, --property <property type>', 'the type of property').choices(['bool', 'enum', 'float', 'int']).default('bool'))
//   .option('-v, --values <values...>', 'the values, either a list of enum values or a min-max')
//   .option('-d, --default <default>', 'the default value')
//   .option('-c, --client', 'should use client_sync')
//   .option('-e, --event', 'automatically generate events for the values')
//   .action(triggerEntityAddProperty)
//   .hook('postAction', printVersion);

// property.command('event')
//   .description('adds a property event to entities')
//   .argument('<values...>', 'the values to set the property to')
//   .option('-t, --type <family type...>', 'filter entities by family type')
//   .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
//   .addOption(new Option('-p, --property <property name>', 'the name of the property to set').makeOptionMandatory(true))
//   .option('-e, --event <event name>', 'a custom event name, otherwise defaults to "set_property_to_value')
//   .action(triggerEntityAddPropertyEvent)
//   .hook('postAction', printVersion);
// // #endregion

// // #region Package Commands
// let pkg = program.command('pkg')
//   .description('package manager for bedrock files');

// pkg.command('list')
//   .description('list packages at repo')
//   .option('-d, --detailed', 'gets extra details about the package, if available')
//   .option('-f --filter <filter>', 'filter the packages by name or category')
//   .action(triggerPackagesList)
//   .hook('postAction', printVersion);

// pkg.command('import')
//   .description('import packages from repo')
//   .argument('<packages...>', 'the packages to import as either index value or name')
//   .action(triggerPackagesImport)
//   .hook('postAction', printVersion);

// // #endregion

// // #region World Commands
// let world = program.command('world')
//   .description('tools for working with worlds');

// world.command('list')
//   .description('list installed worlds')
//   .action(triggerWorldsList)
//   .hook('postAction', printVersion);

// world.command('export')
//   .description('export selected world as .mcworld')
//   .addArgument(new Argument('<name|index>', 'the name or index of world to add packs to'))
//   .option('-p, --packs', "package the world's behavior and resource packs")
//   .addOption(new Option('-t, --type <export type>', 'what format should be exported').default(World.exportType.world).choices(Object.values(World.exportType)))
//   .action(triggerWorldsExport)
//   .hook('postAction', printVersion);

// world.command('packs')
//   .description('attach packs to world')
//   .addArgument(new Argument('<name|index>', 'the name or index of world to add packs to'))
//   .addOption(new Option('-b, --bpack <folder name>', 'the name of the behavior pack to add'))
//   .addOption(new Option('-r, --rpack <folder name>', 'the name of the resource pack to add'))
//   .addOption(new Option('-d, --delete', 'should the packs be removed'))
//   .addOption(new Option('-e, --experimental [toggle]', 'turn on experimental toggle').preset(World.experimentalToggle.betaAPI).choices(Object.values(World.experimentalToggle)))
//   .action(triggerWorldsPacks)
//   .hook('postAction', printVersion);

// world.command('new')
//   .description('create new world')
//   .addArgument(new Argument('<name>', 'the world name'))
//   .addOption(new Option('-t, --test', 'create a test world with pre-configured gamerules'))
//   .addOption(new Option('-f, --flat', 'create a flat world'))
//   .addOption(new Option('-m, --mode <gamemode>', 'gamemode').choices(Object.keys(World.gameMode)))
//   .addOption(new Option('-b, --bpack <folder name>', 'the name of the behavior pack to add'))
//   .addOption(new Option('-r, --rpack <folder name>', 'the name of the resource pack to add'))
//   .addOption(new Option('-e, --experimental [toggle]', 'turn on experimental toggle').preset(World.experimentalToggle.betaAPI).choices(Object.values(World.experimentalToggle)))
//   .action(triggerWorldsNew)
//   .hook('postAction', printVersion);

// // #endregion

// // #region Sounds Commands
// let sounds = program.command('sounds')
//   .description('modifies bedrock sounds');

// sounds.command('format')
//   .description('formats the sound_definitions.json file')
//   .action(triggerSoundsFormat)
//   .hook('postAction', printVersion);
// // #endregion

runProgram();

// // #region Triggers
// async function triggerEntityAddGroup(group: string, options: OptionValues) {
//   await setPaths();
//   const family = options.type;
//   const file = options.file;
//   const overwrite = options.overwrite;
//   const add_event = options.add
//   const remove_event = options.remove
//   await Entity.entityAddGroup(group, {family: family, file: file}, {overwrite, add_event, remove_event});
// }

// async function triggerEntityAddComponent(component: string, options: OptionValues) {
//   await setPaths();
//   const family = options.type;
//   const file = options.file;
//   const overwrite = options.overwrite;
//   await Entity.entityAddComponent(component, {family: family, file: file}, overwrite);
// }

// async function triggerEntityAddProperty(names: string[], options: OptionValues) {
//   await setPaths();
//   const type = options.type;
//   const file = options.file;
//   const property = options.property;
//   const values = options.values;
//   const default_value = options.default;
//   const client = options.client;
//   const event = options.event;
//   await Entity.entityAddProperty(names, {family: type, file: file}, property, values, default_value, client, event);
// }

// async function triggerEntityAddPropertyEvent(names: string[], options: OptionValues) {
//   await setPaths();
//   const type = options.type;
//   const file = options.file;
//   const property = options.property;
//   const event = options.event;
//   await Entity.entityAddPropertyEvent(names, {family: type, file: file}, property, event);
// }

// async function triggerEntityAddDamageSensor(sensor: string, options: OptionValues) {
//   await setPaths();
//   const type = options.type;
//   const file = options.file;
//   const start = options.start;
//   await Entity.entityAddDamageSensor(sensor, {family: type, file: file}, start);
// }

// async function triggerPackagesList(options: OptionValues) {
//   const verbose = options.detailed;
//   const filter = options.filter;

//   try {
//     let response = await Package.packageList(filter);

//     for (const pkg of response) {
//       console.log(`[${pkg.index}] ${Global.chalk.green(`${pkg.display_name}`)}`);
//       if (verbose && pkg.description) {
//         console.log(`\t${pkg.description}`)
//       }
//     }
//   } catch (error) {
//     console.log(`${Global.chalk.red(`GITHUB_TOKEN either missing or invalid`)}`);
//     console.log(`${Global.chalk.yellow('Create Token at: https://github.com/settings/tokens/new')}`);
//     console.log(`${Global.chalk.yellow('Paste Token into new Environment Variable called GITHUB_TOKEN')}`);
//   }
// }

// async function triggerPackagesImport(names: string[]) {
//   await setPaths();
//   try {
//     await Package.packageImport(names);
//   } catch (error) {
//     console.log(`${Global.chalk.red(`GITHUB_TOKEN either missing or invalid`)}`);
//     console.log(`${Global.chalk.yellow('Create Token at: https://github.com/settings/tokens/new')}`);
//     console.log(`${Global.chalk.yellow('Paste Token into new Environment Variable called GITHUB_TOKEN')}`);
//   }
// }

// async function triggerCreateVanillaEntity(names: string[], options: OptionValues) {
//   await setPaths();
//   const client = options.client;
//   await Entity.createVanillaEntity(names, client);
// }

// async function triggerWorldsList() {
//   let worlds = World.worldList();
//   worlds.forEach((value, index) => {
//     console.log(`[${index}] ${Global.chalk.green(`${value.name}`)}`);
//   })
// }

// async function triggerWorldsExport(world: string, options: OptionValues) {
//   const packs = options.packs;
//   const type = options.type;

//   World.worldExport({name: world}, packs, type);
// }

// async function triggerWorldsPacks(world: string, options: OptionValues) {
//   if (options.delete) {
//     await World.worldRemovePacks({name: world, behavior_pack: options.bpack, resource_pack: options.rpack, experimental: options.experimental});
//   } else {
//     await World.worldAddPacks({name: world, behavior_pack: options.bpack, resource_pack: options.rpack, experimental: options.experimental});
//   }
// }

// async function triggerWorldsNew(name: string, options: OptionValues) {
//   World.worldNew(name, {behavior_pack: options.bpack, resource_pack: options.rpack, experimental: options.experimental, testworld: options.test, flatworld: options.flat, gamemode: options.mode});
// }

// async function triggerSoundsFormat(name: string, options: OptionValues) {
//   await setPaths();
//   await Sound.soundsFormat();
// }
// // #endregion

// async function printVersion() {
//   let result = await axios.get('https://registry.npmjs.org/bedrock-development/latest');
//   let latest_version = result.data.version;
//   if (version !== latest_version) {
//     console.log(`${Global.chalk.yellow(`A new release of bed is available:`)} ${Global.chalk.cyan(`${version} → ${latest_version}`)}`);
//     console.log(`${Global.chalk.yellow('npm i bedrock-development@latest -g')}`);
//   }
// }