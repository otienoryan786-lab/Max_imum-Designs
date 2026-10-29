/* Max's private, rules-based studio guide for the static website. */
(function () {
  window.MaxChat = true;
  var WA = '254112816303';
  var $ = function (selector, root) { return (root || document).querySelector(selector); };
  var $$ = function (selector, root) { return [].slice.call((root || document).querySelectorAll(selector)); };
  var el = function (tag, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };
  var formatPrice = function (amount) { return 'KES ' + amount.toLocaleString('en-KE'); };
  var whatsapp = function (message) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(message); };

  function start() {
    if (document.body.hasAttribute('data-nomax') || !window.Max) return;

    var widget = el('div', 'mw');
    var trigger = el('button', 'btn0');
    var avatar = el('span');
    var panel = null;
    var thread = null;
    var tip = null;
    var tipCount = 0;
    var seen = {};
    var brief = null;

    trigger.type = 'button';
    trigger.setAttribute('aria-label', 'Chat with Max, the Max_imum Designs studio guide');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', 'max-chat-panel');
    trigger.appendChild(avatar);
    trigger.appendChild(el('i', 'ping'));
    widget.appendChild(trigger);
    document.body.appendChild(widget);
    var mascot = window.Max.create(avatar);

    function closeTip() {
      if (tip) {
        tip.remove();
        tip = null;
      }
    }

    function closePanel(restoreFocus) {
      if (!panel) return;
      panel.remove();
      panel = null;
      trigger.setAttribute('aria-expanded', 'false');
      if (restoreFocus) trigger.focus();
    }

    function addMessage(kind, text, actions) {
      var item = el('div', 'max-chat-message max-chat-' + kind);
      var copy = el('p');
      copy.textContent = text;
      item.appendChild(copy);

      (actions || []).forEach(function (itemAction) {
        if (itemAction.href === '#max-chat-brief') {
          var button = el('button', 'max-chat-action');
          button.type = 'button';
          button.textContent = itemAction.label;
          button.addEventListener('click', function () { sendMessage('Start a project brief'); });
          item.appendChild(button);
          return;
        }
        var link = el('a', 'max-chat-action');
        link.textContent = itemAction.label;
        link.href = itemAction.href;
        if (/^https:/.test(itemAction.href)) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        item.appendChild(link);
      });

      thread.appendChild(item);
      thread.scrollTop = thread.scrollHeight;
    }

    function action(label, href) { return { label: label, href: href }; }

    function openPanel() {
      closeTip();
      panel = el('section', 'max-chat');
      panel.id = 'max-chat-panel';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'false');
      panel.setAttribute('aria-labelledby', 'max-chat-title');
      panel.innerHTML = '<header class="max-chat-head"><div><span class="max-chat-kicker">MAX_IMUM DESIGNS</span><h2 id="max-chat-title">Meet Max</h2><span class="max-chat-status"><i></i> Studio guide · Nairobi, KE</span></div><button class="max-chat-close" type="button" aria-label="Close chat">&times;</button></header><div class="max-chat-thread" role="log" aria-live="polite" aria-relevant="additions text"></div><div class="max-chat-quick" aria-label="Quick questions"><button type="button">Find a service</button><button type="button">Check prices</button><button type="button">Start a project brief</button></div><form class="max-chat-form"><input id="max-chat-input" name="message" maxlength="1000" autocomplete="off" aria-label="Ask Max a question" placeholder="Ask about design, prices or your project" required><button type="submit" aria-label="Send message">Send</button></form><p class="max-chat-note">Your chat stays on this device. Nothing is sent unless you choose WhatsApp.</p>';
      widget.appendChild(panel);
      thread = $('.max-chat-thread', panel);
      var input = $('#max-chat-input', panel);
      var form = $('.max-chat-form', panel);

      $('.max-chat-close', panel).addEventListener('click', function () { closePanel(true); });
      $$('.max-chat-quick button', panel).forEach(function (button) {
        button.addEventListener('click', function () { sendMessage(button.textContent); });
      });
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        sendMessage(input.value);
      });
      addMessage('assistant', 'Karibu! I’m Max, your studio guide. I can help you choose a service, check published prices, find a website tool or prepare a project enquiry. I use information on this site rather than a live generative AI; I can’t create or send designs. Your chat stays in this browser unless you choose to open WhatsApp.', [
        action('Explore services', 'services.html'),
        action('View the price list', 'index.html#prices')
      ]);
      trigger.setAttribute('aria-expanded', 'true');
      mascot.mood('happy');
      mascot.wave(true);
      setTimeout(function () { mascot.wave(false); }, 1800);
      input.focus();
    }

    function pricesFor(category) {
      var rows = (window.PRICES || {})[category] || [];
      return rows.slice(0, 3).map(function (item) {
        return item[0] + ': ' + formatPrice(item[2]);
      }).join(' · ');
    }

    function categoryFor(text) {
      if (/brand identity|branding|brand kit|brand suite/.test(text)) return 'Brand';
      if (/logo/.test(text)) return 'Logo';
      if (/social|instagram|facebook|linkedin|post|content/.test(text)) return 'Digital';
      if (/print|flyer|business card|menu|brochure|poster|banner|signage/.test(text)) return 'Print';
      if (/pitch|presentation|company profile|document|deck/.test(text)) return 'Documents';
      if (/retainer|monthly|subscription/.test(text)) return 'Monthly retainers';
      return '';
    }

    function matchingPrice(text) {
      var catalog = window.PRICES || {}, match = null;
      Object.keys(catalog).some(function (category) {
        return catalog[category].some(function (item) {
          if (text.indexOf(item[0].toLowerCase()) !== -1) {
            match = item;
            return true;
          }
          return false;
        });
      });
      return match;
    }

    function startBrief() {
      brief = { step: 0 };
      addMessage('assistant', 'Let’s put together a useful first brief. What name should we use when you contact the studio?');
    }

    function continueBrief(answer) {
      if (/^(cancel|stop|never mind)$/i.test(answer.trim())) {
        brief = null;
        addMessage('assistant', 'No problem. Your draft is only in this chat and has not been sent.');
        return;
      }

      var prompts = [
        'What name should we use when you contact the studio?',
        'What is your business or project called?',
        'What would you like designed? A logo, social posts, print, a presentation, or something else?',
        'When do you need it? A date or “flexible” is fine.',
        'Any helpful details—your audience, style, format or goals? You can say “none”.'
      ];
      var keys = ['name', 'business', 'service', 'deadline', 'details'];
      brief[keys[brief.step]] = answer.trim();
      brief.step++;
      if (brief.step < keys.length) {
        addMessage('assistant', prompts[brief.step]);
        return;
      }

      var summary = 'Hello Max_imum Designs! I prepared a project brief with Max on the website.\n\nName: ' + brief.name +
        '\nBusiness / project: ' + brief.business + '\nDesign needed: ' + brief.service +
        '\nDeadline: ' + brief.deadline + '\nDetails: ' + brief.details;
      brief = null;
      addMessage('assistant', 'Your brief is ready. It has not been sent; choose where you’d like to continue.', [
        action('Continue in WhatsApp', whatsapp(summary)),
        action('Open the website quote form', 'index.html#contact')
      ]);
    }

    function answerQuestion(message) {
      var text = message.toLowerCase(), category, product, actions;
      if (/^(start a project brief|build my quote|prepare a brief|help me get a quote)$/.test(text) || /\b(start|make|build|prepare)\b.*\b(brief|quote)\b/.test(text)) {
        startBrief();
        return;
      }
      if (brief) {
        continueBrief(message);
        return;
      }
      if (/^(find a service|services|what do you do|what can you do)$/.test(text) || /\b(service|services|what should i get|what do you offer)\b/.test(text)) {
        addMessage('assistant', 'The studio designs logos and brand identities, social media graphics, print materials, pitch decks, company profiles and monthly design support. Tell me what you are making and I can point you to the closest fit.', [
          action('Browse all services', 'services.html'),
          action('Try the free Brand Health Check', 'brand-health-check.html')
        ]);
        return;
      }
      if (/\b(price|prices|cost|costs|how much|rate|rates|budget)\b/.test(text)) {
        product = matchingPrice(text);
        category = categoryFor(text);
        if (product) {
          addMessage('assistant', product[0] + ' is ' + formatPrice(product[2]) + '. The published price is a guide; the studio confirms your final scope and price in a written quote.', [
            action('See the full price list', 'index.html#prices'),
            action('Prepare a project brief', '#max-chat-brief')
          ]);
          return;
        }
        if (category && window.PRICES && window.PRICES[category]) {
          addMessage('assistant', 'Here are a few published ' + category.toLowerCase() + ' prices: ' + pricesFor(category) + '. Your final scope and price are confirmed in a written quote.', [
            action('See the full price list', 'index.html#prices'),
            action('Prepare a project brief', '#max-chat-brief')
          ]);
          return;
        }
        addMessage('assistant', 'Prices are listed in Kenyan shillings. Logo packages start at KES 4,500, print items at KES 1,500 and social media designs at KES 1,000. The complete list is on the home page; each project is confirmed in a written quote.', [
          action('See all published prices', 'index.html#prices'),
          action('Build a quote estimate', 'playground.html#quote')
        ]);
        return;
      }
      if (/\b(revision|revisions|changes)\b/.test(text)) {
        addMessage('assistant', 'Most designs include 2 free revision rounds; logos include 3 on Logo Standard and Premium. Extra revision rounds are KES 500 each. Your written quote confirms what is included.', [action('Read service terms', 'service-terms.html')]);
        return;
      }
      if (/\b(own|ownership|copyright|rights|working files)\b/.test(text)) {
        addMessage('assistant', 'After full payment, the copyright in your final approved design transfers to you in writing on request. The studio keeps sketches, unused concepts and working files. The handover and service terms explain the details.', [
          action('Read service terms', 'service-terms.html'),
          action('Ask the studio', whatsapp('Hello Max_imum Designs, I have a question about design ownership: ' + message))
        ]);
        return;
      }
      if (/\b(pay|payment|deposit|m-pesa|mpesa|transfer)\b/.test(text)) {
        addMessage('assistant', 'The studio accepts M-Pesa or bank transfer. Jobs under KES 3,000 are paid in full before work starts; other jobs usually begin with a 50% deposit. The written quote and service terms confirm the arrangement.', [action('Read service terms', 'service-terms.html')]);
        return;
      }
      if (/\b(delivery|deadline|turnaround|how long|timeline|rush)\b/.test(text)) {
        addMessage('assistant', 'Timing depends on the design and your brief. For example, logo packages usually take 3–7 days; rush delivery may be available for a 30% surcharge (minimum KES 500). We agree the actual timeline before work starts.', [action('Prepare a project brief', '#max-chat-brief')]);
        return;
      }
      if (/\b(ai|artificial intelligence)\b/.test(text)) {
        addMessage('assistant', 'The studio may use AI-assisted tools for ideas and production, with a designer making and checking the creative decisions. You can ask for your project to be completed without AI. Max, this website guide, is rules-based and does not send your chat to an AI service.', [action('Read the AI and materials policy', 'ai-policy.html')]);
        return;
      }
      if (/\b(privacy|personal data|store|save|remember|chat history)\b/.test(text)) {
        addMessage('assistant', 'This chat runs in your browser and is not saved or sent by the site. It disappears when you close it or leave the page. Nothing goes to the studio unless you choose to open WhatsApp or use another contact option.', [action('Read the Privacy Policy', 'privacy.html')]);
        return;
      }
      if (/\b(print|printing|printer)\b/.test(text)) {
        addMessage('assistant', 'The studio supplies print-ready files and can arrange printing at cost with a trusted printer on request. Share the finished size and printer specifications before the design starts.', [action('Explore print services', 'services.html#print-design')]);
        return;
      }
      if (/\b(portfolio|projects|work|examples)\b/.test(text)) {
        addMessage('assistant', 'Take a look at the portfolio for completed work, concept projects and the studio roadmap. Concept projects are labelled clearly.', [action('Browse the portfolio', 'portfolio.html')]);
        return;
      }
      if (/\b(tool|tools|health check|healthcheck|logo preview|estimate|quote builder)\b/.test(text)) {
        addMessage('assistant', 'There are three free, in-browser tools: Brand Health Check, logo preview and quote builder. Your answers and previews stay on your device unless you choose to share a message.', [
          action('Open the free tools', 'index.html#tools'),
          action('Start Brand Health Check', 'brand-health-check.html'),
          action('Open logo preview and quote builder', 'playground.html')
        ]);
        return;
      }
      if (/\b(contact|human|person|ryan|whatsapp|talk to|speak to|email)\b/.test(text)) {
        addMessage('assistant', 'For a personal answer, contact Ryan Otieno at the Nairobi studio. You can share your question on WhatsApp, or use the website quote form. Nothing is sent until you choose a link.', [
          action('Message the studio on WhatsApp', whatsapp('Hello Max_imum Designs, I have a question: ' + message)),
          action('Open the quote form', 'index.html#contact')
        ]);
        return;
      }
      if (/\b(hours|opening|open|location|where|nairobi|kenya)\b/.test(text)) {
        addMessage('assistant', 'Max_imum Designs is based in Nairobi, Kenya, and serves clients across Kenya. Studio hours are Monday to Saturday, 8:00–18:00. You can message the studio outside those hours and they will reply when available.', [
          action('Contact the studio', 'index.html#contact')
        ]);
        return;
      }
      if (/\b(logo|branding|brand identity|social media|flyer|business card|menu|pitch deck|company profile|retainer)\b/.test(text)) {
        category = categoryFor(text);
        actions = category ? [action('See matching prices', 'index.html#prices'), action('Prepare a project brief', '#max-chat-brief')] : [action('Explore services', 'services.html')];
        addMessage('assistant', 'That sounds like a project the studio may be able to help with. Tell me a little more about the format or goal, or check the service details and published prices.', actions);
        return;
      }
      addMessage('assistant', 'I can help with services, published KES prices, revisions, payments, timelines, AI and privacy policies, portfolio, free tools, or a project brief. For something specific, I can also help you send a question to the studio on WhatsApp.', [
        action('Ask the studio on WhatsApp', whatsapp('Hello Max_imum Designs, I have a question: ' + message)),
        action('Start a project brief', '#max-chat-brief')
      ]);
    }

    function sendMessage(value) {
      var message = (value || '').trim();
      if (!message) return;
      addMessage('user', message);
      var input = $('#max-chat-input', panel);
      input.value = '';
      answerQuestion(message);
      input.focus();
    }

    function showTip(message) {
      if (panel || tipCount >= 3 || document.querySelector('.wl')) return;
      closeTip();
      tipCount++;
      tip = el('div', 'tip');
      var copy = el('span');
      copy.textContent = message;
      var dismiss = el('button');
      dismiss.type = 'button';
      dismiss.setAttribute('aria-label', 'Dismiss tip');
      dismiss.textContent = '×';
      dismiss.addEventListener('click', closeTip);
      tip.appendChild(copy);
      tip.appendChild(dismiss);
      widget.appendChild(tip);
      mascot.mood('happy');
      setTimeout(closeTip, 9000);
    }

    trigger.addEventListener('click', function () {
      if (panel) closePanel(true);
      else openPanel();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closePanel(true);
    });
    document.addEventListener('click', function (event) {
      if (panel && !widget.contains(event.target)) closePanel(false);
    });
    trigger.addEventListener('dblclick', function () { window.Max.confetti(); });

    var tips = {
      services: 'Not sure what you need? Ask Max for a starting point.',
      prices: 'Ask Max about published prices and included revisions.',
      tools: 'Try the free Brand Health Check, logo preview or quote builder.',
      contact: 'Max can help prepare a brief before you contact the studio.',
      pgrid: 'Ask Max about a project or browse the full portfolio.'
    };
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
          if (entry.isIntersecting && !seen[id] && tips[id]) {
            seen[id] = true;
            setTimeout(function () { showTip(tips[id]); }, 600);
          }
        });
      }, { threshold: .35 });
      Object.keys(tips).forEach(function (id) {
        var section = document.getElementById(id);
        if (section) observer.observe(section);
      });
    }
    if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInterval(function () {
        if (!panel && !tip && !document.hidden) {
          mascot.wave(true);
          setTimeout(function () { mascot.wave(false); }, 2200);
        }
      }, 28000);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
