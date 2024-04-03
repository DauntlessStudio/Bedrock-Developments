# Commands
Comprehensive list of all commands, with example uses.
- Commands
  - [General (bed)](#general-usage)
    - Create New Files
        - [Create New Entity (bed new entity)](new/entity.md#new-entity)
        - [Create New Item (bed new item)](new/item.md#new-item)
        - [Create New Block (bed new block)](new/block.md#new-block)
        - [Create New Animation (bed new anim)](new/animation.md#new-animation)
        - [Create New Animation Controller (bed new ctrl)](new/controller.md#new-animation-controller)
        - [Create New Function (bed new function)](new/function.md#new-function)
        - [Create New Sound Definition (bed new sound)](new/sound.md#new-sound)
    - Modify Entities
        - [Entity Animation or Controller Reference (bed entity anim)](entity/animation.md#entity-animation-or-controller-reference)
        - [Add Component Groups To Entities (bed entity group)](entity/group.md#entity-component-group)
        - [Add Components To Entities (bed entity component)](entity/component.md#entity-component)
        - [Add Damage Sensors To Entities (bed entity sensor)](entity/damage_sensor.md#entity-damage-sensor)
        - [Add Properties To Entities (bed entity property)](entity/property.md#entity-properties)
    - Edit Worlds
        - [List Worlds (bed world list)](world/list.md#world-list)
        - [Export World (bed world export)](world/export.md#world-export)
        - [Add Packs To World (bed world packs)](world/packs.md#world-packs)
        - [Create New World (bed world new)](world/new.md#world-new)
    - Project Formatting

## General Usage
CLI to assist Minecraft Bedrock Development. This is the root command, and all other commands are subcommands of this. At the root, you can specify certain paramaters that are globally used, like the paths to the Behavior Pack and Resource Pack, or the namespace used for an addon project.

In most use cases, the `--rpath` and `--bpath` are not needed, as when used within a project, the paths will be automatically determined.

The root command has the version and help arguments.

```
Usage: bed [options] [command]

Options:
  --rpath <rp>               path to resource pack
  --bpath <bp>               path to behavior pack
  --addon <addon namespace>  namespace for addon content as <team_name>_<project_name>
  -V, --version              output the version number
  -h, --help                 display help for command

Commands:
  new                        creates new bedrock files
  entity                     modifies bedrock entities
  world                      tools for working with worlds
  format                     project formatting commands
```
### Example(s)
---
```
bed -V
```
This outputs the current version of the tool, such as `1.0.0`.

---
```
bed -h
```
This outputs the basic help, listing the available options and subcommands.

&nbsp;