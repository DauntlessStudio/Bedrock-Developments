# Changelog
---
## [1.1.0] - 3/2/2023
---
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