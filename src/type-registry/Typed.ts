import isSymbol from 'lodash/isSymbol'

export abstract class Typed
{
  private readonly type_: symbol

  protected constructor(typeSymbol: symbol) {
    if(!isSymbol(typeSymbol)) {
      throw new TypeError('Invalid argument given for Typed class.')
    }

    this.type_ = typeSymbol
  }

  public get type(): symbol {
    return this.type_
  }

  private static readonly typeDict: Record<symbol, Typed> = new Map<symbol, Typed>()

}
