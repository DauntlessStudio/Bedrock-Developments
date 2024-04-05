[bedrock-development](../README.md) / [Exports](../modules.md) / IServerEntityDescription

# Interface: IServerEntityDescription

## Table of contents

### Properties

- [animations](IServerEntityDescription.md#animations)
- [identifier](IServerEntityDescription.md#identifier)
- [is\_experimental](IServerEntityDescription.md#is_experimental)
- [is\_spawnable](IServerEntityDescription.md#is_spawnable)
- [is\_summonable](IServerEntityDescription.md#is_summonable)
- [properties](IServerEntityDescription.md#properties)
- [runtime\_identifier](IServerEntityDescription.md#runtime_identifier)
- [scripts](IServerEntityDescription.md#scripts)

## Properties

### animations

• `Optional` **animations**: `Object`

#### Index signature

▪ [key: `string`]: [`ServerAnimationName`](../modules.md#serveranimationname) \| [`ServerACName`](../modules.md#serveracname)

#### Defined in

[ts/app/types/server/entity.ts:30](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L30)

___

### identifier

• **identifier**: \`$\{string}:$\{string}\`

#### Defined in

[ts/app/types/server/entity.ts:24](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L24)

___

### is\_experimental

• **is\_experimental**: `boolean`

#### Defined in

[ts/app/types/server/entity.ts:28](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L28)

___

### is\_spawnable

• **is\_spawnable**: `boolean`

#### Defined in

[ts/app/types/server/entity.ts:26](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L26)

___

### is\_summonable

• **is\_summonable**: `boolean`

#### Defined in

[ts/app/types/server/entity.ts:27](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L27)

___

### properties

• `Optional` **properties**: [`IServerEntityProperties`](IServerEntityProperties.md)

#### Defined in

[ts/app/types/server/entity.ts:29](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L29)

___

### runtime\_identifier

• `Optional` **runtime\_identifier**: \`$\{string}:$\{string}\`

#### Defined in

[ts/app/types/server/entity.ts:25](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L25)

___

### scripts

• `Optional` **scripts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `animate?` | (`string` \| \{ `[key: string]`: `string`;  })[] |

#### Defined in

[ts/app/types/server/entity.ts:33](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/server/entity.ts#L33)
