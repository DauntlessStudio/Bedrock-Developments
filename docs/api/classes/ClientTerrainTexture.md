[bedrock-development](../README.md) / [Exports](../modules.md) / ClientTerrainTexture

# Class: ClientTerrainTexture

**`Remarks`**

The parent class for all Minecraft data types, i.e. MinecraftServerClient.

## Hierarchy

- [`MinecraftDataType`](MinecraftDataType.md)

  ↳ **`ClientTerrainTexture`**

## Implements

- [`IClientTerrainTexture`](../interfaces/IClientTerrainTexture.md)

## Table of contents

### Constructors

- [constructor](ClientTerrainTexture.md#constructor)

### Properties

- [filePath](ClientTerrainTexture.md#filepath)
- [num\_mip\_levels](ClientTerrainTexture.md#num_mip_levels)
- [padding](ClientTerrainTexture.md#padding)
- [resource\_pack\_name](ClientTerrainTexture.md#resource_pack_name)
- [texture\_data](ClientTerrainTexture.md#texture_data)
- [texture\_name](ClientTerrainTexture.md#texture_name)

### Accessors

- [DirectoryPath](ClientTerrainTexture.md#directorypath)

### Methods

- [addTexture](ClientTerrainTexture.md#addtexture)
- [replacer](ClientTerrainTexture.md#replacer)
- [serialize](ClientTerrainTexture.md#serialize)
- [toFile](ClientTerrainTexture.md#tofile)
- [createFilePath](ClientTerrainTexture.md#createfilepath)
- [createFromTemplate](ClientTerrainTexture.md#createfromtemplate)
- [deserialize](ClientTerrainTexture.md#deserialize)
- [fileWithAddedTexture](ClientTerrainTexture.md#filewithaddedtexture)
- [fromFile](ClientTerrainTexture.md#fromfile)
- [fromPathOrTemplate](ClientTerrainTexture.md#frompathortemplate)

## Constructors

### constructor

• **new ClientTerrainTexture**(`filepath`, `template`): [`ClientTerrainTexture`](ClientTerrainTexture.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |
| `template` | [`IClientTerrainTexture`](../interfaces/IClientTerrainTexture.md) |

#### Returns

[`ClientTerrainTexture`](ClientTerrainTexture.md)

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[constructor](MinecraftDataType.md#constructor)

#### Defined in

[ts/app/types/client/terrain_texture.ts:32](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L32)

## Properties

### filePath

• **filePath**: `string`

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[filePath](MinecraftDataType.md#filepath)

#### Defined in

[ts/app/types/minecraft.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/minecraft.ts#L23)

___

### num\_mip\_levels

• **num\_mip\_levels**: `number`

#### Implementation of

[IClientTerrainTexture](../interfaces/IClientTerrainTexture.md).[num_mip_levels](../interfaces/IClientTerrainTexture.md#num_mip_levels)

#### Defined in

[ts/app/types/client/terrain_texture.ts:18](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L18)

___

### padding

• **padding**: `number`

#### Implementation of

[IClientTerrainTexture](../interfaces/IClientTerrainTexture.md).[padding](../interfaces/IClientTerrainTexture.md#padding)

#### Defined in

[ts/app/types/client/terrain_texture.ts:19](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L19)

___

### resource\_pack\_name

• **resource\_pack\_name**: ``"vanilla"``

#### Implementation of

[IClientTerrainTexture](../interfaces/IClientTerrainTexture.md).[resource_pack_name](../interfaces/IClientTerrainTexture.md#resource_pack_name)

#### Defined in

[ts/app/types/client/terrain_texture.ts:20](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L20)

___

### texture\_data

• **texture\_data**: `Object`

#### Index signature

▪ [key: `string`]: \{ `textures`: `string`  }

#### Implementation of

[IClientTerrainTexture](../interfaces/IClientTerrainTexture.md).[texture_data](../interfaces/IClientTerrainTexture.md#texture_data)

#### Defined in

[ts/app/types/client/terrain_texture.ts:22](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L22)

___

### texture\_name

• **texture\_name**: ``"atlas.items"``

#### Implementation of

[IClientTerrainTexture](../interfaces/IClientTerrainTexture.md).[texture_name](../interfaces/IClientTerrainTexture.md#texture_name)

#### Defined in

[ts/app/types/client/terrain_texture.ts:21](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L21)

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

[ts/app/types/client/terrain_texture.ts:28](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L28)

## Methods

### addTexture

▸ **addTexture**(`name`, `textures`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `textures` | `string` |

#### Returns

`void`

#### Defined in

[ts/app/types/client/terrain_texture.ts:65](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L65)

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

[ts/app/types/client/terrain_texture.ts:61](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L61)

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

[ts/app/types/client/terrain_texture.ts:41](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L41)

___

### createFromTemplate

▸ **createFromTemplate**(): [`ClientTerrainTexture`](ClientTerrainTexture.md)

#### Returns

[`ClientTerrainTexture`](ClientTerrainTexture.md)

An instance of this data type.

**`Remarks`**

Creates a new instance of the data type using reasonable defaults from a [NameData](NameData.md).

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFromTemplate](MinecraftDataType.md#createfromtemplate)

#### Defined in

[ts/app/types/client/terrain_texture.ts:45](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L45)

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

### fileWithAddedTexture

▸ **fileWithAddedTexture**(`name`, `textures`): [`File`](../modules.md#file)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `textures` | `string` |

#### Returns

[`File`](../modules.md#file)

#### Defined in

[ts/app/types/client/terrain_texture.ts:55](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/terrain_texture.ts#L55)

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
