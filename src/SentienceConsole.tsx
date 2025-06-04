import React, { useState, useRef, useEffect } from 'react';
import { feel } from './feels';

export default function SentienceConsole() {
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const handle = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setLog(l => [...l, `❯ ${trimmed}`]);

    const [cmd, ...rest] = trimmed.split(' ');
    const args = rest.join(' ');

    if (cmd === 'cat') {
      const file = args;
      import(`./data/${file}.ts`)
        .then(module => {
          setLog(l => [...l, module.default]);
        })
        .catch(() => setLog(l => [...l, `file not found: ${file}.cat`]));
    } else {
      feel(cmd, { args });
    }

    setInput('');
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  return (
    <div style={{
      background: '#111',
      color: '#aaffcc',
      fontFamily: 'VT323, monospace',
      fontSize: '1.2rem',
      padding: '1rem',
      borderRadius: '8px',
      minHeight: '200px'
    }}>
      {log.map((l, i) => <div key={i}>{l}</div>)}
      <div ref={ref}></div>
      <div>
        ❯ <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handle()}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: '1px dashed #aaffcc',
            color: '#88ffee',
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit'
          }}
        />
      </div>
    </div>
  );
}