interface TimelineRulerProps {
  duration: number;
  zoom: number;
}

export function TimelineRuler({ duration: _duration }: TimelineRulerProps) {
  // Generate percentage markers in 10% increments
  const markers: number[] = [];
  for (let i = 0; i <= 100; i += 10) {
    markers.push(i);
  }

  return (
    <div className="relative h-8 bg-gray-100 border-b border-gray-300">
      {markers.map((percent) => {
        return (
          <div
            key={percent}
            className="absolute top-0 h-full"
            style={{ left: `${percent}%` }}
          >
            <div className="h-2 w-px bg-gray-400" />
            <span className="absolute top-3 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
              {percent}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
