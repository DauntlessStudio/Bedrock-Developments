[bedrock-development](../README.md) / [Exports](../modules.md) / IClientAnimationAnim

# Interface: IClientAnimationAnim

## Table of contents

### Properties

- [anim\_time\_update](IClientAnimationAnim.md#anim_time_update)
- [animation\_length](IClientAnimationAnim.md#animation_length)
- [blend\_weight](IClientAnimationAnim.md#blend_weight)
- [bones](IClientAnimationAnim.md#bones)
- [loop](IClientAnimationAnim.md#loop)
- [loop\_delay](IClientAnimationAnim.md#loop_delay)
- [override\_previous\_animation](IClientAnimationAnim.md#override_previous_animation)
- [particle\_effects](IClientAnimationAnim.md#particle_effects)
- [sound\_effects](IClientAnimationAnim.md#sound_effects)
- [start\_delay](IClientAnimationAnim.md#start_delay)
- [timeline](IClientAnimationAnim.md#timeline)

## Properties

### anim\_time\_update

• `Optional` **anim\_time\_update**: `string`

#### Defined in

[ts/app/types/client/animation.ts:18](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L18)

___

### animation\_length

• `Optional` **animation\_length**: `number`

#### Defined in

[ts/app/types/client/animation.ts:17](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L17)

___

### blend\_weight

• `Optional` **blend\_weight**: `string`

#### Defined in

[ts/app/types/client/animation.ts:19](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L19)

___

### bones

• `Optional` **bones**: `Object`

#### Index signature

▪ [key: `string`]: [`IClientAnimationBone`](IClientAnimationBone.md)

#### Defined in

[ts/app/types/client/animation.ts:33](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L33)

___

### loop

• `Optional` **loop**: `boolean` \| ``"hold_on_last_frame"``

#### Defined in

[ts/app/types/client/animation.ts:20](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L20)

___

### loop\_delay

• `Optional` **loop\_delay**: `string`

#### Defined in

[ts/app/types/client/animation.ts:21](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L21)

___

### override\_previous\_animation

• `Optional` **override\_previous\_animation**: `boolean`

#### Defined in

[ts/app/types/client/animation.ts:23](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L23)

___

### particle\_effects

• `Optional` **particle\_effects**: `Object`

#### Index signature

▪ [key: \`$\{number}\`]: [`IClientACParticleEffects`](IClientACParticleEffects.md)

#### Defined in

[ts/app/types/client/animation.ts:27](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L27)

___

### sound\_effects

• `Optional` **sound\_effects**: `Object`

#### Index signature

▪ [key: \`$\{number}\`]: [`IClientACSoundEffects`](IClientACSoundEffects.md)

#### Defined in

[ts/app/types/client/animation.ts:30](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L30)

___

### start\_delay

• `Optional` **start\_delay**: `string`

#### Defined in

[ts/app/types/client/animation.ts:22](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L22)

___

### timeline

• `Optional` **timeline**: `Object`

#### Index signature

▪ [key: \`$\{number}\`]: `string`[]

#### Defined in

[ts/app/types/client/animation.ts:24](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/animation.ts#L24)
