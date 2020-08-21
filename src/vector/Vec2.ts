import isArray from 'lodash/isArray'

/** @typedef Point = [number, number] */
/** @typedef Vec2Input = Point | {x: number; y: number } | Vec2 | never */

/** A [number, number] tuple indicating a point on a 2D plane. */
export type Point = [number, number]
/** The types of input a {@link Vec2} constructor can accept. */
export type Vec2Input = Point | {x: number; y: number } | Vec2 | never

/**
 * Quickly get the absolute value of a number.
 *
 * @param {number} n -The number to get the absolute value of.
 * @returns {number} The absolute value of the number given.
 * @example
 * const num1 = -41
 * const num2 = 41
 * const num3 = 0
 *
 * console.log(`${quickAbs(num1)}|${quickAbs(num2)}|${quickAbs(num3)}`)
 * // Writes '41|41|0'
 */
export const quickAbs = (n: number): number => {
  return n >= 0 ? n : n * -1
}

/**
 * Quickly determine if number closer to zero than the given epsilon value.
 *
 * @param {number} n -The number to check.
 * @param {number} epsilon -The margin of error to use when determining if the number is close enough to zero.
 * @returns {boolean} True if the value is closer to zero than epsilon.
 * @example
 * const close = 0.0001
 *
 * const imTrue = quickAlmostZero(close, 0.001)
 * const imFalse = quickAlmostZero(Number.EPSILON*1.1)
 * const alsoTrue = quickAlmostZero(Number.EPSILON*0.9)
 */
export const quickAlmostZero = (n: number, epsilon = Number.EPSILON): boolean => {
  const n2 = quickAbs(n)
  return n2 >= -epsilon && n2 <= epsilon
}

/**
 * A Vector2 class representing a position in a 2D plane, or a 2D movement / force vector.
 */
export class Vec2
{
  //<editor-fold desc="Private Members">
  /**
   * The internal x value of this {@link Vec2}.
   *
   * @private
   */
  private readonly x_: number;
  /**
   * The internal y value of this {@link Vec2}.
   *
   * @private
   */
  private readonly y_: number;
  /**
   * The internal square magnitude of this {@link Vec2}.
   *
   * @private
   */
  private readonly sqMag_: number;


  /**
   * Whether the magnitude of this {@link Vec2} has been calculated yet.
   *
   * @private
   */
  private magCalc_ = false;
  /**
   * The magnitude of this {@link Vec2}. We cache this value so even if it's ever called more than once we only sqrt once.
   *
   * @private
   */
  private mag_ = 0;
  //</editor-fold>

  //<editor-fold desc="Constructor">
  /**
   * Constructs a new {@link Vec2}. See {@link Vec2Input} for possible construction arguments.
   *
   * @param {Vec2Input} args - Accepts either a {@link Vec2}, a {@link Point}, or a {x, y} object. Otherwise it sets x and y to [0,0].
   * @example
   * const v1 = new Vec2()                // value [0,0]
   * const v2 = new Vec2([0,1])           // value [0,1]
   * const v3 = new Vec2({x:1, y:2})      // value [1,2]
   * const v4 = new Vec2(undefined)       // value [0,0]
   * const v5 = Vec2.FromNumbers(4,5)     // value [4,5]
   * const v6 = Vec2.FromPoint([-10,-90]) // value [-10,-90]
   */
  constructor(args?: Vec2Input) {
    if(isArray(args) && args.length === 2){   // Is Point
      [this.x_, this.y_] = args
    }
    else if(args instanceof Vec2){                  // Is Vec2
      this.x_ = args.x
      this.y_ = args.y
    }
    else if(args && 'x' in args && 'y' in args){    // Is {x, y} object
      this.x_ = args.x
      this.y_ = args.y
    }
    // Else if(args === null || args === undefined){
    //   this.x_ = 0
    //   this.y_ = 0
    // }
    else {                                          // Is null, undefined, or something weird
      this.x_ = 0
      this.y_ = 0
    }

    this.sqMag_ = (this.x * this.x) + (this.y * this.y)
    this.magCalc_ = false
  }
  //</editor-fold>

  //<editor-fold desc="Private Functions">
  /**
   * This function sets the magnitude and sets the magnitudeCalculated flag to true.
   *
   * @private
   */
  private setMag(): void {
    if(this.magCalc_) {
      return
    }

    this.mag_ = Math.sqrt(this.sqMag_)
    this.magCalc_ = true
  }
  //</editor-fold>

