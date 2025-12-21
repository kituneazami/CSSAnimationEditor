import { useState, useCallback } from 'react';

interface UndoState<T> {
  past: T[];
  present: T;
  future: T[];
}

interface UseUndoReturn<T> {
  state: T;
  setState: (newState: T | ((prev: T) => T)) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  reset: (newState: T) => void;
  clear: () => void;
}

export function useUndo<T>(initialState: T): UseUndoReturn<T> {
  const [undoState, setUndoState] = useState<UndoState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  const setState = useCallback((newState: T | ((prev: T) => T)) => {
    setUndoState((currentState) => {
      const resolvedState =
        typeof newState === 'function'
          ? (newState as (prev: T) => T)(currentState.present)
          : newState;

      // Don't create a new history entry if state hasn't changed
      if (JSON.stringify(resolvedState) === JSON.stringify(currentState.present)) {
        return currentState;
      }

      return {
        past: [...currentState.past, currentState.present],
        present: resolvedState,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    setUndoState((currentState) => {
      if (currentState.past.length === 0) return currentState;

      const previous = currentState.past[currentState.past.length - 1];
      const newPast = currentState.past.slice(0, currentState.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [currentState.present, ...currentState.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setUndoState((currentState) => {
      if (currentState.future.length === 0) return currentState;

      const next = currentState.future[0];
      const newFuture = currentState.future.slice(1);

      return {
        past: [...currentState.past, currentState.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const reset = useCallback((newState: T) => {
    setUndoState({
      past: [],
      present: newState,
      future: [],
    });
  }, []);

  const clear = useCallback(() => {
    setUndoState((currentState) => ({
      past: [],
      present: currentState.present,
      future: [],
    }));
  }, []);

  return {
    state: undoState.present,
    setState,
    undo,
    redo,
    canUndo: undoState.past.length > 0,
    canRedo: undoState.future.length > 0,
    reset,
    clear,
  };
}
