import {Component, ComponentConstructor} from '.'

export abstract class Entity {
  protected components_: Component[] = []

  public get components(): readonly Component[] {
    return this.components_
  }

  public addComponent(component: Component): void {
    component.Entity = this
    this.components_.push(component)
  }

  public addComponentType<TArgs, TComponent extends Component>(cc: ComponentConstructor<TArgs, TComponent>, args: TArgs | undefined) : TComponent | undefined {
    let c: TComponent | undefined
    try {
      c = new cc(args)
      c.Entity = this
      this.components_.push(c)
    }
    catch (error) {
      console.error(`Error creating component: ${JSON.stringify(error, undefined, 2)}`)
    }

    return c
  }

  public getComponent<TComponent extends Component>(constr: new(...args: any[]) => TComponent): TComponent | never {
    for(const c of this.components_){
      if(c instanceof constr) {
        return c
      }
    }

    throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}.`)
  }
}
