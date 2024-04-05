[bedrock-development](../README.md) / [Exports](../modules.md) / NameData

# Class: NameData

**`Remarks`**

A class for working with name data like identifiers.

## Table of contents

### Constructors

- [constructor](NameData.md#constructor)

### Properties

- [directory](NameData.md#directory)
- [display](NameData.md#display)
- [fullname](NameData.md#fullname)
- [namespace](NameData.md#namespace)
- [original](NameData.md#original)
- [shortname](NameData.md#shortname)
- [projectName](NameData.md#projectname)
- [teamName](NameData.md#teamname)

### Accessors

- [ProjectName](NameData.md#projectname-1)
- [TeamName](NameData.md#teamname-1)

### Methods

- [splitWords](NameData.md#splitwords)
- [setAddonNamespace](NameData.md#setaddonnamespace)

## Constructors

### constructor

• **new NameData**(`name`): [`NameData`](NameData.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The source string to create namedata from. |

#### Returns

[`NameData`](NameData.md)

**`Remarks`**

Creates a namedata object from a source string.

**`Example`**

```typescript
let name = new NameData("subfolder/minecraft:test");
```

#### Defined in

[ts/app/utils.ts:74](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L74)

## Properties

### directory

• **directory**: `string`

**`Remarks`**

The directory name of the source string, i.e. `subfolder/`.

#### Defined in

[ts/app/utils.ts:50](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L50)

___

### display

• **display**: `string`

**`Remarks`**

The display name of the source string as used in the lang, i.e. `Test`.

#### Defined in

[ts/app/utils.ts:45](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L45)

___

### fullname

• **fullname**: `string`

**`Remarks`**

The full identifier of the source string, i.e. `minecraft:test`.

#### Defined in

[ts/app/utils.ts:30](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L30)

___

### namespace

• **namespace**: `string`

**`Remarks`**

The namespace of the source stirng, i.e. `minecraft:test`.

#### Defined in

[ts/app/utils.ts:35](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L35)

___

### original

• **original**: `string`

**`Remarks`**

The original source string, i.e. `subfolder/minecraft:test`.

#### Defined in

[ts/app/utils.ts:25](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L25)

___

### shortname

• **shortname**: `string`

**`Remarks`**

The shortname of the source string, i.e. `test` from either `minecraft:test` or `geometry.test`.

#### Defined in

[ts/app/utils.ts:40](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L40)

___

### projectName

▪ `Static` `Private` **projectName**: `string` = `''`

#### Defined in

[ts/app/utils.ts:20](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L20)

___

### teamName

▪ `Static` `Private` **teamName**: `string` = `''`

#### Defined in

[ts/app/utils.ts:19](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L19)

## Accessors

### ProjectName

• `get` **ProjectName**(): `string`

#### Returns

`string`

**`Remarks`**

The name of the Project

#### Defined in

[ts/app/utils.ts:62](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L62)

___

### TeamName

• `get` **TeamName**(): `string`

#### Returns

`string`

**`Remarks`**

The name of the development team.

#### Defined in

[ts/app/utils.ts:55](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L55)

## Methods

### splitWords

▸ **splitWords**(`name`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`[]

#### Defined in

[ts/app/utils.ts:97](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L97)

___

### setAddonNamespace

▸ **setAddonNamespace**(`namespace`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`void`

#### Defined in

[ts/app/utils.ts:102](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/utils.ts#L102)
