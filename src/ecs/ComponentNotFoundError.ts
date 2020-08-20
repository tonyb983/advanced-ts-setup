import {Entity} from '@/ecs/entity'

import {Component, ComponentConstructor} from './component'

export const NullComponentName = '#####__NULL_COMPONENT__#####' as const
export const NullEntityName = '######__NULL__ENTITY__######' as const
export const NullEntityId = '######_NULL_ENTITY_ID_######' as const

const isNotDefaultNullString = (s: string): boolean => {
  return s !== NullComponentName && s !== NullEntityName && s !== NullEntityId
}

const isDefaultNullString = (s: string): boolean => {
  return s === NullComponentName || s === NullEntityName || s === NullEntityId
}

type Message = string | { text: string }
type AllData = {
  entity: Entity
  entityId: string
  entityName: string
  component: Component
  componentName: string
  componentConstructor: ComponentConstructor<unknown>
}
type InputData = Partial<AllData>

const SubstitutionData = [
  {id: 'e', abbr: '{e}', prop: 'entity',},
  {id: 'eid', abbr: '{eid}', prop: 'entityId',},
  {id: 'en', abbr: '{en}', prop: 'entityName',},
  {id: 'c', abbr: '{c}', prop: 'component',},
  {id: 'cn', abbr: '{cn}', prop: 'componentName',},
  {id: 'ctor', abbr: '{ctor}', prop: 'componentConstructor',}
]

type SubText =
  | '{e}'
  | '{eid}'
  | '{en}'
  | '{c}'
  | '{cn}'
  | '{ctor}'

type SubProperty =
  | { entity: Entity | undefined }
  | { entityId: string }
  | { entityName: string }
  | { component: Component | undefined }
  | { componentName: string }
  | { componentConstructor: ComponentConstructor<unknown> | undefined }

type TextToProperty = [SubText, SubProperty]
type UnknownTuple = [unknown, unknown]

export const typeToString = (u: unknown): string => {
  if(u === undefined) {
    return '[undefined]'
  }

  if(u === null) {
    return '[null]'
  }

  if (typeof u === 'string') {
    return u
  }

  if (typeof u === 'symbol') {
    return `[symbol ${u.toString()}]`
  }

  if (typeof u === 'boolean') {
    return u ? '[bool true]' : '[bool false]'
  }

  if (typeof u === 'number') {
    return `[number ${u.toString(10)}]`
  }

  if (typeof u === 'object') {
    // Noinspection EqualityComparisonWithCoercionJS
    // if(u === null) {
    //   return '[null]'
    // }
    let name = '[object '
    const p = Object.getPrototypeOf(u)

    if('name' in u!) {
      name += (u as any).name
    }

    if ('constructor' in p && 'name' in p.constructor) {
      name += `<${p.constructor.name}>`
    } else if ('name' in p) {
      name += `<${p.name}>`
    }

    name += ']'
    return name
  }

  if (typeof u === 'function') {

    // Within this branch, `u` has type `Function`,
    // so we can access the function's `name` property
    const functionName = u.name || '<anonymous>'
    const args = u.arguments.reduce(argumentNameReducer, '')
    return `[function ${functionName}(${args})]`
  }

  if (u instanceof Date) {
    // Within this branch, `u` has type `Date`,
    // so we can call the `toISOString` method
    return u.toISOString()
  }

  return String(u)
}

const argumentNameReducer = (prev: string, curr: any, index: number, arr: any[]): string => {
  let s = prev

  if (index === 0) {
    s += '('
  }
  else {
    s += ', '
  }

  s += typeToString(curr)
  s += `: ${typeof curr}`

  if (index === arr.length - 1) {
    s += ')'
  }

  return s
}

const stringReplaceReducer = (text: string, [original, replacement]: UnknownTuple, index: number, arr: UnknownTuple[]): string => {
  return text.replace(typeToString(original), typeToString(replacement))
}

const textPropReducer = (text: string, [o, n]: TextToProperty, index: number, arr: TextToProperty[]): string => {
  return text.replace(o, n.toString())
}

const extractMessageText = (m: Message): string => {
  return typeof m === 'string' ?
    m :
    'text' in m ?
      m.text :
      '[error extracting message]'
}

const DefaultNotFoundMessage = 'Error finding component "{cn}" on Entity "{en}".\nEntity: {e} | EntityID: {eid}\nComponent: {c} ComponentConstructor: {ctor}'

export class ComponentNotFound extends Error {
  constructor(msg: string) {
    super()
  }

  public static From(message: Message = DefaultNotFoundMessage, rest: InputData = {}): ComponentNotFound {
    const msg = extractMessageText(message)
    const {
      componentName = NullComponentName,
      component,
      componentConstructor,
      entityName = NullEntityName,
      entityId = NullEntityId,
      entity,
    } = rest

    const subs: TextToProperty[] = [
      ['{cn}', {componentName}],
      ['{c}', {component}],
      ['{ctor}', {componentConstructor}],
      ['{e}', {entity}],
      ['{eid}', {entityId}],
      ['{en}', {entityName}],
    ]
    return new ComponentNotFound(applySubstitutions(msg, subs))
  }
}

const filterNil = ([k,v]: TextToProperty): boolean => {
  return v !== undefined && v !== null
}

const shouldIgnoreProp = (val: SubProperty): boolean => {
  return ('entityId'      in val && val.entityId === NullEntityId)
      || ('entityName'    in val && val.entityName === NullEntityName)
      || ('componentName' in val && val.componentName === NullComponentName)
}

const filterDefaultStrings = ([_,v]: TextToProperty): boolean => {
  return !shouldIgnoreProp(v)
}

const applySubstitutions = (msg: string, subs: TextToProperty[]): string => {
  return subs
    .filter(filterNil)
    .filter(filterDefaultStrings)
    .reduce(textPropReducer, msg)
}


