import os, html
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC, PNG = os.path.join(ROOT, "source"), os.path.join(ROOT, "png")
URL = "otienoryan786-lab.github.io/Max_imum-Designs"   # swap here when the custom domain is live

CSS = """
@font-face{font-family:Poppins;font-weight:300;src:url(../assets/Poppins-Light.ttf)}
@font-face{font-family:Poppins;font-weight:400;src:url(../assets/Poppins-Regular.ttf)}
@font-face{font-family:Poppins;font-weight:500;src:url(../assets/Poppins-Medium.ttf)}
@font-face{font-family:Poppins;font-weight:700;src:url(../assets/Poppins-Bold.ttf)}
@font-face{font-family:Mono;font-weight:700;src:url(../assets/DejaVuSansMono-Bold.ttf)}
:root{--ink:#0E0B24;--violet:#5B2EFF;--lime:#C6F432;--cloud:#F3F1FF;--lilac:#D8CFFF;--graphite:#2A2745;--slate:#6B6785}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:var(--h,1350px);overflow:hidden}
body{font-family:Poppins,Arial,sans-serif;position:relative;color:#fff}
.ink{background:var(--ink);background-image:radial-gradient(rgba(255,255,255,.09) 2.2px,transparent 2.7px);background-size:40px 40px}
.vio{background:var(--violet);background-image:radial-gradient(rgba(255,255,255,.12) 2.2px,transparent 2.7px);background-size:40px 40px}
.cloud{background:var(--cloud);color:var(--ink)}
.wrap{position:absolute;left:88px;right:88px;top:88px;bottom:200px;display:flex;flex-direction:column}.wrap>.push{margin-top:auto}.wrap>div:not(.push):not(.label){flex:none}
.label{font-family:Mono,'DejaVu Sans Mono',monospace;font-weight:700;font-size:23px;letter-spacing:.22em;text-transform:uppercase;color:var(--lime)}
.cloud .label{color:var(--violet)}
.vio .label{color:var(--lilac)}
h1{font-weight:700;font-size:104px;line-height:1.04;letter-spacing:-.02em;margin-top:34px}
h2{font-weight:700;font-size:78px;line-height:1.08;letter-spacing:-.015em;margin-top:30px}
.acc{color:var(--lime)} .cloud .acc{color:var(--violet)}
.us{display:inline-block;width:.58em;height:.13em;border-radius:99px;background:currentColor;margin-left:.07em}
p.body{font-weight:400;font-size:38px;line-height:1.5;color:var(--lilac);margin-top:38px;max-width:880px}
.cloud p.body{color:var(--graphite)}
.pill{display:inline-block;font-weight:700;font-size:36px;padding:26px 58px;border-radius:99px;background:#fff;color:var(--ink)}
.vio .pill{background:var(--ink);color:#fff}
.cloud .pill{background:var(--violet);color:#fff}
.foot{position:absolute;left:88px;right:88px;bottom:72px;display:flex;justify-content:space-between;align-items:center}
.foot img{height:64px}
.foot span{font-family:Mono,monospace;font-weight:700;font-size:19px;color:var(--lilac);letter-spacing:.02em}
.cloud .foot span{color:var(--slate)}
.chip{display:inline-block;font-family:Mono,monospace;font-weight:700;font-size:20px;letter-spacing:.12em;padding:10px 18px;border-radius:99px;border:2px solid var(--lilac);color:var(--lilac)}
.row{display:flex;gap:24px}
.card{background:#fff;color:var(--ink);border-radius:16px;padding:30px 34px}
.card b{font-size:34px;display:block} .card small{font-size:26px;color:var(--slate);display:block;margin-top:6px;line-height:1.4}
.price{font-weight:700;color:var(--violet);font-size:40px}
"""

def logo(kind):  # kind: Reversed (ink), White (violet), Full-colour (cloud)
    return f'<img src="../assets/MaxImum_Horizontal_{kind}.png" alt="Max_imum Designs">'

