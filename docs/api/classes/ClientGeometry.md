[bedrock-development](../README.md) / [Exports](../modules.md) / ClientGeometry

# Class: ClientGeometry

**`Remarks`**

The parent class for all Minecraft data types, i.e. MinecraftServerClient.

## Hierarchy

- [`MinecraftDataType`](MinecraftDataType.md)

  ↳ **`ClientGeometry`**

  ↳↳ [`ClientGeometryAttachable`](ClientGeometryAttachable.md)

## Implements

- [`IClientGeometry`](../interfaces/IClientGeometry.md)

## Indexable

▪ [key: [`GeometryName`](../modules.md#geometryname)]: [`IClientGeometryOld`](../interfaces/IClientGeometryOld.md)

## Table of contents

### Constructors

- [constructor](ClientGeometry.md#constructor)

### Properties

- [filePath](ClientGeometry.md#filepath)
- [format\_version](ClientGeometry.md#format_version)
- [minecraft:geometry](ClientGeometry.md#minecraft:geometry)

### Accessors

- [DirectoryPath](ClientGeometry.md#directorypath)

### Methods

- [replacer](ClientGeometry.md#replacer)
- [serialize](ClientGeometry.md#serialize)
- [toFile](ClientGeometry.md#tofile)
- [createFilePath](ClientGeometry.md#createfilepath)
- [createFromTemplate](ClientGeometry.md#createfromtemplate)
- [deserialize](ClientGeometry.md#deserialize)
- [fromFile](ClientGeometry.md#fromfile)
- [fromPathOrTemplate](ClientGeometry.md#frompathortemplate)

## Constructors

### constructor

• **new ClientGeometry**(`filepath`, `template`): [`ClientGeometry`](ClientGeometry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |
| `template` | [`IClientGeometry`](../interfaces/IClientGeometry.md) |

#### Returns

[`ClientGeometry`](ClientGeometry.md)

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[constructor](MinecraftDataType.md#constructor)

#### Defined in

[ts/app/types/client/geometry.ts:85](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L85)

## Properties

### filePath

• **filePath**: `string`

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[filePath](MinecraftDataType.md#filepath)

#### Defined in

[ts/app/types/minecraft.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L23)

___

### format\_version

• **format\_version**: \`$\{number}.$\{number}.$\{number}\`

#### Implementation of

[IClientGeometry](../interfaces/IClientGeometry.md).[format_version](../interfaces/IClientGeometry.md#format_version)

#### Defined in

[ts/app/types/client/geometry.ts:77](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L77)

___

### minecraft:geometry

• `Optional` **minecraft:geometry**: [`IClientGeometryNew`](../interfaces/IClientGeometryNew.md)[]

#### Implementation of

[IClientGeometry](../interfaces/IClientGeometry.md).[minecraft:geometry](../interfaces/IClientGeometry.md#minecraft:geometry)

#### Defined in

[ts/app/types/client/geometry.ts:78](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L78)

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

[ts/app/types/client/geometry.ts:81](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L81)

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

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFilePath](MinecraftDataType.md#createfilepath)

#### Defined in

[ts/app/types/client/geometry.ts:130](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L130)

___

### createFromTemplate

▸ **createFromTemplate**(`nameData`): [`ClientGeometry`](ClientGeometry.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameData` | [`NameData`](NameData.md) | The namedata to use for identifiers and the filepath. |

#### Returns

[`ClientGeometry`](ClientGeometry.md)

An instance of this data type.

**`Remarks`**

Creates a new instance of the data type using reasonable defaults from a [NameData](NameData.md).

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFromTemplate](MinecraftDataType.md#createfromtemplate)

#### Defined in

[ts/app/types/client/geometry.ts:99](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L99)

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
