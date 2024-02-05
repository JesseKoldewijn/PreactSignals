import { type ReadonlySignal, computed } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

import { count } from "@/signals/globals";

const SignalCounter = () => {
  const [renderedAt, setRenderedAt] = useState<Date>();

  // computed values to display the current count, double and triple
  const showCount = computed(() => count.value);
  const showDouble = computed(() => count.value * 2);
  const showTriple = computed(() => count.value * 3);

  /**
   * wrapping with memo to prevent re-rendering of the component
   * while this wont happen unless HMR just ran due to the nature of signals
   */
  const FormatDateUsingIntl = ({ date }: { date?: Date }) => {
    if (!date) return null;
    return (
      <>
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
          timeStyle: "medium",
        }).format(date)}
      </>
    );
  };

  // handle click event to increment the count
  const handleClick = () => {
    count.value++;
  };

  /**
   * wrapping with memo to prevent re-rendering of the component
   * while this wont happen unless HMR just ran due to the nature of signals
   */
  const RenderCountValue = ({
    label,
    value,
  }: {
    label: string;
    value: ReadonlySignal<number>;
  }) => {
    return (
      <div className="flex w-full justify-between gap-2">
        <span>{label}</span>
        <span>{value}</span>
      </div>
    );
  };

  useEffect(() => {
    setRenderedAt(new Date());
  }, [count]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-5 pt-5">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-4 rounded-xl border p-5">
        <strong className="mb-4 text-lg font-semibold">Signal Counter</strong>

        <div className="mb-4 flex w-full max-w-sm flex-col gap-2 rounded-lg border px-4 py-2">
          <div className="flex w-full justify-between gap-2">
            <span>RenderedAt</span>
            <span className="max-w-34 overflow-x-hidden text-ellipsis text-nowrap">
              <FormatDateUsingIntl date={renderedAt} />
            </span>
          </div>
          <hr />
          {[showCount, showDouble, showTriple].map((value, index) => {
            const labels = ["Count", "Double", "Triple"];

            return (
              <RenderCountValue
                key={labels[index]}
                label={labels[index]}
                value={value}
              />
            );
          })}
        </div>

        <button
          className="flex h-10 w-full items-center justify-center rounded-md bg-neutral-100 text-center font-medium text-neutral-950"
          onClick={handleClick}
        >
          Click me
        </button>
      </div>
    </div>
  );
};

export default SignalCounter;
