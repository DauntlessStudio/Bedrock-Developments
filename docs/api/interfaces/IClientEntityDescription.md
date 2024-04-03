[bedrock-development](../README.md) / [Exports](../modules.md) / IClientEntityDescription

# Interface: IClientEntityDescription

## Hierarchy

- **`IClientEntityDescription`**

  ↳ [`IClientAttachableDescription`](IClientAttachableDescription.md)

## Table of contents

### Properties

- [animation\_controllers](IClientEntityDescription.md#animation_controllers)
- [animations](IClientEntityDescription.md#animations)
- [enable\_attachables](IClientEntityDescription.md#enable_attachables)
- [geometry](IClientEntityDescription.md#geometry)
- [held\_item\_ignores\_lightning](IClientEntityDescription.md#held_item_ignores_lightning)
- [hide\_armor](IClientEntityDescription.md#hide_armor)
- [identifier](IClientEntityDescription.md#identifier)
- [materials](IClientEntityDescription.md#materials)
- [min\_engine\_version](IClientEntityDescription.md#min_engine_version)
- [particle\_effects](IClientEntityDescription.md#particle_effects)
- [particle\_emitters](IClientEntityDescription.md#particle_emitters)
- [render\_controllers](IClientEntityDescription.md#render_controllers)
- [scripts](IClientEntityDescription.md#scripts)
- [sound\_effects](IClientEntityDescription.md#sound_effects)
- [spawn\_egg](IClientEntityDescription.md#spawn_egg)
- [textures](IClientEntityDescription.md#textures)

## Properties

### animation\_controllers

• `Optional` **animation\_controllers**: `Record`\<`string`, `string`\>[]

#### Defined in

[ts/app/types/client/entity.ts:24](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L24)

___

### animations

• `Optional` **animations**: `Record`\<`string`, `string`\>

#### Defined in

[ts/app/types/client/entity.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L23)

___

### enable\_attachables

• `Optional` **enable\_attachables**: `boolean`

#### Defined in

[ts/app/types/client/entity.ts:27](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L27)

___

### geometry

• `Optional` **geometry**: `Record`\<`string`, \`geometry.$\{string}\`\>

#### Defined in

[ts/app/types/client/entity.ts:21](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L21)

___

### held\_item\_ignores\_lightning

• `Optional` **held\_item\_ignores\_lightning**: `boolean`

#### Defined in

[ts/app/types/client/entity.ts:28](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L28)

___

### hide\_armor

• `Optional` **hide\_armor**: `boolean`

#### Defined in

[ts/app/types/client/entity.ts:29](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L29)

___

### identifier

• **identifier**: \`$\{string}:$\{string}\`

#### Defined in

[ts/app/types/client/entity.ts:17](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L17)

___

### materials

• `Optional` **materials**: `Record`\<`string`, `string`\>

#### Defined in

[ts/app/types/client/entity.ts:19](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L19)

___

### min\_engine\_version

• `Optional` **min\_engine\_version**: \`$\{number}.$\{number}.$\{number}\`

#### Defined in

[ts/app/types/client/entity.ts:18](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L18)

___

### particle\_effects

• `Optional` **particle\_effects**: `Record`\<`string`, `string`\>

#### Defined in

[ts/app/types/client/entity.ts:30](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L30)

___

### particle\_emitters

• `Optional` **particle\_emitters**: `Record`\<`string`, `string`\>

#### Defined in

[ts/app/types/client/entity.ts:31](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L31)

___

### render\_controllers

• `Optional` **render\_controllers**: [`MolangOption`](../modules.md#molangoption)[]

#### Defined in

[ts/app/types/client/entity.ts:25](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L25)

___

### scripts

• `Optional` **scripts**: [`IClientEntityScripts`](IClientEntityScripts.md)

#### Defined in

[ts/app/types/client/entity.ts:22](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L22)

___

### sound\_effects

• `Optional` **sound\_effects**: `Record`\<`string`, `string`\>

#### Defined in

[ts/app/types/client/entity.ts:32](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L32)

___

### spawn\_egg

• `Optional` **spawn\_egg**: [`IClientEntitySpawnEgg`](IClientEntitySpawnEgg.md)

#### Defined in

[ts/app/types/client/entity.ts:26](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L26)

___

### textures

• `Optional` **textures**: `Record`\<`string`, \`textures/$\{string}\`\>

#### Defined in

[ts/app/types/client/entity.ts:20](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/entity.ts#L20)
