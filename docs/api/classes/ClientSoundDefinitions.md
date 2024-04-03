[bedrock-development](../README.md) / [Exports](../modules.md) / ClientSoundDefinitions

# Class: ClientSoundDefinitions

**`Remarks`**

The parent class for all Minecraft data types, i.e. MinecraftServerClient.

## Hierarchy

- [`MinecraftDataType`](MinecraftDataType.md)

  ↳ **`ClientSoundDefinitions`**

## Implements

- [`IClientSoundDefinitions`](../interfaces/IClientSoundDefinitions.md)

## Table of contents

### Constructors

- [constructor](ClientSoundDefinitions.md#constructor)

### Properties

- [filePath](ClientSoundDefinitions.md#filepath)
- [format\_version](ClientSoundDefinitions.md#format_version)
- [sound\_definitions](ClientSoundDefinitions.md#sound_definitions)

### Accessors

- [DirectoryPath](ClientSoundDefinitions.md#directorypath)

### Methods

- [addSound](ClientSoundDefinitions.md#addsound)
- [convertSoundsToObjects](ClientSoundDefinitions.md#convertsoundstoobjects)
- [replacer](ClientSoundDefinitions.md#replacer)
- [serialize](ClientSoundDefinitions.md#serialize)
- [toFile](ClientSoundDefinitions.md#tofile)
- [createFilePath](ClientSoundDefinitions.md#createfilepath)
- [createFromTemplate](ClientSoundDefinitions.md#createfromtemplate)
- [deserialize](ClientSoundDefinitions.md#deserialize)
- [fileWithAddedSound](ClientSoundDefinitions.md#filewithaddedsound)
- [fromFile](ClientSoundDefinitions.md#fromfile)
- [fromPathOrTemplate](ClientSoundDefinitions.md#frompathortemplate)

## Constructors

### constructor

• **new ClientSoundDefinitions**(`filepath`, `template`): [`ClientSoundDefinitions`](ClientSoundDefinitions.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |
| `template` | [`IClientSoundDefinitions`](../interfaces/IClientSoundDefinitions.md) |

#### Returns

[`ClientSoundDefinitions`](ClientSoundDefinitions.md)

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[constructor](MinecraftDataType.md#constructor)

#### Defined in

[ts/app/types/client/sound_definitions.ts:43](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L43)

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

[IClientSoundDefinitions](../interfaces/IClientSoundDefinitions.md).[format_version](../interfaces/IClientSoundDefinitions.md#format_version)

#### Defined in

[ts/app/types/client/sound_definitions.ts:34](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L34)

___

### sound\_definitions

• **sound\_definitions**: `Object`

#### Index signature

▪ [key: `string`]: [`IClientSoundDefinition`](../interfaces/IClientSoundDefinition.md)

#### Implementation of

[IClientSoundDefinitions](../interfaces/IClientSoundDefinitions.md).[sound_definitions](../interfaces/IClientSoundDefinitions.md#sound_definitions)

#### Defined in

[ts/app/types/client/sound_definitions.ts:35](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L35)

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

[ts/app/types/client/sound_definitions.ts:39](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L39)

## Methods

### addSound

▸ **addSound**(`name`, `sound`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `sound` | [`IClientSoundDefinition`](../interfaces/IClientSoundDefinition.md) |

#### Returns

`void`

#### Defined in

[ts/app/types/client/sound_definitions.ts:99](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L99)

___

### convertSoundsToObjects

▸ **convertSoundsToObjects**(): `void`

#### Returns

`void`

#### Defined in

[ts/app/types/client/sound_definitions.ts:104](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L104)

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

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[replacer](MinecraftDataType.md#replacer)

#### Defined in

[ts/app/types/client/sound_definitions.ts:71](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L71)

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

[ts/app/types/client/sound_definitions.ts:67](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L67)

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

[ts/app/types/client/sound_definitions.ts:49](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L49)

___

### createFromTemplate

▸ **createFromTemplate**(): [`ClientSoundDefinitions`](ClientSoundDefinitions.md)

#### Returns

[`ClientSoundDefinitions`](ClientSoundDefinitions.md)

An instance of this data type.

**`Remarks`**

Creates a new instance of the data type using reasonable defaults from a [NameData](NameData.md).

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFromTemplate](MinecraftDataType.md#createfromtemplate)

#### Defined in

[ts/app/types/client/sound_definitions.ts:53](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L53)

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

### fileWithAddedSound

▸ **fileWithAddedSound**(`name`, `sound`): [`File`](../modules.md#file)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `sound` | [`IClientSoundDefinition`](../interfaces/IClientSoundDefinition.md) |

#### Returns

[`File`](../modules.md#file)

#### Defined in

[ts/app/types/client/sound_definitions.ts:60](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/sound_definitions.ts#L60)

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
