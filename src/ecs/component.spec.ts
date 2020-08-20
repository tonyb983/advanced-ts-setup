import {Component, ComponentAttributes} from '@/ecs/component'

import {Entity} from './entity'

class TestEntity extends Entity
{
  private name_: string

  constructor(name: string, initialComponents: Component[] = []) {
    super()

    this.name_ = name
    if(initialComponents.length > 0){
      initialComponents.forEach(c => this.addComponent(c))
    }

    console.assert(this.components_.length === initialComponents.length, 'Entity component count should equal given component count.')
  }

  public get name(): string {
    return this.name_
  }

  public set name(n: string) {
    this.name_ = n
  }
}

abstract class TestComponentBase implements Component
{
  protected entity_: Entity | undefined
  protected flags_: ComponentAttributes

  protected constructor(entity: Entity | undefined, flags: ComponentAttributes = ComponentAttributes.None) {
    this.entity_ = entity
    this.flags_ = flags
  }

  public get Entity(): Entity | undefined {
    return this.entity_
  }

  public get Flags(): ComponentAttributes {
    return this.flags_
  }

  public abstract get name(): string;
}

class Comp1 extends TestComponentBase
{
  private readonly n = 'TestComponent 1'

  public get name(): string {
    return this.n
  }
}

class Comp2 extends TestComponentBase
{
  private readonly n = 'TestComponent 2'

  public get name(): string {
    return this.n
  }
}

class Comp3 extends TestComponentBase
{
  private readonly n = 'TestComponent 3'

  public get name(): string {
    return this.n
  }
}

describe('component.ts tests.', () => {
  it('Should create a TestEntity.', () => {
    const ent = new TestEntity('Test Entity')

    expect(ent).toBeDefined()
    expect(ent).toBeInstanceOf(Entity)
    expect(ent).toBeInstanceOf(TestEntity)
  })

  it('Should add components to an existing entity during component construction.', () => {
    const ent = new TestEntity('Test Entity')

  })
})
