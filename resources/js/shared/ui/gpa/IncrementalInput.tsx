import React from 'react'

interface IncrementalInputProps {
    id: string;
    value: number;
    onChange: (value: number) => void;
    className?: string;
    min: number;
    max: number;
    placeholder?: string;
}
const IncrementalInput = ({ id, value, onChange, className, min, max, placeholder }: IncrementalInputProps) => {
  return (
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) =>
            onChange(Math.min(+e.target.value, max) || min)
        }
        className={className}
        placeholder={placeholder}
    />
  )
}

export default IncrementalInput