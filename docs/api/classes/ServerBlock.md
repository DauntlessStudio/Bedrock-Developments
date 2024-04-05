[bedrock-development](../README.md) / [Exports](../modules.md) / ServerBlock

# Class: ServerBlock

**`Remarks`**

The parent class for all Minecraft data types, i.e. MinecraftServerClient.

## Hierarchy

- [`MinecraftDataType`](MinecraftDataType.md)

  ↳ **`ServerBlock`**

## Implements

- [`IServerBlock`](../interfaces/IServerBlock.md)

## Table of contents

### Constructors

- [constructor](ServerBlock.md#constructor)

### Properties

- [filePath](ServerBlock.md#filepath)
- [format\_version](ServerBlock.md#format_version)
- [minecraft:block](ServerBlock.md#minecraft:block)

### Accessors

- [DirectoryPath](ServerBlock.md#directorypath)

### Methods

- [replacer](ServerBlock.md#replacer)
- [serialize](ServerBlock.md#serialize)
- [setDisplayData](ServerBlock.md#setdisplaydata)
- [setExplosionResistance](ServerBlock.md#setexplosionresistance)
- [setFriction](ServerBlock.md#setfriction)
- [setLightEmission](ServerBlock.md#setlightemission)
- [setLootTable](ServerBlock.md#setloottable)
- [toFile](ServerBlock.md#tofile)
- [createFilePath](ServerBlock.md#createfilepath)
- [createFromTemplate](ServerBlock.md#createfromtemplate)
- [deserialize](ServerBlock.md#deserialize)
- [fromFile](ServerBlock.md#fromfile)
- [fromPathOrTemplate](ServerBlock.md#frompathortemplate)

## Constructors

### constructor

• **new ServerBlock**(`filepath`, `template`): [`ServerBlock`](ServerBlock.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |
| `template` | [`IServerBlock`](../interfaces/IServerBlock.md) |

#### Returns

[`ServerBlock`](ServerBlock.md)

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[constructor](MinecraftDataType.md#constructor)

#### Defined in

[ts/app/types/server/blocks.ts:114](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L114)

## Properties

### filePath

• **filePath**: `string`

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[filePath](MinecraftDataType.md#filepath)

#### Defined in

[ts/app/types/minecraft.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L23)

___

### format\_version

• **format\_version**: \`$\{number}.$\{number}.$\{number}\`

#### Implementation of

[IServerBlock](../interfaces/IServerBlock.md).[format_version](../interfaces/IServerBlock.md#format_version)

#### Defined in

[ts/app/types/server/blocks.ts:100](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L100)

___

### minecraft:block

• **minecraft:block**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `components` | [`IServerBlockComponents`](../interfaces/IServerBlockComponents.md) |
| `description` | [`IServerBlockDescription`](../interfaces/IServerBlockDescription.md) |
| `permutations?` | \{ `components`: [`IServerBlockComponents`](../interfaces/IServerBlockComponents.md) ; `condition`: `string`  }[] |

#### Implementation of

[IServerBlock](../interfaces/IServerBlock.md).[minecraft:block](../interfaces/IServerBlock.md#minecraft:block)

#### Defined in

[ts/app/types/server/blocks.ts:101](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L101)

## Accessors

### DirectoryPath

• `get` **DirectoryPath**(): `string`

#### Returns

`string`

**`Remarks`**

The directory where this type of file is kept.

#### Overrides

MinecraftDataType.DirectoryPath

#### Defined in

[ts/app/types/server/blocks.ts:110](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L110)

## Methods

### replacer

▸ **replacer**(`key`, `value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`any`

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[replacer](MinecraftDataType.md#replacer)

#### Defined in

[ts/app/types/minecraft.ts:72](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L72)

___

### serialize

▸ **serialize**(): `string`

#### Returns

`string`

A string representation of this object.

**`Remarks`**

Serializes this object to a string.

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[serialize](MinecraftDataType.md#serialize)

#### Defined in

[ts/app/types/minecraft.ts:63](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L63)

___

### setDisplayData

▸ **setDisplayData**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | [`NameData`](NameData.md) |

#### Returns

`void`

#### Defined in

[ts/app/types/server/blocks.ts:132](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L132)

___

### setExplosionResistance

▸ **setExplosionResistance**(`resistance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resistance` | `number` \| `boolean` |

#### Returns

`void`

#### Defined in

[ts/app/types/server/blocks.ts:142](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L142)

___

### setFriction

▸ **setFriction**(`friction?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `friction` | `number` | `0.4` |

#### Returns

`void`

#### Defined in

[ts/app/types/server/blocks.ts:152](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L152)

___

### setLightEmission

▸ **setLightEmission**(`emission`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `emission` | `number` |

#### Returns

`void`

#### Defined in

[ts/app/types/server/blocks.ts:156](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L156)

___

### setLootTable

▸ **setLootTable**(`table?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `table` | `string` | `"loot_tables/blocks/empty.json"` |

#### Returns

`void`

#### Defined in

[ts/app/types/server/blocks.ts:160](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L160)

___

### toFile

▸ **toFile**(`handleExisting?`): [`File`](../modules.md#file)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handleExisting?` | ``"overwrite"`` \| ``"overwrite_silent"`` | How to handle existing files. Undefined will not overwrite, 'overwite' replaces the file with this object, 'overwrite_silent' does the same with no terminal log. |

#### Returns

[`File`](../modules.md#file)

A [File](../modules.md#file) object with this MinecraftDataType's filepath, and this object serialized as the file contents.

**`Remarks`**

Creates a [File](../modules.md#file) object from this MinecraftDataType.

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[toFile](MinecraftDataType.md#tofile)

#### Defined in

[ts/app/types/minecraft.ts:98](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L98)

___

### createFilePath

▸ **createFilePath**(`nameData`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameData` | [`NameData`](NameData.md) | The namedata to use when creating the filepath. |

#### Returns

`string`

The filepath as a string.

**`Remarks`**

Creates a filepath for this object type from a [NameData](NameData.md).

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[createFilePath](MinecraftDataType.md#createfilepath)

#### Defined in

[ts/app/types/minecraft.ts:46](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L46)

___

### createFromTemplate

▸ **createFromTemplate**(`nameData`): [`ServerBlock`](ServerBlock.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameData` | [`NameData`](NameData.md) | The namedata to use for identifiers and the filepath. |

#### Returns

[`ServerBlock`](ServerBlock.md)

An instance of this data type.

**`Remarks`**

Creates a new instance of the data type using reasonable defaults from a [NameData](NameData.md).

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFromTemplate](MinecraftDataType.md#createfromtemplate)

#### Defined in

[ts/app/types/server/blocks.ts:120](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L120)

___

### deserialize

▸ **deserialize**\<`T`\>(`create`, `filepath`, `json`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `create` | (`filePath`: `string`, `template`: `any`) => `T` | The child of MinecraftDataType to create. |
| `filepath` | `string` | The filepath the MinecraftDataType can be written to with [toFile](MinecraftDataType.md#tofile). |
| `json` | `string` | The source string this should be deserialized from. |

#### Returns

`T`

An instance of the MinecraftDataType child provided.

**`Remarks`**

Creates an instace of a MinecraftDataType child from a source string, used in [fromFile](MinecraftDataType.md#fromfile).

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[deserialize](MinecraftDataType.md#deserialize)

#### Defined in

[ts/app/types/minecraft.ts:83](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L83)

___

### fromFile

▸ **fromFile**\<`T`\>(`create`, `file`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `create` | (`filePath`: `string`, `template`: `any`) => `T` | The child of MinecraftDataType to create. |
| `file` | [`File`](../modules.md#file) | The [File](../modules.md#file) object used to deserialize into this object. |

#### Returns

`T`

An instance of the MinecraftDataType child provided.

**`Remarks`**

Crates an instance of a MinecraftDataTypeChild from a [File](../modules.md#file).

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[fromFile](MinecraftDataType.md#fromfile)

#### Defined in

[ts/app/types/minecraft.ts:108](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L108)

___

### fromPathOrTemplate

▸ **fromPathOrTemplate**\<`T`\>(`create`, `path`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `create` | (`filePath`: `string`, `template`: `any`) => `T` | The child of MinecraftDataType to create. |
| `path` | `string` | The filepath to create the object from. |

#### Returns

`T`

The deserialized file as a child of MinecraftDataType, or this object's [createFromTemplate](MinecraftDataType.md#createfromtemplate) default if the file doesn't exist.

**`Remarks`**

Creates a MinecraftDataType object from a filepath, or a template if that filepath doesn't exist.

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[fromPathOrTemplate](MinecraftDataType.md#frompathortemplate)

#### Defined in

[ts/app/types/minecraft.ts:118](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L118)
