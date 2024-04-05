[bedrock-development](../README.md) / [Exports](../modules.md) / MCFunction

# Class: MCFunction

**`Remarks`**

A class for working with `.mcfunction` files.

## Table of contents

### Constructors

- [constructor](MCFunction.md#constructor)

### Properties

- [files](MCFunction.md#files)

### Methods

- [addCommand](MCFunction.md#addcommand)

## Constructors

### constructor

• **new MCFunction**(`filepattern`): [`MCFunction`](MCFunction.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepattern` | `string` | The filepattern used to find or create mcfunction files. |

#### Returns

[`MCFunction`](MCFunction.md)

**`Remarks`**

Creates a list of files from the filepattern. Note that if no files match the filepattern, a new file will be created in `BP/functions` using the filepattern as a path.

#### Defined in

[ts/app/types/minecraft.ts:208](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L208)

## Properties

### files

• **files**: [`File`](../modules.md#file)[]

**`Remarks`**

The mcfunction files handled by this class instance, as an array of [File](../modules.md#file)s.

#### Defined in

[ts/app/types/minecraft.ts:202](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L202)

## Methods

### addCommand

▸ **addCommand**(`commands`, `options?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commands` | `string`[] | A list of commands to add to the files. |
| `options?` | `Object` | The mcfunction's comments at the top of the file, note these are only added if the file is empty. |
| `options.description` | `string` | - |
| `options.selector?` | `string` | - |
| `options.source?` | `string` | - |

#### Returns

`void`

**`Remarks`**

Adds commands and optional comments.

#### Defined in

[ts/app/types/minecraft.ts:222](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L222)
