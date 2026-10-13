# Code review — outstanding items

Remaining points from the review of `src/`. Bugs 1–5 from the original review
(`dfToDouble` double rounding, `eToBitlength` 0-bit rounding, `dfToExpansion`
adjacency, `dfRound` carry-out and the `eLongDivide` remainder guarantee) have
been fixed, as has the `eLongDivide` hang on non-finite input. The original
numbering of the remaining bugs is kept.


## Bugs

**6. `eDiv` (non-exact mode).** [e-div.ts:63](src/double-expansion/e-div.ts#L63)
slices the top `expansionLength` components of an *uncompressed* expansion.
Those components may hold far fewer than `expansionLength·53` bits; run
`eCompress` before slicing. Also, `D = 0` gives `F = [Infinity]` with no error.

**7. Edge cases that produce garbage instead of an error:**
- `eCompress([])` returns `[undefined]`.
- `scaleExpansion(e, b)` with an empty `e` returns NaN.
- `eProduct([])` and `eCalculate` with an empty term crash on `product.length`.

**8. Shared mutable zero.** `DF_ZERO` is returned directly by `dfAdd`, `dfMul`,
`dfNeg`, `dfFromDouble(0)`, etc. `mantissa` is typed `readonly ... number[]`,
but the array itself can still be modified. `dfNormalize` is exported and
modifies its argument in place, so callers could corrupt the global zero. Use
`Object.freeze` on it and type the field as `readonly number[]` (internal code
then needs a mutable type instead of `@ts-ignore`).


## Efficiency

- **`parseDouble` allocates on every call** (an `ArrayBuffer`, a `DataView`,
  then `Array.from` and `slice`). `exponent`, `significand`, `getLowestSetBit`,
  `getHighestSetBit`, `msbExponent`, `lsbExponent`, `isBitAligned`,
  `isOverlapping`, `expBitLength` and `eToBitlength` all go through it. Reuse
  one shared `DataView` (as
  [from-double.ts:6](src/infinite-precision/from-double.ts#L6) already does)
  and use `Math.clz32` on the two 32-bit words. For normal doubles, `exponent`
  can also skip the bit parsing entirely.
- **`scaleExpansion` re-splits `b` inside the loop**
  ([scale-expansion.ts:50](src/double-expansion/scale-expansion.ts#L50),
  [:122](src/double-expansion/scale-expansion.ts#L122)). `bh` and `bl` never
  change, so compute them once before the loop. This is a cheap win in the
  hottest routine.
- **`dfToDouble` / `dfToExpansion` build values one bit at a time** with
  `dfGetBit`, which does a division per bit (about 53 calls per double).
  Building them from 2–3 limbs at once is much faster.
- **`eDiv`**: expansions grow without bound each iteration (`mult` without
  `eCompress` or truncation), so cost blows up for larger `expansionLength`.
  Compress or truncate to the target precision each iteration.
- **`expansionProduct`** is O(k²), as its comment says. A pairwise
  (distillation tree) sum is the known improvement. Add a shortcut for
  `e.length === 1`.
- **`eIntPow`** builds `p` copies and multiplies them one by one.
  Square-and-multiply needs O(log p) multiplications (there's already a TODO).
- **`eIsInteger`**: no compression is needed. For a nonoverlapping expansion
  only the smallest nonzero component decides whether it's an integer.
- **`eLongDivide`** accumulates the quotient with repeated `growExpansion`; one
  `eSum` would do.
- **`dfMul`/`dfAddMagnitude`** could use `Float64Array` instead of
  `new Array(n).fill(0)`, and Karatsuba is already noted as a TODO. `dfAdd`
  with very different exponents allocates huge zero-filled arrays. That comes
  with exact representation, but it's worth documenting.


## Code quality

- **Dead code:**
  - [e-sqrt.ts](src/double-expansion/e-sqrt.ts) is fully commented out and
    imports paths that don't exist.
  - `merge` in
    [fast-expansion-sum.ts:105](src/double-expansion/fast-expansion-sum.ts#L105)
    is never used.
  - `expansionSum` isn't exported.
  - Lots of commented-out lines left from inlining.
- **Unused imports:** `tp`, `ts`, `fts`, `compress` in `scale-expansion.ts`,
  and `compress` in `grow-expansion.ts`.
- **Duplication:**
  - `scaleExpansion2` is a byte-for-byte copy of `scaleExpansion` with the
    arguments swapped.
  - `eProduct` repeats the inner loop of `eCalculate`.
  - The split constant `f` is defined in four files.
- **Not exported:** `twoSquare`, `isNonOverlapping` and `isOverlapping` exist
  but aren't in [index.ts](src/index.ts). The DyadicFloat API has no
  `dfCompare`/`dfSign`, and because the representation isn't canonical (zero
  bits inside a limb), structural equality isn't reliable.
- **Inconsistent aliasing:** `eAbs` returns its input when it's positive but a
  copy when negative. `ddToE` returns the input array itself.
- **Doc errors:**
  - `isBitAligned` says "`@param as`" and "1^gridSpacingExponent" (should be
    `a` and 2^).
  - "ha been subtracted" in
    [parse-double.ts:12](src/double-representation/parse-double.ts#L12).
  - `lsbExponent`/`msbExponent` say "An array of numbers" for a single number.
  - The `ddToE` comment "return only most significant parts" is wrong.
  - The `dfFromDouble` error message says `fromNumber`.
  - `eDivBy2` and `eMultBy2` are marked "error free" but aren't under
    underflow or overflow.
  - "Shwechuk" is misspelled in two places.
- **Naming:** `get-max-set-bit.ts` holds both the lowest-set-bit and
  highest-set-bit functions. `int8ToBinaryString` can be
  `i.toString(2).padStart(8, '0')`.
- **Known limit to document:** `split`, `twoProduct` and `reduceSignificand`
  overflow for |a| > ~2^996 (a standard Veltkamp limitation).
