import { isPlainObject } from '../shared.utils'
import { isFilterCondition, validateOperatorObject, validatePath } from './filter.validators'
import { normalizeOperatorObject } from './value.normalizer'

interface FilterOptions {
  allowedPaths: string[]
  maxDepth: number
}

export interface FilterTransformer<TWhere> {
  transform: (value: unknown) => TWhere
}

export function createFilterTransformer<TWhere>(options: FilterOptions): FilterTransformer<TWhere> {
  return {
    transform(rawFilterData: unknown): TWhere {
      if (!isPlainObject(rawFilterData))
        return {} as TWhere

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
