[bedrock-development](../README.md) / [Exports](../modules.md) / ClientItemTexture

# Class: ClientItemTexture

**`Remarks`**

The parent class for all Minecraft data types, i.e. MinecraftServerClient.

## Hierarchy

- [`MinecraftDataType`](MinecraftDataType.md)

  ↳ **`ClientItemTexture`**

## Implements

- [`IClientItemTexture`](../interfaces/IClientItemTexture.md)

## Table of contents

### Constructors

- [constructor](ClientItemTexture.md#constructor)

### Properties

- [filePath](ClientItemTexture.md#filepath)
- [resource\_pack\_name](ClientItemTexture.md#resource_pack_name)
- [texture\_data](ClientItemTexture.md#texture_data)
- [texture\_name](ClientItemTexture.md#texture_name)

### Accessors

- [DirectoryPath](ClientItemTexture.md#directorypath)

### Methods

- [addTexture](ClientItemTexture.md#addtexture)
- [replacer](ClientItemTexture.md#replacer)
- [serialize](ClientItemTexture.md#serialize)
- [toFile](ClientItemTexture.md#tofile)
- [createFilePath](ClientItemTexture.md#createfilepath)
- [createFromTemplate](ClientItemTexture.md#createfromtemplate)
- [deserialize](ClientItemTexture.md#deserialize)
- [fileWithAddedTexture](ClientItemTexture.md#filewithaddedtexture)
- [fromFile](ClientItemTexture.md#fromfile)
- [fromPathOrTemplate](ClientItemTexture.md#frompathortemplate)

## Constructors

### constructor

• **new ClientItemTexture**(`filepath`, `template`): [`ClientItemTexture`](ClientItemTexture.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |
| `template` | [`IClientItemTexture`](../interfaces/IClientItemTexture.md) |

#### Returns

[`ClientItemTexture`](ClientItemTexture.md)

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[constructor](MinecraftDataType.md#constructor)

#### Defined in

[ts/app/types/client/item_texture.ts:28](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/item_texture.ts#L28)

## Properties

### filePath

• **filePath**: `string`

#### Inherited from

[MinecraftDataType](MinecraftDataType.md).[filePath](MinecraftDataType.md#filepath)

#### Defined in

[ts/app/types/minecraft.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L23)

___

### resource\_pack\_name

• **resource\_pack\_name**: ``"vanilla"``

#### Implementation of

[IClientItemTexture](../interfaces/IClientItemTexture.md).[resource_pack_name](../interfaces/IClientItemTexture.md#resource_pack_name)

#### Defined in

[ts/app/types/client/item_texture.ts:16](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/item_texture.ts#L16)

___

### texture\_data

• **texture\_data**: `Object`

#### Index signature

▪ [key: `string`]: \{ `textures`: `string`  }

#### Implementation of

[IClientItemTexture](../interfaces/IClientItemTexture.md).[texture_data](../interfaces/IClientItemTexture.md#texture_data)

#### Defined in

[ts/app/types/client/item_texture.ts:18](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/item_texture.ts#L18)

___

### texture\_name

• **texture\_name**: ``"atlas.items"``

#### Implementation of

[IClientItemTexture](../interfaces/IClientItemTexture.md).[texture_name](../interfaces/IClientItemTexture.md#texture_name)

#### Defined in

[ts/app/types/client/item_texture.ts:17](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/item_texture.ts#L17)

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

[ts/app/types/client/item_texture.ts:24](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/item_texture.ts#L24)

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

[ts/app/types/client/item_texture.ts:57](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/item_texture.ts#L57)

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

▸ **toFile**(): [`File`](../modules.md#file)

#### Returns

[`File`](../modules.md#file)

A [File](../modules.md#file) object with this MinecraftDataType's filepath, and this object serialized as the file contents.

**`Remarks`**

Creates a [File](../modules.md#file) object from this MinecraftDataType.

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[toFile](MinecraftDataType.md#tofile)

#### Defined in

[ts/app/types/client/item_texture.ts:53](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/item_texture.ts#L53)

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

[ts/app/types/client/item_texture.ts:35](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/item_texture.ts#L35)

___

### createFromTemplate

▸ **createFromTemplate**(): [`ClientItemTexture`](ClientItemTexture.md)

#### Returns

[`ClientItemTexture`](ClientItemTexture.md)

An instance of this data type.

**`Remarks`**

Creates a new instance of the data type using reasonable defaults from a [NameData](NameData.md).

#### Overrides

[MinecraftDataType](MinecraftDataType.md).[createFromTemplate](MinecraftDataType.md#createfromtemplate)

#### Defined in

[ts/app/types/client/item_texture.ts:39](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/item_texture.ts#L39)

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

[ts/app/types/client/item_texture.ts:47](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/item_texture.ts#L47)

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
