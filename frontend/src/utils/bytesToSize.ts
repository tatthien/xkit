export function bytesToSize(bytes: number, decimals = 2) {
  if (!Number(bytes)) return "0 Bytes";

  const kbToBytes = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];

  const index = Math.floor(Math.log(bytes) / Math.log(kbToBytes));

  return `${(bytes / Math.pow(kbToBytes, index)).toFixed(dm)} ${sizes[index]}`;
}
