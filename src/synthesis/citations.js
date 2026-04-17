// ══════════════════════════════════════════════════════════════
// synthesis/citations.js — Citation token system for synthesis spine
// Phase 1.6: parse [token:value] in synthesis text → tappable pills
// ══════════════════════════════════════════════════════════════

// Token pattern: [type] or [type:value]
const CITATION_RE=/\[([a-z\-]+)(?::([^\]]+))?\]/g;

// Map token types to Layer 3 mechanic IDs
const CITATION_TARGET={
  'profection-year':'mech-profections',
  'profection-month':'mech-profections',
  'sect-light':'mech-profections',
  'transit':'mech-transits',
  'hour':'mech-hours',
  'mansion':'mech-moon',
  'decan-sun':'mech-sun',
  'decan-moon':'mech-moon',
  'zr-spirit':'mech-zr',
  'zr-fortune':'mech-zr',
  'firdaria-major':'mech-firdaria',
  'firdaria-sub':'mech-firdaria',
  'lot':'mech-lots',
  'return-solar':'mech-returns',
  'return-lunar':'mech-returns',
  'fixed-star':'mech-fixedstars',
  'house':'mech-transits'
};

// Human-readable labels for tokens
function citationLabel(type,value){
  switch(type){
    case 'profection-year': return 'Year Lord'+(value?' '+value:'');
    case 'profection-month': return 'Month Lord'+(value?' '+value:'');
    case 'sect-light': return 'Sect Light';
    case 'transit': return value?value.replace('-',' / '):'Transit';
    case 'hour': return 'Hour';
    case 'mansion': return 'Mansion';
    case 'decan-sun': return 'Sun Decan';
    case 'decan-moon': return 'Moon Decan';
    case 'zr-spirit': return 'ZR Spirit';
    case 'zr-fortune': return 'ZR Fortune';
    case 'firdaria-major': return 'Firdaria';
    case 'firdaria-sub': return 'Sub-period';
    case 'lot': return value?'Lot of '+value:'Lot';
    case 'return-solar': return 'Solar Return';
    case 'return-lunar': return 'Lunar Return';
    case 'fixed-star': return value||'Fixed Star';
    case 'house': return value?'House '+value:'House';
    default: return type;
  }
}

// Parse citation tokens from text, return HTML with tappable spans
function renderCitations(text){
  if(!text)return '';
  return text.replace(CITATION_RE,function(match,type,value){
    const target=CITATION_TARGET[type];
    if(!target)return match; // unknown token, leave as-is
    const label=citationLabel(type,value);
    return `<span class="cite-pill" onclick="openMechanic('${target}','${type}','${(value||'').replace(/'/g,'\\\'')}')" title="${type}${value?':'+value:''}">${label}</span>`;
  });
}

// Extract raw token objects from text (for ledger storage)
function extractCitations(text){
  if(!text)return [];
  const tokens=[];
  let m;
  const re=new RegExp(CITATION_RE.source,'g');
  while((m=re.exec(text))!==null){
    tokens.push(m[2]?m[1]+':'+m[2]:m[1]);
  }
  return tokens;
}

// Open a Layer 3 mechanic: scroll into view and expand
function openMechanic(mechId,tokenType,tokenValue){
  // First ensure Layer 3 is visible
  const l3=document.getElementById('layer3-mechanics');
  if(l3&&l3.style.display==='none'){
    layersExpanded.l3=true;
    renderApp();
    // Wait for re-render, then find target
    setTimeout(()=>_scrollToMechanic(mechId,tokenType,tokenValue),100);
    return;
  }
  _scrollToMechanic(mechId,tokenType,tokenValue);
}

function _scrollToMechanic(mechId,tokenType,tokenValue){
  const el=document.getElementById(mechId);
  if(!el)return;
  // If it's a <details>, open it
  if(el.tagName==='DETAILS'&&!el.open) el.open=true;
  // If tokenType is 'transit' and value like 'Saturn-Sun', find specific transit card
  if(tokenType==='transit'&&tokenValue){
    const parts=tokenValue.split('-');
    if(parts.length===2){
      const card=el.querySelector(`[data-transit="${parts[0]}-${parts[1]}"]`)||
                 el.querySelector(`[data-transit="${parts[1]}-${parts[0]}"]`);
      if(card){
        if(card.tagName==='DETAILS'&&!card.open) card.open=true;
        card.scrollIntoView({behavior:'smooth',block:'center'});
        card.classList.add('cite-flash');
        setTimeout(()=>card.classList.remove('cite-flash'),2000);
        return;
      }
    }
  }
  el.scrollIntoView({behavior:'smooth',block:'start'});
  el.classList.add('cite-flash');
  setTimeout(()=>el.classList.remove('cite-flash'),2000);
}
