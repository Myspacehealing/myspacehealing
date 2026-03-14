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
  // Intake form sub-nav: sticky below header, scroll-spy, smooth scroll
  var subnav = document.getElementById('intake-subnav');
  if(subnav){
    var header = document.querySelector('header');
    // Set CSS var so sub-nav sticks right below header
    function setHeaderHeight(){
      var h = header ? header.offsetHeight : 0;
      document.documentElement.style.setProperty('--header-h', h + 'px');
    }
    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);

    var links = subnav.querySelectorAll('a[href^="#"]');

    // Helper: horizontally scroll the sub-nav so a link is centred
    function scrollNavTo(el){
      var navRect = subnav.getBoundingClientRect();
      var elRect  = el.getBoundingClientRect();
      var offset  = elRect.left - navRect.left + subnav.scrollLeft - navRect.width / 2 + elRect.width / 2;
      subnav.scrollTo ? subnav.scrollTo({left:offset, behavior:'smooth'}) : (subnav.scrollLeft = offset);
    }

    // Smooth scroll with offset for both sticky bars
    links.forEach(function(link){
      link.addEventListener('click', function(e){
        e.preventDefault();
        var target = document.querySelector(link.getAttribute('href'));
        if(!target) return;
        var headerH = header ? header.offsetHeight : 0;
        var subnavH = subnav.offsetHeight || 0;
        var y = target.getBoundingClientRect().top + window.scrollY - headerH - subnavH - 8;
        // Use two-arg form as fallback for older / privacy-hardened browsers
        try { window.scrollTo({top:y, behavior:'smooth'}); }
        catch(_){ window.scrollTo(0, y); }
        scrollNavTo(link);
      });
    });
    // Scroll-spy: highlight active section
    var sections = [];
    links.forEach(function(l){ var s = document.querySelector(l.getAttribute('href')); if(s) sections.push({el:s, link:l}); });
    function updateActive(){
      var headerH = header ? header.offsetHeight : 0;
      var offset = headerH + subnav.offsetHeight + 20;
      var current = null;
      sections.forEach(function(s){
        if(s.el.getBoundingClientRect().top <= offset) current = s;
      });
      links.forEach(function(l){ l.classList.remove('active'); });
      if(current){
        current.link.classList.add('active');
        scrollNavTo(current.link);
      }
    }
    window.addEventListener('scroll', updateActive, {passive:true});
    updateActive();
  }
})();
