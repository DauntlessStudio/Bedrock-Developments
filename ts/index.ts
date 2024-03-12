#! /usr/bin/env node
import { runProgram } from './app/commands';


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