def page(name, theme, body, logo_kind, h=1350, foot=True, extra_css=""):
    f = f'<div class="foot">{logo(logo_kind)}<span>{URL}</span></div>' if foot else ""
    doc = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{name}</title><style>:root{{--h:{h}px}}{CSS}{extra_css}</style></head><body class="{theme}">{body}{f}</body></html>'
    with open(os.path.join(SRC, name + ".html"), "w", encoding="utf-8") as fh: fh.write(doc)
    return name, h

pages = []

# ---------- SINGLE POSTS (1080x1350) ----------
pages.append(page("MaxImum_N01_Salon_Feed", "ink", """
<div class="wrap"><div class="label">For salons and barbershops</div>
<h1>Your salon looks great. Does your <span class="acc">feed?<span class="us"></span></span></h1>
<p class="body">A logo, a post pack and a price list that look like one brand. Post pack of 5 from KES 5,000. Logo from KES 4,500.</p>
<div class="push"><span class="pill">Get a free quote</span></div></div>""", "Reversed"))

pages.append(page("MaxImum_N02_Sign_Menu_Feed", "vio", """
<div class="wrap"><div class="label">For shops, cafes and kiosks</div>
<h1>Your sign. Your menu. Your posts. <span class="acc">One look<span class="us"></span></span></h1>
<p class="body">Print and social design that match, so customers know you from the road to the feed.</p>
<div class="row push" style="flex-direction:column;gap:16px;max-width:760px">
<div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline"><b>Menu, 1 to 2 pages</b><span class="price">KES 3,500</span></div></div>
<div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline"><b>Banner, roll-up or signage</b><span class="price">KES 2,500</span></div></div></div></div>""", "White"))

pages.append(page("MaxImum_N03_Monthly_Design", "cloud", """
<div class="wrap"><div class="label">Monthly design plans</div>
<h2>Design every month. <span class="acc">One price<span class="us"></span></span></h2>
<div class="push" style="display:flex;flex-direction:column;gap:18px">
<div class="card" style="border:2px solid var(--lilac)"><div style="display:flex;justify-content:space-between;align-items:baseline"><b>Lite</b><span class="price">KES 8,500</span></div><small>8 designs a month, 1 revision round each.</small></div>
<div class="card" style="border:2px solid var(--lilac)"><div style="display:flex;justify-content:space-between;align-items:baseline"><b>Growth</b><span class="price">KES 15,000</span></div><small>16 designs and 1 print piece, 2 revision rounds.</small></div>
<div class="card" style="border:2px solid var(--lilac)"><div style="display:flex;justify-content:space-between;align-items:baseline"><b>Max</b><span class="price">KES 22,000</span></div><small>24 designs, 2 print pieces, brand refresh, priority WhatsApp.</small></div></div>
<p class="body" style="font-size:30px;margin-top:26px">Prices per month. Confirmed in a written quotation.</p></div>""", "Full-colour"))

pages.append(page("MaxImum_N04_Tip_Three_Colours", "ink", """
<div class="wrap"><div class="label">Design tip</div>
<h1>Three colours <span class="acc">is enough<span class="us"></span></span></h1>
<p class="body">Pick three. Use them on your sign, your posts and your receipts. People start to know you before they read your name.</p>
<div class="push" style="display:flex;gap:34px;align-items:flex-end">
<div style="text-align:center"><div style="width:190px;height:190px;border-radius:50%;background:#0E0B24;border:4px solid var(--lilac)"></div><div class="chip" style="margin-top:18px;border:0;padding:0">INK</div></div>
<div style="text-align:center"><div style="width:190px;height:190px;border-radius:50%;background:var(--violet)"></div><div class="chip" style="margin-top:18px;border:0;padding:0">VIOLET</div></div>
<div style="text-align:center"><div style="width:190px;height:190px;border-radius:50%;background:var(--lime)"></div><div class="chip" style="margin-top:18px;border:0;padding:0">LIME</div></div></div>
<p class="body" style="font-size:28px;margin-top:26px">Ours, as an example.</p></div>""", "Reversed"))

