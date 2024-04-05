[bedrock-development](../README.md) / [Exports](../modules.md) / IServerEntityEvent

# Interface: IServerEntityEvent

## Table of contents

### Properties

- [add](IServerEntityEvent.md#add)
- [emit\_vibration](IServerEntityEvent.md#emit_vibration)
- [filters](IServerEntityEvent.md#filters)
- [queue\_command](IServerEntityEvent.md#queue_command)
- [randomize](IServerEntityEvent.md#randomize)
- [remove](IServerEntityEvent.md#remove)
- [sequence](IServerEntityEvent.md#sequence)
- [set\_property](IServerEntityEvent.md#set_property)
- [trigger](IServerEntityEvent.md#trigger)
- [wheight](IServerEntityEvent.md#wheight)

## Properties

### add

• `Optional` **add**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `component_groups` | `string`[] |

#### Defined in

[ts/app/types/server/entity.ts:202](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L202)

___

### emit\_vibration

• `Optional` **emit\_vibration**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vibration` | `string` |

#### Defined in

[ts/app/types/server/entity.ts:209](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L209)

___

### filters

• `Optional` **filters**: [`IServerEntityFilters`](IServerEntityFilters.md)

#### Defined in

[ts/app/types/server/entity.ts:208](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L208)

___

### queue\_command

• `Optional` **queue\_command**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `command` | `string` \| `string`[] |

#### Defined in

[ts/app/types/server/entity.ts:212](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L212)

___

### randomize

• `Optional` **randomize**: [`IServerEntityEvent`](IServerEntityEvent.md)[]

#### Defined in

[ts/app/types/server/entity.ts:219](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L219)

___

### remove

• `Optional` **remove**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `component_groups` | `string`[] |

#### Defined in

[ts/app/types/server/entity.ts:205](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L205)

___

### sequence

• `Optional` **sequence**: [`IServerEntityEvent`](IServerEntityEvent.md)[]

#### Defined in

[ts/app/types/server/entity.ts:220](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L220)

___

### set\_property

• `Optional` **set\_property**: `Object`

#### Index signature

▪ [key: [`Identifier`](../modules.md#identifier)]: `string` \| `number` \| `boolean`

#### Defined in

[ts/app/types/server/entity.ts:215](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L215)

___

### trigger

• `Optional` **trigger**: `string` \| [`IServerEntityTrigger`](IServerEntityTrigger.md)

#### Defined in

[ts/app/types/server/entity.ts:218](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L218)

___

### wheight

• `Optional` **wheight**: `number`

#### Defined in

[ts/app/types/server/entity.ts:221](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L221)
