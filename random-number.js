export default function (from, to, decimals) {
  return decimals
    ? Number(
        (Math.random() * (Number(to) - Number(from)) + Number(from)).toFixed(
          decimals
        )
      )
    : Number(Math.random() * (to - from) + from);
}
