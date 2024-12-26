import { useState } from "react";

export function useManualFn(fn: (...args: any[]) => Promise<any>) {

  const [loading, setLoading] = useState(false)

  return {
    loading,
    run: async (...args: any[]) => {
      setLoading(true)
      try {
        await fn(...args)
      } finally {
        setLoading(false)
      }
    }
  }
}


