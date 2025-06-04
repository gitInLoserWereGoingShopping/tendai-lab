import { useEffect, useState } from 'react';
import { listen } from './feels';
import { drift } from './drift';

export default function Tendai() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const unlisten = listen((signal, data) => {
      console.log({data, signal});
      if (Math.random() > 0.4) {
        const log = `🌱 Tendai sensed "${signal}" and grew something invisible.`;
        setLogs(prev => [...prev.slice(-4), log]);

        // Cast drift spell
        drift(
          `glyph-${Date.now()}`,
          '<div>🌸</div>',
          {
            left: `${Math.random() * 90}vw`,
            top: `${Math.random() * 80}vh`,
            fontSize: '2.5rem',
            color: 'hotpink',
          },
          5000
        );
      }
    });
    return () => unlisten();
  }, []);

  return (
    <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#66ffaa' }}>
      <strong>Tendai's Log:</strong>
      <ul>{logs.map((l, i) => <li key={i}>{l}</li>)}</ul>
    </div>
  );
}