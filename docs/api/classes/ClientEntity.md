[bedrock-development](../README.md) / [Exports](../modules.md) / ClientEntity

# Class: ClientEntity

**`Remarks`**

The parent class for all Minecraft data types, i.e. MinecraftServerClient.

## Hierarchy

- [`MinecraftDataType`](MinecraftDataType.md)

  ↳ **`ClientEntity`**

## Implements

- [`IClientEntity`](../interfaces/IClientEntity.md)

## Table of contents

### Constructors

- [constructor](ClientEntity.md#constructor)

### Properties

- [filePath](ClientEntity.md#filepath)
- [format\_version](ClientEntity.md#format_version)
- [minecraft:client\_entity](ClientEntity.md#minecraft:client_entity)

### Accessors

- [DirectoryPath](ClientEntity.md#directorypath)

### Methods

- [addAnimateScript](ClientEntity.md#addanimatescript)
- [addAnimation](ClientEntity.md#addanimation)
- [addGeometry](ClientEntity.md#addgeometry)
- [addInitializeVariable](ClientEntity.md#addinitializevariable)
- [addMaterials](ClientEntity.md#addmaterials)
- [addPreAnimationVariable](ClientEntity.md#addpreanimationvariable)
- [addPublicVariable](ClientEntity.md#addpublicvariable)
- [addRenderController](ClientEntity.md#addrendercontroller)
- [replacer](ClientEntity.md#replacer)
- [serialize](ClientEntity.md#serialize)
- [toFile](ClientEntity.md#tofile)
- [upgradeFormatVersion](ClientEntity.md#upgradeformatversion)
- [createFilePath](ClientEntity.md#createfilepath)
- [createFromTemplate](ClientEntity.md#createfromtemplate)
- [deserialize](ClientEntity.md#deserialize)
- [fromFile](ClientEntity.md#fromfile)
- [fromPathOrTemplate](ClientEntity.md#frompathortemplate)

## Constructors

### constructor

• **new ClientEntity**(`filepath`, `template`): [`ClientEntity`](ClientEntity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |
| `template` | [`IClientEntity`](../interfaces/IClientEntity.md) |

#### Returns

[`ClientEntity`](ClientEntity.md)

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[constructor](MinecraftDataType.md#constructor)

#### Defined in

[ts/app/types/client/entity.ts:66](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L66)

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

[IClientEntity](../interfaces/IClientEntity.md).[format_version](../interfaces/IClientEntity.md#format_version)

#### Defined in

[ts/app/types/client/entity.ts:57](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L57)

___

### minecraft:client\_entity

• **minecraft:client\_entity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | [`IClientEntityDescription`](../interfaces/IClientEntityDescription.md) |

#### Implementation of

[IClientEntity](../interfaces/IClientEntity.md).[minecraft:client_entity](../interfaces/IClientEntity.md#minecraft:client_entity)

#### Defined in

[ts/app/types/client/entity.ts:58](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L58)

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

[ts/app/types/client/entity.ts:62](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L62)

## Methods

### addAnimateScript

▸ **addAnimateScript**(`...animations`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...animations` | (`string` \| \{ `[key: string]`: `string`;  })[] |

#### Returns

`void`

#### Defined in

[ts/app/types/client/entity.ts:171](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L171)

___

### addAnimation

▸ **addAnimation**(`...animations`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...animations` | \{ `name`: `string` ; `reference`: `string`  }[] |

#### Returns

`void`

#### Defined in

[ts/app/types/client/entity.ts:163](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L163)

___

### addGeometry

▸ **addGeometry**(`...geometry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...geometry` | \{ `name`: `string` ; `reference`: \`geometry.$\{string}\`  }[] |

#### Returns

`void`

#### Defined in

[ts/app/types/client/entity.ts:146](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L146)

___

### addInitializeVariable

▸ **addInitializeVariable**(`...variables`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...variables` | `string`[] |

#### Returns

`void`

#### Defined in

[ts/app/types/client/entity.ts:117](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L117)

___

### addMaterials

▸ **addMaterials**(`...materials`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...materials` | \{ `name`: `string` ; `reference`: `string`  }[] |

#### Returns

`void`

#### Defined in

[ts/app/types/client/entity.ts:139](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L139)

___

### addPreAnimationVariable

▸ **addPreAnimationVariable**(`...variables`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...variables` | `string`[] |

#### Returns

`void`

#### Defined in

[ts/app/types/client/entity.ts:128](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L128)

___

### addPublicVariable

▸ **addPublicVariable**(`...variables`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...variables` | `string`[] |

#### Returns

`void`

#### Defined in

[ts/app/types/client/entity.ts:182](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L182)

___

### addRenderController

▸ **addRenderController**(`...render_controllers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...render_controllers` | [`MolangOption`](../modules.md#molangoption)[] |

#### Returns

`void`

#### Defined in

[ts/app/types/client/entity.ts:153](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L153)

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

### upgradeFormatVersion

▸ **upgradeFormatVersion**(): `void`

#### Returns

`void`

#### Defined in

[ts/app/types/client/entity.ts:100](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L100)

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

[ts/app/types/client/entity.ts:96](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L96)

___

### createFromTemplate

▸ **createFromTemplate**(`nameData`): [`ClientEntity`](ClientEntity.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameData` | [`NameData`](NameData.md) | The namedata to use for identifiers and the filepath. |

#### Returns

[`ClientEntity`](ClientEntity.md)

An instance of this data type.

**`Remarks`**

Creates a new instance of the data type using reasonable defaults from a [NameData](NameData.md).

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFromTemplate](MinecraftDataType.md#createfromtemplate)

#### Defined in

[ts/app/types/client/entity.ts:72](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L72)

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
