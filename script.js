const button = document.getElementById("button");
const input = document.getElementById("input");
const output = document.getElementById("output");

button.addEventListener("click", () => {
  const text = input.value;

  output.textContent = `なるほど。「${text}」について考えているんだね。まずは小さく試してみよう！`;
});