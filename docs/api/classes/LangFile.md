[bedrock-development](../README.md) / [Exports](../modules.md) / LangFile

# Class: LangFile

**`Remarks`**

A class for working with lang files.

## Table of contents

### Constructors

- [constructor](LangFile.md#constructor)

### Properties

- [files](LangFile.md#files)

### Methods

- [addToCategory](LangFile.md#addtocategory)
- [addToAllLangs](LangFile.md#addtoalllangs)

## Constructors

### constructor

• **new LangFile**(`filepattern`): [`LangFile`](LangFile.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepattern` | `string` | The glob pattern to find lang files with. If no files match the pattern, a default `en_US.lang` file will be created automatically. |

#### Returns

[`LangFile`](LangFile.md)

**`Remarks`**

Gets a list of files from a glob pattern. Note that any valid pattern will work and the file will be treated as a lang file, even without the .lang extension.

#### Defined in

[ts/app/types/minecraft.ts:143](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L143)

## Properties

### files

• **files**: [`File`](../modules.md#file)[]

**`Remarks`**

The lang files handled by this class instance, as an array of [File](../modules.md#file)s.

#### Defined in

[ts/app/types/minecraft.ts:137](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L137)

## Methods

### addToCategory

▸ **addToCategory**(`categoryName`, `...entries`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `categoryName` | `string` | The category to add an entry to, i.e. `Item Names`. |
| `...entries` | `string`[] | Entries to add to that category, i.e. `item.minecraft:test.name=Test`. |

#### Returns

`void`

**`Remarks`**

Adds an entry to all the `.lang` file in this object's [files](LangFile.md#files) list.

#### Defined in

[ts/app/types/minecraft.ts:169](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L169)

___

### addToAllLangs

▸ **addToAllLangs**(`categoryName`, `...entries`): [`LangFile`](LangFile.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `categoryName` | `string` | The category to add an entry to, i.e. `Item Names`. |
| `...entries` | `string`[] | Entries to add to that category, i.e. `item.minecraft:test.name=Test`. |

#### Returns

[`LangFile`](LangFile.md)

A new LangFile object with every `.lang` file in the `RP/texts` directory, having added the entries.

**`Remarks`**

Adds a lang file entry to every `.lang` file in `RP/texts`.

#### Defined in

[ts/app/types/minecraft.ts:158](https://github.com/DauntlessStudio/Bedrock-Developments/blob/9a78313/ts/app/types/minecraft.ts#L158)