pages.append(page("MaxImum_N05_Client_Words_TEMPLATE", "cloud", """
<div class="wrap"><div class="label">Client words</div>
<div style="font-weight:700;font-size:300px;line-height:.7;color:var(--violet);margin-top:60px">&ldquo;</div>
<h2 style="margin-top:0;font-size:68px;line-height:1.2">[Paste one short, specific sentence from the client here.]</h2>
<p class="body push" style="font-weight:500;font-size:36px">[Client name], [Business], [Town]</p>
<p class="body" style="font-size:28px;margin-top:12px;color:var(--slate)">Logo design &middot; Delivered in [x] days <span class="us" style="background:var(--violet);width:.5em;height:.12em"></span></p></div>""", "Full-colour"))

pages.append(page("MaxImum_N06_Ask_Max", "ink", """
<div class="wrap"><div class="label">Meet Max</div>
<h1 style="font-size:96px">Questions at 10pm? Ask <span class="acc">Max<span class="us"></span></span></h1>
<p class="body" style="max-width:600px;font-size:34px">Max is our website guide. He answers common questions on prices, services and process, then helps you send your brief on WhatsApp.</p>
<div class="push"><span class="pill" style="font-size:32px;padding:22px 48px">Say hi on our site</span></div></div>
<img src="../assets/Max_Waving.png" alt="Max, the Max_imum Designs mascot, waving" style="position:absolute;right:30px;bottom:150px;width:420px">""", "Reversed"))

# ---------- CAROUSEL C3: Brief a designer in 5 lines (1080x1350) ----------
steps = [
 ("01","What do you sell?","One line. Example: &ldquo;Braids and natural hair care in Donholm.&rdquo;"),
 ("02","Who buys it?","Age, area, budget. &ldquo;Women 20 to 40 who book on WhatsApp.&rdquo; The clearer you are, the sharper the design."),
 ("03","Send 3 brands you love","They can be from any business. We read what you like from what you send."),
 ("04","Where will it show up?","Sign, receipt, Instagram, T-shirt? Tell us now so the files are right the first time."),
 ("05","Say the deadline and the budget","Honest numbers save everyone time. Our prices are fixed and public."),
]
pages.append(page("MaxImum_C3_Slide_0_Cover", "ink", """
<div class="wrap"><div class="label">Save this</div>
<h1 style="font-size:112px">How to brief a designer in <span class="acc">5 lines<span class="us"></span></span></h1>
<p class="body">So your first draft lands close to what you imagined.</p><div class="push label" style="text-align:right">SWIPE &rarr;</div></div>""", "Reversed"))
for i,(n,t,b) in enumerate(steps,1):
    theme = "vio" if i%2==0 else "ink"
    lk = "White" if theme=="vio" else "Reversed"
    pages.append(page(f"MaxImum_C3_Slide_{i}", theme, f"""
<div class="wrap"><div class="label">Line {n} of 05</div>
<div style="font-weight:700;font-size:340px;line-height:.9;margin-top:40px;color:{'var(--lime)' if theme=='ink' else '#fff'}">{n}</div>
<h2 style="margin-top:34px">{t}</h2><p class="body" style="font-size:36px;margin-top:26px">{b}</p></div>
<div style="position:absolute;right:88px;top:96px;font-family:Mono,monospace;font-weight:700;font-size:20px;letter-spacing:.15em;color:var(--lilac)">{i+1:02d} / 07</div>""", lk))
pages.append(page("MaxImum_C3_Slide_6_CTA", "ink", """
<div class="wrap"><div class="label">Ready when you are</div>
<h1 style="font-size:96px">Send us your 5 lines<span class="acc">_</span></h1>
<p class="body">We reply within 2 hours in working hours (Mon to Sat, 8:00 to 18:00) with a clear quote. Not sure what to write? We will help.</p>
<div class="push"><span class="pill">WhatsApp +254 112 816 303</span></div></div>
<div style="position:absolute;right:88px;top:96px;font-family:Mono,monospace;font-weight:700;font-size:20px;letter-spacing:.15em;color:var(--lilac)">07 / 07</div>""", "Reversed"))

with sync_playwright() as p:
    b = p.chromium.launch()
    for name, h in pages:
        pg = b.new_page(viewport={"width":1080,"height":h})
        pg.goto("file://"+os.path.join(SRC, name+".html")); pg.wait_for_timeout(250)
        pg.screenshot(path=os.path.join(PNG, name+".png")); pg.close()
    b.close()
print(len(pages),"rendered")