  //<editor-fold desc="Public Getters">
  /**
   * Gets the X value of this {@link Vec2}.
   */
  public get x(): number {
    return this.x_
  }

  /**
   * Gets the Y value of this {@link Vec2}.
   */
  public get y(): number {
    return this.y_
  }

  /**
   * Gets the [x,y] (aka {@link Point}) value of this {@link Vec2}.
   * Duplicate of 'Vec2.get()'.
   */
  public get value(): Point {
    return [this.x, this.y]
  }

  /**
   * Reverses this {@link Vec2}. [x * -1, y * -1].
   */
  public get inverse(): Point {
    return [this.x * -1, this.y * -1]
  }

  /**
   * Gets the magnitude for this {@link Vec2}.
   * This value is cached when called for the first time.
   */
  public get magnitude(): number {
    this.setMag()
    return this.mag_
  }

  /**
   * Gets the Square Magnitude of this {@link Vec2}.
   * This value is calculated upon creation.
   */
  public get sqMagnitude(): number {
    return this.sqMag_
  }
  //</editor-fold>

  //<editor-fold desc="Public Functions">
  /**
   * Gets the [x,y] (aka {@link Point}) value of this {@link Vec2}.
   * Duplicate of 'Vec2.value'.
   *
   * @example
   */
  public get(): Point {
    return [this.x, this.y]
  }

  /**
   * Adds the given {@link Vec2} to this {@link Vec2} and returns a new {@link Vec2}.
   *
   * @param {Vec2} other - The {@link Vec2} to be added to the current {@link Vec2}.
   * @example
   */
  public add(other: Vec2): Vec2 {
    return new Vec2({x: this.x + other.x, y: this.y + other.y})
  }

  /**
   * Subtracts the given {@link Vec2} from this {@link Vec2} and returns a new {@link Vec2}.
   *
   * @param {Vec2} other - The {@link Vec2} to be subtracted from the current {@link Vec2}.
   * @example
   */
  public sub(other: Vec2): Vec2 {
    return Vec2.FromNumbers(this.x - other.x, this.y - other.y)
  }

  /**
   * Multiples this {@link Vec2} x and y values by the given number and returns a new {@link Vec2}.
   *
   * @param {number} num - The number to multiple to both the x and y value of this {@link Vec2}.
   * @example
   */
  public times(num: number): Vec2 {
    return new Vec2({x: this.x * num, y: this.y * num})
  }

  /**
   * Returns a normalized version of this {@link Vec2}.
   *
   * @returns {Vec2} A new {@link Vec2} with a magnitude of 1 or less.
   * @example
   */
  public normalized(): Vec2 {
    return Vec2.Normalize(this)
  }

  /**
   * Convenience function that calls {@link Vec2}.IsZero(this).
   *
   * @returns {boolean} Whether this {@link Vec2} is almost equal to [0,0].
   * @example
   */
  public isZero(): boolean {
    return Vec2.IsZero(this)
  }
  //</editor-fold>

  //<editor-fold desc="Static Functions">
  /**
   * Creates a {@link Vec2} from an existing {@link Vec2}.
   *
   * @param {Vec2} vec - The existing {@link Vec2}.
   * @class
   * @example
   */
  public static FromOther(vec: Vec2): Vec2 {
    return new Vec2({x: vec.x, y: vec.y})
  }

  /**
   * Creates a {@link Vec2} from an X and Y value.
   *
   * @param {number} x - The X value.
   * @param {number} y - The Y value.
   * @class
   * @example
   */
  public static FromNumbers(x: number, y: number): Vec2 {
    return new Vec2({x, y})
  }

  /**
   * Creates a {@link Vec2} from a {@link Point} (a 2-number tuple).
   *
   * @param {Point} p - The point to use as the {@link Vec2}'s position.
   * @class
   * @example
   */
  public static FromPoint(p: Point): Vec2 {
    return new Vec2({x: p[0], y: p[1]})
  }

