[bedrock-development](../README.md) / [Exports](../modules.md) / ClientBlocks

# Class: ClientBlocks

**`Remarks`**

The parent class for all Minecraft data types, i.e. MinecraftServerClient.

## Hierarchy

- [`MinecraftDataType`](MinecraftDataType.md)

  ↳ **`ClientBlocks`**

## Implements

- [`IClientBlocks`](../interfaces/IClientBlocks.md)

## Indexable

▪ [key: [`Identifier`](../modules.md#identifier)]: [`IClientBlocksEntry`](../interfaces/IClientBlocksEntry.md)

## Table of contents

### Constructors

- [constructor](ClientBlocks.md#constructor)

### Properties

- [filePath](ClientBlocks.md#filepath)

### Accessors

- [DirectoryPath](ClientBlocks.md#directorypath)

### Methods

- [addBlock](ClientBlocks.md#addblock)
- [replacer](ClientBlocks.md#replacer)
- [serialize](ClientBlocks.md#serialize)
- [toFile](ClientBlocks.md#tofile)
- [createFilePath](ClientBlocks.md#createfilepath)
- [createFromTemplate](ClientBlocks.md#createfromtemplate)
- [deserialize](ClientBlocks.md#deserialize)
- [fileWithAddedBlock](ClientBlocks.md#filewithaddedblock)
- [fromFile](ClientBlocks.md#fromfile)
- [fromPathOrTemplate](ClientBlocks.md#frompathortemplate)

## Constructors

### constructor

• **new ClientBlocks**(`filepath`, `template`): [`ClientBlocks`](ClientBlocks.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |
| `template` | [`IClientBlocks`](../interfaces/IClientBlocks.md) |

#### Returns

[`ClientBlocks`](ClientBlocks.md)

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[constructor](MinecraftDataType.md#constructor)

#### Defined in

[ts/app/types/client/blocks.ts:48](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/blocks.ts#L48)

## Properties

### filePath

• **filePath**: `string`

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[filePath](MinecraftDataType.md#filepath)

#### Defined in

[ts/app/types/minecraft.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L23)

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

[ts/app/types/client/blocks.ts:44](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/blocks.ts#L44)

## Methods

### addBlock

▸ **addBlock**(`name`, `block`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | \`$\{string}:$\{string}\` |
| `block` | [`IClientBlocksEntry`](../interfaces/IClientBlocksEntry.md) |

#### Returns

`void`

#### Defined in

[ts/app/types/client/blocks.ts:73](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/blocks.ts#L73)

___

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

[ts/app/types/minecraft.ts:72](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L72)

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

[ts/app/types/minecraft.ts:63](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L63)

___

### toFile

▸ **toFile**(): [`File`](../modules.md#file)

#### Returns

[`File`](../modules.md#file)

A [File](../modules.md#file) object with this MinecraftDataType's filepath, and this object serialized as the file contents.

**`Remarks`**

Creates a [File](../modules.md#file) object from this MinecraftDataType.

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[toFile](MinecraftDataType.md#tofile)

#### Defined in

[ts/app/types/client/blocks.ts:69](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/blocks.ts#L69)

___

### createFilePath

▸ **createFilePath**(): `string`

#### Returns

`string`

The filepath as a string.

**`Remarks`**

Creates a filepath for this object type from a [NameData](NameData.md).

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFilePath](MinecraftDataType.md#createfilepath)

#### Defined in

[ts/app/types/client/blocks.ts:55](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/blocks.ts#L55)

___

### createFromTemplate

▸ **createFromTemplate**(): [`ClientBlocks`](ClientBlocks.md)

#### Returns

[`ClientBlocks`](ClientBlocks.md)

An instance of this data type.

**`Remarks`**

Creates a new instance of the data type using reasonable defaults from a [NameData](NameData.md).

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFromTemplate](MinecraftDataType.md#createfromtemplate)

#### Defined in

[ts/app/types/client/blocks.ts:59](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/blocks.ts#L59)

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

[ts/app/types/minecraft.ts:83](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L83)

___

### fileWithAddedBlock

▸ **fileWithAddedBlock**(`name`, `block`): [`File`](../modules.md#file)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | \`$\{string}:$\{string}\` |
| `block` | [`IClientBlocksEntry`](../interfaces/IClientBlocksEntry.md) |

#### Returns

[`File`](../modules.md#file)

#### Defined in

[ts/app/types/client/blocks.ts:63](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/blocks.ts#L63)

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

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[fromPathOrTemplate](MinecraftDataType.md#frompathortemplate)

#### Defined in

[ts/app/types/minecraft.ts:118](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L118)
