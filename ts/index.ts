#! /usr/bin/env node
import {Argument, Command, Option, OptionValues} from 'commander';
import * as Global from './app/globals';
import * as Entity from './app/entity';
import * as Item from './app/item';
import * as Block from './app/block';
import * as Animation from './app/animations';
import * as Function from './app/functions';
import * as Sound from './app/sounds';
import * as Package from './app/package_manager';
import * as World from './app/world';
import axios from 'axios';

let program = new Command();
const version = '2.2.5'

program
  .name('bed')
  .description('CLI to assist Minecraft Bedrock development')
  .option('--rpath <rp>', 'Path to Resource Pack')
  .on('option:rpath', Global.setResourcePath)
  .option('--bpath <bp>', 'Path to Behavior Pack')
  .on('option:bpath', Global.setBehaviorPath)
  .option('-i, --indent <number>', 'set indent tabs level for JSON files', '1')
  .on('option:indent', Global.setIndentLevel)
  .version(version, '-V, --version')
  .action(printVersion)

// #region New Commands
let createNew = program.command('new')
  .description('creates new bedrock files');

createNew.command('entity')
  .description('creates new bedrock entities')
  .argument('<names...>', 'entity names as "namespace:entity"')
  .option('--no-lang', 'do not add lang file')
  .addOption(new Option('-t, --type <type>', 'set entity type',).choices(Object.keys(Entity.entityType)).default(Entity.entityType.dummy))
  .option('-c, --client', 'create client entity in the resource path. Will also create a default geo and texture for the entity')
  .option('--no-geo', 'do not add geo file')
  .option('--no-texture', 'do not add texture file')
  .action(triggerCreateNewEntity)
  .hook('postAction', printVersion);

createNew.command('item')
  .description('creates new bedrock items')
  .argument('<names...>', 'item names as "namespace:item"')
  .option('--no-lang', 'do not add lang file')
  .option('-s, --stack <stack_size>', 'max stack size', '64')
  .addOption(new Option('-t, --type <item_type>', 'basic').choices(Object.keys(Item.itemType)))
  .action(triggerCreateNewItem)
  .hook('postAction', printVersion);

createNew.command('block')
  .description('creates new bedrock blocks')
  .argument('<names...>', 'block names as "namespace:block"')
  .option('--no-lang', 'do not add lang file')
  .option('-e, --emissive <emission>', 'block emmission level [1-15]')
  .option('-t, --table', 'create a loot table')
  .option('-g, --geo', 'create a custom geo')
  .action(triggerCreateNewBlock)
  .hook('postAction', printVersion);

createNew.command('anim')
  .description('creates new bedrock behavior animations')
  .argument('<names...>', 'animation names names as "entity.anim"')
  .option('-l, --loop', 'should the animation loop')
  .addOption(new Option('-c, --commands <commands...>', 'the commands to play').default(['/say anim_name']))
  .addOption(new Option('-t, --time <time>', 'the animation length').default(1.0).argParser(parseFloat))
  .action(triggerCreateNewAnimation)
  .hook('postAction', printVersion);

createNew.command('ctrl')
  .description('creates new bedrock behavior animation controllers')
  .argument('<names...>', 'controller names as "entity.anim"')
  .addOption(new Option('-e, --entry [on entry commands...]', 'the commands to play on entry').default(['/say anim_name']))
  .addOption(new Option('-x, --exit [on exit commands...]', 'the commands to play on exit').preset(['/say anim_name']))
  .option('-a, --anim <animations...>', 'the animations to play')
  .option('-q, --query [query]', 'the query to transition from default', 'true')
  .addOption(new Option('-t, --transition [transition]', 'the query to transition back to default').preset('true'))
  .action(triggerCreateNewController)
  .hook('postAction', printVersion);

createNew.command('function')
  .description('creates new bedrock functions')
  .argument('<names...>', 'function names as "foo/bar"')
  .option('-c, --commands <commands>', 'the function commands, seperated by ";"')
  .option('-n, --number <number>', 'the number of times commands should be created in the files', '1')
  .option('-d, --description <description>', 'the description of the function, used as a comment')
  .option('-s, --source <source>', 'where is this function called from, used as a comment')
  .option('-o, --origin <origin>', 'who is @s within this function, used as a comment')
  .addHelpText('before', 'special characters can be used to provide additional formatting. $(F)f inserts the filename into the command, $(I)i inserts the index of the batch generated command')
  .action(triggerCreateNewFunction)
  .hook('postAction', printVersion);

