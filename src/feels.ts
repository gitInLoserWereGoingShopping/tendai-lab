type Payload = { args?: string; [key: string]: unknown };
type Listener = (signal: string, data: Payload) => void;

let listeners: Listener[] = [];

export const feel = (signal: string, data: Payload = {}) => {
  listeners.forEach(fn => fn(signal, data));
};

export const listen = (fn: Listener) => {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter(l => l !== fn);
  };
};