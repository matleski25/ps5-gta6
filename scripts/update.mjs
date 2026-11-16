// Pobiera stan zbiórki z buycoffee.to i zapisuje go do data.json
import { writeFileSync } from "node:fs";

const URL = "https://buycoffee.to/zbieramnaplayaka/ps5-gta6";
const res = await fetch(URL, { headers: { "User-Agent": "Mozilla/5.0 (zbiorka-licznik)" } });
if (!res.ok) throw new Error(`buycoffee.to odpowiedziało ${res.status}`);
const html = await res.text();

const raised = html.match(/"result":\{"@type":"MonetaryAmount"[^}]*?"value":(\d+(?:\.\d+)?)/);
const goal = html.match(/"priceSpecification":\{"@type":"PriceSpecification","price":(\d+(?:\.\d+)?)/);
if (!raised) throw new Error("Nie znaleziono kwoty zbiórki na stronie");

const data = {
  raised: Number(raised[1]),
  goal: goal ? Number(goal[1]) : null,
  updated: new Date().toISOString()
};
writeFileSync(process.argv[2] || "data.json", JSON.stringify(data, null, 2) + "\n");
console.log(data);
