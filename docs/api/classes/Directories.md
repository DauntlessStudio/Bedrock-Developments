[bedrock-development](../README.md) / [Exports](../modules.md) / Directories

# Class: Directories

**`Remarks`**

A global class for getting and setting workspace paths.

## Table of contents

### Constructors

- [constructor](Directories.md#constructor)

### Properties

- [addon\_path](Directories.md#addon_path)
- [behavior\_path](Directories.md#behavior_path)
- [resource\_path](Directories.md#resource_path)
- [source\_path](Directories.md#source_path)

### Accessors

- [ADDON\_PATH](Directories.md#addon_path-1)
- [BEHAVIOR\_PATH](Directories.md#behavior_path-1)
- [RESOURCE\_PATH](Directories.md#resource_path-1)
- [SOURCE\_PATH](Directories.md#source_path-1)
- [VANILLA\_BEHAVIOR\_PATH](Directories.md#vanilla_behavior_path)
- [VANILLA\_RESOURCE\_PATH](Directories.md#vanilla_resource_path)

## Constructors

### constructor

• **new Directories**(): [`Directories`](Directories.md)

#### Returns

[`Directories`](Directories.md)

## Properties

### addon\_path

▪ `Static` `Private` **addon\_path**: `string` = `''`

#### Defined in

[ts/app/file_manager.ts:20](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L20)

___

### behavior\_path

▪ `Static` `Private` **behavior\_path**: `string` = `'**/behavior_packs/*bp/'`

#### Defined in

[ts/app/file_manager.ts:18](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L18)

___

### resource\_path

▪ `Static` `Private` **resource\_path**: `string` = `'**/resource_packs/*rp/'`

#### Defined in

[ts/app/file_manager.ts:19](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L19)

___

### source\_path

▪ `Static` `Private` **source\_path**: `string`

#### Defined in

[ts/app/file_manager.ts:21](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L21)

## Accessors

### ADDON\_PATH

• `get` **ADDON_PATH**(): `string`

#### Returns

`string`

**`Remarks`**

The addon subpath <team>/<project> or an empty string if unspecified.

#### Defined in

[ts/app/file_manager.ts:61](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L61)

• `set` **ADDON_PATH**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |

#### Returns

`void`

#### Defined in

[ts/app/file_manager.ts:81](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L81)

___

### BEHAVIOR\_PATH

• `get` **BEHAVIOR_PATH**(): `string`

#### Returns

`string`

**`Remarks`**

The behavior pack in the workspace.

#### Defined in

[ts/app/file_manager.ts:47](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L47)

• `set` **BEHAVIOR_PATH**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |

#### Returns

`void`

#### Defined in

[ts/app/file_manager.ts:65](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L65)

___

### RESOURCE\_PATH

• `get` **RESOURCE_PATH**(): `string`

#### Returns

`string`

**`Remarks`**

The resource pack in the workspace.

#### Defined in

[ts/app/file_manager.ts:54](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L54)

• `set` **RESOURCE_PATH**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |

#### Returns

`void`

#### Defined in

[ts/app/file_manager.ts:73](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L73)

___

### SOURCE\_PATH

• `get` **SOURCE_PATH**(): `string`

#### Returns

`string`

**`Remarks`**

The source path to the module itself.

#### Defined in

[ts/app/file_manager.ts:26](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L26)

___

### VANILLA\_BEHAVIOR\_PATH

• `get` **VANILLA_BEHAVIOR_PATH**(): `string`

#### Returns

`string`

**`Remarks`**

The path to the vanilla behavior pack samples packaged with the module.

#### Defined in

[ts/app/file_manager.ts:33](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L33)

___

### VANILLA\_RESOURCE\_PATH

• `get` **VANILLA_RESOURCE_PATH**(): `string`

#### Returns

`string`

**`Remarks`**

The path to the vanilla resource pack samples packaged with the module.

#### Defined in

[ts/app/file_manager.ts:40](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/file_manager.ts#L40)
