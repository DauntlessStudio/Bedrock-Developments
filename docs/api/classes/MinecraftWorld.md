[bedrock-development](../README.md) / [Exports](../modules.md) / MinecraftWorld

# Class: MinecraftWorld

## Table of contents

### Constructors

- [constructor](MinecraftWorld.md#constructor)

### Properties

- [filePath](MinecraftWorld.md#filepath)

### Accessors

- [BehaviorPacks](MinecraftWorld.md#behaviorpacks)
- [LevelDat](MinecraftWorld.md#leveldat)
- [Name](MinecraftWorld.md#name)
- [ResourcePacks](MinecraftWorld.md#resourcepacks)

### Methods

- [addManifest](MinecraftWorld.md#addmanifest)
- [addPack](MinecraftWorld.md#addpack)
- [exportWorld](MinecraftWorld.md#exportworld)
- [getPacks](MinecraftWorld.md#getpacks)
- [setLevelDat](MinecraftWorld.md#setleveldat)
- [create](MinecraftWorld.md#create)
- [getAllWorlds](MinecraftWorld.md#getallworlds)
- [getPackFromManifest](MinecraftWorld.md#getpackfrommanifest)

## Constructors

### constructor

• **new MinecraftWorld**(`filePath`): [`MinecraftWorld`](MinecraftWorld.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |

#### Returns

[`MinecraftWorld`](MinecraftWorld.md)

#### Defined in

[ts/app/types/world.ts:80](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L80)

## Properties

### filePath

• **filePath**: `string`

#### Defined in

[ts/app/types/world.ts:57](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L57)

## Accessors

### BehaviorPacks

• `get` **BehaviorPacks**(): [`IBehaviorPack`](../interfaces/IBehaviorPack.md)[]

#### Returns

[`IBehaviorPack`](../interfaces/IBehaviorPack.md)[]

#### Defined in

[ts/app/types/world.ts:60](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L60)

___

### LevelDat

• `get` **LevelDat**(): `NbtFile`

#### Returns

`NbtFile`

#### Defined in

[ts/app/types/world.ts:74](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L74)

___

### Name

• `get` **Name**(): `string`

#### Returns

`string`

#### Defined in

[ts/app/types/world.ts:70](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L70)

___

### ResourcePacks

• `get` **ResourcePacks**(): [`IResourcePack`](../interfaces/IResourcePack.md)[]

#### Returns

[`IResourcePack`](../interfaces/IResourcePack.md)[]

#### Defined in

[ts/app/types/world.ts:65](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L65)

## Methods

### addManifest

▸ **addManifest**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[ts/app/types/world.ts:240](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L240)

___

### addPack

▸ **addPack**(`pack`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pack` | [`IBehaviorPack`](../interfaces/IBehaviorPack.md) \| [`IResourcePack`](../interfaces/IResourcePack.md) |

#### Returns

`void`

#### Defined in

[ts/app/types/world.ts:214](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L214)

___

### exportWorld

▸ **exportWorld**(`include_packs`, `type`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `include_packs` | `boolean` |
| `type` | ``"template"`` \| ``"world"`` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[ts/app/types/world.ts:143](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L143)

___

### getPacks

▸ **getPacks**\<`T`\>(`type`): `T`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IMinecraftPack` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"behavior"`` \| ``"resource"`` |

#### Returns

`T`[]

#### Defined in

[ts/app/types/world.ts:180](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L180)

___

### setLevelDat

▸ **setLevelDat**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `Uint8Array` |

#### Returns

`void`

#### Defined in

[ts/app/types/world.ts:274](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L274)

___

### create

▸ **create**(`worldName`, `options`): `Promise`\<[`MinecraftWorld`](MinecraftWorld.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `worldName` | `string` |
| `options` | [`INewWorldOptions`](../interfaces/INewWorldOptions.md) |

#### Returns

`Promise`\<[`MinecraftWorld`](MinecraftWorld.md)\>

#### Defined in

[ts/app/types/world.ts:84](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L84)

___

### getAllWorlds

▸ **getAllWorlds**(): [`MinecraftWorld`](MinecraftWorld.md)[]

#### Returns

[`MinecraftWorld`](MinecraftWorld.md)[]

#### Defined in

[ts/app/types/world.ts:132](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L132)

___

### getPackFromManifest

▸ **getPackFromManifest**(`filepath`): [`IBehaviorPack`](../interfaces/IBehaviorPack.md) \| [`IResourcePack`](../interfaces/IResourcePack.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |

#### Returns

[`IBehaviorPack`](../interfaces/IBehaviorPack.md) \| [`IResourcePack`](../interfaces/IResourcePack.md)

#### Defined in

[ts/app/types/world.ts:197](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/world.ts#L197)
