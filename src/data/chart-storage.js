// ============================================================================
// chart-storage.js — Chart persistence, CRUD, migration, and whole-sign houses
// Extracted from index.html (Phase 0 — pure mechanical extraction)
// ============================================================================

let savedCharts=[];
let selectedChartId=null;
let showChartForm=false;
let editingChartId=null;

function loadCharts() {
  const stored = localStorage.getItem('astro-charts');
  if (stored) {
    savedCharts = JSON.parse(stored);
    // Migration: fix charts where month/day were swapped (month > 12)
    let migrated = false;
    for (const c of savedCharts) {
      if (c.month > 12 && c.day <= 12) {
        const tmp = c.month; c.month = c.day; c.day = tmp; migrated = true;
      }
    }
    // Migration: fix Alexander's hour (was stored as UTC, should be local)
    const alexChart = savedCharts.find(c => c.id === 'alexander');
    if (alexChart && Math.abs(alexChart.hour - 4.133) < 0.01 && alexChart.tz === -4) {
      alexChart.hour = 8 / 60; // 00:08 local (EDT)
      migrated = true;
    }
    if (migrated) localStorage.setItem('astro-charts', JSON.stringify(savedCharts));
  } else {
    // Ensure Alexander is the default
    savedCharts = [
      {
        id: 'alexander',
        name: 'Alexander',
        year: BIRTH.year,
        month: BIRTH.month,
        day: BIRTH.day,
        hour: 8 / 60, // 00:08 local (EDT)
        lat: BIRTH.lat,
        lon: BIRTH.lon,
        tz: -4
      }
    ];
    saveCharts();
  }
  // If Alexander doesn't exist, add it
  if (!savedCharts.find(c => c.id === 'alexander')) {
    savedCharts.unshift({
      id: 'alexander',
      name: 'Alexander',
      year: BIRTH.year,
      month: BIRTH.month,
      day: BIRTH.day,
      hour: 8 / 60, // 00:08 local (EDT)
      lat: BIRTH.lat,
      lon: BIRTH.lon,
      tz: -4
    });
    saveCharts();
  }
}

function saveCharts() {
  localStorage.setItem('astro-charts', JSON.stringify(savedCharts));
}

function addChart(chartData) {
  chartData.id = 'chart-' + Date.now();
  savedCharts.push(chartData);
  selectedChartId = chartData.id;
  saveCharts();
}

function deleteChart(id) {
  if (id === 'alexander') return; // Cannot delete Alexander
  savedCharts = savedCharts.filter(c => c.id !== id);
  if (selectedChartId === id) {
    selectedChartId = null;
  }
  saveCharts();
}

function getChartNatal(chart) {
  const tz = (chart.tz !== undefined && chart.tz !== null && !isNaN(chart.tz)) ? chart.tz : 0;
  const hourUTC = chart.hour - tz;
  const jd = julianDate(chart.year, chart.month, chart.day, hourUTC);
  const natal = computeAll(jd);
  natal.Ascendant = computeAsc(jd, chart.lat, chart.lon);
  natal.MC = computeMC(jd, chart.lon);
  return { natal, jd };
}

function computeWholeSignHouses(ascLon) {
  const houses = [];
  const signStart = Math.floor(ascLon / 30) * 30; // start of sign containing ASC
  for (let i = 0; i < 12; i++) {
    houses[i] = norm(signStart + i * 30);
  }
  return houses;
}

function saveChartFromForm() {
  const name = document.getElementById('chart-name').value.trim();
  const month = parseInt(document.getElementById('chart-month').value);
  const day = parseInt(document.getElementById('chart-day').value);
  const year = parseInt(document.getElementById('chart-year').value);
  const hour = parseInt(document.getElementById('chart-hour').value);
  const minute = parseInt(document.getElementById('chart-minute').value);

  let lat, lon, tz;
  // Always read timezone from the dropdown (user may have corrected it)
  const tzSelect = document.getElementById('chart-tz-select');
  tz = tzSelect ? parseFloat(tzSelect.value) : 0;

  if (cityResolved) {
    lat = cityResolved.lat;
    lon = cityResolved.lon;
  } else if (editingChartId) {
    const existing = savedCharts.find(c => c.id === editingChartId);
    if (existing) { lat = existing.lat; lon = existing.lon; }
  }

  if (!name || isNaN(month) || isNaN(day) || isNaN(year) || lat === undefined || lon === undefined) {
    alert('Please fill in all required fields and search for a birth city');
    return;
  }
  if (month < 1 || month > 12) { alert('Month must be 1-12. The fields are Day / Month / Year.'); return; }
  if (day < 1 || day > 31) { alert('Day must be 1-31.'); return; }

  const cityName = cityResolved ? cityResolved.name : (document.getElementById('chart-city').value.trim() || '');

  const chartData = {
    name,
    year,
    month,
    day,
    hour: hour + minute / 60,
    lat,
    lon,
    tz: isNaN(tz) ? 0 : tz,
    cityName
  };

  if (editingChartId && editingChartId !== 'alexander') {
    const idx = savedCharts.findIndex(c => c.id === editingChartId);
    if (idx >= 0) {
      savedCharts[idx] = { ...savedCharts[idx], ...chartData };
    }
  } else {
    addChart(chartData);
  }

  saveCharts();
  showChartForm = false;
  editingChartId = null;
  citySearchResults = [];
  cityResolved = null;
  renderApp();
}
