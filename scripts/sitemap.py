"""Export the complete live hierarchy from the same inventory used to build pages."""
import json
from html import escape
from pathlib import Path
from inventory import PAGES

ROOT = Path(__file__).resolve().parents[1]

def tree(parent=None):
    children = [p for p in PAGES if p[2] == parent]
    if not children:
        return ''
    result = '<ul>'
    for slug, title, _, kind in children:
        nested = tree(slug)
        link = '/' + slug + ('/' if slug else '')
        label = f'<span>{escape(title)}</span><code>{link}</code>'
        result += f'<li data-title="{escape(title.lower())}">'
        result += f'<details open><summary>{label}</summary>{nested}</details>' if nested else f'<div class="leaf">{label}</div>'
        result += '</li>'
    return result + '</ul>'

def export():
    out = ROOT.parent.parent / 'docs' / 'website-plan'
    out.mkdir(parents=True, exist_ok=True)
    rows = []
    def walk(parent=None, depth=0):
        for slug,title,pa,kind in PAGES:
            if pa == parent:
                rows.append('  '*depth + '- ' + title + ' — /' + slug + ('/' if slug else ''))
                walk(slug, depth+1)
    walk()
    (out/'RUSETAT-Full-Page-Hierarchy.md').write_text('# RUSETAT — complete website hierarchy\n\nGenerated from scripts/inventory.py. '+str(len(PAGES))+' pages.\n\n'+'\n'.join(rows)+'\n', encoding='utf-8')
    (out/'page-inventory.json').write_text(json.dumps([dict(slug=s,title=t,parent=p,kind=k) for s,t,p,k in PAGES],indent=2),encoding='utf-8')
    html = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>RUSETAT · Complete website map</title><style>
    :root{font-family:Arial,sans-serif;color:#1b2c43;background:#f7f9fc}*{box-sizing:border-box}body{margin:0}header{background:#092d53;color:white;padding:46px max(5vw,24px)}h1{font-family:Georgia,serif;font-size:clamp(32px,5vw,58px);font-weight:400;margin:14px 0}header p{max-width:750px;line-height:1.7;color:#d9e7f5}.tag{color:#f0c4f7;letter-spacing:.18em;font-size:11px}main{max-width:1200px;margin:32px auto;padding:0 24px 64px}.tools{display:flex;gap:12px;flex-wrap:wrap;position:sticky;top:0;background:#f7f9fc;padding:16px 0;z-index:2}button,input{font:inherit;padding:12px 16px;border:1px solid #aebfd3;background:white;border-radius:4px}input{flex:1;min-width:200px}ul{list-style:none;margin:0;padding-left:25px;border-left:1px solid #cbd9e8}main>ul{padding:0;border:0}li{padding:5px 0 5px 14px}summary,.leaf{padding:14px 18px;background:white;border:1px solid #dbe4ef;border-radius:5px;display:flex;gap:12px;justify-content:space-between;align-items:center}summary{cursor:pointer;background:#e5eef9;display:list-item;list-style-position:inside}summary span{font-weight:600}code{font-size:12px;color:#576c87;overflow-wrap:anywhere;float:right;margin-left:20px}details>ul{margin:10px 0 10px 20px}summary:hover{background:#d8e8fa}button:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid #9221b6;outline-offset:3px}.note{font-size:13px;line-height:1.7;color:#596c84}@media(max-width:650px){ul{padding-left:10px}li{padding-left:5px}details>ul{margin-left:5px}summary,.leaf{padding:12px;font-size:14px;display:block}code{float:none;display:block;margin:7px 0 0;font-size:10px}}
    </style><header><span class="tag">RUSETAT · EVOLVING WEBSITE PLAN</span><h1>Every page. Every next step.</h1><p>The full website hierarchy, from service landing pages to every destination, visa type and supporting page. Generated from the website’s page inventory so the map evolves with the build.</p><strong>COUNT pages · full hierarchy</strong></header><main><div class="tools"><input type="search" aria-label="Find a page" placeholder="Find a destination, visa or page…"><button id="expand">Expand all</button><button id="collapse">Collapse all</button></div><p class="note">Select a blue parent row to expand or collapse its children. Paths show the planned website address. Every child will be linked from the body of its parent page. The tree describes the demo catalogue; business details remain subject to review.</p>TREE</main><script>const details=[...document.querySelectorAll('details')];document.querySelector('#expand').onclick=()=>details.forEach(d=>d.open=true);document.querySelector('#collapse').onclick=()=>details.forEach(d=>d.open=false);document.querySelector('input').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();document.querySelectorAll('li').forEach(li=>{li.hidden=q&&!li.textContent.toLowerCase().includes(q)});if(q)details.forEach(d=>d.open=true)});</script></html>'''
    html=html.replace('COUNT',str(len(PAGES))).replace('TREE',tree())
    (out/'RUSETAT-Full-Visual-Sitemap.html').write_text(html,encoding='utf-8')
    (out/'RUSETAT-Visual-Sitemap.html').write_text(html,encoding='utf-8')
    print(f'Exported full hierarchy: {len(PAGES)} pages -> {out}')

if __name__ == '__main__':
    export()
