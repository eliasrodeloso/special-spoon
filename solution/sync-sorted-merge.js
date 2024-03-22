"use strict";

const { MinHeap } = require("./min-heap")

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  let heap = new MinHeap();

  logSources.forEach((source, index) => {
    const popped = source.pop();

    if (popped) {
      heap.insert({ entry: popped, index });
    }
  });

  while (!heap.isEmpty()) {
    let { entry, index } = heap.remove();
    printer.print(entry);

    const popped = logSources[index].pop();

    if (popped) {
      heap.insert({ entry: popped, index });
    }
  }

  printer.done();

  console.log("Sync sort complete.");
};
