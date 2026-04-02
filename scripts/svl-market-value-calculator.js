const DEFAULTS = {
  arr: 1200000,
  hardwareRevenue: 800000,
  softwareMultiple: {
    conservative: 4,
    base: 6,
    aggressive: 10,
  },
  hardwareMultiple: {
    conservative: 1,
    base: 2,
    aggressive: 3,
  },
  strategicPremium: {
    conservative: 0.1,
    base: 0.2,
    aggressive: 0.4,
  },
};

function parseCurrency(value) {
  return Number(value.toFixed(2));
}

function computeValuation({ arr, hardwareRevenue, softwareMultiple, hardwareMultiple, strategicPremium }) {
  const recurringValue = arr * softwareMultiple;
  const hardwareValue = hardwareRevenue * hardwareMultiple;
  const subtotal = recurringValue + hardwareValue;
  const total = subtotal * (1 + strategicPremium);

  return {
    recurringValue: parseCurrency(recurringValue),
    hardwareValue: parseCurrency(hardwareValue),
    subtotal: parseCurrency(subtotal),
    strategicPremiumAmount: parseCurrency(subtotal * strategicPremium),
    total: parseCurrency(total),
  };
}

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function printScenario(name, result) {
  console.log(`\n${name.toUpperCase()} SCENARIO`);
  console.log(`- Recurring value: ${formatUSD(result.recurringValue)}`);
  console.log(`- Hardware value: ${formatUSD(result.hardwareValue)}`);
  console.log(`- Subtotal: ${formatUSD(result.subtotal)}`);
  console.log(`- Strategic premium: ${formatUSD(result.strategicPremiumAmount)}`);
  console.log(`- Market value estimate: ${formatUSD(result.total)}`);
}

function run() {
  const conservative = computeValuation({
    arr: DEFAULTS.arr,
    hardwareRevenue: DEFAULTS.hardwareRevenue,
    softwareMultiple: DEFAULTS.softwareMultiple.conservative,
    hardwareMultiple: DEFAULTS.hardwareMultiple.conservative,
    strategicPremium: DEFAULTS.strategicPremium.conservative,
  });

  const base = computeValuation({
    arr: DEFAULTS.arr,
    hardwareRevenue: DEFAULTS.hardwareRevenue,
    softwareMultiple: DEFAULTS.softwareMultiple.base,
    hardwareMultiple: DEFAULTS.hardwareMultiple.base,
    strategicPremium: DEFAULTS.strategicPremium.base,
  });

  const aggressive = computeValuation({
    arr: DEFAULTS.arr,
    hardwareRevenue: DEFAULTS.hardwareRevenue,
    softwareMultiple: DEFAULTS.softwareMultiple.aggressive,
    hardwareMultiple: DEFAULTS.hardwareMultiple.aggressive,
    strategicPremium: DEFAULTS.strategicPremium.aggressive,
  });

  console.log("SVL-KPA Market Value Calculator");
  console.log("Inputs:");
  console.log(`- ARR: ${formatUSD(DEFAULTS.arr)}`);
  console.log(`- Hardware revenue: ${formatUSD(DEFAULTS.hardwareRevenue)}`);

  printScenario("Conservative", conservative);
  printScenario("Base", base);
  printScenario("Aggressive", aggressive);
}

run();
