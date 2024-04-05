[bedrock-development](../README.md) / [Exports](../modules.md) / IServerBlock

# Interface: IServerBlock

## Implemented by

- [`ServerBlock`](../classes/ServerBlock.md)

## Table of contents

### Properties

- [format\_version](IServerBlock.md#format_version)
- [minecraft:block](IServerBlock.md#minecraft:block)

## Properties

### format\_version

• **format\_version**: \`$\{number}.$\{number}.$\{number}\`

#### Defined in

[ts/app/types/server/blocks.ts:8](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L8)

___

### minecraft:block

• **minecraft:block**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `components` | [`IServerBlockComponents`](IServerBlockComponents.md) |
| `description` | [`IServerBlockDescription`](IServerBlockDescription.md) |
| `permutations?` | \{ `components`: [`IServerBlockComponents`](IServerBlockComponents.md) ; `condition`: `string`  }[] |

#### Defined in

[ts/app/types/server/blocks.ts:9](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L9)
