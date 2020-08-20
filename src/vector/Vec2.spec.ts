import {Vec2, quickAbs, quickAlmostZero} from './Vec2'

describe('Vec2.ts Tests', () => {
  describe('Vec2 Class Tests', () => {
    const calcSqMag = (x: number, y: number): number => {
      return (x * x) + (y * y)
    }

    const calcMag = (x: number, y: number): number => {
      return Math.sqrt(calcSqMag(x, y))
    }

    const calcDist = (a: [number, number], b: [number, number]): number => {
      return Vec2.FromPoint([a[0] - b[0], a[1] - b[1]]).magnitude
    }

    const calcSqDist = (a: [number, number], b: [number, number]): number => {
      return Vec2.FromPoint([a[0] - b[0], a[1] - b[1]]).sqMagnitude
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaultExpect = (v: any, expectedX: number, expectedY: number): void => {
      expect(v.x).toBe(expectedX)
      expect(v.y).toBe(expectedY)
      expect(v.get()).toStrictEqual([expectedX, expectedY])
      expect(v.value).toStrictEqual([expectedX, expectedY])
      expect(v.magnitude).toBe(calcMag(expectedX, expectedY))
      expect(v.sqMagnitude).toBe(calcSqMag(expectedX, expectedY))
    }

    beforeAll(() => {
      // Test helper functions.
      const a = [2, 2]
      expect(calcSqMag(a[0], a[1])).toBe((a[0] * a[0]) + (a[1] * a[1]))
      expect(calcMag(a[0], a[1])).toBe(Math.sqrt((a[0] * a[0]) + (a[1] * a[1])))

      const f: [number, number] = [2, 2]
      const t: [number, number] = [1, 1]
      expect(calcDist(f, t)).toBe(calcMag(f[0] - t[0], f[1] - t[1]))
      expect(calcSqDist(f, t)).toBe(calcSqMag(f[0] - t[0], f[1] - t[1]))
    })

    let v1: Vec2
    let v2: Vec2
    beforeEach(() => {
      v1 = new Vec2({x: 1, y: 1})
      v2 = new Vec2({x: 2, y: 2})
      defaultExpect(v1, 1, 1)
      defaultExpect(v2, 2, 2)
    })

    it('Should create a Vec2 under normal circumstances', () => {
      defaultExpect(v1, 1, 1)
    })

    it('Should create a Vec2 out of a point (a 2-number tuple).', () => {
      const v = new Vec2([1, 1])

      defaultExpect(v, 1, 1)
    })

    it('Should create a Vec2 out of an {x, y} object.', () => {
      const v = new Vec2({x: 1, y: 1})

      defaultExpect(v, 1, 1)
    })

    it('Should create a Vec2 out of another Vec2.', () => {
      const v = new Vec2(v1)

      defaultExpect(v, 1, 1)
    })

    it('Should create a zero Vec2 out of anything else.', () => {
      const v = new Vec2()

      defaultExpect(v, 0, 0)

      const vv = new Vec2(undefined)
      defaultExpect(vv, 0, 0)

      const vvv = new Vec2(([0.9, 1.1] || 'fuck me') ?? null)
      defaultExpect(vvv, 0.9, 1.1)
    })

    it('Should cache the magnitude.', () => {
      expect(v1.magnitude).toBe(calcMag(1, 1))
      expect(v1.magnitude).toBe(calcMag(1, 1))
      expect(v1.magnitude).toBe(calcMag(1, 1))
    })

    it('Should add two vectors.', () => {
      const v3 = v1.add(v2)
      const v4 = Vec2.Add(v1, v2)

      expect(v3).toBeDefined()
      expect(v3).toBeInstanceOf(Vec2)
      expect(v3.get()).toStrictEqual([3, 3])
      expect(v4).toBeDefined()
      expect(v4).toBeInstanceOf(Vec2)
      expect(v4.get()).toStrictEqual([3, 3])
    })

    it('Should subtract two vectors.', () => {
      const v3 = v2.sub(v1)

      expect(v3).toBeDefined()
      expect(v3).toBeInstanceOf(Vec2)
      expect(v3.get()).toStrictEqual([1, 1])
    })

    it('Should multiply a vector and a number.', () => {
      const v3 = v1.times(5)

      expect(v3).toBeDefined()
      expect(v3).toBeInstanceOf(Vec2)
      expect(v3.get()).toStrictEqual([5, 5])
    })

    it('Should create valid static vector constants.', () => {
      expect(Vec2.One.value).toStrictEqual([1, 1])
      expect(Vec2.Zero.value).toStrictEqual([0, 0])
      expect(Vec2.Up.value).toStrictEqual([0, 1])
      expect(Vec2.Down.value).toStrictEqual([0, -1])
      expect(Vec2.Left.value).toStrictEqual([-1, 0])
      expect(Vec2.Right.value).toStrictEqual([1, 0])
    })

    it('Should create vectors from all static creation functions.', () => {
      expect(Vec2.FromNumbers(1, 2).value).toStrictEqual([1, 2])
      expect(Vec2.FromOther(v1).value).toStrictEqual([1, 1])
      expect(Vec2.FromPoint([10, 12]).value).toStrictEqual([10, 12])
    })

    it('Should correctly calculate the Dot of two vectors', () => {
      expect(Vec2.Dot(v1, v2)).toBe(4)
    })

    it('Should correctly calculate the Distance of two vectors', () => {
      const dist = Vec2.Dist(v1, v2)

      const xa = Math.pow(v2.x - v1.x, 2)
      const ya = Math.pow(v2.y - v1.y, 2)
      const shouldBe = Math.sqrt(xa + ya)

      expect(dist).toBe(shouldBe)
    })

    it('Should correctly calculate the Square Distance of two vectors.', () => {
      const dist = Vec2.SqDist(v1, v2)

      const xa = Math.pow(v2.x - v1.x, 2)
      const ya = Math.pow(v2.y - v1.y, 2)
      const shouldBe = xa + ya

      expect(dist).toBe(shouldBe)
    })

    it('Should accept almost zero in Vec2.IsZero', () => {
      const z1 = new Vec2([Number.EPSILON / 2, Number.EPSILON / 2])
      const z2 = new Vec2([0.0000000000000000001, 0.0000000000000000001])

      const nz = new Vec2([Number.EPSILON * 2, Number.EPSILON * 2])

      expect(z1.isZero()).toBe(true)
      expect(Vec2.IsZero(z2)).toBe(true)
      expect(nz.isZero()).toBe(false)
    })

    it('Should have correct inverse value.', () => {
      expect(v1.inverse).toStrictEqual([-1, -1])
      expect(v2.inverse).toStrictEqual([-2, -2])
    })

    it('Should correctly normalize a vector.', () => {
      const big = Vec2.Up.add(Vec2.Up).add(Vec2.Right).add(Vec2.Right)
      const n = big.normalized()

      expect(big.magnitude).toBeGreaterThanOrEqual(1)
      expect(n.magnitude).toBeLessThanOrEqual(1)

      expect(Vec2.Normalize(Vec2.Zero, false).magnitude).toBe(0)
      expect(Vec2.Normalize(Vec2.Zero, true).magnitude).toBe(0)
    })
  })

  describe('Vec2 Utility Tests', () => {
    it('Should correctly calculate the absolute value.', () => {
      expect(quickAbs(-1)).toBe(1)
      expect(quickAbs(1)).toBe(1)
      expect(quickAbs(0)).toBe(0)
    })

    it('Should correctly consider zero within the epsilon given.', () => {
      expect(quickAlmostZero(0.0001, 0.001)).toBe(true)
      expect(quickAlmostZero(0.001, 0.0001)).toBe(false)
    })
  })
})
