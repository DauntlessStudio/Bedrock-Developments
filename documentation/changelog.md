# Changelog
## [2.2.2] - 8/23/2023
Bug Fixes
## Fixed
- Fixed issue where `bed new item --type [armor_set | chestplate]` would generate with an incorrect enchantment slot for chestpieces.
---
## [2.2.1] - 8/6/2023
Bug Fixes, New Arguments, New Command
## Changes
- The `bed new sound` command now performs the same formatting process as the new command `bed sounds format` after adding new sounds.
- The `bed new item --type [armor_set | helmet | chestplate | leggings | boots]` command now creates armor set resource assets in formats that are easier for artists to modify.
## Added
- The `bed entity group --overwrite` argument has been added, changing the behavior from **merging** the new group with an old group of that name to **replacing** an old group of that name with the new group.
- The `bed entity group --no-add` argument has been added, using this argument prevents the `bed entity group` command from automatically generating an `add_group` event.
- The `bed entity group --no-remove` argument has been added, using this argument prevents the `bed entity group` command from automatically generating a `remove_group` event.
- The `bed sounds format` command has been added, allowing quick formatting of the `sound_definitions.json` file; alphabetizing the sounds, adding in default volume and pitch arguments, and enforcing that at least one sound in the list will have `load_on_low_memory: true`.
## Fixed
- Fixed issue where `bed new item --type [armor_set | helmet | chestplate | leggings | boots]` would generate with some undesired values.
---
## [2.1.1] - 5/4/2023
Bug Fixes, Argument Change.
## Changed
- The `bed entity --type` argument has been changed from accepting a single string for \<family type\> to instead accept an array of strings \<family type...\>. For an entity to be selected by this filter it must include **all** of the provided family types.
## Fixed
- Fixed issue where `bed entity --type` would not work for most entity commands.
- Fixed issue where `bed entity group` would fail if used on an entity without an event property.
---
## [2.1.0] - 4/12/2023
New Command, Bug Fixes.
## Added
- The `bed new sound` command has been added, allowing quick creation of sound definitions.
## Changed
- The `bed -v` argument has been changed to `bed -V` to prevent a bug that would cause the `-v` arguments in `bed new sound` and `bed entity property add` to display the version rather than perform the command.
## Fixed
- Fixed issue where `bed new vanilla` no longer worked after a GitHub API update.
- Fixed issue where `bed new vanilla *.json` would only grab about 20 entities.
---
## [2.0.0] - 3/7/2023
Major refactoring, bug fixes, and improvements across the board.
## Added
- The `bed new entity --type projectile` option has been added. This will automatically create an entity that can be fired as a projectle.
- The `bed new item --type usable` option has been added. This will automatically create a new function, and a player animation controller that will invoke that function when using the item.
- The `bed new function --origin` option has been added, this provides a comment specifying who @s is withing the function context.
- The `bed world export --type` option has been added, and can be specified as `world` or `template` to create a `.mcworld` or `.mctemplate` file respectively.
- The `bed world new` subcommand now has the additional options: `--bpack`, `--rpack`, and `--experimental` to streamline the process of adding packs to a new world.
- Any command that writes a `.json` file now supports the `$n` keyword, replacing instances where `$n` appears with the filename. For example `bed entity --file **/*.json --overwrite {minecraft:type_family:{family:[\"$n\"]}}` would overwrite the family type of every entity in the project with the name of its file.
## Changed
- The `bed new entity --type` option has been updated to accept full words rather than single characters.
- The `bed new entity` command will now automatically create a placeholder spawn egg texture when used with the `passive` or `hostile` `--type` options.
- The `bed new item --type projectile` option now will automatically create a new projectile entity, a player animation controller to detect interacting with the item, and a component group to spawn the new projectile on the player. 
- The `bed world export` and `bed world packs` commands now accept either and index or a world name to target the world. When using a name, it will target the first name in the worlds folder who's levelname.txt file matches the argument.
- Any command that writes an entry to `en_US.lang` will no longer add an entry if that entry is already present in the file.
- Many functions exposed to the API have had their parameters re-written to use interfaces. This is a breaking change.
- The `bed new block --emissive` argument now accepts values `[1-15]` instead of `[0.0-1.0]` to match the new `minecraft:light_emission` key that replaced the old `minecraft:block_light_emission` in block files.
## Fixed
- Fixed issue where worlds created with `bed new world` always had a seed of 0.
- Fixed issue where temporary folders created with `bed new world` weren't properly cleaned up.
---
## [1.3.0] - 3/7/2023
Added world subcommands, bug fixes.
## Added
- The `bed world list` command.
- The `bed world export` command.
- The `bed world packs` command.
- The `bed world new` command.
- The `bed new block` command has the new option `--geo` which will create a block with custom geo.
## Fixed
- Fixed issue where `bed entity group` used with the `$` decorator when the source file didn't have the decorated component would result in th `$` still being used in the group name i.e. `$minecraft:type_family`.
---
## [1.2.1] - 3/7/2023
Bug Fixes.
## Fixed
- Fixed issue where `bed entity group` an `bed entity component` would fail to parse `.`, so components like `minecraft:behavior.anything` would fail.
---
## [1.2.0] - 3/7/2023
Added decorator to `bed entity group` command.
## Changed
- Creating a new component group with the `bed entity group` command now supports merging components from the source file. `bed entity group {new_group:{$minecraft:type_family:{family:[\"test\"]}}} --file` for example will create a new component group called `new_group` and will copy the existing family type from the file and append `test` to the end. You can specify a component should **merge** rather than overwrite by putting the `$` decorator in front of the component name.
---
## [1.1.3] - 3/7/2023
Bug fixes.
## Fixed
- Fixed issue where `bed new item --type attachable` would fail to add a transition back to the `no_item` state after adding multiple attachables.

