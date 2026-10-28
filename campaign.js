(function () {
  var root = 'Max_imum_Promotional_Materials/11_Promotional_Materials/';
  function slideFiles(prefix, count, cta) {
    var files = [prefix + '_Slide_0_Cover.png'];
    for (var i = 1; i < count; i++) files.push(prefix + '_Slide_' + i + (i === count - 1 && cta ? '_CTA' : '') + '.png');
    return files;
  }
  function renderGallery(id, directory, files, titleFor) {
    var target = document.getElementById(id);
    files.forEach(function (file, index) {
      var path = root + directory + '/' + file;
      var title = titleFor(file, index);
      var card = document.createElement('figure');
      card.className = 'asset-card';
      var image = document.createElement('img');
      image.src = path;
      image.alt = title + ' — Max_imum Designs campaign artwork';
      image.loading = 'lazy';
      image.decoding = 'async';
      var preview = document.createElement('a');
      preview.href = path;
      preview.target = '_blank';
      preview.rel = 'noopener';
      preview.setAttribute('aria-label', 'Open ' + title);
      preview.appendChild(image);
      var caption = document.createElement('figcaption');
      var name = document.createElement('b');
      name.textContent = title;
      var download = document.createElement('a');
      download.className = 'download-link';
      download.href = path;
      download.download = file;
      download.textContent = 'Download PNG';
      caption.appendChild(name);
      caption.appendChild(download);
      card.appendChild(preview);
      card.appendChild(caption);
      target.appendChild(card);
    });
  }
  var posts = [
    ['MaxImum_P01_We_Are_Live.png', 'We are live'],
    ['MaxImum_P02_Meet_The_New_Look.png', 'Meet the new look'],
    ['MaxImum_P03_What_We_Design.png', 'What we design'],
    ['MaxImum_P04_Clear_Prices.png', 'Clear prices'],
    ['MaxImum_P05_Launch_Offer.png', 'Launch offer'],
    ['MaxImum_P06_Free_Brand_Health_Check.png', 'Free Brand Health Check'],
    ['MaxImum_P07_Refer_A_Friend.png', 'Refer a friend'],
    ['MaxImum_P08_How_It_Works.png', 'How it works'],
    ['MaxImum_P09_Why_Max_imum.png', 'Why Max_imum'],
    ['MaxImum_P10_Meet_The_Founder.png', 'Meet the founder'],
    ['MaxImum_P11_LinkedIn_Facebook_Share_1200x630.png', 'LinkedIn and Facebook share']
  ];
  var storyFiles = [
    'MaxImum_S1_Coming_Soon.png',
    'MaxImum_S2_We_Are_Live.png',
    'MaxImum_S3_Ask_Me_Anything.png',
    'MaxImum_S4_Poll.png',
    'MaxImum_S5_Launch_Offer.png',
    'MaxImum_S6_Quote_In_24_Hours.png',
    'MaxImum_S7_Design_Tip.png'
  ];
  var highlightFiles = [
    'MaxImum_H_FAQ.png',
    'MaxImum_H_Prices.png',
    'MaxImum_H_Process.png',
    'MaxImum_H_Reviews.png',
    'MaxImum_H_Services.png',
    'MaxImum_H_Work.png'
  ];
  renderGallery('posts', '01_Social_Posts', posts.map(function (post) { return post[0]; }), function (file, index) { return posts[index][1]; });
  renderGallery('carousel-refresh', '02_Instagram_Carousels', slideFiles('MaxImum_C1', 7, true), function (file, index) { return 'Refresh guide · slide ' + (index + 1); });
  renderGallery('carousel-dukapay', '02_Instagram_Carousels', slideFiles('MaxImum_C2', 8, true), function (file, index) { return 'DukaPay case study · slide ' + (index + 1); });
  renderGallery('stories', '03_Stories_and_Highlights', storyFiles, function (file) { return file.replace(/^MaxImum_S\d_/, '').replace(/\.png$/, '').replace(/_/g, ' '); });
  renderGallery('highlights', '03_Stories_and_Highlights', highlightFiles, function (file) { return file.replace(/^MaxImum_H_/, '').replace(/\.png$/, '').replace(/_/g, ' '); });

  var printItems = [
    ['Flyer A5 · front', 'MaxImum_01_Flyer_A5_Front.pdf'],
    ['Flyer A5 · back', 'MaxImum_02_Flyer_A5_Back.pdf'],
    ['Poster A4', 'MaxImum_03_Poster_A4.pdf'],
    ['Poster A3', 'MaxImum_04_Poster_A3.pdf'],
    ['Referral card · front', 'MaxImum_05_Referral_Card_Front_90x55.pdf'],
    ['Referral card · back', 'MaxImum_06_Referral_Card_Back_90x55.pdf'],
    ['Roll-up banner', 'MaxImum_07_Rollup_Banner_850x2000mm.pdf']
  ];
  var printTarget = document.getElementById('print-files');
  printItems.forEach(function (item) {
    var card = document.createElement('article');
    card.className = 'print-card';
    var heading = document.createElement('h3');
    heading.textContent = item[0];
    var office = document.createElement('a');
    office.href = root + '05_Print/Office_No_bleed/' + item[1];
    office.target = '_blank';
    office.rel = 'noopener';
    office.textContent = 'Office printer · no bleed';
    var printShop = document.createElement('a');
    printShop.href = root + '05_Print/Print_Shop_with_bleed/' + item[1];
    printShop.target = '_blank';
    printShop.rel = 'noopener';
    printShop.textContent = 'Print shop · with bleed';
    card.appendChild(heading);
    card.appendChild(office);
    card.appendChild(printShop);
    printTarget.appendChild(card);
  });

  var menu = document.querySelector('.menu');
  var nav = document.querySelector('.nav ul');
  menu.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function () {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  });
  document.getElementById('yr').textContent = new Date().getFullYear();
})();
