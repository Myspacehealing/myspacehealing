/* MySpace Healing — Mobile nav, view toggle & page transitions */
(function(){
  // Hamburger menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-links');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        toggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  // "View desktop site" / "View mobile site" toggle
  var viewBtn = document.querySelector('.view-toggle');
  if(viewBtn){
    var viewport = document.querySelector('meta[name="viewport"]');
    var isDesktop = false;
    viewBtn.addEventListener('click', function(){
      if(!isDesktop){
        viewport.setAttribute('content','width=1200');
        viewBtn.textContent = 'Switch to mobile view';
        isDesktop = true;
      } else {
        viewport.setAttribute('content','width=device-width, initial-scale=1.0');
        viewBtn.textContent = 'View desktop site';
        isDesktop = false;
      }
      window.scrollTo(0,0);
    });
  }

  // Smooth page transitions — fade out before navigating
  document.querySelectorAll('a[href]').forEach(function(link){
    var href = link.getAttribute('href');
    // Only apply to internal .html links (not mailto, tel, #, external)
    if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;
    link.addEventListener('click', function(e){
      e.preventDefault();
      document.body.classList.add('page-leaving');
      setTimeout(function(){ window.location.href = href; }, 250);
    });
  });
})();
