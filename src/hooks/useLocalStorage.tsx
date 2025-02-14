import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    try {
      const jsonValue = localStorage.getItem(key)
      if (jsonValue !== null) {
        return JSON.parse(jsonValue)
      }
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error)
    }

    return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error)
    }
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]
}