interface TimelineRulerProps {
  duration: number;
  zoom: number;
}

export function TimelineRuler({ duration }: TimelineRulerProps) {
  // Generate time markers based on duration and zoom
  const markers: number[] = [];
  const step = duration > 5000 ? 1000 : duration > 2000 ? 500 : 100;

  for (let i = 0; i <= duration; i += step) {
    markers.push(i);
  }

  return (
    <div className="relative h-8 bg-gray-100 border-b border-gray-300">
      {markers.map((time) => {
        const left = (time / duration) * 100;
        return (
          <div
            key={time}
            className="absolute top-0 h-full"
            style={{ left: `${left}%` }}
          >
            <div className="h-2 w-px bg-gray-400" />
            <span className="absolute top-3 left-1 text-xs text-gray-600 whitespace-nowrap">
              {time}ms
            </span>
          </div>
        );
      })}
    </div>
  );
}
