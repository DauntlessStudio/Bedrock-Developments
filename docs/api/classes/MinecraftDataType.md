[bedrock-development](../README.md) / [Exports](../modules.md) / MinecraftDataType

# Class: MinecraftDataType

**`Remarks`**

The parent class for all Minecraft data types, i.e. MinecraftServerClient.

## Hierarchy

- **`MinecraftDataType`**

  ↳ [`ClientAnimation`](ClientAnimation.md)

  ↳ [`ClientAnimationController`](ClientAnimationController.md)

  ↳ [`ClientAttachable`](ClientAttachable.md)

  ↳ [`ClientEntity`](ClientEntity.md)

  ↳ [`ClientGeometry`](ClientGeometry.md)

  ↳ [`ClientItem`](ClientItem.md)

  ↳ [`ClientRenderController`](ClientRenderController.md)

  ↳ [`ClientSoundDefinitions`](ClientSoundDefinitions.md)

  ↳ [`ClientItemTexture`](ClientItemTexture.md)

  ↳ [`ClientTerrainTexture`](ClientTerrainTexture.md)

  ↳ [`ClientBlocks`](ClientBlocks.md)

  ↳ [`ServerAnimation`](ServerAnimation.md)

  ↳ [`ServerAnimationController`](ServerAnimationController.md)

  ↳ [`ServerBlock`](ServerBlock.md)

  ↳ [`ServerDialogue`](ServerDialogue.md)

  ↳ [`ServerEntity`](ServerEntity.md)

  ↳ [`ServerItem`](ServerItem.md)

  ↳ [`ServerLootTable`](ServerLootTable.md)

## Table of contents

### Constructors

- [constructor](MinecraftDataType.md#constructor)

### Properties

- [filePath](MinecraftDataType.md#filepath)

### Accessors

- [DirectoryPath](MinecraftDataType.md#directorypath)

### Methods

- [replacer](MinecraftDataType.md#replacer)
- [serialize](MinecraftDataType.md#serialize)
- [toFile](MinecraftDataType.md#tofile)
- [createFilePath](MinecraftDataType.md#createfilepath)
- [createFromTemplate](MinecraftDataType.md#createfromtemplate)
- [deserialize](MinecraftDataType.md#deserialize)
- [fromFile](MinecraftDataType.md#fromfile)
- [fromPathOrTemplate](MinecraftDataType.md#frompathortemplate)

## Constructors

### constructor

• **new MinecraftDataType**(`filePath`, `template`): [`MinecraftDataType`](MinecraftDataType.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | The filepath to where this object should be written to. |
| `template` | `any` | The object it should be created from. |

#### Returns

[`MinecraftDataType`](MinecraftDataType.md)

**`Remarks`**

Creates a new MinecraftDataType from a file path and object.

#### Defined in

[ts/app/types/minecraft.ts:37](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L37)

## Properties

### filePath

• **filePath**: `string`

#### Defined in

[ts/app/types/minecraft.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L23)

## Accessors

### DirectoryPath

• `get` **DirectoryPath**(): `string`

#### Returns

`string`

**`Remarks`**

The directory where this type of file is kept.

#### Defined in

[ts/app/types/minecraft.ts:28](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L28)

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

#### Defined in

[ts/app/types/minecraft.ts:72](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L72)

___

### serialize

▸ **serialize**(): `string`

#### Returns

`string`

A string representation of this object.

**`Remarks`**

Serializes this object to a string.

#### Defined in

[ts/app/types/minecraft.ts:63](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L63)

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

#### Defined in

[ts/app/types/minecraft.ts:98](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L98)

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

#### Defined in

[ts/app/types/minecraft.ts:46](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L46)

___

### createFromTemplate

▸ **createFromTemplate**(`nameData`): [`MinecraftDataType`](MinecraftDataType.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameData` | [`NameData`](NameData.md) | The namedata to use for identifiers and the filepath. |

#### Returns

[`MinecraftDataType`](MinecraftDataType.md)

An instance of this data type.

**`Remarks`**

Creates a new instance of the data type using reasonable defaults from a [NameData](NameData.md).

#### Defined in

[ts/app/types/minecraft.ts:55](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L55)

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

#### Defined in

[ts/app/types/minecraft.ts:83](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L83)

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

#### Defined in

[ts/app/types/minecraft.ts:108](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L108)

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

#### Defined in

[ts/app/types/minecraft.ts:118](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L118)
