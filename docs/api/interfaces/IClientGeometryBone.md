[bedrock-development](../README.md) / [Exports](../modules.md) / IClientGeometryBone

# Interface: IClientGeometryBone

## Table of contents

### Properties

- [binding](IClientGeometryBone.md#binding)
- [cubes](IClientGeometryBone.md#cubes)
- [inflate](IClientGeometryBone.md#inflate)
- [locators](IClientGeometryBone.md#locators)
- [mirror](IClientGeometryBone.md#mirror)
- [name](IClientGeometryBone.md#name)
- [origin](IClientGeometryBone.md#origin)
- [parent](IClientGeometryBone.md#parent)
- [pivot](IClientGeometryBone.md#pivot)
- [reset](IClientGeometryBone.md#reset)
- [rotation](IClientGeometryBone.md#rotation)
- [size](IClientGeometryBone.md#size)
- [uv](IClientGeometryBone.md#uv)

## Properties

### binding

• `Optional` **binding**: `string`

#### Defined in

[ts/app/types/client/geometry.ts:41](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L41)

___

### cubes

• `Optional` **cubes**: [`IClientGeometryCube`](IClientGeometryCube.md)[]

#### Defined in

[ts/app/types/client/geometry.ts:56](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L56)

___

### inflate

• `Optional` **inflate**: `number`

#### Defined in

[ts/app/types/client/geometry.ts:42](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L42)

___

### locators

• `Optional` **locators**: `Record`\<`string`, [`MolangTripleArray`](../modules.md#molangtriplearray) \| \{ `ignore_inherited_scale`: `boolean` ; `offset`: [`MolangTripleArray`](../modules.md#molangtriplearray) ; `rotation`: [`MolangTripleArray`](../modules.md#molangtriplearray)  }\>

#### Defined in

[ts/app/types/client/geometry.ts:40](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L40)

___

### mirror

• `Optional` **mirror**: `boolean`

#### Defined in

[ts/app/types/client/geometry.ts:43](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L43)

___

### name

• `Optional` **name**: `string`

#### Defined in

[ts/app/types/client/geometry.ts:37](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L37)

___

### origin

• `Optional` **origin**: [`MolangTripleArray`](../modules.md#molangtriplearray)

#### Defined in

[ts/app/types/client/geometry.ts:44](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L44)

___

### parent

• `Optional` **parent**: `string`

#### Defined in

[ts/app/types/client/geometry.ts:39](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L39)

___

### pivot

• `Optional` **pivot**: [`MolangTripleArray`](../modules.md#molangtriplearray)

#### Defined in

[ts/app/types/client/geometry.ts:38](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L38)

___

### reset

• `Optional` **reset**: `boolean`

#### Defined in

[ts/app/types/client/geometry.ts:45](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L45)

___

### rotation

• `Optional` **rotation**: [`MolangTripleArray`](../modules.md#molangtriplearray)

#### Defined in

[ts/app/types/client/geometry.ts:46](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L46)

___

### size

• `Optional` **size**: [`MolangTripleArray`](../modules.md#molangtriplearray)

#### Defined in

[ts/app/types/client/geometry.ts:47](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L47)

___

### uv

• `Optional` **uv**: [`MolangDoubleArray`](../modules.md#molangdoublearray) \| \{ `down`: [`IClientGeometryPerFaceUV`](IClientGeometryPerFaceUV.md) ; `east`: [`IClientGeometryPerFaceUV`](IClientGeometryPerFaceUV.md) ; `north`: [`IClientGeometryPerFaceUV`](IClientGeometryPerFaceUV.md) ; `south`: [`IClientGeometryPerFaceUV`](IClientGeometryPerFaceUV.md) ; `up`: [`IClientGeometryPerFaceUV`](IClientGeometryPerFaceUV.md) ; `west`: [`IClientGeometryPerFaceUV`](IClientGeometryPerFaceUV.md)  }

#### Defined in

[ts/app/types/client/geometry.ts:48](https://github.com/DauntlessStudio/Bedrock-Developments/blob/c7d1542/ts/app/types/client/geometry.ts#L48)
