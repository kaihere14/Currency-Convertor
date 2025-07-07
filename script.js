const form = document.querySelector("form");
const amountInput = document.querySelector(".amount input");
const fromSelect = document.querySelector('select[name="from"]');
const toSelect = document.querySelector('select[name="to"]');
const msgDiv = document.querySelector(".msg");
const dropdown = document.querySelectorAll('.dropdown select');

for (let select of dropdown) {
  for (curcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = curcode;
    newOption.value = curcode;
    if(select.name ==='from' && curcode ==='USD'){
        newOption.selected = "selected";
    }else if(select.name ==='to' && curcode ==='INR'){
        newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener('change',(evt)=>{
    flag(evt.target);
  });
}
let flag = (element)=>{
    let curcode = element.value;
    let countrycode =countryList[curcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    msgDiv.textContent = "⚠️ Please enter a valid amount.";
    return;
  }

  if (from === to) {
    msgDiv.textContent = `${amount} ${from} = ${amount} ${to}`;
    return;
  }

  msgDiv.textContent = "⏳ Converting...";

  try {
   const res = await fetch(
      `https://api.fxratesapi.com/latest?base=${from}&symbols=${to}`
    );

    const data = await res.json();
    console.log(data);

    const value1 = data.rates[to];
    const converted = (amount*value1).toFixed(2);

    msgDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (err) {
    msgDiv.textContent = "❌ Failed to fetch conversion rate.";
    console.error(err);
  }
});
