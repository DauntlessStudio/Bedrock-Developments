#! /usr/bin/env node
import { runProgram } from './app/commands';

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