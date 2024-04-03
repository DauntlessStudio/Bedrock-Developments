[bedrock-development](../README.md) / [Exports](../modules.md) / ServerEntity

# Class: ServerEntity

**`Remarks`**

The parent class for all Minecraft data types, i.e. MinecraftServerClient.

## Hierarchy

- [`MinecraftDataType`](MinecraftDataType.md)

  ↳ **`ServerEntity`**

## Implements

- [`IServerEntity`](../interfaces/IServerEntity.md)

## Table of contents

### Constructors

- [constructor](ServerEntity.md#constructor)

### Properties

- [filePath](ServerEntity.md#filepath)
- [format\_version](ServerEntity.md#format_version)
- [minecraft:entity](ServerEntity.md#minecraft:entity)

### Accessors

- [Identifier](ServerEntity.md#identifier)
- [NameData](ServerEntity.md#namedata)
- [DirectoryPath](ServerEntity.md#directorypath)

### Methods

- [hasFamilyTypes](ServerEntity.md#hasfamilytypes)
- [replacer](ServerEntity.md#replacer)
- [serialize](ServerEntity.md#serialize)
- [setAnimateScripts](ServerEntity.md#setanimatescripts)
- [setAnimations](ServerEntity.md#setanimations)
- [setComponentGroups](ServerEntity.md#setcomponentgroups)
- [setComponents](ServerEntity.md#setcomponents)
- [setDamageSensor](ServerEntity.md#setdamagesensor)
- [setEvents](ServerEntity.md#setevents)
- [setProperties](ServerEntity.md#setproperties)
- [toFile](ServerEntity.md#tofile)
- [createFilePath](ServerEntity.md#createfilepath)
- [createFromTemplate](ServerEntity.md#createfromtemplate)
- [deserialize](ServerEntity.md#deserialize)
- [fromFile](ServerEntity.md#fromfile)
- [fromPathOrTemplate](ServerEntity.md#frompathortemplate)

## Constructors

### constructor

• **new ServerEntity**(`filepath`, `template`): [`ServerEntity`](ServerEntity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |
| `template` | [`IServerEntity`](../interfaces/IServerEntity.md) |

#### Returns

[`ServerEntity`](ServerEntity.md)

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[constructor](MinecraftDataType.md#constructor)

#### Defined in

[ts/app/types/server/entity.ts:262](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L262)

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

[IServerEntity](../interfaces/IServerEntity.md).[format_version](../interfaces/IServerEntity.md#format_version)

#### Defined in

[ts/app/types/server/entity.ts:242](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L242)

___

### minecraft:entity

• **minecraft:entity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `component_groups?` | [`IServerEntityComponentGroups`](../interfaces/IServerEntityComponentGroups.md) |
| `components` | [`IServerEntityComponents`](../interfaces/IServerEntityComponents.md) |
| `description` | [`IServerEntityDescription`](../interfaces/IServerEntityDescription.md) |
| `events` | [`IServerEntityEvents`](../interfaces/IServerEntityEvents.md) |

#### Implementation of

[IServerEntity](../interfaces/IServerEntity.md).[minecraft:entity](../interfaces/IServerEntity.md#minecraft:entity)

#### Defined in

[ts/app/types/server/entity.ts:243](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L243)

## Accessors

### Identifier

• `get` **Identifier**(): \`$\{string}:$\{string}\`

#### Returns

\`$\{string}:$\{string}\`

#### Defined in

[ts/app/types/server/entity.ts:254](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L254)

___

### NameData

• `get` **NameData**(): [`NameData`](NameData.md)

#### Returns

[`NameData`](NameData.md)

#### Defined in

[ts/app/types/server/entity.ts:258](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L258)

___

### DirectoryPath

• `get` **DirectoryPath**(): `string`

#### Returns

`string`

**`Remarks`**

The directory where this type of file is kept.

#### Overrides

MinecraftDataType.DirectoryPath

#### Defined in

[ts/app/types/server/entity.ts:250](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L250)

## Methods

### hasFamilyTypes

▸ **hasFamilyTypes**(`...family`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...family` | `string`[] |

#### Returns

`boolean`

#### Defined in

[ts/app/types/server/entity.ts:546](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L546)

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

### setAnimateScripts

▸ **setAnimateScripts**(`...animations`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...animations` | (`string` \| \{ `[key: string]`: `string`;  })[] |

#### Returns

`void`

#### Defined in

[ts/app/types/server/entity.ts:535](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L535)

___

### setAnimations

▸ **setAnimations**(`animations`, `handleExisting?`, `options?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `animations` | `Object` | `undefined` |
| `handleExisting` | ``"overwrite"`` \| ``"merge"`` \| ``"ignore"`` | `'overwrite'` |
| `options?` | [`IServerEntityAnimationOptions`](../interfaces/IServerEntityAnimationOptions.md) | `undefined` |

#### Returns

`void`

#### Defined in

[ts/app/types/server/entity.ts:507](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L507)

___

### setComponentGroups

▸ **setComponentGroups**(`groups`, `handleExisting?`, `options?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `groups` | [`IServerEntityComponentGroups`](../interfaces/IServerEntityComponentGroups.md) | `undefined` |
| `handleExisting` | ``"overwrite"`` \| ``"merge"`` \| ``"ignore"`` | `'overwrite'` |
| `options?` | [`IServerEntityComponentGroupOptions`](../interfaces/IServerEntityComponentGroupOptions.md) | `undefined` |

#### Returns

`void`

#### Defined in

[ts/app/types/server/entity.ts:352](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L352)

___

### setComponents

▸ **setComponents**(`components`, `handleExisting?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `components` | [`IServerItemComponents`](../interfaces/IServerItemComponents.md) | `undefined` |
| `handleExisting` | ``"overwrite"`` \| ``"merge"`` \| ``"ignore"`` | `'overwrite'` |

#### Returns

`void`

#### Defined in

[ts/app/types/server/entity.ts:329](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L329)

___

### setDamageSensor

▸ **setDamageSensor**(`sensor`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sensor` | [`IServerEntityDamageSensor`](../interfaces/IServerEntityDamageSensor.md) |
| `options?` | [`IServerEntityDamageSensorOptions`](../interfaces/IServerEntityDamageSensorOptions.md) |

#### Returns

`void`

#### Defined in

[ts/app/types/server/entity.ts:493](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L493)

___

### setEvents

▸ **setEvents**(`events`, `handleExisting?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `events` | [`IServerEntityEvents`](../interfaces/IServerEntityEvents.md) | `undefined` |
| `handleExisting` | ``"overwrite"`` \| ``"merge"`` \| ``"ignore"`` | `'overwrite'` |

#### Returns

`void`

#### Defined in

[ts/app/types/server/entity.ts:397](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L397)

___

### setProperties

▸ **setProperties**(`properties`, `handleExisting?`, `options?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `properties` | [`IServerEntityProperties`](../interfaces/IServerEntityProperties.md) | `undefined` |
| `handleExisting` | ``"overwrite"`` \| ``"merge"`` \| ``"ignore"`` | `'overwrite'` |
| `options?` | [`IServerEntityPropertiesOptions`](../interfaces/IServerEntityPropertiesOptions.md) | `undefined` |

#### Returns

`void`

#### Defined in

[ts/app/types/server/entity.ts:420](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L420)

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

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[createFilePath](MinecraftDataType.md#createfilepath)

#### Defined in

[ts/app/types/minecraft.ts:46](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L46)

___

### createFromTemplate

▸ **createFromTemplate**(`nameData`): [`ServerEntity`](ServerEntity.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameData` | [`NameData`](NameData.md) | The namedata to use for identifiers and the filepath. |

#### Returns

[`ServerEntity`](ServerEntity.md)

An instance of this data type.

**`Remarks`**

Creates a new instance of the data type using reasonable defaults from a [NameData](NameData.md).

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFromTemplate](MinecraftDataType.md#createfromtemplate)

#### Defined in

[ts/app/types/server/entity.ts:268](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L268)

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