---
## [1.1.2] - 3/3/2023
Bug fixes.
## Fixed
- Fixed issue where `bed pkg import` always wrote lang file changes to `en_US.lang` instead of the file on the package.

---
## [1.1.1] - 3/2/2023
Bug fixes.
## Fixed
- The version check was still checking the old CLI tool. Now it correctly checks your version for this project.
- The `bin` was not specified for this project, so it could not be run with `bed`.

---
## [1.1.0] - 3/2/2023
This version deprecates the standalone [CLI Tool](https://github.com/DauntlessStudio/Bedrock-Development-CLI) in favor of folding the CLI directly into this project.
## Added
- The CLI tool in its entirety, ported from [here](https://github.com/DauntlessStudio/Bedrock-Development-CLI).
- The `bed new entity` command has two new options: `--no-geo` and `--no-texture` wich prevents the command from making a new geo and texture file respectively when used with `--client`.
- The `bed new item`'s `type` option can accept a new value `attachable` which for now is identical to `weapon`, but in the future will create a basic item with an attachable, while weapon will create an item with damage values, durability, etc.'
- The `bed entity property add` command has a new option: `--event` which streamlines the old flow of running `bed entity property add` to create your properties, and `bed entity property event` to create events to set the values. Now adding `--event` will automatically add an event for every valid value a property can have (everything within its `range`, or everything in its `values`). Though you may still want to use `bed entity property event` if you want to create events that set the value to things like `q.property('property_name') + 1`.
## Changed
- All commands with a `--lang` option have been changed. Adding a lang entry is now the default, and the `--no-lang` has to be used if you don't want a lang entry.
- All commands with a `--file` option have been changed. `--file` is now a mandatory field, and the command cannot be run without it. Providing `--file` without a value still affects all entities, but making the option required should reduce the chance of accidentally affecting all entities in a project without meaning to.
- Updated documentation to have more details and additional examples.
## Fixed
- Fixed typos both in documenation and command help