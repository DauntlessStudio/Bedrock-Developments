[bedrock-development](../README.md) / [Exports](../modules.md) / ClientAttachable

# Class: ClientAttachable

**`Remarks`**

The parent class for all Minecraft data types, i.e. MinecraftServerClient.

## Hierarchy

- [`MinecraftDataType`](MinecraftDataType.md)

  ↳ **`ClientAttachable`**

## Implements

- [`IClientAttachable`](../interfaces/IClientAttachable.md)

## Table of contents

### Constructors

- [constructor](ClientAttachable.md#constructor)

### Properties

- [filePath](ClientAttachable.md#filepath)
- [format\_version](ClientAttachable.md#format_version)
- [minecraft:attachable](ClientAttachable.md#minecraft:attachable)

### Accessors

- [DirectoryPath](ClientAttachable.md#directorypath)

### Methods

- [addAnimateScript](ClientAttachable.md#addanimatescript)
- [addAnimation](ClientAttachable.md#addanimation)
- [addGeometry](ClientAttachable.md#addgeometry)
- [addInitializeVariable](ClientAttachable.md#addinitializevariable)
- [addMaterials](ClientAttachable.md#addmaterials)
- [addPreAnimationVariable](ClientAttachable.md#addpreanimationvariable)
- [addRenderController](ClientAttachable.md#addrendercontroller)
- [replacer](ClientAttachable.md#replacer)
- [serialize](ClientAttachable.md#serialize)
- [toFile](ClientAttachable.md#tofile)
- [createFilePath](ClientAttachable.md#createfilepath)
- [createFromTemplate](ClientAttachable.md#createfromtemplate)
- [deserialize](ClientAttachable.md#deserialize)
- [fromFile](ClientAttachable.md#fromfile)
- [fromPathOrTemplate](ClientAttachable.md#frompathortemplate)

## Constructors

### constructor

• **new ClientAttachable**(`filepath`, `template`): [`ClientAttachable`](ClientAttachable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |
| `template` | [`IClientAttachable`](../interfaces/IClientAttachable.md) |

#### Returns

[`ClientAttachable`](ClientAttachable.md)

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[constructor](MinecraftDataType.md#constructor)

#### Defined in

[ts/app/types/client/attachable.ts:30](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L30)

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

[IClientAttachable](../interfaces/IClientAttachable.md).[format_version](../interfaces/IClientAttachable.md#format_version)

#### Defined in

[ts/app/types/client/attachable.ts:21](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L21)

___

### minecraft:attachable

• **minecraft:attachable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | [`IClientAttachableDescription`](../interfaces/IClientAttachableDescription.md) |

#### Implementation of

[IClientAttachable](../interfaces/IClientAttachable.md).[minecraft:attachable](../interfaces/IClientAttachable.md#minecraft:attachable)

#### Defined in

[ts/app/types/client/attachable.ts:22](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L22)

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

[ts/app/types/client/attachable.ts:26](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L26)

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

[ts/app/types/client/attachable.ts:119](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L119)

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

[ts/app/types/client/attachable.ts:112](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L112)

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

[ts/app/types/client/attachable.ts:95](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L95)

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

[ts/app/types/client/attachable.ts:66](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L66)

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

[ts/app/types/client/attachable.ts:88](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L88)

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

[ts/app/types/client/attachable.ts:77](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L77)

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

[ts/app/types/client/attachable.ts:102](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L102)

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

▸ **createFromTemplate**(`nameData`): [`ClientAttachable`](ClientAttachable.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameData` | [`NameData`](NameData.md) | The namedata to use for identifiers and the filepath. |

#### Returns

[`ClientAttachable`](ClientAttachable.md)

An instance of this data type.

**`Remarks`**

Creates a new instance of the data type using reasonable defaults from a [NameData](NameData.md).

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFromTemplate](MinecraftDataType.md#createfromtemplate)

#### Defined in

[ts/app/types/client/attachable.ts:36](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/attachable.ts#L36)

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
