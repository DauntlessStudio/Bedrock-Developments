[bedrock-development](../README.md) / [Exports](../modules.md) / IServerEntity

# Interface: IServerEntity

## Implemented by

- [`ServerEntity`](../classes/ServerEntity.md)

## Table of contents

### Properties

- [format\_version](IServerEntity.md#format_version)
- [minecraft:entity](IServerEntity.md#minecraft:entity)

## Properties

### format\_version

• **format\_version**: \`$\{number}.$\{number}.$\{number}\`

#### Defined in

[ts/app/types/server/entity.ts:14](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L14)

___

### minecraft:entity

• **minecraft:entity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `component_groups?` | [`IServerEntityComponentGroups`](IServerEntityComponentGroups.md) |
| `components` | [`IServerEntityComponents`](IServerEntityComponents.md) |
| `description` | [`IServerEntityDescription`](IServerEntityDescription.md) |
| `events` | [`IServerEntityEvents`](IServerEntityEvents.md) |

#### Defined in

[ts/app/types/server/entity.ts:15](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L15)
