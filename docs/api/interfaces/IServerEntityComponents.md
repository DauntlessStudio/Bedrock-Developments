[bedrock-development](../README.md) / [Exports](../modules.md) / IServerEntityComponents

# Interface: IServerEntityComponents

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [minecraft:addrider](IServerEntityComponents.md#minecraft:addrider)
- [minecraft:area\_attack](IServerEntityComponents.md#minecraft:area_attack)
- [minecraft:attack](IServerEntityComponents.md#minecraft:attack)
- [minecraft:boss](IServerEntityComponents.md#minecraft:boss)
- [minecraft:break\_blocks](IServerEntityComponents.md#minecraft:break_blocks)
- [minecraft:collision\_box](IServerEntityComponents.md#minecraft:collision_box)
- [minecraft:custom\_hit\_test](IServerEntityComponents.md#minecraft:custom_hit_test)
- [minecraft:damage\_sensor](IServerEntityComponents.md#minecraft:damage_sensor)
- [minecraft:despawn](IServerEntityComponents.md#minecraft:despawn)
- [minecraft:environment\_sensor](IServerEntityComponents.md#minecraft:environment_sensor)
- [minecraft:hurt\_on\_condition](IServerEntityComponents.md#minecraft:hurt_on_condition)
- [minecraft:instant\_despawn](IServerEntityComponents.md#minecraft:instant_despawn)
- [minecraft:interact](IServerEntityComponents.md#minecraft:interact)
- [minecraft:loot](IServerEntityComponents.md#minecraft:loot)
- [minecraft:physics](IServerEntityComponents.md#minecraft:physics)
- [minecraft:projectile](IServerEntityComponents.md#minecraft:projectile)
- [minecraft:pushable](IServerEntityComponents.md#minecraft:pushable)
- [minecraft:type\_family](IServerEntityComponents.md#minecraft:type_family)

## Properties

### minecraft:addrider

• `Optional` **minecraft:addrider**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entity_type` | `string` |
| `spawn_event` | `string` |

#### Defined in

[ts/app/types/server/entity.ts:53](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L53)

___

### minecraft:area\_attack

• `Optional` **minecraft:area\_attack**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `case` | `string` |
| `damage_cooldown?` | `number` |
| `damage_per_tick?` | `number` |
| `damage_range?` | `number` |
| `entity_filter` | [`IServerEntityFilters`](IServerEntityFilters.md) |
| `play_attack_sound?` | `boolean` |

#### Defined in

[ts/app/types/server/entity.ts:57](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L57)

___

### minecraft:attack

• `Optional` **minecraft:attack**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `damage` | [`Range`](../modules.md#range) |
| `effect_duration?` | `number` |
| `effect_name?` | [`EffectNames`](../modules.md#effectnames) |

#### Defined in

[ts/app/types/server/entity.ts:65](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L65)

___

### minecraft:boss

• `Optional` **minecraft:boss**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hud_range?` | `number` |
| `name` | `string` |
| `should_darken_sky?` | `boolean` |

#### Defined in

[ts/app/types/server/entity.ts:70](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L70)

___

### minecraft:break\_blocks

• `Optional` **minecraft:break\_blocks**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `breakable_blocks` | \`$\{string}:$\{string}\`[] |

#### Defined in

[ts/app/types/server/entity.ts:75](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L75)

___

### minecraft:collision\_box

• `Optional` **minecraft:collision\_box**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height?` | `number` |
| `width?` | `number` |

#### Defined in

[ts/app/types/server/entity.ts:78](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L78)

___

### minecraft:custom\_hit\_test

• `Optional` **minecraft:custom\_hit\_test**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hitboxes` | \{ `height`: `number` ; `pivot`: [`MolangTripleArray`](../modules.md#molangtriplearray) ; `width`: `number`  }[] |

#### Defined in

[ts/app/types/server/entity.ts:82](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L82)

___

### minecraft:damage\_sensor

• `Optional` **minecraft:damage\_sensor**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `triggers` | [`IServerEntityDamageSensor`](IServerEntityDamageSensor.md) \| [`IServerEntityDamageSensor`](IServerEntityDamageSensor.md)[] |

#### Defined in

[ts/app/types/server/entity.ts:89](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L89)

___

### minecraft:despawn

• `Optional` **minecraft:despawn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `despawn_from_change?` | `boolean` |
| `despawn_from_distance?` | \{ `max_distance?`: `number` ; `min_distance?`: `number`  } |
| `despawn_from_distance.max_distance?` | `number` |
| `despawn_from_distance.min_distance?` | `number` |
| `despawn_from_inactivity?` | `boolean` |
| `despawn_from_simulation_edge?` | `boolean` |
| `filters?` | [`IServerEntityFilters`](IServerEntityFilters.md) |
| `min_range_inactivity_timer?` | `number` |
| `min_range_random_chance?` | `number` |
| `remove_child_entities?` | `boolean` |

#### Defined in

[ts/app/types/server/entity.ts:92](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L92)

___

### minecraft:environment\_sensor

• `Optional` **minecraft:environment\_sensor**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `triggers` | [`IServerEntityTrigger`](IServerEntityTrigger.md)[] |

#### Defined in

[ts/app/types/server/entity.ts:105](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L105)

___

### minecraft:hurt\_on\_condition

• `Optional` **minecraft:hurt\_on\_condition**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `damage_conditions` | \{ `cause`: `string` ; `damage_per_tick`: `number` ; `filters`: [`IServerEntityFilters`](IServerEntityFilters.md)  }[] |

#### Defined in

[ts/app/types/server/entity.ts:108](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L108)

___

### minecraft:instant\_despawn

• `Optional` **minecraft:instant\_despawn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `remove_child_entities?` | `boolean` |

#### Defined in

[ts/app/types/server/entity.ts:115](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L115)

___

### minecraft:interact

• `Optional` **minecraft:interact**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `interactions` | \{ `[key: string]`: `any`; `interact_text?`: `string` ; `on_interact?`: [`IServerEntityTrigger`](IServerEntityTrigger.md)  } |
| `interactions.interact_text?` | `string` |
| `interactions.on_interact?` | [`IServerEntityTrigger`](IServerEntityTrigger.md) |

#### Defined in

[ts/app/types/server/entity.ts:118](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L118)

___

### minecraft:loot

• `Optional` **minecraft:loot**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `table` | `string` |

#### Defined in

[ts/app/types/server/entity.ts:125](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L125)

___

### minecraft:physics

• `Optional` **minecraft:physics**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `has_collision?` | `boolean` |
| `has_gravity?` | `boolean` |
| `push_towards_closest_space?` | `boolean` |

#### Defined in

[ts/app/types/server/entity.ts:128](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L128)

___

### minecraft:projectile

• `Optional` **minecraft:projectile**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `anchor` | `number` |
| `gravity` | `number` |
| `hit_sound?` | `string` |
| `offset` | [`MolangTripleArray`](../modules.md#molangtriplearray) |
| `on_hit?` | \{ `arrow_effect?`: \{ `apply_effect_to_blocking_targets?`: `boolean`  } ; `definition_event?`: \{ `event_trigger`: \{ `event`: `string` ; `target`: [`ServerEntityTarget`](../modules.md#serverentitytarget)  }  } ; `impact_damage?`: \{ `damage?`: [`Range`](../modules.md#range) ; `destroy_on_hit?`: `boolean` ; `knockback?`: `boolean` ; `semi_random_diff_damage?`: `boolean`  } ; `stick_in_ground?`: \{ `shake_time?`: `number`  }  } |
| `on_hit.arrow_effect?` | \{ `apply_effect_to_blocking_targets?`: `boolean`  } |
| `on_hit.arrow_effect.apply_effect_to_blocking_targets?` | `boolean` |
| `on_hit.definition_event?` | \{ `event_trigger`: \{ `event`: `string` ; `target`: [`ServerEntityTarget`](../modules.md#serverentitytarget)  }  } |
| `on_hit.definition_event.event_trigger` | \{ `event`: `string` ; `target`: [`ServerEntityTarget`](../modules.md#serverentitytarget)  } |
| `on_hit.definition_event.event_trigger.event` | `string` |
| `on_hit.definition_event.event_trigger.target` | [`ServerEntityTarget`](../modules.md#serverentitytarget) |
| `on_hit.impact_damage?` | \{ `damage?`: [`Range`](../modules.md#range) ; `destroy_on_hit?`: `boolean` ; `knockback?`: `boolean` ; `semi_random_diff_damage?`: `boolean`  } |
| `on_hit.impact_damage.damage?` | [`Range`](../modules.md#range) |
| `on_hit.impact_damage.destroy_on_hit?` | `boolean` |
| `on_hit.impact_damage.knockback?` | `boolean` |
| `on_hit.impact_damage.semi_random_diff_damage?` | `boolean` |
| `on_hit.stick_in_ground?` | \{ `shake_time?`: `number`  } |
| `on_hit.stick_in_ground.shake_time?` | `number` |
| `power` | `number` |
| `should_bounce?` | `boolean` |
| `uncertainty_base` | `number` |
| `uncertainty_multiplier` | `number` |

#### Defined in

[ts/app/types/server/entity.ts:133](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L133)

___

### minecraft:pushable

• `Optional` **minecraft:pushable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `is_pushable?` | `boolean` |
| `is_pushable_by_piston?` | `boolean` |

#### Defined in

[ts/app/types/server/entity.ts:164](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L164)

___

### minecraft:type\_family

• `Optional` **minecraft:type\_family**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `family` | `string`[] |

#### Defined in

[ts/app/types/server/entity.ts:168](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/server/entity.ts#L168)