  /**
   * Creates a normalized {@link Vec2} from the given {@link Vec2}. If the magnitude is already less than 1 and force is not true, it will just return the same {@link Vec2}.
   *
   * @param {Vec2} vec - The {@link Vec2} to normalize.
   * @param {boolean} force - If true, the {@link Vec2} will be normalized even if its magnitude is less than 1 already.
   * @class
   * @example
   */
  public static Normalize(vec: Vec2, force = false): Vec2 {
    const mag = vec.magnitude
    if(mag < 1 && !force) {
      return vec
    }

    if (mag === 0){
      return vec
    }

    return Vec2.FromNumbers(vec.x / mag, vec.y / mag)
  }

  /**
   * Returns TRUE if this {@link Vec2} is almost [0,0] (within negative epsilon and positive epsilon).
   *
   * @param {Vec2} vec - The Vector 2 to check.
   * @param {number} epsilon - The margin of error for zero.
   * @returns {boolean} If this Vec2 is almost zero.
   * @example
   */
  public static IsZero(vec: Vec2, epsilon = Number.EPSILON): boolean {
    return quickAlmostZero(vec.x, epsilon) && quickAlmostZero(vec.y, epsilon)
  }

  /**
   * Adds the two vectors together.
   *
   * @param {Vec2} v1 - The first {@link Vec2}.
   * @param {Vec2} v2 - The second {@link Vec2}.
   * @class
   * @example
   */
  public static Add(v1: Vec2, v2: Vec2): Vec2 {
    return new Vec2({ x: v1.x + v2.x, y: v1.y + v2.y })
  }

  /**
   * Returns the dot product of two {@link Vec2}s.
   *
   * @param {Vec2} v1 - The first {@link Vec2}.
   * @param {Vec2} v2 - The second {@link Vec2}.
   * @returns {number} The dot product of the two Vec2s.
   * @example
   */
  public static Dot(v1: Vec2, v2: Vec2): number {
    return v1.x * v2.x + v1.y * v2.y
  }

  /**
   * Returns the distance between two {@link Vec2}s.
   *
   * @param {Vec2} from - The origin {@link Vec2}.
   * @param {Vec2} to - The target {@link Vec2}.
   * @returns {number} The distance between the two Vec2s.
   * @example
   *
   *
   */
  public static Dist(from: Vec2, to: Vec2): number {
    return to.sub(from).magnitude
  }

  /**
   * Returns the distance squared between two {@link Vec2}s (Avoiding the sqrt call if not needed).
   *
   * @param {Vec2} from - The origin {@link Vec2}.
   * @param {Vec2} to - The target {@link Vec2}.
   * @returns {number} The distance squared between the two Vec2s.
   * @example
   * const playerPos = Vec2.Zero
   * const targetPos = Vec2.FromPoint([3,5])
   * const detectionRange = 4
   *
   * const isDetected = Vec2.SqDist(targetPos, playerPos) <= detectionRange * detectionRange
   *
   */
  public static SqDist(from: Vec2, to: Vec2): number {
    return to.sub(from).sqMagnitude
  }
  //</editor-fold>

  //<editor-fold desc="Static Members">
  /**
   * Static {@link Vec2} representing the Up direction (0, 1).
   *
   * @returns {Vec2} The Vec2 constant.
   */
  public static get Up(): Vec2 {
    return new Vec2({x: 0, y: 1})
  }

  /**
   * Static {@link Vec2} representing the Down direction (0, -1).
   *
   * @returns {Vec2} The Vec2 constant.
   */
  public static get Down(): Vec2 {
    return new Vec2({x: 0, y: -1})
  }

  /**
   * Static {@link Vec2} representing the Left direction (-1, 0).
   *
   * @returns {Vec2} The Vec2 constant.
   */
  public static get Left(): Vec2 {
    return new Vec2({x: -1, y: 0})
  }

  /**
   * Static {@link Vec2} representing the Right direction (1, 0).
   *
   * @returns {Vec2} The Vec2 constant.
   */
  public static get Right(): Vec2 {
    return new Vec2({x: 1, y: 0})
  }

  /**
   * Static {@link Vec2} representing (1, 1).
   *
   * @returns {Vec2} The Vec2 constant.
   */
  public static get One(): Vec2 {
    return new Vec2({x: 1, y: 1})
  }

  /**
   * Static {@link Vec2} representing (0, 0).
   *
   * @returns {Vec2} The Vec2 constant.
   */
  public static get Zero(): Vec2 {
    return new Vec2({x: 0, y: 0})
  }
  //</editor-fold>
}
