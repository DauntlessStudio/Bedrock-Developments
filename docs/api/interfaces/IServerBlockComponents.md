[bedrock-development](../README.md) / [Exports](../modules.md) / IServerBlockComponents

# Interface: IServerBlockComponents

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [minecraft:collision\_box](IServerBlockComponents.md#minecraft:collision_box)
- [minecraft:crafting\_table](IServerBlockComponents.md#minecraft:crafting_table)
- [minecraft:destructible\_by\_explosion](IServerBlockComponents.md#minecraft:destructible_by_explosion)
- [minecraft:destructible\_by\_mining](IServerBlockComponents.md#minecraft:destructible_by_mining)
- [minecraft:display\_name](IServerBlockComponents.md#minecraft:display_name)
- [minecraft:flammable](IServerBlockComponents.md#minecraft:flammable)
- [minecraft:friction](IServerBlockComponents.md#minecraft:friction)
- [minecraft:geometry](IServerBlockComponents.md#minecraft:geometry)
- [minecraft:light\_dampening](IServerBlockComponents.md#minecraft:light_dampening)
- [minecraft:light\_emission](IServerBlockComponents.md#minecraft:light_emission)
- [minecraft:loot](IServerBlockComponents.md#minecraft:loot)
- [minecraft:map\_color](IServerBlockComponents.md#minecraft:map_color)
- [minecraft:material\_instances](IServerBlockComponents.md#minecraft:material_instances)
- [minecraft:placement\_filter](IServerBlockComponents.md#minecraft:placement_filter)
- [minecraft:selection\_box](IServerBlockComponents.md#minecraft:selection_box)
- [minecraft:transformation](IServerBlockComponents.md#minecraft:transformation)

## Properties

### minecraft:collision\_box

• `Optional` **minecraft:collision\_box**: `boolean` \| \{ `origin`: [`MolangTripleArray`](../modules.md#molangtriplearray) ; `size`: [`MolangTripleArray`](../modules.md#molangtriplearray)  }

#### Defined in

[ts/app/types/server/blocks.ts:37](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L37)

___

### minecraft:crafting\_table

• `Optional` **minecraft:crafting\_table**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `crafting_tags` | `string`[] |
| `table_name` | `string` |

#### Defined in

[ts/app/types/server/blocks.ts:41](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L41)

___

### minecraft:destructible\_by\_explosion

• `Optional` **minecraft:destructible\_by\_explosion**: `boolean` \| \{ `explosion_resistance`: `number`  }

#### Defined in

[ts/app/types/server/blocks.ts:45](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L45)

___

### minecraft:destructible\_by\_mining

• `Optional` **minecraft:destructible\_by\_mining**: `boolean` \| \{ `seconds_to_destroy`: `number`  }

#### Defined in

[ts/app/types/server/blocks.ts:48](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L48)

___

### minecraft:display\_name

• `Optional` **minecraft:display\_name**: `string`

#### Defined in

[ts/app/types/server/blocks.ts:55](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L55)

___

### minecraft:flammable

• `Optional` **minecraft:flammable**: `boolean` \| \{ `catch_chance_multiplier`: `number` ; `destroy_chance_multiplier`: `number`  }

#### Defined in

[ts/app/types/server/blocks.ts:51](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L51)

___

### minecraft:friction

• `Optional` **minecraft:friction**: `number`

#### Defined in

[ts/app/types/server/blocks.ts:56](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L56)

___

### minecraft:geometry

• `Optional` **minecraft:geometry**: \`geometry.$\{string}\` \| \{ `bone_visibility?`: \{ `[key: string]`: `boolean` \| `string`;  } ; `identifier`: \`geometry.$\{string}\`  }

#### Defined in

[ts/app/types/server/blocks.ts:57](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L57)

___

### minecraft:light\_dampening

• `Optional` **minecraft:light\_dampening**: `number`

#### Defined in

[ts/app/types/server/blocks.ts:63](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L63)

___

### minecraft:light\_emission

• `Optional` **minecraft:light\_emission**: `number`

#### Defined in

[ts/app/types/server/blocks.ts:64](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L64)

___

### minecraft:loot

• `Optional` **minecraft:loot**: `string`

#### Defined in

[ts/app/types/server/blocks.ts:65](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L65)

___

### minecraft:map\_color

• `Optional` **minecraft:map\_color**: `string` \| [`MolangTripleArray`](../modules.md#molangtriplearray)

#### Defined in

[ts/app/types/server/blocks.ts:66](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L66)

___

### minecraft:material\_instances

• `Optional` **minecraft:material\_instances**: `Object`

#### Index signature

▪ [key: `string`]: [`IServerBlockMaterialInstance`](IServerBlockMaterialInstance.md)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `*` | [`IServerBlockMaterialInstance`](IServerBlockMaterialInstance.md) |

#### Defined in

[ts/app/types/server/blocks.ts:67](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L67)

___

### minecraft:placement\_filter

• `Optional` **minecraft:placement\_filter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `conditions` | \{ `allowed_faces?`: ``"up"`` \| ``"down"`` \| ``"north"`` \| ``"east"`` \| ``"south"`` \| ``"west"`` \| ``"side"``[] ; `block_filter?`: \`$\{string}:$\{string}\` \| \{ `tags`: `string`  }[]  }[] |

#### Defined in

[ts/app/types/server/blocks.ts:71](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L71)

___

### minecraft:selection\_box

• `Optional` **minecraft:selection\_box**: `boolean` \| \{ `origin`: [`MolangTripleArray`](../modules.md#molangtriplearray) ; `size`: [`MolangTripleArray`](../modules.md#molangtriplearray)  }

#### Defined in

[ts/app/types/server/blocks.ts:79](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L79)

___

### minecraft:transformation

• `Optional` **minecraft:transformation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `rotation?` | [`MolangTripleArray`](../modules.md#molangtriplearray) |
| `scale?` | [`MolangTripleArray`](../modules.md#molangtriplearray) |
| `translation?` | [`MolangTripleArray`](../modules.md#molangtriplearray) |

#### Defined in

[ts/app/types/server/blocks.ts:83](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/blocks.ts#L83)
