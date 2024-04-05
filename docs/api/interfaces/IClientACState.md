[bedrock-development](../README.md) / [Exports](../modules.md) / IClientACState

# Interface: IClientACState

## Table of contents

### Properties

- [animations](IClientACState.md#animations)
- [blend\_transition](IClientACState.md#blend_transition)
- [blend\_via\_shortest\_path](IClientACState.md#blend_via_shortest_path)
- [on\_entry](IClientACState.md#on_entry)
- [on\_exit](IClientACState.md#on_exit)
- [particle\_effects](IClientACState.md#particle_effects)
- [sound\_effects](IClientACState.md#sound_effects)
- [transitions](IClientACState.md#transitions)
- [variables](IClientACState.md#variables)

## Properties

### animations

• `Optional` **animations**: (`string` \| \{ `[key: string]`: `string`;  })[]

#### Defined in

[ts/app/types/client/animation_controller.ts:24](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/animation_controller.ts#L24)

___

### blend\_transition

• `Optional` **blend\_transition**: `number`

#### Defined in

[ts/app/types/client/animation_controller.ts:27](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/animation_controller.ts#L27)

___

### blend\_via\_shortest\_path

• `Optional` **blend\_via\_shortest\_path**: `boolean`

#### Defined in

[ts/app/types/client/animation_controller.ts:28](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/animation_controller.ts#L28)

___

### on\_entry

• `Optional` **on\_entry**: `string`[]

#### Defined in

[ts/app/types/client/animation_controller.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/animation_controller.ts#L23)

___

### on\_exit

• `Optional` **on\_exit**: `string`[]

#### Defined in

[ts/app/types/client/animation_controller.ts:26](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/animation_controller.ts#L26)

___

### particle\_effects

• `Optional` **particle\_effects**: [`IClientACParticleEffects`](IClientACParticleEffects.md)[]

#### Defined in

[ts/app/types/client/animation_controller.ts:29](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/animation_controller.ts#L29)

___

### sound\_effects

• `Optional` **sound\_effects**: [`IClientACSoundEffects`](IClientACSoundEffects.md)[]

#### Defined in

[ts/app/types/client/animation_controller.ts:30](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/animation_controller.ts#L30)

___

### transitions

• `Optional` **transitions**: \{ `[key: string]`: `string`;  }[]

#### Defined in

[ts/app/types/client/animation_controller.ts:25](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/animation_controller.ts#L25)

___

### variables

• `Optional` **variables**: `Object`

#### Index signature

▪ [key: `string`]: [`IClientACSoundVariable`](IClientACSoundVariable.md)

#### Defined in

[ts/app/types/client/animation_controller.ts:31](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/client/animation_controller.ts#L31)
