import React, { useState } from 'react'

export type TUseInput = (initialValue: string) => TUseInputReturn

export type TUseInputReturn = { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; };
export const useInput: TUseInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return {
    value, onChange
  }
}
