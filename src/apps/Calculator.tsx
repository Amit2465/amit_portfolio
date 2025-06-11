import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState('');

  const inputNumber = (num: string) => {
    if (showResult) {
      // Start new calculation after result
      setDisplay(num);
      setExpression(num);
      setShowResult(false);
      setLastResult('');
    } else {
      const newDisplay = display === '0' ? num : display + num;
      setDisplay(newDisplay);
      setExpression((prev) => (prev === '0' ? num : prev + num));
    }
  };

  const inputOperation = (op: string) => {
    if (showResult) {
      // Continue new calculation with previous result
      setExpression(lastResult + ' ' + op + ' ');
      setDisplay('');
      setShowResult(false);
      setLastResult('');
    } else if (!isLastCharOperator(expression)) {
      setExpression(expression + ' ' + op + ' ');
      setDisplay('');
    }
  };

  const isLastCharOperator = (exp: string) => {
    return /[+\-×÷]\s*$/.test(exp.trim());
  };

  const calculate = (exp: string): number => {
    try {
      const jsExp = exp
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/[^-()\d/*+.]/g, ''); // Sanitize
      return Function('"use strict"; return (' + jsExp + ')')();
    } catch {
      return 0;
    }
  };

  const performCalculation = () => {
    if (!expression || isLastCharOperator(expression)) return;
    const result = calculate(expression);
    setLastResult(String(result));
    setDisplay(String(result));
    setExpression(expression + ' =');
    setShowResult(true);
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setShowResult(false);
    setLastResult('');
  };

  const buttons = [
    { label: 'C', action: clear, type: 'function' },
    { label: '±', action: () => {}, type: 'function' },
    { label: '%', action: () => {}, type: 'function' },
    { label: '÷', action: () => inputOperation('÷'), type: 'operator' },
    { label: '7', action: () => inputNumber('7'), type: 'number' },
    { label: '8', action: () => inputNumber('8'), type: 'number' },
    { label: '9', action: () => inputNumber('9'), type: 'number' },
    { label: '×', action: () => inputOperation('×'), type: 'operator' },
    { label: '4', action: () => inputNumber('4'), type: 'number' },
    { label: '5', action: () => inputNumber('5'), type: 'number' },
    { label: '6', action: () => inputNumber('6'), type: 'number' },
    { label: '-', action: () => inputOperation('-'), type: 'operator' },
    { label: '1', action: () => inputNumber('1'), type: 'number' },
    { label: '2', action: () => inputNumber('2'), type: 'number' },
    { label: '3', action: () => inputNumber('3'), type: 'number' },
    { label: '+', action: () => inputOperation('+'), type: 'operator' },
    { label: '0', action: () => inputNumber('0'), type: 'number', span: 2 },
    { label: '.', action: () => inputNumber('.'), type: 'number' },
    { label: '=', action: performCalculation, type: 'equals' },
  ];

  const getButtonStyle = (type: string) => {
    switch (type) {
      case 'function':
        return 'bg-gray-300 hover:bg-gray-400 text-black';
      case 'operator':
        return 'bg-orange-500 hover:bg-orange-600 text-white';
      case 'equals':
        return 'bg-orange-500 hover:bg-orange-600 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-500 text-white';
    }
  };

  return (
    <div className="h-full bg-black p-4 pt-16">
      <div className="max-w-sm mx-auto">
        {/* Display Area */}
        <div className="bg-black text-white p-4 rounded-lg mb-4 text-right min-h-[120px] flex flex-col justify-end">
          {/* Live Expression */}
          {expression && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-gray-400 mb-2 overflow-hidden"
            >
              {expression}
            </motion.div>
          )}
          {/* Final Result or Ongoing Input */}
          <motion.div
            key={display + showResult}
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-light overflow-hidden"
          >
            {display}
          </motion.div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={button.action}
              className={`
                h-16 rounded-full font-medium transition-all duration-200 text-2xl
                ${getButtonStyle(button.type)}
                ${button.span === 2 ? 'col-span-2' : ''}
              `}
            >
              {button.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;