createNew.command('sound')
  .description('creates a new sound definition')
  .argument('<names...>', 'definition names as category.sound')
  .addOption(new Option('-c, --category <category>', 'the sound category').choices(Object.keys(Sound.soundCategory)).default(Sound.soundCategory.neutral))
  .option('-f, --filepath <filepath>', 'the filepath to use for this sound, if a directory is specified it will use all files in that directory')
  .option('-v, --vanilla <vanilla definition>', 'the name of a vanilla sound definition, this will create a copy of the vanilla definition using the new name')
  .action(triggerCreateNewSoundDefinition)
  .hook('postAction', printVersion);

createNew.command('vanilla')
  .description('imports a vanilla bedrock entity')
  .argument('<names...>', 'entity files as "player.json"')
  .option('-c, --client', 'create client entity in the resource path. Will also create a default geo and texture for the entity')
  .action(triggerCreateVanillaEntity)
  .hook('postAction', printVersion);
// #endregion

// #region Entity Commands
let entity = program.command('entity')
  .description('modifies bedrock entities');

entity.command('anim')
  .description('adds an animation or animation controller reference to entities')
  .argument('<names...>', 'animation names as "entity.anim"')
  .option('-t, --type <family type...>', 'filter entities by family type')
  .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
  .option('-s, --script', 'should these animations be added to script')
  .addOption(new Option('-c, --create [anim type]', 'create the animation as well').choices(['ctrl', 'anim']).preset('ctrl'))
  .action(triggerEntityAddAnim)
  .hook('postAction', printVersion);

entity.command('group')
  .description('adds a component group to entities')
  .argument('<group>', 'the component group as a json object {group_name:{minecraft:is_baby:{}}}')
  .option('-t, --type <family type...>', 'filter entities by family type')
  .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
  .option('-o, --overwrite', 'should the new component group overwrite the old one rather than merge with it')
  .option('--no-add', 'do not add an "add" event')
  .option('--no-remove', 'do not add an "remove" event')
  .action(triggerEntityAddGroup)
  .hook('postAction', printVersion);

entity.command('component')
  .description('adds a component to entities')
  .argument('<component>', 'the component as a json object {minecraft:is_baby:{}}')
  .option('-t, --type <family type...>', 'filter entities by family type')
  .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
  .option('-o, --overwrite', 'should the new component overwrite the old one rather than merge with it')
  .action(triggerEntityAddComponent)
  .hook('postAction', printVersion);

entity.command('sensor')
  .description('adds a damage sensor to entities')
  .argument('<sensor>', 'the damage sensor as a json object {cause: \\"all\\", deals_damage: false}')
  .option('-t, --type <family type...>', 'filter entities by family type')
  .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
  .option('-s, --start', 'adds the new sensor to the start of the array, rather than the end')
  .action(triggerEntityAddDamageSensor)
  .hook('postAction', printVersion);

let property = entity.command('property')
  .description('adds property or property events to entities');

property.command('add')
  .description('adds a property to entities')
  .argument('<names...>', 'property names as "namespace:property"')
  .option('-t, --type <family type...>', 'filter entities by family type')
  .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
  .addOption(new Option('-p, --property <property type>', 'the type of property').choices(['bool', 'enum', 'float', 'int']).default('bool'))
  .option('-v, --values <values...>', 'the values, either a list of enum values or a min-max')
  .option('-d, --default <default>', 'the default value')
  .option('-c, --client', 'should use client_sync')
  .option('-e, --event', 'automatically generate events for the values')
  .action(triggerEntityAddProperty)
  .hook('postAction', printVersion);

property.command('event')
  .description('adds a property event to entities')
  .argument('<values...>', 'the values to set the property to')
  .option('-t, --type <family type...>', 'filter entities by family type')
  .addOption(new Option('-f, --file [file]', 'the entity files that should be modified').makeOptionMandatory().preset('**/*.json'))
  .addOption(new Option('-p, --property <property name>', 'the name of the property to set').makeOptionMandatory(true))
  .option('-e, --event <event name>', 'a custom event name, otherwise defaults to "set_property_to_value')
  .action(triggerEntityAddPropertyEvent)
  .hook('postAction', printVersion);
// #endregion

// #region Package Commands
let pkg = program.command('pkg')
  .description('package manager for bedrock files');

pkg.command('list')
  .description('list packages at repo')
  .option('-d, --detailed', 'gets extra details about the package, if available')
  .option('-f --filter <filter>', 'filter the packages by name or category')
  .action(triggerPackagesList)
  .hook('postAction', printVersion);

pkg.command('import')
  .description('import packages from repo')
  .argument('<packages...>', 'the packages to import as either index value or name')
  .action(triggerPackagesImport)
  .hook('postAction', printVersion);

// #endregion

// #region World Commands
let world = program.command('world')
  .description('tools for working with worlds');

