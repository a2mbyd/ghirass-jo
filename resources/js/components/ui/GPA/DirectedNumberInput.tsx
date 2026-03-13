import React from 'react'

interface DirectedNumberInputProps {
    id: string;
    value: string;
    onSuccess: (value: string) => void;
    className?: string;
    max: number;
    min: number;
    placeholder?: string;
}

const DirectedNumberInput = ({ id, value, onSuccess, className, max, min, placeholder }: DirectedNumberInputProps) => {
  const handleValueOverflow = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
        onSuccess(String(min));
    } else if (num > max) {
        onSuccess(String(max));
    } else {
       onSuccess(String(num));
    }
  };

  return (
    <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onBlur={() => handleValueOverflow(value)}
        onChange={(e) => handleValueOverflow(e.target.value)}
        className={className}
        placeholder={placeholder}
    />
  );
};

export default DirectedNumberInput;