// TODO Should Components be able to exist outside of an Entity?

import { Entity } from './entity'

export interface Component {
  Entity: Entity | undefined
  Flags: ComponentAttributes
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface ComponentConstructor<TArgs extends unknown, TComponent extends Component = Component> {
  new (args?: TArgs): TComponent
}

export const enum ComponentAttributes {
  // noinspection PointlessBitwiseExpressionJS
  None = 0,
  AllowOnlyOne = 1 << 0,
  RequiresUpdate = 1 << 1,
  RequiresFixedUpdate = 1 << 2,
}
