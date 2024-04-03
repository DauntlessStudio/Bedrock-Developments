[bedrock-development](../README.md) / [Exports](../modules.md) / IServerItemComponents

# Interface: IServerItemComponents

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [minecraft:cooldown](IServerItemComponents.md#minecraft:cooldown)
- [minecraft:display\_name](IServerItemComponents.md#minecraft:display_name)
- [minecraft:durability](IServerItemComponents.md#minecraft:durability)
- [minecraft:enchantable](IServerItemComponents.md#minecraft:enchantable)
- [minecraft:food](IServerItemComponents.md#minecraft:food)
- [minecraft:icon](IServerItemComponents.md#minecraft:icon)
- [minecraft:interact\_button](IServerItemComponents.md#minecraft:interact_button)
- [minecraft:max\_stack\_size](IServerItemComponents.md#minecraft:max_stack_size)
- [minecraft:repairable](IServerItemComponents.md#minecraft:repairable)
- [minecraft:tags](IServerItemComponents.md#minecraft:tags)
- [minecraft:use\_modifiers](IServerItemComponents.md#minecraft:use_modifiers)
- [minecraft:wearable](IServerItemComponents.md#minecraft:wearable)

## Properties

### minecraft:cooldown

• `Optional` **minecraft:cooldown**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `category` | `string` |
| `duration` | `number` |

#### Defined in

[ts/app/types/server/item.ts:83](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L83)

___

### minecraft:display\_name

• `Optional` **minecraft:display\_name**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Defined in

[ts/app/types/server/item.ts:31](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L31)

___

### minecraft:durability

• `Optional` **minecraft:durability**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `damage_chance?` | \{ `max`: `number` ; `min`: `number`  } |
| `damage_chance.max` | `number` |
| `damage_chance.min` | `number` |
| `max_durability` | `number` |

#### Defined in

[ts/app/types/server/item.ts:39](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L39)

___

### minecraft:enchantable

• `Optional` **minecraft:enchantable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `slot` | `string` |
| `value` | `number` |

#### Defined in

[ts/app/types/server/item.ts:73](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L73)

___

### minecraft:food

• `Optional` **minecraft:food**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `can_always_eat?` | `boolean` |
| `nutrition?` | `number` |
| `saturation_modifier?` | `number` |
| `using_converts_to?` | `string` |

#### Defined in

[ts/app/types/server/item.ts:47](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L47)

___

### minecraft:icon

• `Optional` **minecraft:icon**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `texture` | `string` |

#### Defined in

[ts/app/types/server/item.ts:27](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L27)

___

### minecraft:interact\_button

• `Optional` **minecraft:interact\_button**: `string` \| `boolean`

#### Defined in

[ts/app/types/server/item.ts:54](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L54)

___

### minecraft:max\_stack\_size

• `Optional` **minecraft:max\_stack\_size**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Defined in

[ts/app/types/server/item.ts:56](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L56)

___

### minecraft:repairable

• `Optional` **minecraft:repairable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `on_repaired?` | `string` |
| `repair_items?` | \{ `items`: \`$\{string}:$\{string}\`[] ; `repair_amount`: `string` \| `number`  }[] |

#### Defined in

[ts/app/types/server/item.ts:60](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L60)

___

### minecraft:tags

• `Optional` **minecraft:tags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `tags` | `string`[] |

#### Defined in

[ts/app/types/server/item.ts:35](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L35)

___

### minecraft:use\_modifiers

• `Optional` **minecraft:use\_modifiers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `movement_modifier` | `number` |
| `use_duration` | `number` |

#### Defined in

[ts/app/types/server/item.ts:78](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L78)

___

### minecraft:wearable

• `Optional` **minecraft:wearable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dispensable?` | `boolean` |
| `slot` | [`SlotOptions`](../modules.md#slotoptions) |

#### Defined in

[ts/app/types/server/item.ts:68](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/item.ts#L68)
