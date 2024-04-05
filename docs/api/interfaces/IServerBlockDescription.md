[bedrock-development](../README.md) / [Exports](../modules.md) / IServerBlockDescription

# Interface: IServerBlockDescription

## Table of contents

### Properties

- [identifier](IServerBlockDescription.md#identifier)
- [is\_experimental](IServerBlockDescription.md#is_experimental)
- [menu\_category](IServerBlockDescription.md#menu_category)
- [register\_to\_creative\_menu](IServerBlockDescription.md#register_to_creative_menu)
- [states](IServerBlockDescription.md#states)
- [traits](IServerBlockDescription.md#traits)

## Properties

### identifier

• **identifier**: \`$\{string}:$\{string}\`

#### Defined in

[ts/app/types/server/blocks.ts:20](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L20)

___

### is\_experimental

• `Optional` **is\_experimental**: `boolean`

#### Defined in

[ts/app/types/server/blocks.ts:22](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L22)

___

### menu\_category

• `Optional` **menu\_category**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `category` | `string` |
| `group?` | `string` |
| `is_hidden_in_commands?` | `boolean` |

#### Defined in

[ts/app/types/server/blocks.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L23)

___

### register\_to\_creative\_menu

• `Optional` **register\_to\_creative\_menu**: `boolean`

#### Defined in

[ts/app/types/server/blocks.ts:21](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L21)

___

### states

• `Optional` **states**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[ts/app/types/server/blocks.ts:28](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L28)

___

### traits

• `Optional` **traits**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[ts/app/types/server/blocks.ts:31](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L31)
