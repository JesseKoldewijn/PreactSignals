import { computed } from "@preact/signals-react";
import { useEffect, useState } from "react";

import { count } from "@/signals/globals";

const SignalCounter = () => {
  const [renderedAt, setRenderedAt] = useState(new Date());

  const showCount = computed(() => count.value);
  const showDouble = computed(() => count.value * 2);
  const showTriple = computed(() => count.value * 3);

  const formatDateUsingIntl = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "medium",
    }).format(date);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    count.value++;
  };

  useEffect(() => {
    setRenderedAt(new Date());
  }, [count]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 px-5">
      <strong>Signal Counter</strong>

      <div className="flex w-full max-w-sm flex-col gap-2 rounded-lg border px-4 py-2">
        <div className="flex w-full justify-between gap-2">
          <span>RenderedAt</span>
          <span className="max-w-34 overflow-x-hidden text-ellipsis text-nowrap">
            {formatDateUsingIntl(renderedAt)}
          </span>
        </div>
        <hr />
        <div className="flex w-full justify-between gap-2">
          <span>Count</span>
          <span>{showCount}</span>
        </div>
        <div className="flex w-full justify-between gap-2">
          <span>Double</span>
          <span>{showDouble}</span>
        </div>
        <div className="flex w-full justify-between gap-2">
          <span>Triple</span>
          <span>{showTriple}</span>
        </div>
      </div>

      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default SignalCounter;
