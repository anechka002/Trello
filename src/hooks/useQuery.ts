import {useState, useEffect, useRef} from "react";

type QueryStatus = 'loading' | 'success' | 'error' | 'pending'

type QueryFnParams = {
  signal?: AbortSignal
}

type Options<T> = {
  queryStatusDefault?: QueryStatus
  queryKeys: Array<string | null | undefined>
  queryFn: (params: QueryFnParams) => Promise<T>
  enabled?: boolean
}

export const useQuery = <T>(options: Options<T>) => {
  const {queryFn, queryKeys, queryStatusDefault, enabled = true} = options

  if (!queryKeys) {
    throw new Error('queryKey is required.')
  }
  const [status, setStatus] = useState<QueryStatus>(queryStatusDefault ?? 'pending');
  const [data, setData] = useState<T | null>(null);
  const abortControllerRef = useRef<null | AbortController>(null)

  useEffect(() => {

    abortControllerRef.current?.abort()
    // Если ключи неполные (null или undefined) — запрос не делаем
    if (queryKeys.some((el) => el == null)) {
      setData(null)
      setStatus('pending');
      return
    }

    if (!enabled) return

    setStatus('loading');

    abortControllerRef.current = new AbortController()

    queryFn({signal: abortControllerRef.current.signal})
      .then((data) => {
        setData(data);
        setStatus('success');
      })
      .catch((error) => {
        if (error.name === 'AbortError') return; // запрос был отменен
        console.error(error);
        setStatus('error');
      });
  }, queryKeys)

  return {status, data};
}