world.command('list')
  .description('list installed worlds')
  .action(triggerWorldsList)
  .hook('postAction', printVersion);

world.command('export')
  .description('export selected world as .mcworld')
  .addArgument(new Argument('<name|index>', 'the name or index of world to add packs to'))
  .option('-p, --packs', "package the world's behavior and resource packs")
  .addOption(new Option('-t, --type <export type>', 'what format should be exported').default(World.exportType.world).choices(Object.values(World.exportType)))
  .action(triggerWorldsExport)
  .hook('postAction', printVersion);

world.command('packs')
  .description('attach packs to world')
  .addArgument(new Argument('<name|index>', 'the name or index of world to add packs to'))
  .addOption(new Option('-b, --bpack <folder name>', 'the name of the behavior pack to add'))
  .addOption(new Option('-r, --rpack <folder name>', 'the name of the resource pack to add'))
  .addOption(new Option('-d, --delete', 'should the packs be removed'))
  .addOption(new Option('-e, --experimental [toggle]', 'turn on experimental toggle').preset(World.experimentalToggle.betaAPI).choices(Object.values(World.experimentalToggle)))
  .action(triggerWorldsPacks)
  .hook('postAction', printVersion);

world.command('new')
  .description('create new world')
  .addArgument(new Argument('<name>', 'the world name'))
  .addOption(new Option('-t, --test', 'create a test world with pre-configured gamerules'))
  .addOption(new Option('-f, --flat', 'create a flat world'))
  .addOption(new Option('-m, --mode <gamemode>', 'gamemode').choices(Object.keys(World.gameMode)))
  .addOption(new Option('-b, --bpack <folder name>', 'the name of the behavior pack to add'))
  .addOption(new Option('-r, --rpack <folder name>', 'the name of the resource pack to add'))
  .addOption(new Option('-e, --experimental [toggle]', 'turn on experimental toggle').preset(World.experimentalToggle.betaAPI).choices(Object.values(World.experimentalToggle)))
  .action(triggerWorldsNew)
  .hook('postAction', printVersion);

// #endregion

// #region Sounds Commands
let sounds = program.command('sounds')
  .description('modifies bedrock sounds');

sounds.command('format')
  .description('formats the sound_definitions.json file')
  .action(triggerSoundsFormat)
  .hook('postAction', printVersion);
// #endregion

program.parse();

async function setPaths() {
  if (!Global.set_paths) {
    await Global.setResourcePath(undefined);
    await Global.setBehaviorPath(undefined);
  }
}

// #region Triggers
async function triggerCreateNewEntity(names: string[], options: OptionValues) {
  await setPaths();
  const type = options.type;
  const lang = options.lang;
  const geo = options.geo;
  const texture = options.texture;
  const client = options.client;
  await Entity.createNewEntity(names, lang, {client: client, type: type, geo: geo, texture: texture});
}

async function triggerCreateNewItem(names: string[], options: OptionValues) {
  await setPaths();
  const lang = options.lang;
  const stack = options.stack;
  const type = options.type as Item.itemType;
  await Item.createNewItem(names, lang, stack, type);
}

async function triggerCreateNewBlock(names: string[], options: OptionValues) {
  await setPaths();
  const lang = options.lang;
  const emissive = options.emissive;
  const table = options.table;
  const geo = options.geo;
  await Block.createNewBlock(names, lang, {emissive: emissive, table: table, geo: geo});
}

async function triggerCreateNewAnimation(names: string[], options: OptionValues) {
  await setPaths();
  const loop = options.loop;
  const commands = options.commands;
  const time = options.time;
  await Animation.createNewAnimation(names, loop, commands, time);
}

async function triggerCreateNewController(names:string[], options: OptionValues) {
  await setPaths();
  const entry = options.entry;
  const exit = options.exit;
  const anim = options.anim;
  const query = options.query;
  const transition = options.transition;
  await Animation.createNewController(names, entry, exit, anim, query, transition);
}

async function triggerCreateNewSoundDefinition(names: string[], options: OptionValues) {
  await setPaths();
  const category = options.category;
  const vanilla = options.vanilla;
  const filepath = options.filepath;
  await Sound.createNewSoundDefinition(names, {category: category, vanilla: vanilla, filepath: filepath});
}

async function triggerCreateNewFunction(names: string[], options: OptionValues) {
  await setPaths();
  const commands = options.commands;
  const number = options.number;
  const description = options.description;
  const source = options.source;
  const origin = options.origin;
  await Function.createNewFunction(names, commands, number, {description: description, source: source, origin: origin});
}

