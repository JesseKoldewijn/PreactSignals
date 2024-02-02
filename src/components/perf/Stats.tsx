import { memo, useEffect, useState } from "react";

type Resource = {
  duration: number;
  transferSize: number;
};

const Stats = () => {
  const [stats, setStats] = useState<Resource>();

  const BytesToUnit = memo(
    ({ bytes }: { bytes: number }) => {
      if (!bytes) return "0 B";

      const units = ["B", "KB", "MB", "GB", "TB"];
      let i = 0;
      while (bytes >= 1024) {
        bytes /= 1024;
        i++;
      }
      return `${bytes.toFixed(1)} ${units[i]}`;
    },
    (prevProps, nextProps) => prevProps === nextProps,
  );

  const RenderStatValues = memo(
    ({ stats }: { stats: Resource }) => {
      return (
        <>
          <div className="flex w-full justify-between gap-2">
            <span>Duration</span>
            <span>{stats.duration} ms</span>
          </div>
          <div className="flex w-full justify-between gap-2">
            <span>Transfer Size</span>
            <span>
              <BytesToUnit bytes={stats.transferSize} />
            </span>
          </div>
        </>
      );
    },
    (prevProps, nextProps) =>
      JSON.stringify(prevProps.stats) === JSON.stringify(nextProps.stats),
  );

  const getStats = () => {
    const resources = window.performance.getEntries();
    const stats = resources.map((resource) => {
      const data = resource as PerformanceResourceTiming;
      const fileName = data.name.split("/").pop();
      const duration = Math.round(data.duration);
      const transferSize = Math.round(data.transferSize ?? 0 / 1024);
      const initiatorType = data.initiatorType;

      return {
        name: fileName,
        duration,
        transferSize,
        initiatorType,
      } as Resource;
    });

    const totals = stats.reduce(
      (acc, resource) => {
        acc.duration += resource.duration;
        acc.transferSize += resource.transferSize;

        return acc as Resource;
      },
      { duration: 0, transferSize: 0 },
    );

    setStats(totals);
  };

  const RenderStats = memo(({ stats }: { stats: Resource | undefined }) => {
    if (!stats) return null;

    return (
      <div className="flex w-full max-w-[250px] flex-col justify-center gap-2 overflow-x-hidden text-ellipsis whitespace-nowrap">
        <RenderStatValues stats={stats} />
      </div>
    );
  });

  useEffect(() => {
    getStats();
  }, []);

  return <RenderStats stats={stats} />;
};

export default Stats;
