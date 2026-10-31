(function () {
  var WA = '254112816303';
  var form = document.getElementById('project-brief');
  if (!form) return;

  var panels = Array.prototype.slice.call(form.querySelectorAll('[data-brief-step]'));
  var steps = Array.prototype.slice.call(document.querySelectorAll('.brief-steps li'));
  var progress = document.getElementById('brief-progress');
  var preview = document.getElementById('brief-preview');
  var status = document.getElementById('brief-status');
  var download = document.getElementById('brief-download');
  var whatsapp = document.getElementById('brief-whatsapp');
  var current = 0;
  var downloadUrl = '';
  var titles = ['About you', 'Project', 'Style', 'Practicalities', 'Review'];

  function populateServices() {
    var select = document.getElementById('brief-service');
    Object.keys(window.PRICES).forEach(function (category) {
      var group = document.createElement('optgroup');
      group.label = category;
      window.PRICES[category].forEach(function (item) {
        var option = document.createElement('option');
        option.value = item[0];
        option.textContent = item[0];
        group.appendChild(option);
      });
      select.appendChild(group);
    });
    var unsure = document.createElement('option');
    unsure.value = 'Not sure / multiple services';
    unsure.textContent = 'Not sure / multiple services';
    select.appendChild(unsure);
  }

  function showStep(index) {
    current = index;
    panels.forEach(function (panel, i) { panel.hidden = i !== index; });
    steps.forEach(function (step, i) {
      step.classList.toggle('current', i === index);
      step.classList.toggle('completed', i < index);
      if (i === index) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
    progress.textContent = 'Step ' + (index + 1) + ' of ' + panels.length + ': ' + titles[index];
    var heading = panels[index].querySelector('legend, h3');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus();
    }
  }

  function validateCurrentStep() {
    var required = panels[current].querySelectorAll('[required]');
    for (var i = 0; i < required.length; i += 1) {
      if (!required[i].checkValidity()) {
        required[i].reportValidity();
        return false;
      }
    }
    return true;
  }

  function field(name) {
    var control = form.elements.namedItem(name);
    return control && control.value.trim() ? control.value.trim() : 'Not specified';
  }

  function checkedValues(name) {
    var checked = form.querySelectorAll('input[name="' + name + '"]:checked');
    var values = Array.prototype.map.call(checked, function (input) { return input.value; });
    return values.length ? values.join(', ') : 'Not specified';
  }

  function formatDeadline(value) {
    if (!value) return 'Not specified';
    var parts = value.split('-');
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
      .toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function createBrief() {
    var data = new FormData(form);
    return [
      'Hello Max_imum Designs! I would like to discuss a project.',
      '',
      'CONTACT',
      'Name: ' + field('name'),
      'Business / project: ' + field('business'),
      '',
      'PROJECT',
      'What the business does: ' + field('business_summary'),
      'Service: ' + field('service'),
      'Goal: ' + field('goal'),
      'Audience: ' + field('audience'),
      '',
      'CREATIVE DIRECTION',
      'Possible deliverables: ' + checkedValues('deliverables'),
      'Style / references: ' + field('style'),
      'Existing materials: ' + checkedValues('assets'),
      '',
      'PRACTICALITIES',
      'Deadline: ' + formatDeadline(data.get('deadline')),
      'Budget: ' + field('budget'),
      'Other details: ' + field('notes')
    ].join('\n');
  }

  function prepareReview() {
    var message = createBrief();
    preview.textContent = message;
    whatsapp.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(message);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    downloadUrl = URL.createObjectURL(new Blob([message], { type: 'text/plain;charset=utf-8' }));
    download.href = downloadUrl;
    status.textContent = '';
    showStep(4);
  }

  populateServices();
  form.querySelectorAll('[data-brief-next]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (!validateCurrentStep()) return;
      if (current === panels.length - 2) prepareReview();
      else showStep(current + 1);
    });
  });
  form.querySelectorAll('[data-brief-back]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (current > 0) showStep(current - 1);
    });
  });
  document.getElementById('brief-copy').addEventListener('click', function () {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      status.textContent = 'Copy is unavailable here. Select and copy the brief above, or download it instead.';
      return;
    }
    navigator.clipboard.writeText(preview.textContent).then(function () {
      status.textContent = 'Brief copied to your clipboard.';
    }).catch(function () {
      status.textContent = 'Could not copy the brief. Select and copy it above, or download it instead.';
    });
  });
  window.addEventListener('pagehide', function () {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  });
})();
