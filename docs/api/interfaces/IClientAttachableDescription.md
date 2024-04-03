[bedrock-development](../README.md) / [Exports](../modules.md) / IClientAttachableDescription

# Interface: IClientAttachableDescription

## Hierarchy

- [`IClientEntityDescription`](IClientEntityDescription.md)

  ↳ **`IClientAttachableDescription`**

## Table of contents

### Properties

- [animation\_controllers](IClientAttachableDescription.md#animation_controllers)
- [animations](IClientAttachableDescription.md#animations)
- [enable\_attachables](IClientAttachableDescription.md#enable_attachables)
- [geometry](IClientAttachableDescription.md#geometry)
- [held\_item\_ignores\_lightning](IClientAttachableDescription.md#held_item_ignores_lightning)
- [hide\_armor](IClientAttachableDescription.md#hide_armor)
- [identifier](IClientAttachableDescription.md#identifier)
- [item](IClientAttachableDescription.md#item)
- [materials](IClientAttachableDescription.md#materials)
- [min\_engine\_version](IClientAttachableDescription.md#min_engine_version)
- [particle\_effects](IClientAttachableDescription.md#particle_effects)
- [particle\_emitters](IClientAttachableDescription.md#particle_emitters)
- [render\_controllers](IClientAttachableDescription.md#render_controllers)
- [scripts](IClientAttachableDescription.md#scripts)
- [sound\_effects](IClientAttachableDescription.md#sound_effects)
- [spawn\_egg](IClientAttachableDescription.md#spawn_egg)
- [textures](IClientAttachableDescription.md#textures)

## Properties

### animation\_controllers

• `Optional` **animation\_controllers**: `Record`\<`string`, `string`\>[]

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[animation_controllers](IClientEntityDescription.md#animation_controllers)

#### Defined in

[ts/app/types/client/entity.ts:24](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L24)

___

### animations

• `Optional` **animations**: `Record`\<`string`, `string`\>

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[animations](IClientEntityDescription.md#animations)

#### Defined in

[ts/app/types/client/entity.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L23)

___

### enable\_attachables

• `Optional` **enable\_attachables**: `boolean`

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[enable_attachables](IClientEntityDescription.md#enable_attachables)

#### Defined in

[ts/app/types/client/entity.ts:27](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L27)

___

### geometry

• `Optional` **geometry**: `Record`\<`string`, \`geometry.$\{string}\`\>

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[geometry](IClientEntityDescription.md#geometry)

#### Defined in

[ts/app/types/client/entity.ts:21](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L21)

___

### held\_item\_ignores\_lightning

• `Optional` **held\_item\_ignores\_lightning**: `boolean`

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[held_item_ignores_lightning](IClientEntityDescription.md#held_item_ignores_lightning)

#### Defined in

[ts/app/types/client/entity.ts:28](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L28)

___

### hide\_armor

• `Optional` **hide\_armor**: `boolean`

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[hide_armor](IClientEntityDescription.md#hide_armor)

#### Defined in

[ts/app/types/client/entity.ts:29](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L29)

___

### identifier

• **identifier**: \`$\{string}:$\{string}\`

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[identifier](IClientEntityDescription.md#identifier)

#### Defined in

[ts/app/types/client/entity.ts:17](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L17)

___

### item

• `Optional` **item**: `Object`

#### Index signature

▪ [key: [`Identifier`](../modules.md#identifier)]: `string`

#### Defined in

[ts/app/types/client/attachable.ts:15](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/attachable.ts#L15)

___

### materials

• `Optional` **materials**: `Record`\<`string`, `string`\>

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[materials](IClientEntityDescription.md#materials)

#### Defined in

[ts/app/types/client/entity.ts:19](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L19)

___

### min\_engine\_version

• `Optional` **min\_engine\_version**: \`$\{number}.$\{number}.$\{number}\`

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[min_engine_version](IClientEntityDescription.md#min_engine_version)

#### Defined in

[ts/app/types/client/entity.ts:18](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L18)

___

### particle\_effects

• `Optional` **particle\_effects**: `Record`\<`string`, `string`\>

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[particle_effects](IClientEntityDescription.md#particle_effects)

#### Defined in

[ts/app/types/client/entity.ts:30](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L30)

___

### particle\_emitters

• `Optional` **particle\_emitters**: `Record`\<`string`, `string`\>

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[particle_emitters](IClientEntityDescription.md#particle_emitters)

#### Defined in

[ts/app/types/client/entity.ts:31](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L31)

___

### render\_controllers

• `Optional` **render\_controllers**: [`MolangOption`](../modules.md#molangoption)[]

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[render_controllers](IClientEntityDescription.md#render_controllers)

#### Defined in

[ts/app/types/client/entity.ts:25](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L25)

___

### scripts

• `Optional` **scripts**: [`IClientEntityScripts`](IClientEntityScripts.md)

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[scripts](IClientEntityDescription.md#scripts)

#### Defined in

[ts/app/types/client/entity.ts:22](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L22)

___

### sound\_effects

• `Optional` **sound\_effects**: `Record`\<`string`, `string`\>

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[sound_effects](IClientEntityDescription.md#sound_effects)

#### Defined in

[ts/app/types/client/entity.ts:32](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L32)

___

### spawn\_egg

• `Optional` **spawn\_egg**: [`IClientEntitySpawnEgg`](IClientEntitySpawnEgg.md)

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[spawn_egg](IClientEntityDescription.md#spawn_egg)

#### Defined in

[ts/app/types/client/entity.ts:26](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L26)

___

### textures

• `Optional` **textures**: `Record`\<`string`, \`textures/$\{string}\`\>

#### Inherited from

[IClientEntityDescription](IClientEntityDescription.md).[textures](IClientEntityDescription.md#textures)

#### Defined in

[ts/app/types/client/entity.ts:20](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L20)
