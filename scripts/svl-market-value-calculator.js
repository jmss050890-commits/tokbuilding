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

function getArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx + 1 >= process.argv.length) {
    return undefined;
  }
  return process.argv[idx + 1];
}

function parseNumberArg(flag, fallback) {
  const raw = getArgValue(flag);
  if (raw === undefined) {
    return fallback;
  }
  const num = Number(raw);
  return Number.isFinite(num) ? num : fallback;
}

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
  const arr = parseNumberArg("--arr", DEFAULTS.arr);
  const hardwareRevenue = parseNumberArg("--hardware", DEFAULTS.hardwareRevenue);

  const softwareMultiple = {
    conservative: parseNumberArg("--sw-cons", DEFAULTS.softwareMultiple.conservative),
    base: parseNumberArg("--sw-base", DEFAULTS.softwareMultiple.base),
    aggressive: parseNumberArg("--sw-agg", DEFAULTS.softwareMultiple.aggressive),
  };

  const hardwareMultiple = {
    conservative: parseNumberArg("--hw-cons", DEFAULTS.hardwareMultiple.conservative),
    base: parseNumberArg("--hw-base", DEFAULTS.hardwareMultiple.base),
    aggressive: parseNumberArg("--hw-agg", DEFAULTS.hardwareMultiple.aggressive),
  };

  const strategicPremium = {
    conservative: parseNumberArg("--sp-cons", DEFAULTS.strategicPremium.conservative),
    base: parseNumberArg("--sp-base", DEFAULTS.strategicPremium.base),
    aggressive: parseNumberArg("--sp-agg", DEFAULTS.strategicPremium.aggressive),
  };

  const conservative = computeValuation({
    arr,
    hardwareRevenue,
    softwareMultiple: softwareMultiple.conservative,
    hardwareMultiple: hardwareMultiple.conservative,
    strategicPremium: strategicPremium.conservative,
  });

  const base = computeValuation({
    arr,
    hardwareRevenue,
    softwareMultiple: softwareMultiple.base,
    hardwareMultiple: hardwareMultiple.base,
    strategicPremium: strategicPremium.base,
  });

  const aggressive = computeValuation({
    arr,
    hardwareRevenue,
    softwareMultiple: softwareMultiple.aggressive,
    hardwareMultiple: hardwareMultiple.aggressive,
    strategicPremium: strategicPremium.aggressive,
  });

  console.log("SVL-KPA Market Value Calculator");
  console.log("Inputs:");
  console.log(`- ARR: ${formatUSD(arr)}`);
  console.log(`- Hardware revenue: ${formatUSD(hardwareRevenue)}`);

  printScenario("Conservative", conservative);
  printScenario("Base", base);
  printScenario("Aggressive", aggressive);
}

run();