async function triggerEntityAddAnim(names: string[], options: OptionValues) {
  await setPaths();
  const family = options.type;
  const file = options.file;
  const script = options.script;
  const create = options.create;
  await Entity.entityAddAnim(names, {family: family, file: file}, script, create);
}

async function triggerEntityAddGroup(group: string, options: OptionValues) {
  await setPaths();
  const family = options.type;
  const file = options.file;
  const overwrite = options.overwrite;
  const add_event = options.add
  const remove_event = options.remove
  await Entity.entityAddGroup(group, {family: family, file: file}, {overwrite, add_event, remove_event});
}

async function triggerEntityAddComponent(component: string, options: OptionValues) {
  await setPaths();
  const family = options.type;
  const file = options.file;
  const overwrite = options.overwrite;
  await Entity.entityAddComponent(component, {family: family, file: file}, overwrite);
}

async function triggerEntityAddProperty(names: string[], options: OptionValues) {
  await setPaths();
  const type = options.type;
  const file = options.file;
  const property = options.property;
  const values = options.values;
  const default_value = options.default;
  const client = options.client;
  const event = options.event;
  await Entity.entityAddProperty(names, {family: type, file: file}, property, values, default_value, client, event);
}

async function triggerEntityAddPropertyEvent(names: string[], options: OptionValues) {
  await setPaths();
  const type = options.type;
  const file = options.file;
  const property = options.property;
  const event = options.event;
  await Entity.entityAddPropertyEvent(names, {family: type, file: file}, property, event);
}

async function triggerEntityAddDamageSensor(sensor: string, options: OptionValues) {
  await setPaths();
  const type = options.type;
  const file = options.file;
  const start = options.start;
  await Entity.entityAddDamageSensor(sensor, {family: type, file: file}, start);
}

async function triggerPackagesList(options: OptionValues) {
  const verbose = options.detailed;
  const filter = options.filter;

  try {
    let response = await Package.packageList(filter);

    for (const pkg of response) {
      console.log(`[${pkg.index}] ${Global.chalk.green(`${pkg.display_name}`)}`);
      if (verbose && pkg.description) {
        console.log(`\t${pkg.description}`)
      }
    }
  } catch (error) {
    console.log(`${Global.chalk.red(`GITHUB_TOKEN either missing or invalid`)}`);
    console.log(`${Global.chalk.yellow('Create Token at: https://github.com/settings/tokens/new')}`);
    console.log(`${Global.chalk.yellow('Paste Token into new Environment Variable called GITHUB_TOKEN')}`);
  }
}

async function triggerPackagesImport(names: string[]) {
  await setPaths();
  try {
    await Package.packageImport(names);
  } catch (error) {
    console.log(`${Global.chalk.red(`GITHUB_TOKEN either missing or invalid`)}`);
    console.log(`${Global.chalk.yellow('Create Token at: https://github.com/settings/tokens/new')}`);
    console.log(`${Global.chalk.yellow('Paste Token into new Environment Variable called GITHUB_TOKEN')}`);
  }
}

async function triggerCreateVanillaEntity(names: string[], options: OptionValues) {
  await setPaths();
  const client = options.client;
  await Entity.createVanillaEntity(names, client);
}

async function triggerWorldsList() {
  let worlds = World.worldList();
  worlds.forEach((value, index) => {
    console.log(`[${index}] ${Global.chalk.green(`${value.name}`)}`);
  })
}

async function triggerWorldsExport(world: string, options: OptionValues) {
  const packs = options.packs;
  const type = options.type;

  World.worldExport({name: world}, packs, type);
}

async function triggerWorldsPacks(world: string, options: OptionValues) {
  if (options.delete) {
    await World.worldRemovePacks({name: world, behavior_pack: options.bpack, resource_pack: options.rpack, experimental: options.experimental});
  } else {
    await World.worldAddPacks({name: world, behavior_pack: options.bpack, resource_pack: options.rpack, experimental: options.experimental});
  }
}

async function triggerWorldsNew(name: string, options: OptionValues) {
  World.worldNew(name, {behavior_pack: options.bpack, resource_pack: options.rpack, experimental: options.experimental, testworld: options.test, flatworld: options.flat, gamemode: options.mode});
}

async function triggerSoundsFormat(name: string, options: OptionValues) {
  await setPaths();
  await Sound.soundsFormat();
}
// #endregion

async function printVersion() {
  let result = await axios.get('https://registry.npmjs.org/bedrock-development/latest');
  let latest_version = result.data.version;
  if (version !== latest_version) {
    console.log(`${Global.chalk.yellow(`A new release of bed is available:`)} ${Global.chalk.cyan(`${version} → ${latest_version}`)}`);
    console.log(`${Global.chalk.yellow('npm i bedrock-development@latest -g')}`);
  }
}