import { useEffect, useRef } from 'react';
import { useUIStore } from '@/store';
import type { Animation } from '@/types';

export function useAnimation(animation: Animation | undefined) {
  const isPlaying = useUIStore((state) => state.isPlaying);
  const playbackSpeed = useUIStore((state) => state.playbackSpeed);
  const loop = useUIStore((state) => state.loop);
  const currentTime = useUIStore((state) => state.currentTime);
  const setCurrentTime = useUIStore((state) => state.setCurrentTime);
  const stop = useUIStore((state) => state.stop);

  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  useEffect(() => {
    if (!isPlaying || !animation) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lastTimeRef.current = undefined;
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimeRef.current) * playbackSpeed;
      lastTimeRef.current = timestamp;

      const newTime = currentTime + deltaTime;
      const totalDuration = animation.duration + animation.delay;

      if (newTime >= totalDuration) {
        if (loop || animation.iterationCount === 'infinite') {
          setCurrentTime(newTime % totalDuration);
        } else if (
          typeof animation.iterationCount === 'number' &&
          newTime >= totalDuration * animation.iterationCount
        ) {
          setCurrentTime(totalDuration);
          stop();
          return;
        } else {
          setCurrentTime(newTime % totalDuration);
        }
      } else {
        setCurrentTime(newTime);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, animation, currentTime, playbackSpeed, loop, setCurrentTime, stop]);

  return { currentTime };
}
