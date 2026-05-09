import { isPlainObject, validatePath } from '../shared.utils'
import { isFilterCondition, validateOperatorObject } from './filter.validators'
import { normalizeOperatorObject } from './value.normalizer'

type FilterOptions = {
  allowedPaths: string[]
  maxDepth: number
}

export type FilterTransformer<TWhere> = {
  transform: (value: unknown) => TWhere | undefined
}

export function createFilterTransformer<TWhere>(options: FilterOptions): FilterTransformer<TWhere> {
  return {
    transform(rawFilterData: unknown): TWhere | undefined {
      if (!isPlainObject(rawFilterData))
        return undefined

      return parseFilterDataObject(rawFilterData, [])
    },
  }

  function parseFilterDataObject(
    obj: Record<string, unknown>,
    pathStack: string[],
  ): TWhere {
    const result: Record<string, unknown> = {}

    for (const key of Object.keys(obj)) {
      const newPath = [...pathStack, key]
      const val = obj[key] as Record<string, unknown>

      if (isPlainObject(val)) {
        validatePath(newPath, options.maxDepth, options.allowedPaths)

        if (isFilterCondition(val)) {
          validateOperatorObject(val)

          result[key] = normalizeOperatorObject(val as Record<string, unknown>)
          continue
        }

        result[key] = parseFilterDataObject(val, newPath)
      }
    }

    return result as TWhere
  }
}
