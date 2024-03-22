"use strict";
const { MinHeap } = require("./min-heap")

// Print all entries, across all of the *async* sources, in chronological order.
module.exports = async (logSources, printer) => {
  const minHeap = new MinHeap();
  const promises = logSources.map(async (source, index) => {
    const entry = await source.pop();
    if (entry) {
      minHeap.insert({ entry, index });
    }
  });

  // Wait until the first log entry from each source is inserted into the heap
  await Promise.all(promises);

  while (!minHeap.isEmpty()) {
    const { entry, index } = minHeap.remove();

    printer.print(entry);

    const nextEntry = await logSources[index].pop();
    if (nextEntry) {
      minHeap.insert({ entry: nextEntry, index });
    }
  }

  printer.done();

  console.log("Async sort complete.")
}
